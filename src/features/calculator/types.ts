import { useEffect, useMemo, useRef, useState } from 'react';
import SchoolIcon from '@mui/icons-material/SchoolRounded';
import WorkIcon from '@mui/icons-material/WorkRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded';
import TimerIcon from '@mui/icons-material/TimerRounded';
import BrushIcon from '@mui/icons-material/BrushRounded';
import RocketIcon from '@mui/icons-material/RocketLaunchRounded';
import CelebrationIcon from '@mui/icons-material/CelebrationRounded';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenterRounded';
import StorefrontIcon from '@mui/icons-material/StorefrontRounded';
import VideocamIcon from '@mui/icons-material/VideocamRounded';
import CampaignIcon from '@mui/icons-material/CampaignRounded';
import CodeIcon from '@mui/icons-material/CodeRounded';
import CalculateIcon from '@mui/icons-material/CalculateRounded';
import ViewKanbanIcon from '@mui/icons-material/ViewKanbanRounded';
import PersonSearchIcon from '@mui/icons-material/PersonSearchRounded';
import FamilyIcon from '@mui/icons-material/FamilyRestroomRounded';
import CastEducationIcon from '@mui/icons-material/CastForEducationRounded';
import ToysIcon from '@mui/icons-material/ToysRounded';
import GamesIcon from '@mui/icons-material/SportsEsportsRounded';
import BackpackIcon from '@mui/icons-material/BackpackRounded';
import LaptopIcon from '@mui/icons-material/LaptopMacRounded';
import CafeIcon from '@mui/icons-material/LocalCafeRounded';
import SpaIcon from '@mui/icons-material/SpaRounded';
import ChatIcon from '@mui/icons-material/ChatBubbleRounded';
import RepeatIcon from '@mui/icons-material/EventRepeatRounded';
import SmartToyIcon from '@mui/icons-material/SmartToyRounded';
import ForumIcon from '@mui/icons-material/ForumRounded';
import PsychologyIcon from '@mui/icons-material/PsychologyRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesomeRounded';
import PaletteIcon from '@mui/icons-material/PaletteRounded';
import MovieIcon from '@mui/icons-material/MovieRounded';
import TerminalIcon from '@mui/icons-material/TerminalRounded';
import HubIcon from '@mui/icons-material/HubRounded';
import BlockIcon from '@mui/icons-material/BlockRounded';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouchRounded';
import VisibilityIcon from '@mui/icons-material/VisibilityRounded';
import DataObjectIcon from '@mui/icons-material/DataObjectRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GraphicEqIcon from '@mui/icons-material/GraphicEqRounded';
import InsightsIcon from '@mui/icons-material/InsightsRounded';
import MenuBookIcon from '@mui/icons-material/MenuBookRounded';
import ScheduleIcon from '@mui/icons-material/ScheduleRounded';
import TrophyIcon from '@mui/icons-material/EmojiEventsRounded';
import BoltIcon from '@mui/icons-material/BoltRounded';
import CalendarIcon from '@mui/icons-material/CalendarMonthRounded';
import EventIcon from '@mui/icons-material/EventRounded';
import ExploreIcon from '@mui/icons-material/ExploreRounded';
import GiftIcon from '@mui/icons-material/CardGiftcardRounded';
import SavingsIcon from '@mui/icons-material/SavingsRounded';
import PaymentsIcon from '@mui/icons-material/PaymentsRounded';
import DiamondIcon from '@mui/icons-material/DiamondRounded';
import GroupsIcon from '@mui/icons-material/GroupsRounded';
import { useToast } from '../../context/types';
import { fitsScore, scoreRange } from '../../data/calcScores';
import { CALC_QB, QB } from '../../data/quiz';
import { courseById, scoreCourses, type ScoredCourse } from '../../data/recommend';
import { load, save } from '../../utils/storage';
import type { Answers, Question, Recommendation } from '../../types';

