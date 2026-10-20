import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { SvgIconComponent } from '@mui/icons-material';
import BuildIcon from '@mui/icons-material/Construction';
import PublicIcon from '@mui/icons-material/Public';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/PhoneOutlined';
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import LeaderboardIcon from '@mui/icons-material/LeaderboardOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GradingIcon from '@mui/icons-material/GradingOutlined';
import CalculateIcon from '@mui/icons-material/CalculateOutlined';
import QuizIcon from '@mui/icons-material/QuizOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAddAlt';
import TranslateIcon from '@mui/icons-material/Translate';
import SupportAgentIcon from '@mui/icons-material/SupportAgentOutlined';
import CheckIcon from '@mui/icons-material/Check';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideoOutlined';
import ViewListIcon from '@mui/icons-material/ViewListOutlined';
import AssignmentIcon from '@mui/icons-material/AssignmentOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphoneOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { LEARNERS } from '../config/marketing';
import { SITE, TEL_HREF, MAILTO_HREF, whatsappLink } from '../config/site';
import { CAT_PILLS, COURSES, GROUP_PILLS } from '../data/courses';
import type { CourseContent } from '../data/courseContent';
import { courseById } from '../data/recommend';
import { hoursOf, PAID } from '../data/showcase';
import { enrollUrl, registerUrl } from '../utils/links';
import type { CatFilter, Course } from '../types';

type IconType = SvgIconComponent;

// Home

export const HERO_WORDS = ['ChatGPT', 'Claude AI', 'AI Agents', 'Midjourney', 'Kling AI', 'n8n automation', 'AI filmmaking'];
export const ORBIT = ['claude-code', 'agentic', 'mj-advanced', 'film-3', 'meta-ads', 'wa-agent'];
export const FREE_COURSE = 'wa-agent';

const totalHours = () => Math.round(COURSES.reduce((a, c) => a + hoursOf(c), 0));
export const minPrice = () => Math.min(...PAID.map((c) => c.price));

export const heroStats = (): [number, string, string, string][] => [
  [COURSES.length, '', '', 'Courses'],
  [totalHours(), '', '+', 'Hours of learning'],
  [minPrice(), '₹', '', 'Courses from'],
];

export const proofStats = (): [number, string, string, string][] => [
  [LEARNERS, '', '+', 'Learners started with our quiz'],
  [COURSES.length, '', '', 'Practical AI courses'],
  [COURSES.filter((c) => c.price === 0).length, '', '', 'Free starter courses'],
  [totalHours(), '', '+', 'Hours of practical learning'],
];

export const BENTO: { icon: IconType; title: string; text: string; span: number; color: string }[] = [
  { icon: PlayCircleIcon, title: 'Summary video on every course', text: 'Watch a short preview before you buy, right from the course card.', span: 2, color: '#5B7CFF' },
  { icon: GradingIcon, title: 'Grades for every lesson', text: 'A grade report like a real LMS, updated as you learn.', span: 1, color: '#2EBD85' },
  { icon: WorkspacePremiumIcon, title: 'Certificates', text: 'Finish a course and download a certificate with a unique ID.', span: 1, color: '#F5B93F' },
  { icon: LeaderboardIcon, title: 'Leaderboard', text: 'See where your learning hours rank this week and overall.', span: 1, color: '#C25BFF' },
  { icon: LocalFireDepartmentIcon, title: 'Learning streaks', text: 'Keep the flame alive with a daily streak calendar.', span: 1, color: '#FF8A3D' },
  { icon: TranslateIcon, title: 'Learn in your language', text: 'Menus in 18 languages and regional-language challenges.', span: 1, color: '#FF6B8B' },
  { icon: SupportAgentIcon, title: '1:1 mentor help', text: 'Stuck on a lesson? Ask a mentor on email or WhatsApp.', span: 1, color: '#21B8D6' },
  { icon: CalculateIcon, title: 'AI course finder', text: 'Answer 11 quick questions and get your AI score and course plan.', span: 2, color: '#7C8CFF' },
];

export const JOURNEY: { title: string; body: string; Icon: IconType }[] = [
  { title: 'Find your course', body: 'Take the free AI course finder or browse every course with its summary video.', Icon: QuizIcon },
  { title: 'Create your free account', body: 'Register on the Takxila AI Academy in seconds and start a free course straight away.', Icon: PersonAddIcon },
  { title: 'Learn and earn your certificate', body: 'Finish lessons and projects at your pace, keep your streak and download a verifiable certificate.', Icon: WorkspacePremiumIcon },
];

export function useCourseShowcase() {
  const nav = useNavigate();
  const [cat, setCat] = useState<(typeof GROUP_PILLS)[number][0] | 'all'>('all');
  const list = useMemo(() => COURSES.filter((c) => cat === 'all' || c.group === cat), [cat]);
  return { cat, setCat, list, shown: list.slice(0, 12), open: (c: Course) => nav('/course/' + c.id) };
}

