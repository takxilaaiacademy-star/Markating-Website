import {
  createContext, useContext, useEffect, useMemo, useRef, useState,
  type ChangeEvent, type FormEvent, type MouseEvent, type ReactNode,
} from 'react';
import { useMediaQuery, type ContainerProps, type SxProps } from '@mui/material';
import type { ResponsiveStyleValue } from '@mui/system';
import { useTheme, type Theme } from '@mui/material/styles';
import type { SvgIconComponent } from '@mui/icons-material';
import SmartToyIcon from '@mui/icons-material/SmartToyOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MovieIcon from '@mui/icons-material/MovieCreationOutlined';
import ImageIcon from '@mui/icons-material/ImageOutlined';
import BrushIcon from '@mui/icons-material/BrushOutlined';
import CampaignIcon from '@mui/icons-material/CampaignOutlined';
import TableChartIcon from '@mui/icons-material/TableChartOutlined';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ChatIcon from '@mui/icons-material/ChatOutlined';
import WebIcon from '@mui/icons-material/WebOutlined';
import WorkIcon from '@mui/icons-material/WorkOutline';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCareOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountTreeIcon from '@mui/icons-material/AccountTreeOutlined';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import FaceIcon from '@mui/icons-material/FaceRetouchingNatural';
import SearchIcon from '@mui/icons-material/Search';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import LeaderboardIcon from '@mui/icons-material/LeaderboardOutlined';
import PaymentsIcon from '@mui/icons-material/PaymentsOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import BuildIcon from '@mui/icons-material/BuildOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgentOutlined';
import { useLocation } from 'react-router-dom';
import { OFFER, SOCIAL_LINKS } from '../config/marketing';
import { useThemeMode, useToast } from '../context/types';
import { COURSES } from '../data/courses';
import { lessonsFor } from '../data/curriculum';
import { courseById, plan } from '../data/recommend';
import { ALL_ACCESS_PRICE, PACKS, PAID, howItWorks, listPrice, packList, type Pack, type PackGroup } from '../data/showcase';
import promos from '../data/promos.json';
import { EMAIL_RE, phoneOk, sendLead } from '../utils/leads';
import { enrollUrl, mainUrl, registerUrl } from '../utils/links';
import { applySiteLanguage, savedLanguage } from '../utils/siteTranslate';
import { load, save } from '../utils/storage';
import type { CatId, Course, Lang, LeadSource, Recommendation } from '../types';

// Shared helpers

export const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

export const reduced = () =>
  typeof window !== 'undefined' &&
  (document.documentElement.classList.contains('tx-reduce') || window.matchMedia('(prefers-reduced-motion: reduce)').matches);

export const asArray = (sx?: SxProps<Theme>) => (Array.isArray(sx) ? sx : [sx]);

export const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s|·\s)\S/g, (x) => x.toUpperCase());

// Layout

export const NAV_LINKS: [label: string, to: string][] = [
  ['Home', '/'],
  ['Courses', '/courses'],
  ['AI Course Finder', '/ai-course-finder'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export function useHeader() {
  const { mode, toggleMode } = useThemeMode();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [langEl, setLangEl] = useState<HTMLElement | null>(null);
  const [lang, setLang] = useState<Lang>(savedLanguage);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setDrawer(false), [pathname]);
  const pickLang = (l: Lang) => {
    setLangEl(null);
    setLang(l);
    applySiteLanguage(l);
  };
  const active = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));
  return { mode, toggleMode, scrolled, drawer, setDrawer, langEl, setLangEl, lang, pickLang, active, registerHref: registerUrl('header_register') };
}

export function useLayoutEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  useEffect(() => {
    const lang = savedLanguage();
    if (lang !== 'en') applySiteLanguage(lang);
  }, []);
}

const OFFER_KEY = 'offer_closed';
const offerLive = () => OFFER.show && (!OFFER.endsOn || new Date(OFFER.endsOn + 'T23:59:59') >= new Date());

export function useOfferBar() {
  const [open, setOpen] = useState(() => offerLive() && !load<boolean>(OFFER_KEY, false, sessionStorage));
  const close = () => {
    setOpen(false);
    save(OFFER_KEY, true, sessionStorage);
  };
  return { open, close, offer: OFFER, href: mainUrl(OFFER.href, 'offer_bar') };
}

export function useStickyCta() {
  const { pathname } = useLocation();
  const course = pathname.startsWith('/course/') ? courseById(pathname.split('/')[2] ?? '') : undefined;
  const hidden = pathname.startsWith('/ai-course-finder');
  return {
    hidden,
    label: course ? (course.price ? 'Enroll now · ' + fmt(course.price) : 'Enroll free') : 'Start learning free',
    href: course ? enrollUrl(course, 'sticky') : registerUrl('sticky_register'),
  };
}

// Footer