export interface ScoreFactor {
  id: string;
  label: string;
  answer: string;
  points: number;
  max: number;
  reason: string;
}

export interface ScoreBand {
  min: number;
  label: string;
  color: string;
  blurb: string;
}

export interface CalcScore {
  score: number;
  raw: number;
  band: ScoreBand;
  factors: ScoreFactor[];
  answered: number;
}

export const BANDS: ScoreBand[] = [
  { min: 1, label: 'Beginner explorer', color: '#0EA5E9', blurb: 'You are starting out. Short, guided challenges build confidence fast.' },
  { min: 4, label: 'Builder', color: '#16A34A', blurb: 'You know the basics. Tool deep-dives turn AI into real work output.' },
  { min: 7, label: 'Advanced', color: '#F59E0B', blurb: 'You already use AI seriously. Mastery tracks, agents and automation are next.' },
  { min: 9, label: 'AI pro', color: '#A855F7', blurb: 'You build with AI. Go deep on agents, code and full systems.' },
];
export const bandOf = (score: number) => [...BANDS].reverse().find((b) => score >= b.min) ?? BANDS[0];

type Table = Record<string, [number, string]>;
const LEVEL: Table = {
  new: [0, 'Brand new to AI: we start from the very basics.'],
  tried: [0.75, 'Tried a chatbot: ready for guided, hands-on practice.'],
  weekly: [2, 'Weekly AI user: ready for deeper tools and workflows.'],
  build: [3, 'Already building with AI: ready for agents and code.'],
};
const CODING: Table = {
  none: [0, 'No-code paths: every course we suggest works without code.'],
  read: [0.5, 'Reading code helps with no-code builders and automations.'],
  some: [1, 'Small scripts open up automation and API courses.'],
  dev: [1.5, 'Daily coders pick up agents and AI coding tools fast.'],
};
const TIME: Table = {
  lt2: [0, '10–15 minutes a day: quick wins suit you best.'],
  mid: [0.5, '20–40 minutes a day: enough for a full course.'],
  gt5: [1, 'An hour or more a day: you can take on mastery tracks.'],
};
const PROF: Table = {
  dev: [1, 'Developers pick up advanced AI tools quickly.'],
  pm: [0.75, 'Product work means you plan and ship with AI.'],
  finance: [0.75, 'Data-heavy work suits advanced AI use.'],
  pro: [0.75, 'Working professionals apply AI at work right away.'],
  marketer: [0.75, 'Marketers already work with digital tools daily.'],
  biz: [0.5, 'Business owners use AI to save time and grow.'],
  creator: [0.5, 'Creators already use digital tools daily.'],
  teacher: [0.5, 'Teaching means you explain and structure ideas well.'],
  student: [0.25, 'Students learn fast; we build from the basics.'],
  job: [0.25, 'We focus on AI skills recruiters ask for.'],
  parent: [0, 'We pick courses for your child.'],
};
const GOAL: Table = {
  build: [1, 'Building apps needs the most advanced skills.'],
  job: [0.75, 'Career goals need solid, job-ready skills.'],
  grow: [0.75, 'Growing a business needs practical AI systems.'],
  time: [0.75, 'Saving time needs reliable everyday workflows.'],
  create: [0.5, 'Content creation starts with creative AI tools.'],
  fun: [0, 'Learning for fun: no pressure, start simple.'],
};
const TECH_TOPICS: Record<string, string> = { code: 'coding', agents: 'agents and automation' };
const SCORED = ['age', 'level', 'tools', 'coding', 'time', 'prof', 'goal', 'interests'];

const one = (v: Answers[string]) => (Array.isArray(v) ? v[0] : v);
const list = (v: Answers[string]) => (v == null ? [] : Array.isArray(v) ? v : [v]);
const labelFor = (id: string, v: string | undefined) => CALC_QB.find((q) => q.id === id)?.opts.find((o) => o[0] === v)?.[1] ?? '';