export function useChallenge() {
  const c = courseById('mastery-28')!;
  const off = c.was ? Math.round((1 - c.price / c.was) * 100) : 0;
  return { c, off, href: enrollUrl(c, 'home_challenge') };
}

export const homeLinks = () => ({ register: registerUrl('home_hero'), free: enrollUrl(courseById(FREE_COURSE)!, 'home_free'), closing: registerUrl('home_closing') });

// Courses

export type SortKey = 'popular' | 'low' | 'high' | 'az';
export const SORTS: Record<SortKey, string> = { popular: 'Most popular', low: 'Price: low to high', high: 'Price: high to low', az: 'Title: A to Z' };
export const PAGE_SIZE = 12;

const SORTERS: Record<SortKey, (a: Course, b: Course) => number> = {
  popular: (a, b) => Number(b.featured) - Number(a.featured),
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  az: (a, b) => a.title.localeCompare(b.title),
};

export function useCourses() {
  const pills: [CatFilter, string][] = [['all', 'All courses'], ...GROUP_PILLS, ['free', 'Free']];
  const counts = COURSES.reduce<Record<string, number>>((a, c) => ({ ...a, [c.group]: (a[c.group] || 0) + 1, ...(c.price === 0 && { free: (a.free || 0) + 1 }), all: (a.all || 0) + 1 }), {});
  const [params, setParams] = useSearchParams();
  const raw = params.get('cat') || 'all';
  const cat = (pills.some(([id]) => id === raw) ? raw : 'all') as CatFilter;
  const sort = ((params.get('sort') || 'popular') in SORTERS ? params.get('sort') || 'popular' : 'popular') as SortKey;
  const page = Math.max(1, Number(params.get('page')) || 1);
  const [q, setQ] = useState(params.get('q') || '');
  const dq = useDeferredValue(q.toLowerCase().trim());

  const list = useMemo(() => {
    const words = dq.split(/\s+/).filter(Boolean);
    return COURSES.filter((c) => (cat === 'all' || (cat === 'free' ? c.price === 0 : c.group === cat)) && words.every((w) => c.search.includes(w))).sort(SORTERS[sort]);
  }, [cat, sort, dq]);

  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const cur = Math.min(page, pages);
  const shown = useMemo(() => list.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE), [list, cur]);

  const setParam = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v == null || v === '' ? next.delete(k) : next.set(k, v)));
    setParams(next, { replace: true });
  };
  useEffect(() => {
    const t = setTimeout(() => setParam({ q: q.trim() || null, page: q.trim() === (params.get('q') || '') ? params.get('page') : null }), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const pickCat = (id: CatFilter) => setParam({ cat: id === 'all' ? null : id, page: null });
  const pickSort = (v: string) => setParam({ sort: v === 'popular' ? null : v, page: null });
  const goPage = (p: number) => {
    setParam({ page: p === 1 ? null : String(p) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const first = (cur - 1) * PAGE_SIZE + 1;
  const countText = list.length ? `Showing ${first}–${Math.min(cur * PAGE_SIZE, list.length)} of ${list.length}` : '0 courses';
  return { pills, counts, cat, sort, q, setQ, list, shown, pages, cur, countText, stale: q.toLowerCase().trim() !== dq, pickCat, pickSort, goPage, clear: () => (setQ(''), pickCat('all')) };
}

// Course

export const COURSE_CONFIG = { lastUpdated: '10/2026', initialSectionsCount: 10 } as const;
type FeatureIcon = typeof CheckIcon;

const catName = (c: Course) => CAT_PILLS.find(([id]) => id === c.cat)?.[1] ?? '';

export const fmtLen = (min: number) => (min < 60 ? `${min}min` : `${Math.floor(min / 60)}h${min % 60 ? ` ${min % 60}m` : ''}`);
export const fmtClock = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

export const relatedTopics = (c: Course) =>
  Array.from(new Set([c.catLabel.split(' - ')[0], catName(c), ...c.tags.slice(0, 3).map((t) => t[0].toUpperCase() + t.slice(1))]));

let contentPromise: Promise<Record<string, CourseContent>> | null = null;
const loadContent = () => (contentPromise ??= import('../data/courseContent').then((m) => m.CONTENT));

function useCourseContent(c: Course | undefined) {
  const [all, setAll] = useState<Record<string, CourseContent> | null>(null);
  useEffect(() => {
    let live = true;
    void loadContent().then((m) => live && setAll(m));
    return () => {
      live = false;
    };
  }, []);
  return useMemo(() => {
    if (!all || !c) return undefined;
    return all[c.id] ?? { subtitle: c.short, learn: c.learn, sections: [], requirements: [], audience: [], description: [c.desc] };
  }, [all, c]);
}

function relatedTo(c: Course, n: number): Course[] {
  const tags = new Set(c.tags);
  return COURSES.filter((x) => x.id !== c.id)
    .map((x) => ({ x, s: (x.group === c.group ? 3 : 0) + x.tags.filter((t) => tags.has(t)).length + (x.featured ? 0.5 : 0) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map(({ x }) => x);
}

export function useCourseDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const c = id ? courseById(id) : undefined;
  const content = useCourseContent(c);

  const { minutes, lectureCount } = useMemo(() => {
    let mins = 0;
    let count = 0;
    for (const section of content?.sections ?? []) {
      count += section.lectures.length;
      for (const lecture of section.lectures) mins += lecture[1];
    }
    return { minutes: mins, lectureCount: count };
  }, [content]);

  const related = useMemo(() => (c ? relatedTo(c, 5) : []), [c]);
  const courseFeatures: (readonly [FeatureIcon, string])[] = c
    ? [
        [OndemandVideoIcon, (minutes ? fmtLen(minutes) : c.meta[0]) + ' of on-demand video'],
        [PhoneIphoneIcon, 'Access on mobile, laptop and TV'],
        [ViewListIcon, content?.sections.length ? `${content.sections.length} sections · ${lectureCount} lectures` : c.meta[1] ?? c.learn.length + ' modules'],
        [EmojiEventsIcon, 'Certificate of completion'],
        [AssignmentIcon, 'Hands-on projects and practice tasks'],
        [AllInclusiveIcon, 'Learn at your own pace, anytime'],
      ]
    : [];
  const features = content?.includes?.length ? content.includes.map((text) => [CheckIcon, text] as const) : courseFeatures;
  const searchTopic = (t: string) => nav('/courses?q=' + encodeURIComponent(t.toLowerCase()));

  return {
    c, content, minutes, lectureCount, related, features, searchTopic,
    enroll: c ? enrollUrl(c, 'course_page') : '',
    allAccess: registerUrl('course_all_access'),
    back: () => nav('/courses'),
  };
}

export function useCurriculum(content: CourseContent) {
  const [open, setOpen] = useState<number[]>([0]);
  const [showAll, setShowAll] = useState(false);
  const totalSections = content.sections.length;
  const allOpen = open.length === totalSections;
  const shown = showAll ? content.sections : content.sections.slice(0, COURSE_CONFIG.initialSectionsCount);
  const toggleAll = () => {
    setShowAll(true);
    setOpen(allOpen ? [] : content.sections.map((_, i) => i));
  };
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
  const hidden = showAll ? 0 : Math.max(0, totalSections - COURSE_CONFIG.initialSectionsCount);
  return { open, totalSections, allOpen, shown, toggleAll, toggle, hidden, showMore: () => setShowAll(true) };
}

export function useDescription() {
  const [more, setMore] = useState(false);
  return { more, toggle: () => setMore((m) => !m) };
}

// Info (About, Contact, Policies, NotFound)

export const ABOUT_PILLARS: [SvgIconComponent, string, string][] = [
  [BuildIcon, 'Hands-on projects', 'Learn by doing, not just watching.'],
  [PublicIcon, 'Real-world use cases', 'Apply AI in work, business and life.'],
  [ScheduleIcon, 'Learn at your own pace', 'Anytime, anywhere, on any device.'],
];

export const CONTACT_INFO: [SvgIconComponent, string, string][] = [
  [EmailIcon, SITE.supportEmail, MAILTO_HREF],
  [CallIcon, SITE.phoneDisplay, TEL_HREF],
  [WhatsAppIcon, 'WhatsApp ' + SITE.phoneDisplay, whatsappLink('Hi Takxila, I have a question about your AI courses.')],
];

export const POLICIES: [id: string, title: string, paras: string[]][] = [
  ['privacy', 'Privacy policy', [
    'When you fill in a form on this website (contact, AI course finder, free roadmap or newsletter) we receive the details you type: your name, email address, phone number if you give it, your message and your quiz answers.',
    'We use them only to reply to you, send what you asked for, and tell you about Takxila AI Academy courses and offers. You can ask us to stop or to delete your details at any time by writing to ' + SITE.supportEmail + '.',
    'We do not sell your details. Forms are delivered by email through Google Apps Script or FormSubmit. If analytics is switched on, Google Analytics and the Meta Pixel may set cookies to measure visits and ads.',
  ]],
  ['terms', 'Terms of use', [
    'This website describes the courses of Takxila AI Academy. Accounts, payments and course access are provided on the academy site, under its own terms of use.',
    'Prices and offers shown here can change. The price shown at checkout on the academy is the one that applies.',
  ]],
  ['refund', 'Refund policy', [
    'Course purchases are made on the Takxila AI Academy and follow the refund policy published there. For help with an order, contact ' + SITE.supportEmail + ' or WhatsApp ' + SITE.phoneDisplay + '.',
  ]],
];