const SOCIAL_ICONS = { Facebook: FacebookIcon, Instagram: InstagramIcon, YouTube: YouTubeIcon, LinkedIn: LinkedInIcon, X: XIcon };
export const SOCIAL = SOCIAL_LINKS.map(([label, url]) => [label, url, SOCIAL_ICONS[label]] as const);

export type FooterCol = [head: string, links: [label: string, to: string][]];
export const FOOTER_COLS: FooterCol[] = [
  ['Explore', [['All courses', '/courses'], ['AI Challenges', '/courses?cat=challenge'], ['AI Agents', '/courses?cat=agents'], ['AI Career Accelerator', '/courses?cat=career'], ['AI Filmmaking', '/courses?cat=film']]],
  ['Company', [['Home', '/'], ['AI Course Finder', '/ai-course-finder'], ['About us', '/about'], ['Contact us', '/contact']]],
  ['Legal', [['Privacy policy', '/policies#privacy'], ['Terms of use', '/policies#terms'], ['Refund policy', '/policies#refund']]],
];

// LeadForm

export type LeadField = 'name' | 'email' | 'phone' | 'message';
export type LeadValues = Record<LeadField, string> & { website: string };
export type LeadErrors = Partial<Record<LeadField, string>>;

export interface LeadFormProps {
  source: LeadSource;
  fields: LeadField[];
  required?: LeadField[];
  cta: string;
  done: string;
  extra?: () => Record<string, string>;
  onSent?: (v: LeadValues) => void;
  dense?: boolean;
  testId?: string;
}

const EMPTY: LeadValues = { name: '', email: '', phone: '', message: '', website: '' };

export function validateLead(v: LeadValues, fields: LeadField[], required: LeadField[]): LeadErrors {
  const e: LeadErrors = {};
  const need = (k: LeadField) => fields.includes(k) && required.includes(k);
  if (need('name') && v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (fields.includes('email') && !EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (fields.includes('phone') && (need('phone') || v.phone.trim()) && !phoneOk(v.phone)) e.phone = 'Please enter a 10-digit mobile number.';
  if (need('message') && v.message.trim().length < 5) e.message = 'Please write a short message.';
  return e;
}

export function useLeadForm({ source, fields, required = ['name', 'email'], done, extra, onSent }: LeadFormProps) {
  const toast = useToast();
  const [v, setV] = useState<LeadValues>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: keyof LeadValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setV((s) => ({ ...s, [k]: value }));
    if (k !== 'website') setErrors((s) => ({ ...s, [k]: undefined }));
  };
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const errs = validateLead(v, fields, required);
    setErrors(errs);
    if (Object.keys(errs).length) return toast('Please fix the highlighted fields.', 'warning');
    if (v.website) {
      setSent(true);
      return toast(done);
    }
    setBusy(true);
    try {
      await sendLead({
        source,
        name: v.name.trim() || 'Website visitor',
        email: v.email.trim(),
        phone: v.phone.trim() || undefined,
        message: v.message.trim() || undefined,
        extra: extra?.(),
      });
      setSent(true);
      toast(done);
      onSent?.(v);
      setV(EMPTY);
    } catch {
      toast('We could not send that just now. Please try again, or message us on WhatsApp.', 'error');
    } finally {
      setBusy(false);
    }
  };
  return { v, set, errors, busy, sent, submit, again: () => setSent(false) };
}

// CourseCard

export function useCourseCard(c: Course) {
  const preview = usePreview();
  return { preview: () => preview(c.id), href: enrollUrl(c, 'card'), label: c.price === 0 ? 'Enroll free' : 'Enroll now' };
}

// CourseIcon

const ICON_BY_ID: Record<string, SvgIconComponent> = {
  'wa-agent': WhatsAppIcon, 'wa-mastery': WhatsAppIcon, junior: ChildCareIcon, 'claude-code': CodeIcon, 'claude-excel': TableChartIcon,
  perplexity: TravelExploreIcon, lovable: WebIcon, 'nocode-web': WebIcon, 'canva-ai': BrushIcon, 'ai-finance': ShowChartIcon,
  'ai-pm': AccountTreeIcon, 'ai-projects': AccountTreeIcon, 'ai-seo': SearchIcon, 'gads-mastery': AdsClickIcon, 'gads-setup': AdsClickIcon,
  'meta-ads': CampaignIcon, 'ai-marketing': CampaignIcon, portfolio: WorkIcon, 'job-agent': WorkIcon, 'film-4': GraphicEqIcon,
  'film-9': GraphicEqIcon, 'film-5': FaceIcon, 'kling-master': VideocamIcon, 'kling-basics': VideocamIcon, 'mj-advanced': ImageIcon, 'mj-entry': ImageIcon,
};
const ICON_BY_CAT: Record<CatId, SvgIconComponent> = {
  challenge: EmojiEventsOutlinedIcon, agents: SmartToyIcon, claude: AutoAwesomeIcon, tools: ChatIcon, creative: ImageIcon,
  nocode: WebIcon, business: CampaignIcon, career: WorkIcon, film: MovieIcon,
};
export const CAT_COLORS: Record<CatId, [string, string]> = {
  challenge: ['#F5B93F', '#E8742C'], agents: ['#2EBD85', '#0E7C66'], claude: ['#E2875B', '#B5532C'], tools: ['#4D7CFF', '#2B2BD6'],
  creative: ['#C25BFF', '#7B2FD1'], nocode: ['#21B8D6', '#1866C2'], business: ['#FF6B8B', '#C2365A'], career: ['#7C8CFF', '#4552C8'], film: ['#FF8A3D', '#B83A16'],
};