function tableFactor(id: string, label: string, table: Table, ans: Answers): ScoreFactor {
  const v = one(ans[id]);
  const row = v ? table[v] : undefined;
  const max = Math.max(...Object.values(table).map((r) => r[0]));
  return { id, label, answer: labelFor(id, v), points: row?.[0] ?? 0, max, reason: row?.[1] ?? 'Not answered yet.' };
}

export function calcScore(ans: Answers): CalcScore {
  const tools = list(ans.tools).filter((t) => t !== 'none');
  const picks = list(ans.interests);
  const tech = picks.filter((p) => TECH_TOPICS[p]);
  const factors: ScoreFactor[] = [
    tableFactor('level', 'AI experience', LEVEL, ans),
    {
      id: 'tools', label: 'Tools used', answer: list(ans.tools).map((t) => labelFor('tools', t)).join(', '),
      points: Math.min(1, tools.length * 0.25), max: 1,
      reason: !list(ans.tools).length ? 'Not answered yet.' : tools.length ? `${tools.length} AI tool${tools.length > 1 ? 's' : ''} already tried.` : 'No tools yet: we start with the essentials.',
    },
    tableFactor('coding', 'Coding comfort', CODING, ans),
    tableFactor('time', 'Daily time', TIME, ans),
    tableFactor('prof', 'Your work', PROF, ans),
    tableFactor('goal', 'Main goal', GOAL, ans),
    {
      id: 'interests', label: 'Topics', answer: picks.map((p) => labelFor('interests', p)).join(', '),
      points: Math.min(0.5, tech.length * 0.25), max: 0.5,
      reason: !picks.length ? 'Not answered yet.' : tech.length ? `Technical topics (${tech.map((t) => TECH_TOPICS[t]).join(', ')}) add to your score.` : 'Creative and business topics: every level welcome.',
    },
  ];

  let raw = 1 + factors.reduce((n, f) => n + f.points, 0);
  const age = one(ans.age);
  if (age) {
    const kid = age === 'kid';
    const teen = age === 'teen';
    const before = raw;
    if (kid) raw = Math.min(raw, 2);
    if (teen) raw -= 0.5;
    factors.unshift({
      id: 'age', label: 'Age group', answer: labelFor('age', age), points: Math.round((raw - before) * 100) / 100, max: 0,
      reason: kid ? 'Ages 8–12: we keep it to kid-friendly courses (score capped at 2).' : teen ? 'Ages 13–17: we start a little gentler.' : 'Adult learner: no change.',
    });
  }
  const score = Math.max(1, Math.min(10, Math.round(raw)));
  const answered = SCORED.filter((k) => list(ans[k]).length).length;
  return { score, raw: Math.round(raw * 100) / 100, band: bandOf(score), factors, answered };
}

// Tag weights from calc-only questions (tools, coding, urgency) that the shared matcher does not know.
const SHARED = new Set(QB.map((q) => q.id));
function scoreCalcCourses(ans: Answers, owned: string[]): ScoredCourse[] {
  const tw: Record<string, number> = {};
  const why: Record<string, string[]> = {};
  CALC_QB.filter((q) => !SHARED.has(q.id)).forEach((q) =>
    list(ans[q.id]).forEach((v) => {
      const o = q.opts.find((x) => x[0] === v);
      Object.entries(o?.[2] ?? {}).forEach(([tg, w]) => {
        tw[tg] = (tw[tg] || 0) + w;
        (why[tg] = why[tg] || []).push(o![1]);
      });
    }),
  );
  return scoreCourses(ans, owned)
    .map((x) => {
      if (x.sc <= -50) return x;
      const hit = x.c.tags.filter((tg) => tw[tg]);
      const rs = [...x.rs];
      hit.forEach((tg) => why[tg].forEach((r) => !rs.includes(r) && rs.push(r)));
      return { ...x, sc: x.sc + hit.reduce((n, tg) => n + tw[tg], 0), rs };
    })
    .sort((a, b) => b.sc - a.sc);
}

