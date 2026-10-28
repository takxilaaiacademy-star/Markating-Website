import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { lessonsFor } from '../../data/curriculum';
import { COURSES } from '../../data/courses';
import { AiUnavailable, aiStatus, aiTask } from '../../utils/ai';
import { load, save } from '../../utils/storage';
import { jobKeywords } from './ats';
import {
  ATS_TARGET, MAX_ROUNDS, LISTS, dropExamples, entry, examplesOf, fillProjects, filled, freshBase, hintOf, inputProblem, isExampleEntry, jdCase,
  localResume, mergeAi, mergeGen, placeholderList, scoreOf, splitLines, targetOf, tipsOf, union, withFormRows, withKeywords,
} from './builder';
import { buildDoc, docToText, hasContent } from './model';
import { countPdfPages, downloadResumePdf, loadJsPdf } from './pdf';
import { DEFAULT_THEME, themeById } from './themes';

export { ATS_TARGET, MAX_ROUNDS, entry };

// Types

export interface ResumeEntry {
  title: string;
  sub: string;
  from: string;
  to: string;
  points: string;
}

export interface ResumeData {
  name: string;
  role: string;
  phone: string;
  email: string;
  city: string;
  summary: string;
  links: { label: string; url: string }[];
  education: ResumeEntry[];
  work: ResumeEntry[];
  projects: ResumeEntry[];
  skills: string;
  soft: string;
  languages: string;
  certs: string;
  achievements?: string;
  interests?: string;
}

/** The visitor: this site has no accounts, so everything comes from the form. */
export interface User {
  name: string;
  email: string;
  phone: string;
  city?: string;
  bio?: string;
}

export type ListKey = 'education' | 'work' | 'projects';
export type InputKind = 'jd' | 'prompt';
export type ExampleSet = ReadonlySet<string>;
export interface Placeholder {
  where: string;
  text: string;
}

export interface RoleProfile {
  id: string;
  title: string;
  match: RegExp;
  degree: string;
  coursework: string;
  link: 'github' | 'portfolio' | null;
  skills: string[];
  soft: string[];
  duties: string[];
  projects: { title: string; tools: string; points: string[] }[];
  work: string[];
  certs: string[];
  achievements: string[];
  interests: string;
}

export interface Target {
  kind: InputKind;
  input: string;
  role: string;
  years: number | null;
  level: 'fresher' | 'intern' | 'experienced';
  profile: RoleProfile;
  /** The job post the resume is written and scored against (expanded from a short request). */
  jd: string;
  keywords: string[];
  /** Skills named in a short request. */
  extra: string[];
}

export interface CourseFact {
  id: string;
  title: string;
  status: 'completed' | 'in progress';
  progress: number;
  lessonsDone: number;
  lessonsTotal: number;
  duration: string;
  skills: string[];
  topics: string[];
  from: string;
  to: string;
}

export interface AiStep {
  text: string;
  done: boolean;
}
export interface AiResult {
  score: number;
  before: number;
  reached: boolean;
  offline: boolean;
  matched: string[];
  total: number;
  notes: string[];
  hint: string;
  kind: InputKind;
  role: string;
}

interface AiResponse {
  resume: Partial<ResumeData>;
  keywords?: string[];
  notes?: string[];
  targetJob?: string;
}

export type OnValue = (path: string, value: string) => void;

// Form constants

export const PERSONAL = [
  ['name', 'Full name', 'half'],
  ['role', 'Role, e.g. Data Analyst', 'half'],
  ['phone', 'Phone', 'half'],
  ['email', 'Email', 'half'],
  ['city', 'City, Country', 'full'],
] as const;

export const LABELS = {
  work: ['Company', 'Position', 'Highlights (one per line, start with a verb)'],
  projects: ['Project name', 'Tools used', 'What you built and the result (one per line)'],
  education: ['School or college', 'Degree or certificate', 'Highlights (grade, awards; one per line)'],
} as const;

export const EXAMPLE_PROMPTS = ['Fresher data analyst', 'Python developer, 2 years experience', 'Digital marketing intern', 'AI automation specialist', 'HR executive fresher'];

/** Takxila courses a visitor can add as real training (paid and free). */
export const COURSE_PICKS = COURSES.map((c) => ({ id: c.id, title: c.title.split(/\s[:|–—]\s/)[0].trim() }));

const AUTOSAVE_MS = 500;
const ymNow = () => new Date().toISOString().slice(0, 7);

