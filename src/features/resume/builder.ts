import type { ResumeEntry, User } from './types';
import { jobKeywords, scoreResume, type AtsResult } from './ats';
import { buildDoc, docToText } from './model';
import { genericRole, ROLES } from './roles';
import type { CourseFact, ExampleSet, InputKind, ListKey, Placeholder, ResumeData, RoleProfile, Target } from './types';

export const ATS_TARGET = 85;
export const MAX_ROUNDS = 3;
export const LISTS: readonly ListKey[] = ['education', 'work', 'projects'];

// Text helpers
export const words = (s: string) => (s.trim().match(/\S+/g) ?? []).length;
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
export const splitList = (s: string) => (s ?? '').split(/[,;\n]/).map((x) => x.trim()).filter(Boolean);
export const splitLines = (s: string) => (s ?? '').split('\n').map((x) => x.trim()).filter(Boolean);
const PH_ONE = /\[[^\]\n]{1,80}\]/;
const PH_ALL = /\[[^\]\n]{1,80}\]/g;
export const hasPh = (s: string | undefined) => !!s && PH_ONE.test(s);
const phKey = (s: string) => s.replace(PH_ALL, '').replace(/\s+/g, ' ').trim().toLowerCase();
export const union = (...lists: string[][]) => {
  const seen = new Set<string>();
  return lists.flat().filter((x) => {
    const k = phKey(x);
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};
const andList = (a: string[]) => (a.length <= 1 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]);
const lowerFirst = (s: string) => (/^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
export const filled = (e: ResumeEntry) => !!(e.title.trim() || e.sub.trim() || e.points.trim());
export const entry = (): ResumeEntry => ({ title: '', sub: '', from: '', to: '', points: '' });
const ACR = /^(ai|ml|hr|ui|ux|ui\/ux|seo|sem|qa|bi|it|sql|aws|mern|mean|nlp|llm|sde|bde|ca|gst|crm|ios|api|php|net)$/i;
const titleCase = (t: string) => t.split(/\s+/).filter(Boolean).map((w) => (ACR.test(w) ? w.toUpperCase().replace('IOS', 'iOS') : w[0].toUpperCase() + w.slice(1))).join(' ');

export function jdCase(jd: string, k: string): string {
  const m = new RegExp(`(^|[^A-Za-z0-9+#])(${escapeRe(k)})(?=$|[^A-Za-z0-9+#])`, 'i').exec(jd);
  const w = m ? m[2] : k;
  return w === w.toLowerCase() ? w.replace(/(^|[\s/-])([a-z])/g, (_, a: string, c: string) => a + c.toUpperCase()) : w;
}
export const jdKeywords = (jd: string) => jobKeywords(jd).map((k) => jdCase(jd, k));

export function inferRole(jd: string): string {
  const t = jd.replace(/\r/g, '');
  const m =
    /^\s*(?:job title|position|role|designation|opening)\s*[:\-–]\s*([^\n|,.(]{3,60})/im.exec(t) ??
    /(?:[Hh]iring|[Ll]ooking for|[Ss]eeking)\s+(?:an?\s+|our\s+(?:next\s+)?)?([A-Z][\w/&+ -]{2,50}?)(?=\s+(?:to|who|with|for|in|at|on)\b|[.,:;\n(])/.exec(t);
  if (m) return m[1].trim();
  const first = t.split('\n').map((l) => l.trim()).find(Boolean) ?? '';
  return first.length <= 60 && !/[.:]$/.test(first) && words(first) <= 7 ? first : '';
}

// What the user typed: a full job post or a short request
export function inputProblem(t: string): string {
  const v = t.trim();
  if (!v) return 'Paste a job description, or type the resume you want, e.g. "Fresher data analyst".';
  if (/^\s*(https?:\/\/|www\.)\S+\s*$/i.test(v)) return 'Paste the text of the job post, not the link.';
  if (!/[a-z]{2,}/i.test(v)) return 'Type a job title or paste the job post, e.g. "Python developer, 2 years experience".';
  return '';
}

export function inputKind(t: string): InputKind {
  const v = t.trim();
  const w = words(v);
  const lines = v.split('\n').filter((l) => l.trim()).length;
  if (w >= 60) return 'jd';
  if (w >= 25 && (lines >= 4 || /responsibilit|requirement|qualification|what you('|’)ll do|must have|we are (looking|hiring)|job description|key skills/i.test(v))) return 'jd';
  return 'prompt';
}

const NUM_WORDS: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
function yearsOf(p: string): number | null {
  const m = /(\d+(?:\.\d+)?|one|two|three|four|five|six|seven|eight|nine|ten)\s*\+?\s*(?:years?|yrs?)\b/i.exec(p);
  if (!m) return null;
  const n = Math.floor(NUM_WORDS[m[1].toLowerCase()] ?? Number(m[1]));
  return n >= 1 ? Math.min(n, 20) : null;
}

export function roleFromPrompt(p: string): string {
  let t = p.replace(/[“”"']/g, ' ').split(/[,.;:!?\n]|\b(?:who|that|having|knowing|skilled|skills?|knows?|experienced in|expert in|good at|in (?:sql|python|java|excel))\b/i)[0] ?? '';
  t = (' ' + t.toLowerCase() + ' ')
    .replace(/\b\d+(\.\d+)?\s*\+?\s*(years?|yrs?)(\s+of)?(\s+(work\s+)?(experience|exp))?\b/g, ' ')
    .replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\s+years?(\s+of)?(\s+(experience|exp))?\b/g, ' ')
    .replace(/\b(please|pls|can you|could you|i want|i need|help me|make|create|build|write|generate|prepare|draft|give me|need|want|new|fresh|good|best|ats|friendly|professional|one[- ]page)\b/g, ' ')
    .replace(/\b(resume|resumes|cv|curriculum vitae|bio-?data)\b/g, ' ')
    .replace(/\b(fresher|freshers|fresh graduate|graduate|entry[- ]level|beginner|student|college)\b/g, ' ')
    .replace(/\b(experience|experienced|exp|job|role|position|post|opening)\b/g, ' ')
    .replace(/\b(a|an|the|my|me|for|of|as|with|in|is|am|i|to|on|at)\b/g, ' ')
    .replace(/[()[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return titleCase(t.split(' ').slice(0, 5).join(' '));
}

const matchRole = (text: string) => ROLES.find((r) => r.match.test(text)) ?? null;
const FIX: Record<string, string> = { Devops: 'DevOps', 'UI UX': 'UI/UX', Mern: 'MERN', Javascript: 'JavaScript', Seo: 'SEO', Ios: 'iOS' };
const fixCase = (t: string) => Object.entries(FIX).reduce((a, [k, v]) => a.replace(new RegExp(`\\b${k}\\b`, 'g'), v), t);
const ALL_SKILLS = [...new Set(ROLES.flatMap((r) => r.skills))].filter((k) => !/^(make|run|reporting|planning)$/i.test(k));

function syntheticJd(role: string, p: RoleProfile, skills: string[], years: number | null, level: Target['level']): string {
  const who = years ? `with ${years}+ years of experience` : level === 'intern' ? 'for an internship' : '(freshers welcome)';
  return [
    `Job title: ${role}`,
    '',
    `We are hiring a ${role} ${who} to join our team.`,
    '',
    'Responsibilities:',
    ...p.duties.map((d) => '- ' + d),
    '',
    'Requirements:',
    `- Skills: ${skills.join(', ')}.`,
    `- Soft skills: ${p.soft.join(', ')}.`,
  ].join('\n');
}

/** Turns the input into a target to write and score against. A short request is expanded into a typical job post for that role. */
export function targetOf(input: string, aiJd?: string): Target {
  const text = input.trim();
  const kind = inputKind(text);
  if (kind === 'jd') {
    const role = inferRole(text);
    const kws = jdKeywords(text);
    const profile = (role && matchRole(role)) || matchRole(text.slice(0, 800)) || genericRole(role || 'Professional', kws);
    return { kind, input: text, role: role || profile.title, years: null, level: /\bintern/i.test(role) ? 'intern' : 'fresher', profile, jd: text, keywords: kws, extra: [] };
  }
  const years = yearsOf(text);
  const level: Target['level'] = years ? 'experienced' : /\bintern/i.test(text) ? 'intern' : 'fresher';
  const asked = roleFromPrompt(text);
  const profile = (asked && matchRole(asked)) || matchRole(text) || genericRole(asked || 'Professional', []);
  const role = fixCase(asked) || profile.title;
  const low = text.toLowerCase();
  const extra = ALL_SKILLS.filter((k) => k.length > 1 && new RegExp(`(^|[^a-z0-9+#])${escapeRe(k.toLowerCase())}($|[^a-z0-9+#])`).test(low));
  const jd = aiJd?.trim() || syntheticJd(role, profile, union(extra, profile.skills), years, level);
  return { kind, input: text, role, years, level, profile, jd, keywords: jdKeywords(jd), extra };
}

// Dates (YYYY-MM)
const ym = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
function gradDates(t: Target, now: Date) {
  const y = now.getFullYear();
  const may = now.getMonth() >= 5 ? new Date(y, 4, 1) : new Date(y - 1, 4, 1);
  const to = t.years ? addMonths(may, -12 * t.years) : t.level === 'intern' ? new Date(may.getFullYear() + 1, 4, 1) : may;
  return { from: ym(addMonths(to, -45)), to: ym(to), end: to > now ? new Date(now.getFullYear(), now.getMonth(), 1) : to };
}

// Courses as projects
const shortTitle = (t: string) => t.split(/[:–|]/)[0].trim();
const VERBS = [
  ['Completed', 'Built', 'Documented', 'practical exercises'],
  ['Trained', 'Analyzed', 'Presented', 'sample use cases'],
  ['Completed', 'Implemented', 'Delivered', 'step-by-step exercises'],
];
function courseProjects(facts: CourseFact[], kws: string[]): ResumeEntry[] {
  const k = (n: number) => (kws.length ? kws[n % kws.length] : 'core skills');
  return facts.slice(0, 3).map((f, i) => {
    const [v1, v2, v3, work] = VERBS[i % VERBS.length];
    const name = shortTitle(f.title);
    const topics = f.topics.length ? f.topics : f.skills;
    const first = f.lessonsDone
      ? `${v1}${v1 === 'Trained' ? ' across' : ''} ${f.lessonsDone} of ${f.lessonsTotal} lessons (${f.progress}%) in the ${name} course, practising ${k(i * 4)} and ${k(i * 4 + 1)} on real tasks.`
      : `Planned a ${f.lessonsTotal}-lesson learning path in ${name}, mapping each module to ${k(i * 4)} and ${k(i * 4 + 1)} work.`;
    return {
      title: `${name} Project`,
      sub: union(f.skills.slice(0, 3), [k(i * 4 + 2)]).join(', ') + ', Takxila AI Academy',
      from: f.from, to: f.to,
      points: [
        first,
        `${v2} ${work} on ${lowerFirst(topics[0] ?? name)}${topics[1] ? ` and ${lowerFirst(topics[1])}` : ''}, applying ${k(i * 4 + 2)} to job-style problems.`,
        `${v3} clear notes and summaries of the results, strengthening ${k(i * 4 + 3)} across ${f.duration || f.lessonsTotal + ' lessons'} of guided practice.`,
      ].join('\n'),
    };
  });
}
const isCourse = (e: ResumeEntry) => /Takxila AI Academy/.test(e.sub);

function templateProjects(t: Target, have: ResumeEntry[], n: number, now: Date): ResumeEntry[] {
  if (n <= 0) return [];
  const { end } = gradDates(t, now);
  const taken = new Set(have.map((e) => e.title.replace(PH_ALL, '').trim().toLowerCase()));
  return t.profile.projects
    .filter((p) => !taken.has(p.title.toLowerCase()))
    .slice(0, n)
    .map((p, i) => ({ title: p.title, sub: p.tools, from: ym(addMonths(end, -4 * i - 4)), to: ym(addMonths(end, -4 * i - 1)), points: p.points.join('\n') }));
}

const PH_LINKS = ['linkedin.com/in/[your-name]', 'github.com/[your-username]', '[your-portfolio-link].com'];
const ensurePh = (line: string) => (hasPh(line) ? line : `${line} [example]`);

/** The user's own data, plus example details for everything that is still empty. */
export function freshBase(cur: ResumeData, user: User, facts: CourseFact[], t: Target, training: string[], now = new Date()): ResumeData {
  const p = t.profile;
  const pick = (v: string | undefined, fb?: string) => (v ?? '').trim() || (fb ?? '').trim();
  const grad = gradDates(t, now);
  const education = cur.education.filter(filled);
  if (!education.length) {
    education.push({
      title: '[Your College Name], [City]', sub: hasPh(p.degree) ? p.degree : `[${p.degree}]`, from: grad.from, to: grad.to,
      points: [`Achieved a CGPA of [8.0] out of 10${t.level === 'intern' ? ' so far' : ''}.`, `Completed coursework in ${p.coursework}.`].join('\n'),
    });
  }
  if (facts.length && !education.some((e) => /Takxila AI Academy/i.test(e.title))) {
    const top = facts.slice(0, 3);
    const froms = top.map((f) => f.from).filter(Boolean).sort();
    const tos = top.map((f) => f.to).filter(Boolean).sort();
    education.push({ title: 'Takxila AI Academy', sub: 'Professional training: ' + top.map((f) => shortTitle(f.title)).join(', '), from: froms[0] ?? '', to: top.every((f) => f.to) ? tos[tos.length - 1] : '', points: '' });
  }
  const work = cur.work.filter(filled);
  if (!work.length && t.years) {
    const two = t.years >= 4;
    const split = two ? Math.ceil(t.years / 2) : t.years;
    work.push({ title: '[Company Name], [City]', sub: t.role, from: ym(addMonths(now, -12 * split)), to: '', points: (two ? p.work.slice(0, 3) : p.work).join('\n') });
    if (two)
      work.push({
        title: '[Previous Company Name], [City]', sub: /^junior/i.test(t.role) ? t.role : `Junior ${t.role}`, from: ym(addMonths(now, -12 * t.years)), to: ym(addMonths(now, -12 * split)),
        points: [p.work[3], `Supported senior team members on [3] key projects, applying ${p.skills[0]} and ${p.skills[1]} every day.`].join('\n'),
      });
  }
  const links = cur.links.map((l) => ({ ...l }));
  const setLink = (label: string, url: string) => {
    const l = links.find((x) => x.label.toLowerCase() === label.toLowerCase());
    if (l) l.url = l.url.trim() || url;
    else links.push({ label, url });
  };
  setLink('LinkedIn', PH_LINKS[0]);
  if (p.link === 'github') setLink('GitHub', PH_LINKS[1]);
  if (p.link === 'portfolio') setLink('Portfolio', PH_LINKS[2]);
  return {
    ...cur,
    name: pick(cur.name, user.name) || '[Your Name]',
    email: pick(cur.email, user.email) || '[your.email@example.com]',
    phone: pick(cur.phone, user.phone) || '[+91 98765 43210]',
    city: pick(cur.city, user.city) || '[Your City], India',
    summary: pick(cur.summary, user.bio),
    links,
    education,
    work,
    projects: cur.projects.filter(filled),
    skills: union(splitList(cur.skills), t.extra, p.skills).join(', '),
    soft: union(splitList(cur.soft), p.soft).join(', '),
    languages: pick(cur.languages, 'English, Hindi'),
    certs: union(splitLines(cur.certs), training, p.certs.map((c) => `${c} [add only if earned]`)).join('\n'),
    achievements: pick(cur.achievements) || p.achievements.join('\n'),
    interests: pick(cur.interests, p.interests),
  };
}

/** Course projects first, then role examples, up to 3 projects. */
export function fillProjects(r: ResumeData, t: Target, facts: CourseFact[], withCourses: boolean, now = new Date()): ResumeData {
  const kws = t.keywords.filter((k) => !t.role.toLowerCase().split(/\s+/).includes(k.toLowerCase()));
  let projects = r.projects.filter(filled);
  if (withCourses && !projects.some(isCourse)) projects = [...projects, ...courseProjects(facts, kws)];
  projects = [...projects, ...templateProjects(t, projects, 3 - projects.length, now)];
  return { ...r, projects };
}

export function localResume(base: ResumeData, t: Target, facts: CourseFact[], now = new Date()): ResumeData {
  const p = t.profile;
  const role = t.role;
  const roleWords = new Set(role.toLowerCase().split(/\s+/));
  const softText = p.soft.join(' ').toLowerCase();
  const skillText = [...p.skills, ...t.extra].join(' ').toLowerCase();
  const kws = union(t.extra, t.kind === 'jd' ? t.keywords : t.keywords.filter((k) => skillText.includes(k.toLowerCase())), p.skills).filter(
    (k) => !roleWords.has(k.toLowerCase()) && !softText.includes(k.toLowerCase()),
  );
  const r = fillProjects(base, t, facts, true, now);
  const top = facts.slice(0, 3);
  const trained = top.length ? `, trained at Takxila AI Academy in ${andList(top.map((f) => shortTitle(f.title)))}` : '';
  const hasWork = r.work.some(filled);
  const opener = t.years
    ? `${role} with ${t.years}+ years of experience in ${andList(kws.slice(0, 5))}${trained}.`
    : hasWork
      ? `${role} with hands-on experience in ${andList(kws.slice(0, 5))}${trained}.`
      : `${t.level === 'intern' ? 'Motivated ' : ''}${role}${trained ? trained + ',' : ''} with hands-on project work in ${andList(kws.slice(0, 5))}.`;
  const summary = [
    opener,
    `Built ${r.projects.length} practical projects using ${andList(kws.slice(5, 10).length ? kws.slice(5, 10) : p.skills.slice(0, 4))}, with measurable results and clear documentation.`,
    `Known for ${andList(p.soft.slice(0, 3).map((x) => x.toLowerCase()))}, and ready to add value to the team from day one.`,
  ].join(' ');
  return {
    ...r,
    role,
    summary,
    skills: union(kws, top.flatMap((f) => f.skills.slice(0, 2)), splitList(base.skills)).slice(0, 26).join(', '),
    soft: union(splitList(base.soft), p.soft).join(', '),
  };
}

// AI answers
export function mergeAi(orig: ResumeData, ai: Partial<ResumeData>): ResumeData {
  const list = (k: ListKey) =>
    orig[k].map((x, i) => {
      const a = Array.isArray(ai[k]) ? (ai[k] as Partial<ResumeEntry>[])[i] : undefined;
      return a && s(a.points) ? { ...x, points: s(a.points) } : x;
    });
  return {
    ...orig,
    role: s(ai.role) || orig.role,
    summary: s(ai.summary) || orig.summary,
    work: list('work'),
    projects: list('projects'),
    education: list('education'),
    skills: union(splitList(s(ai.skills)), splitList(orig.skills)).join(', '),
    soft: union(splitList(s(ai.soft)), splitList(orig.soft)).join(', '),
  };
}

export function mergeGen(base: ResumeData, ai: Partial<ResumeData>, userAchievements: boolean, t: Target, now = new Date()): ResumeData {
  const merged = mergeAi(base, ai);
  const { end } = gradDates(t, now);
  const extra = (Array.isArray(ai.projects) ? (ai.projects as Partial<ResumeEntry>[]) : [])
    .slice(base.projects.length)
    .map((x) => ({ title: s(x.title), sub: s(x.sub), from: s(x.from), to: s(x.to), points: s(x.points) }))
    .filter(filled)
    .map((x) => (isCourse(x) || hasPh(x.title + x.sub + x.points) ? x : { ...x, title: `${x.title} [example]` }))
    .slice(0, 3)
    .map((x, i) => (x.from || isCourse(x) ? x : { ...x, from: ym(addMonths(end, -4 * i - 4)), to: ym(addMonths(end, -4 * i - 1)) }));
  const ach = splitLines(s(ai.achievements)).map(ensurePh);
  return {
    ...merged,
    projects: [...merged.projects, ...extra],
    achievements: !userAchievements && ach.length ? ach.slice(0, 4).join('\n') : merged.achievements,
    interests: s(merged.interests) || s(ai.interests),
  };
}

// Scoring
export const scoreOf = (r: ResumeData, jd: string): AtsResult => scoreResume(docToText(buildDoc(r)), { source: 'builder', jobDescription: jd });
export const tipsOf = (res: AtsResult) => res.checks.filter((c) => c.status !== 'pass').flatMap((c) => c.tips).slice(0, 12);

const KNOWN = new Set(ROLES.flatMap((r) => [...r.skills, ...r.soft]).map((k) => k.toLowerCase()));
/** A tool or skill name, not a plain word such as "deliver": known, multi-word, or written with capitals or symbols in the post. */
function skillLike(jd: string, k: string): boolean {
  if (KNOWN.has(k) || /\s|[+#./\d]/.test(k)) return true;
  const m = new RegExp(`(^|[^A-Za-z0-9+#])(${escapeRe(k)})(?=$|[^A-Za-z0-9+#])`, 'i').exec(jd);
  return !!m && m[2] !== m[2].toLowerCase();
}

/** Adds missing job keywords to Skills: tool names first, plain words only when still needed for the target. */
export function withKeywords(r: ResumeData, jd: string): ResumeData {
  const miss = scoreOf(r, jd).keywords?.missing ?? [];
  const add = (x: ResumeData, ks: string[]) => (ks.length ? { ...x, skills: union(splitList(x.skills), ks.map((k) => jdCase(jd, k))).join(', ') } : x);
  const out = add(r, miss.filter((k) => skillLike(jd, k)));
  const rest = miss.filter((k) => !skillLike(jd, k));
  return rest.length && scoreOf(out, jd).score < ATS_TARGET ? add(out, rest) : out;
}

export function hintOf(r: ResumeData, res: AtsResult): string {
  if (!r.work.some(filled) && !r.projects.some(filled)) return 'Add a project or internship, then create again.';
  const worst = res.checks.filter((c) => c.status !== 'pass' && c.tips.length).sort((a, b) => a.points / a.max - b.points / b.max)[0];
  return worst ? worst.tips[0] : 'Add more detail to your projects or experience, then create again.';
}

// Example (placeholder) tracking
const entryKey = (list: ListKey, e: ResumeEntry) => `${list}:${JSON.stringify([e.title, e.sub, e.from, e.to, e.points])}`;
const lineKey = (field: string, l: string) => `${field}:${l.trim()}`;

/** Keys of the example items in a generated resume, so an untouched example can be told apart from the user's own edits. */
export function examplesOf(r: ResumeData, kept: Record<ListKey, number>, userAchievements: boolean): string[] {
  const keys: string[] = [];
  for (const list of LISTS)
    r[list].forEach((e, i) => {
      if (filled(e) && (i >= kept[list] || hasPh(e.title)) && !(list === 'projects' && isCourse(e)) && !/Takxila AI Academy/i.test(e.title)) keys.push(entryKey(list, e));
    });
  splitLines(r.certs).filter(hasPh).forEach((l) => keys.push(lineKey('certs', l)));
  if (!userAchievements) splitLines(r.achievements ?? '').forEach((l) => keys.push(lineKey('achievements', l)));
  return keys;
}

export const isExampleEntry = (list: ListKey, e: ResumeEntry, ex: ExampleSet) => hasPh(e.title + e.sub + e.points) || ex.has(entryKey(list, e));

/** Drops examples from an earlier run that the user never edited, so a new run can replace them. */
export function dropExamples(r: ResumeData, ex: ExampleSet): ResumeData {
  if (!ex.size) return r;
  const lines = (field: 'certs' | 'achievements') => splitLines(r[field] ?? '').filter((l) => !ex.has(lineKey(field, l))).join('\n');
  const out: ResumeData = { ...r, certs: lines('certs'), achievements: lines('achievements'), links: r.links.map((l) => (PH_LINKS.includes(l.url.trim()) ? { ...l, url: '' } : l)) };
  for (const list of LISTS) out[list] = r[list].filter((e) => !ex.has(entryKey(list, e)));
  return out;
}

const EMPTY_NAME: Record<ListKey, string> = { education: 'your college', work: 'your company', projects: 'project' };
const SECTION: Record<ListKey, string> = { education: 'Education', work: 'Experience', projects: 'Projects' };
const tokens = (v: string) => [...new Set(v.match(PH_ALL) ?? [])].join(' ');

/** Every example detail still in the resume. */
export function placeholderList(r: ResumeData, ex: ExampleSet): Placeholder[] {
  const out: Placeholder[] = [];
  const field = (where: string, v: string | undefined) => v && hasPh(v) && out.push({ where, text: tokens(v) });
  field('Name', r.name);
  field('Phone', r.phone);
  field('Email', r.email);
  field('City', r.city);
  r.links.forEach((l) => l.url.trim() && field(l.label || 'Link', l.url));
  field('Summary', r.summary);
  for (const list of LISTS)
    r[list].forEach((e) => {
      if (!filled(e) || !isExampleEntry(list, e, ex)) return;
      const name = e.title.replace(PH_ALL, '').replace(/^[\s,]+|[\s,]+$/g, '') || e.sub.replace(PH_ALL, '').trim() || EMPTY_NAME[list];
      out.push({ where: `${SECTION[list]}: ${name}`, text: tokens(e.title + ' ' + e.sub + ' ' + e.points) || 'example entry' });
    });
  field('Skills', r.skills);
  splitLines(r.certs).forEach((l) => hasPh(l) && out.push({ where: 'Certifications', text: l }));
  splitLines(r.achievements ?? '').forEach((l) => (hasPh(l) || ex.has(lineKey('achievements', l))) && out.push({ where: 'Achievements', text: l }));
  return out;
}

export const withFormRows = (r: ResumeData): ResumeData => ({
  ...r,
  work: r.work.length ? r.work : [entry()],
  projects: r.projects.length ? r.projects : [entry()],
  education: r.education.length ? r.education : [entry()],
});