function calcRecommend(ans: Answers, owned: string[] = []): Recommendation[] {
  const scored = scoreCalcCourses(ans, owned).filter((x) => x.sc > 0);
  let pick = scored.filter((x) => !x.over).slice(0, 6);
  if (pick.length < 3) pick = pick.concat(scored.filter((x) => x.over).slice(0, 3 - pick.length));
  const top = pick.length ? pick[0].sc : 1;
  return pick.map((x) => ({
    id: x.c.id,
    match: Math.max(55, Math.round(60 + (38 * x.sc) / top)),
    why: (x.over ? ['A little above your budget'] : []).concat(x.rs.slice(0, 2)),
  }));
}

function coursesForScore(ans: Answers, owned: string[], score: number, max = 6): Recommendation[] {
  const fit = scoreCalcCourses(ans, owned).filter((x) => x.sc > -50 && fitsScore(x.c.id, score));
  let pick = fit.filter((x) => !x.over).slice(0, max);
  if (pick.length < 3) pick = pick.concat(fit.filter((x) => x.over).slice(0, 3 - pick.length));
  const top = Math.max(1, ...pick.map((x) => x.sc));
  return pick.map((x) => {
    const [lo, hi] = scoreRange(x.c.id);
    return {
      id: x.c.id,
      match: Math.max(55, Math.round(60 + (38 * Math.max(0, x.sc)) / top)),
      why: [lo === hi ? `For score ${lo}` : `For scores ${lo}–${hi}`].concat(x.over ? ['A little above your budget'] : x.rs.slice(0, 1)),
    };
  });
}

export const SCORE_KEY = 'score';
export const withScore = (ans: Answers): Answers => ({ ...ans, [SCORE_KEY]: String(calcScore(ans).score) });

export function useAnimatedNumber(target: number, ms = 900) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      from.current = target;
      setV(target);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const val = a + (target - a) * (1 - Math.pow(1 - p, 3));
      setV(val);
      from.current = val;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