/** Takxila courses the visitor says they took, as facts for course projects. */
export function courseFacts(ids: string[], jd: string): CourseFact[] {
  const kws = jobKeywords(jd, 30);
  return ids
    .map((id) => COURSES.find((c) => c.id === id))
    .filter((c): c is (typeof COURSES)[number] => !!c)
    .map((c) => {
      const lessons = lessonsFor(c);
      const fact: CourseFact = {
        id: c.id, title: c.title.split(/\s[:|]\s/)[0].trim(), status: 'completed', progress: 100,
        lessonsDone: lessons.length, lessonsTotal: lessons.length,
        duration: c.meta.find((m) => /\d\s*\+?\s*(hours?|days?|weeks?)/i.test(m)) ?? '',
        skills: union(c.learn.slice(0, 8), c.tags.map((t) => jdCase(t, t))).slice(0, 12), topics: lessons.filter((t) => !/^Hands-on project/.test(t)).slice(0, 12),
        from: '', to: ymNow(),
      };
      const text = [c.title, c.short, ...c.learn, ...c.tags].join(' ').toLowerCase();
      return { fact, rel: kws.filter((k) => text.includes(k)).length };
    })
    .sort((a, b) => b.rel - a.rel)
    .map((x) => x.fact);
}

const trainingLines = (facts: CourseFact[]) => facts.map((f) => `${f.title} – Takxila AI Academy`);

const blank = (): ResumeData => ({
  name: '', role: '', phone: '', email: '', city: '', summary: '',
  links: [{ label: 'LinkedIn', url: '' }, { label: 'GitHub', url: '' }, { label: 'Portfolio', url: '' }],
  education: [entry()], work: [entry()], projects: [entry()],
  skills: '', soft: 'Communication, Teamwork, Problem solving', languages: 'English, Hindi', certs: '', achievements: '', interests: '',
});

// Hooks

export function useResumeWorkspace(toast: (msg: string) => void) {
  const [r, setR] = useState<ResumeData>(blank);
  const rRef = useRef(r);
  rRef.current = r;
  const [ready, setReady] = useState(false);
  const [jd, setJdState] = useState('');
  const [taken, setTaken] = useState<string[]>([]);
  const [examples, setExamples] = useState<ExampleSet>(() => new Set());
  const [themeId, setThemeId] = useState(DEFAULT_THEME.id);

  // Drafts live in this browser only; read after the first paint so the prerendered page hydrates cleanly.
  useEffect(() => {
    const d = load<ResumeData | null>('resume_draft', null);
    if (d) setR({ ...blank(), ...d });
    setJdState(load<string>('resume_jd', ''));
    setTaken(load<string[]>('resume_courses', []));
    setExamples(new Set(load<string[]>('resume_examples', [])));
    setThemeId(themeById(load<string>('resume_theme', DEFAULT_THEME.id)).id);
    setReady(true);
  }, []);

  const [status, setStatus] = useState<'saved' | 'editing'>('saved');
  useEffect(() => {
    if (!ready) return;
    setStatus('editing');
    const id = window.setTimeout(() => {
      save('resume_draft', r);
      setStatus('saved');
    }, AUTOSAVE_MS);
    return () => window.clearTimeout(id);
  }, [r, ready]);
  useEffect(() => {
    const flush = () => ready && save('resume_draft', rRef.current);
    window.addEventListener('pagehide', flush);
    return () => window.removeEventListener('pagehide', flush);
  }, [ready]);

  // Stable updaters: memoised fields depend on these never changing.
  const onValue = useCallback<OnValue>((path, v) => {
    const [k, i, f] = path.split('.');
    setR((s) => {
      if (i === undefined) return { ...s, [k]: v };
      const idx = Number(i);
      if (k === 'links') return { ...s, links: s.links.map((x, j) => (j === idx ? { ...x, [f]: v } : x)) };
      if (!(LISTS as readonly string[]).includes(k)) return s;
      const list = k as ListKey;
      return { ...s, [list]: s[list].map((x, j) => (j === idx ? { ...x, [f]: v } : x)) };
    });
  }, []);
  const addEntry = useCallback((list: ListKey) => setR((s) => ({ ...s, [list]: [...s[list], entry()] })), []);
  const dropEntry = useCallback((list: ListKey) => setR((s) => (s[list].length > 1 ? { ...s, [list]: s[list].slice(0, -1) } : s)), []);
  const addLink = useCallback(() => setR((s) => ({ ...s, links: [...s.links, { label: 'Website', url: '' }] })), []);
  const dropLink = useCallback(() => setR((s) => ({ ...s, links: s.links.slice(0, -1) })), []);
  const replace = useCallback((next: ResumeData) => setR(next), []);
  const reset = useCallback(() => {
    setR(blank());
    setExamples(new Set());
    save('resume_examples', null);
  }, []);

  const setJd = useCallback((v: string) => {
    setJdState(v);
    save('resume_jd', v);
  }, []);
  const toggleCourse = useCallback((id: string) => {
    setTaken((t) => {
      const next = t.includes(id) ? t.filter((x) => x !== id) : [...t, id].slice(-3);
      save('resume_courses', next);
      return next;
    });
  }, []);

  const addExamples = useCallback(
    (keys: string[]) =>
      setExamples((prev) => {
        const next = new Set([...prev, ...keys]);
        save('resume_examples', [...next].slice(-200));
        return next;
      }),
    [],
  );

  const theme = themeById(themeId);
  const pickTheme = useCallback((id: string) => {
    setThemeId(id);
    save('resume_theme', id);
  }, []);

  // Preview from a deferred copy so it never blocks typing.
  const deferred = useDeferredValue(r);
  const doc = useMemo(() => buildDoc(deferred), [deferred]);
  const [pages, setPages] = useState<number | null>(null);
  useEffect(() => {
    const id = window.setTimeout(() => {
      countPdfPages(doc, theme).then(setPages, () => setPages(null));
    }, 500);
    return () => window.clearTimeout(id);
  }, [doc, theme]);
  useEffect(() => {
    const id = window.setTimeout(() => void loadJsPdf(), 1500);
    return () => window.clearTimeout(id);
  }, []);

  const placeholders = useMemo(() => placeholderList(deferred, examples), [deferred, examples]);
  const flags = useMemo(() => {
    const of = (list: ListKey) => deferred[list].map((e) => filled(e) && isExampleEntry(list, e, examples));
    return { education: of('education'), work: of('work'), projects: of('projects') };
  }, [deferred, examples]);

  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const download = useCallback(
    async (force: boolean) => {
      const d = buildDoc(rRef.current);
      if (!hasContent(d)) return toast('Add your name and at least one section before downloading.');
      if (!force && placeholderList(rRef.current, examples).length) return setConfirm(true);
      setConfirm(false);
      setBusy(true);
      try {
        const n = await downloadResumePdf(d, theme);
        toast(`PDF downloaded: ${n} page${n > 1 ? 's' : ''}, ${theme.name} theme.`);
      } catch (e) {
        console.error(e);
        toast('Could not create the PDF. Please try again.');
      } finally {
        setBusy(false);
      }
    },
    [theme, toast, examples],
  );
  const onDownload = useCallback(() => void download(false), [download]);
  const downloadAnyway = useCallback(() => void download(true), [download]);
  const closeConfirm = useCallback(() => setConfirm(false), []);
  const getText = useCallback(() => docToText(buildDoc(rRef.current)), []);

  return {
    r, rRef, deferred, replace, reset, onValue, addEntry, dropEntry, addLink, dropLink, status, busy, onDownload, downloadAnyway, confirm, closeConfirm, getText,
    jd, setJd, taken, toggleCourse, examples, addExamples, placeholders, flags, themeId, theme, pickTheme, doc, pages,
  };
}