export const iconFor = (c: Course): SvgIconComponent => ICON_BY_ID[c.id] || ICON_BY_CAT[c.cat];

// CoursePromo

type Promo = { label?: string; title?: string; sub?: string; hook?: string[]; flow?: string[] };
const PROMO_BY_CAT = promos.byCategory as Record<string, Promo>;
const PROMO_BY_COURSE = promos.byCourse as Record<string, Promo>;

function promoFor(c: Course) {
  const p = { ...PROMO_BY_CAT[c.cat], ...PROMO_BY_COURSE[c.id] };
  const [head, tail] = c.title.split(/:\s*/, 2);
  const steps = (tail ?? '').split(/\s*[•→|]\s*/).filter(Boolean);
  const arrow = c.meta.find((m) => m.includes('→'));
  return {
    label: 'TAKXILA · ' + (p.label ?? 'AI MASTERY'),
    title: (p.title ?? (head.length <= 40 ? head : c.kicker)).toUpperCase(),
    sub: p.sub ?? c.short,
    hook: p.hook ?? [],
    flow: p.flow ?? (steps.length >= 3 ? steps.slice(0, 6) : arrow ? arrow.split(/\s*→\s*/) : c.learn.slice(0, 4)).map((s) => s.toUpperCase()),
    hours: (c.meta.find((m) => /hour|min|day/i.test(m)) ?? c.meta[0] ?? '').toUpperCase(),
  };
}

export function useCoursePromo(c: Course) {
  const p = promoFor(c);
  const save = c.was && c.was > c.price ? Math.round((1 - c.price / c.was) * 100) : 0;
  const href = enrollUrl(c, 'promo');
  const host = new URL(href).hostname;
  return { p, save, href, linkText: host };
}

// Logo

const LOGO_BLUE = { dark: '#5B7CFF', light: '#0B1F6B' };

export function useLogo() {
  const dark = useTheme().palette.mode === 'dark';
  return { src: dark ? '/assets/logo-mark-dark.webp' : '/assets/logo-mark.webp', blue: dark ? LOGO_BLUE.dark : LOGO_BLUE.light };
}

export const useLogoFull = () => (useTheme().palette.mode === 'dark' ? '/assets/logo-full-dark.webp' : '/assets/logo-full.webp');

// Media

export interface BlobImgProps {
  src: string;
  alt: string;
  ratio?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  eager?: boolean;
}

export function useImg(src: string) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(false), [src]);
  return {
    loaded,
    imgRef: (el: HTMLImageElement | null) => {
      if (el?.complete && el.naturalWidth && !loaded) setLoaded(true);
    },
    onLoad: () => setLoaded(true),
    onError: () => setLoaded(true),
  };
}

export interface VideoProps {
  src: string;
  poster: string;
  autoPlay?: boolean;
  title?: string;
}

export function useCourseVideo({ src, autoPlay = false }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
    setStarted(false);
  }, [src]);
  useEffect(() => {
    const v = ref.current;
    if (!v || !autoPlay || reduced()) return;
    v.muted = true;
    v.play().then(() => setStarted(true)).catch(() => undefined);
  }, [src, autoPlay]);
  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    setMuted(false);
    v.currentTime = 0;
    v.play().then(() => setStarted(true)).catch(() => undefined);
  };
  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };
  return { ref, started, muted, failed, play, toggleMute, onPlay: () => setStarted(true), onError: () => setFailed(true) };
}

// Motion

export function useCountUp(value: number, ms: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced()) return setN(value);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return n;
}

// Preview

export const PreviewContext = createContext<(id: string) => void>(() => undefined);
export const usePreview = () => useContext(PreviewContext);

export function usePreviewProvider() {
  const [id, setId] = useState<string | null>(null);
  const open = useMemo(() => (cid: string) => setId(cid), []);
  return { id, open, close: () => setId(null) };
}

export function usePreviewDialog(id: string) {
  const theme = useTheme();
  const full = useMediaQuery(theme.breakpoints.down('sm'));
  const c = courseById(id);
  return { c, full, lessonCount: c ? lessonsFor(c).length : 0, href: c ? enrollUrl(c, 'preview') : '' };
}