type Icon = typeof SchoolIcon;
export interface OptionLook {
  icon: Icon;
  color: string;
}
const HUES = ['#6366F1', '#0EA5E9', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#EF4444', '#14B8A6'];
const ICONS: Record<string, Record<string, Icon>> = {
  goal: { job: WorkIcon, grow: TrendingUpIcon, time: TimerIcon, create: BrushIcon, build: RocketIcon, fun: CelebrationIcon },
  prof: {
    student: SchoolIcon, pro: BusinessCenterIcon, biz: StorefrontIcon, creator: VideocamIcon, marketer: CampaignIcon, dev: CodeIcon,
    finance: CalculateIcon, pm: ViewKanbanIcon, job: PersonSearchIcon, parent: FamilyIcon, teacher: CastEducationIcon,
  },
  age: { kid: ToysIcon, teen: GamesIcon, young: BackpackIcon, adult: LaptopIcon, senior: CafeIcon },
  level: { new: SpaIcon, tried: ChatIcon, weekly: RepeatIcon, build: SmartToyIcon },
  tools: { chatgpt: ForumIcon, claude: PsychologyIcon, gemini: AutoAwesomeIcon, image: PaletteIcon, video: MovieIcon, code: TerminalIcon, auto: HubIcon, none: BlockIcon },
  coding: { none: DoNotTouchIcon, read: VisibilityIcon, some: DataObjectIcon, dev: TerminalIcon },
  interests: {
    chat: ForumIcon, code: CodeIcon, agents: SmartToyIcon, wa: WhatsAppIcon, mkt: CampaignIcon, design: PaletteIcon, video: MovieIcon,
    audio: GraphicEqIcon, career: WorkIcon, money: InsightsIcon, research: MenuBookIcon, biz: StorefrontIcon,
  },
  time: { lt2: TimerIcon, mid: ScheduleIcon, gt5: RocketIcon },
  style: { daily: TrophyIcon, self: MenuBookIcon, quick: BoltIcon },
  urgency: { week: BoltIcon, month: CalendarIcon, quarter: EventIcon, relax: ExploreIcon },
  budget: { free: GiftIcon, '299': SavingsIcon, '499': PaymentsIcon, any: DiamondIcon },
};
export const lookOf = (qid: string, v: string, i: number): OptionLook => ({ icon: ICONS[qid]?.[v] ?? AutoAwesomeIcon, color: HUES[i % HUES.length] });

export const INFO_HUES = ['#6366F1', '#EC4899', '#10B981', '#F59E0B'];
export interface Insight {
  id: string;
  kick: string;
  title: string;
  text: string;
  icons: Icon[];
}
const INSIGHTS: Record<string, (a: Answers) => Insight> = {
  age: () => ({
    id: 'company', kick: 'GOOD TO KNOW', title: "You're in good company",
    text: '1,200+ learners started their AI journey with this exact quiz. Most began with zero experience.', icons: [GroupsIcon, SchoolIcon, WorkIcon, CelebrationIcon],
  }),
  coding: (a) =>
    one(a.coding) === 'none' || one(a.coding) === 'read'
      ? { id: 'nocode', kick: 'NO CODE NEEDED', title: 'Code is optional here', text: 'Most of our courses use ready-made AI tools. You build real things with prompts, clicks and templates.', icons: [AutoAwesomeIcon, PaletteIcon, HubIcon, ChatIcon] }
      : { id: 'code', kick: 'NICE', title: 'Coding skills go a long way with AI', text: 'You can go further with agents, automations and AI coding tools. We will point you to the deeper tracks.', icons: [TerminalIcon, SmartToyIcon, HubIcon, RocketIcon] },
  style: (a) => ({
    id: 'habit', kick: 'SMALL STEPS, BIG RESULTS', title: one(a.time) === 'lt2' ? '15 minutes a day is enough' : 'Your time adds up fast',
    text: 'Learners who practise a little every day are far more likely to finish a course than those who cram once a week.', icons: [TimerIcon, TrendingUpIcon, TrophyIcon, BoltIcon],
  }),
};

export type Screen = { kind: 'q'; q: Question; n: number } | { kind: 'info'; info: Insight };
export type Phase = 'quiz' | 'analysing' | 'lead' | 'result';

export const ANALYSE_STEPS = ['Reading your goals and role', 'Checking your AI and coding experience', 'Matching courses to your score', 'Building your learning plan'];
const GOAL_LINE: Record<string, string> = {
  job: 'land that job or promotion', grow: 'grow your business with AI', time: 'win back hours at work', create: 'create standout content',
  build: 'build your first AI product', fun: 'have fun learning AI',
};

const reduced = () =>
  typeof window !== 'undefined' && (document.documentElement.classList.contains('tx-reduce') || !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

function screensFor(ans: Answers): Screen[] {
  const out: Screen[] = [];
  CALC_QB.forEach((q, i) => {
    out.push({ kind: 'q', q, n: i + 1 });
    const ins = INSIGHTS[q.id];
    if (ins) out.push({ kind: 'info', info: ins(ans) });
  });
  return out;
}

const CALC_KEY = 'calc';
const LEAD_KEY = 'calc_lead';

export function useCalcFunnel() {
  const toast = useToast();
  const [calc, setCalc] = useState<Answers | null>(() => load<Answers | null>(CALC_KEY, null));
  const [phase, setPhase] = useState<Phase>(() => (calc ? 'result' : 'quiz'));
  const [idx, setIdx] = useState(0);
  const [ans, setAns] = useState<Answers>({});
  const [flash, setFlash] = useState<string | null>(null);
  const [pct, setPct] = useState(0);
  const lock = useRef(false);
  const headRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  const screens = useMemo(() => screensFor(ans), [ans]);
  const screen = screens[Math.min(idx, screens.length - 1)];
  const total = CALC_QB.length;
  const qNum = screens.slice(0, idx + 1).filter((s) => s.kind === 'q').length;

  useEffect(() => {
    if (!moved.current) return;
    headRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
  }, [idx, phase]);

  const go = (i: number) => {
    moved.current = true;
    setFlash(null);
    setIdx(i);
  };
  const finish = (a: Answers) => {
    const saved = withScore(a);
    setCalc(saved);
    save(CALC_KEY, saved);
    moved.current = true;
    setPct(0);
    setPhase('analysing');
  };
  const advance = (a: Answers) => (idx + 1 >= screens.length ? finish(a) : go(idx + 1));

  useEffect(() => {
    if (phase !== 'analysing') return;
    const ms = reduced() ? 500 : 3400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / ms) * 100);
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => setPhase(load<boolean>(LEAD_KEY, false) ? 'result' : 'lead'), reduced() ? 0 : 450);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const q = screen.kind === 'q' ? screen.q : null;
  const cur = q ? ans[q.id] : undefined;
  const isOn = (v: string) => (q?.multi ? list(cur).includes(v) : cur === v || flash === v);
  const pick = (v: string) => {
    if (!q || lock.current) return;
    if (q.multi) {
      const now = list(cur);
      const on = now.includes(v);
      let next = on ? now.filter((x) => x !== v) : now.concat(v);
      if (!on && v === 'none') next = ['none'];
      else if (!on) next = next.filter((x) => x !== 'none');
      if (!on && q.max && next.length > q.max) return toast(`Pick up to ${q.max}. Unselect one first.`, 'info');
      setAns({ ...ans, [q.id]: next });
      return;
    }
    const a = { ...ans, [q.id]: v };
    setAns(a);
    setFlash(v);
    lock.current = true;
    setTimeout(() => {
      lock.current = false;
      advance(a);
    }, reduced() ? 0 : 320);
  };
  const canContinue = screen.kind === 'info' || (!!q && list(cur).length > 0);
  const cont = () => {
    if (!canContinue) return toast('Pick at least one answer to continue.', 'info');
    advance(ans);
  };
  const back = () => {
    let i = idx - 1;
    while (i > 0 && screens[i].kind === 'info') i--;
    if (i >= 0) go(i);
  };
  const retakeQuiz = () => {
    moved.current = true;
    setAns({});
    setIdx(0);
    setPhase('quiz');
  };

  const result = useMemo(() => (calc ? calcScore(calc) : null), [calc]);
  const recs = useMemo(() => (calc ? calcRecommend(calc) : []), [calc]);
  const scoreRecs = useMemo(() => (calc && result ? coursesForScore(calc, [], result.score) : []), [calc, result]);
  const goalLine = GOAL_LINE[one(calc?.goal) ?? ''] ?? 'master AI';
  const doneSteps = Math.floor(pct / (100 / ANALYSE_STEPS.length));

  const leadExtra = () => ({
    'AI score': result ? `${result.score}/10 (${result.band.label})` : '',
    Goal: labelFor('goal', one(calc?.goal)),
    Role: labelFor('prof', one(calc?.prof)),
    Budget: labelFor('budget', one(calc?.budget)),
    Topics: list(calc?.interests).map((v) => labelFor('interests', v)).join(', '),
    'Recommended courses': [...new Set([...scoreRecs, ...recs].map((r) => courseById(r.id)?.title).filter(Boolean))].slice(0, 6).join('; '),
  });
  const showResult = (sent: boolean) => {
    if (sent) save(LEAD_KEY, true);
    moved.current = true;
    setPhase('result');
  };

  return {
    phase, screen, idx, qNum, total, progress: phase === 'quiz' ? ((qNum - (screen.kind === 'q' ? 1 : 0)) / total) * 100 : 100,
    ans, isOn, pick, cont, canContinue, back, canBack: idx > 0, headRef, pct, doneSteps,
    calc, result, recs, scoreRecs, goalLine, retake: retakeQuiz, leadExtra, showResult,
  };
}
export type CalcFunnel = ReturnType<typeof useCalcFunnel>;