export type Workspace = ReturnType<typeof useResumeWorkspace>;

export function useResumeAi(w: Pick<Workspace, 'rRef' | 'deferred' | 'replace' | 'jd' | 'examples' | 'addExamples' | 'taken'>) {
  const { rRef, replace, jd, examples, addExamples, taken } = w;
  const [aiOn, setAiOn] = useState<boolean | null>(null);
  useEffect(() => {
    let live = true;
    void aiStatus().then((s) => live && setAiOn(s.ai));
    return () => {
      live = false;
    };
  }, []);

  // The job post the AI wrote for a short request, kept so the score stays the same after a reload.
  const [aiJd, setAiJd] = useState<{ input: string; jd: string } | null>(null);
  useEffect(() => setAiJd(load<{ input: string; jd: string } | null>('resume_target', null)), []);

  const [tried, setTried] = useState(false);
  const [working, setWorking] = useState(false);
  const [steps, setSteps] = useState<AiStep[]>([]);
  const [result, setResult] = useState<AiResult | null>(null);
  const [undoTo, setUndoTo] = useState<ResumeData | null>(null);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);

  const inputError = tried ? inputProblem(jd) : '';
  const deferredJd = useDeferredValue(jd);
  const target = useMemo(() => {
    if (inputProblem(deferredJd)) return null;
    const t = deferredJd.trim();
    return targetOf(t, aiJd && aiJd.input === t ? aiJd.jd : undefined);
  }, [deferredJd, aiJd]);
  const live = useMemo(() => (target ? scoreOf(w.deferred, target.jd) : null), [w.deferred, target]);

  const create = useCallback(async () => {
    setTried(true);
    if (inputProblem(jd)) return;
    abort.current?.abort();
    const ctl = new AbortController();
    abort.current = ctl;
    const push = (text: string, done = false) => setSteps((st) => [...st.map((x) => ({ ...x, done: true })), { text, done }]);
    setSteps([]);
    setResult(null);
    setWorking(true);

    const input = jd.trim();
    let t = targetOf(input);
    push(t.kind === 'prompt' ? `Planning a complete ${t.role} resume…` : 'Reading the job post…');
    const cur = rRef.current;
    const clean = dropExamples(cur, examples);
    const kept = { education: clean.education.filter(filled).length, work: clean.work.filter(filled).length, projects: clean.projects.filter(filled).length };
    const userAch = splitLines(clean.achievements ?? '').length > 0;
    const facts = courseFacts(taken, t.jd);
    const user: User = { name: clean.name, email: clean.email, phone: clean.phone, city: clean.city };
    const base = freshBase(clean, user, facts, t, trainingLines(facts));
    const notes: string[] = [];
    let online = aiOn !== false;
    try {
      let draft: ResumeData | null = null;
      if (online) {
        push('Writing your resume with Gemini AI…');
        try {
          const res = await aiTask<AiResponse>(
            'resume.generate',
            {
              resume: base, jobDescription: t.kind === 'jd' ? input : '', request: t.kind === 'prompt' ? input : '', targetRole: t.role, keywords: t.keywords,
              courses: facts.slice(0, 3).map(({ id: _id, ...f }) => f),
            },
            ctl.signal,
          );
          if (t.kind === 'prompt' && res.targetJob && res.targetJob.trim().length >= 200) {
            t = targetOf(input, res.targetJob);
            setAiJd({ input, jd: t.jd });
            save('resume_target', { input, jd: t.jd });
          }
          draft = fillProjects(mergeGen(base, res.resume ?? {}, userAch, t), t, facts, false);
          notes.push(...(res.notes ?? []));
        } catch (e) {
          if (ctl.signal.aborted) return;
          online = false;
          if (e instanceof AiUnavailable) setAiOn(false);
          notes.push(`${e instanceof Error ? e.message : 'The AI writer is not available.'} This resume was built on your device instead.`);
        }
      }
      if (!draft) {
        push('Building your resume on this device…');
        draft = localResume(base, t, facts);
      }
      draft = withKeywords(draft, t.jd);
      let score = scoreOf(draft, t.jd);

      for (let i = 0; online && i < MAX_ROUNDS && score.score < ATS_TARGET; i++) {
        push(i === 0 ? 'Adding missing keywords…' : `Improving again (round ${i + 1} of ${MAX_ROUNDS})…`);
        try {
          const res = await aiTask<AiResponse>(
            'resume.improve',
            { resume: draft, jobDescription: t.jd, missingKeywords: score.keywords?.missing.map((k) => jdCase(t.jd, k)) ?? [], tips: tipsOf(score) },
            ctl.signal,
          );
          const next = withKeywords(mergeAi(draft, res.resume ?? {}), t.jd);
          const nextScore = scoreOf(next, t.jd);
          if (nextScore.score >= score.score) {
            draft = next;
            score = nextScore;
          }
          notes.push(...(res.notes ?? []));
        } catch (e) {
          if (ctl.signal.aborted) return;
          notes.push(e instanceof Error ? e.message : 'The AI could not improve it further.');
          break;
        }
      }
      if (ctl.signal.aborted) return;
      if (score.score < ATS_TARGET) {
        const local = withKeywords(localResume(base, t, facts), t.jd);
        const localScore = scoreOf(local, t.jd);
        if (localScore.score > score.score) {
          draft = local;
          score = localScore;
          if (online) notes.push('The AI version scored lower, so this is the version built on your device.');
        }
      }

      const reached = score.score >= ATS_TARGET;
      push(reached ? `ATS score ${score.score}: done` : `ATS score ${score.score}`, true);
      setUndoTo(cur);
      replace(withFormRows(draft));
      addExamples(examplesOf(draft, kept, userAch));
      setResult({
        score: score.score, before: scoreOf(cur, t.jd).score, reached, offline: !online, kind: t.kind, role: t.role,
        matched: (score.keywords?.matched ?? []).map((k) => jdCase(t.jd, k)), total: (score.keywords?.matched.length ?? 0) + (score.keywords?.missing.length ?? 0),
        notes: [...new Set(notes.map((n) => n.trim()).filter(Boolean))].slice(0, 6),
        hint: reached ? '' : hintOf(draft, score),
      });
    } finally {
      if (abort.current === ctl) setWorking(false);
    }
  }, [aiOn, jd, rRef, replace, examples, addExamples, taken]);

  const cancel = useCallback(() => {
    abort.current?.abort();
    setWorking(false);
    setSteps([]);
  }, []);
  const undo = useCallback(() => {
    if (undoTo) replace(undoTo);
    setUndoTo(null);
    setResult(null);
    setSteps([]);
  }, [undoTo, replace]);
  const keep = useCallback(() => {
    setUndoTo(null);
    setResult(null);
    setSteps([]);
  }, []);

  return { aiOn, inputError, target, live, working, steps, result, canUndo: !!undoTo, create: () => void create(), cancel, undo, keep };
}

export type ResumeAi = ReturnType<typeof useResumeAi>;