// Recommendations

export function usePlanStats(recs: Recommendation[]) {
  const p = plan(recs);
  const stats = [
    [String(p.n), 'Courses in your plan'],
    [fmt(p.total), 'Total price'],
    [fmt(p.save), 'You save'],
    [p.hours + '+ hrs', 'Of learning'],
  ];
  return { p, stats, href: registerUrl('quiz_plan'), cta: 'Start my plan on the academy' };
}

export const recHref = (c: Course) => enrollUrl(c, 'quiz_rec');

// Section

export interface HeadingProps {
  kick?: string;
  title: ReactNode;
  hl?: string;
  after?: string;
  sub?: string;
  align?: 'left' | 'center';
  mb?: number;
  h1?: boolean;
}

export interface PageProps {
  children: ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
  py?: ResponsiveStyleValue<number>;
}

// Showcase

export function packDeal(p: Pack) {
  const list = packList(p);
  return {
    list,
    off: Math.round((1 - p.price / list) * 100),
    shown: p.courses.slice(0, 6).map((id) => courseById(id)).filter((c): c is Course => !!c),
    more: p.courses.length - 6,
  };
}

export function useComboPacks() {
  const [group, setGroup] = useState<PackGroup | 'all'>('all');
  const [open, setOpen] = useState<Pack | null>(null);
  const row = useRef<HTMLDivElement>(null);
  const packs = useMemo(() => PACKS.filter((p) => group === 'all' || p.group === group), [group]);
  const scroll = (dir: number) => row.current?.scrollBy({ left: dir * 560, behavior: 'smooth' });
  return { group, setGroup, open, setOpen, row, packs, scroll };
}

export function usePackDialog(p: Pack) {
  const preview = usePreview();
  const courses = p.courses.map((id) => courseById(id)).filter((c): c is Course => !!c);
  return { list: packList(p), courses, preview, href: registerUrl('pack_' + p.id) };
}

export function usePlans() {
  const list = listPrice(PAID.map((c) => c.id));
  return [
    { tag: 'Popular', title: 'All Access course pack', sub: `All ${PAID.length} paid courses`, note: 'Every course, every update in the catalog', price: ALL_ACCESS_PRICE, was: list, cta: 'Get All Access', href: registerUrl('plan_all_access') },
    { tag: 'New', title: 'Customized course pack', sub: 'Choose any 4 or more courses', note: '25% off applied in the cart automatically', price: null, was: null, cta: 'Pick my courses', href: registerUrl('plan_custom') },
  ];
}

export const comparisonCta = () => ({ cta: 'Enroll from ' + fmt(Math.min(...PAID.map((c) => c.price))), href: registerUrl('compare') });

export const STEP_ICONS = [PaymentsIcon, TaskAltIcon, WorkspacePremiumIcon];
export const PERK_ICONS = [MenuBookIcon, DescriptionIcon, FolderIcon, WorkspacePremiumIcon, BuildIcon, LeaderboardIcon, SupportAgentIcon];

export function howItWorksFor(c: Course) {
  return { steps: howItWorks(c), name: c.title.length > 34 ? 'this course' : c.title };
}

export const totalLessons = () => COURSES.reduce((a, c) => a + lessonsFor(c).length, 0);

// fx

export interface Meteor {
  left: number;
  delay: number;
  dur: number;
}
export const useMeteors = (n: number) =>
  useMemo<Meteor[]>(() => Array.from({ length: n }, (_, i) => ({ left: (i * 73) % 100, delay: ((i * 37) % 50) / 10, dur: 4 + ((i * 13) % 6) })), [n]);

export interface SparkleDot {
  x: number;
  y: number;
  s: number;
  d: number;
  t: number;
}
export const useSparkles = (n: number) =>
  useMemo<SparkleDot[]>(
    () => Array.from({ length: n }, (_, i) => ({ x: (i * 61) % 100, y: (i * 47) % 100, s: 1 + ((i * 7) % 3), d: ((i * 29) % 40) / 10, t: 2 + ((i * 11) % 4) })),
    [n],
  );

export const isHighlighted = (word: string, hl: string[]) => hl.includes(word.replace(/[.,!?]/g, ''));

export function useFlipWords(count: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => setI((n) => (n + 1) % count), ms);
    return () => clearInterval(id);
  }, [count, ms]);
  return i;
}

export function useTilt(max: number) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', ((0.5 - y) * max).toFixed(2) + 'deg');
      el.style.setProperty('--ry', ((x - 0.5) * max).toFixed(2) + 'deg');
      el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    });
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return { ref, move, leave };
}

export interface StepItem {
  title: string;
  body: ReactNode;
  icon?: ReactNode;
}
