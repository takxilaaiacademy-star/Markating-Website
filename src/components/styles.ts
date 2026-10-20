import type { CSSProperties } from 'react';
import type { Theme } from '@mui/material/styles';
import type { ResponsiveStyleValue, SystemStyleObject } from '@mui/system';

export type Style = SystemStyleObject<Theme> | ((t: Theme) => SystemStyleObject<Theme>);
const s = (x: Style) => x;

const glass = (t: Theme, radius: string) => ({ borderRadius: radius, border: `1px solid ${t.tx.line}`, background: t.tx.surface });
const clamp2 = { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as const;
const grow = { flexGrow: 1, minWidth: 0 } as const;

export const hoverLift = (theme: Theme) => ({
  transition: 'transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s, border-color .45s',
  '&:hover': { transform: 'translateY(-8px)', borderColor: theme.tx.hl, boxShadow: `0 28px 60px ${theme.tx.glow}` },
  '&:hover img': { transform: 'scale(1.06)' },
});

export const shimmer = (t: Theme) => ({
  background: `linear-gradient(90deg, ${t.tx.surface} 0%, ${t.tx.line} 50%, ${t.tx.surface} 100%)`,
  backgroundSize: '800px 100%',
  animation: 'txshimmer 1.3s linear infinite',
});

const faqItem = s((t) => ({ mb: 1.25, borderRadius: '16px !important', border: `1px solid ${t.tx.line}`, background: t.tx.surface, '&:before': { display: 'none' } }));

const orb = (color: string) => ({
  position: 'fixed', borderRadius: '50%', pointerEvents: 'none', zIndex: 0, willChange: 'transform',
  background: `radial-gradient(circle at center, ${color} 0%, transparent 68%)`,
}) as const;

export const backgroundStyles = {
  orb1: s((t) => ({ ...orb(t.tx.orb1), width: 720, height: 720, left: -240, top: -40, animation: { xs: 'none', md: 'txdrift 18s ease-in-out infinite' } })),
  orb2: s((t) => ({ ...orb(t.tx.orb2), width: 820, height: 820, right: -260, top: 280, animation: { xs: 'none', md: 'txdrift 24s ease-in-out -8s infinite reverse' } })),
  orb3: s((t) => ({ ...orb(t.tx.orb3), width: 680, height: 680, left: '28%', bottom: -300, animation: { xs: 'none', md: 'txdrift 30s ease-in-out -14s infinite' } })),
};

const cardGrid = { display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } } as const;

export const cardStyles = {
  priceText: (free: boolean, size: number) => s({ fontWeight: 800, fontSize: size, color: free ? 'error.main' : 'text.primary' }),
  priceWas: (size: number) => s({ textDecoration: 'line-through', fontSize: size * 0.65 }),
  offChip: s({ height: 22, fontSize: 11 }),
  card: (index: number) =>
    s((t) => ({
      height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', ...hoverLift(t),
      animation: `txrise .4s cubic-bezier(.2,.8,.2,1) ${Math.min(index, 6) * 35}ms both`,
      '&:hover .tx-play': { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
    })),
  media: s({ position: 'relative' }),
  pointer: s({ cursor: 'pointer' }),
  play: s({
    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%) scale(.7)', opacity: { xs: 1, md: 0 },
    transition: 'opacity .3s, transform .35s cubic-bezier(.2,.8,.2,1)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 0.5, borderRadius: 99,
    bgcolor: 'rgba(10,16,34,.78)', color: '#fff', fontWeight: 700, fontSize: 13, backdropFilter: 'blur(6px)',
  }),
  badge: s({ position: 'absolute', top: 8, right: 8, height: 22, fontSize: 11, fontWeight: 800 }),
  content: s({ flexGrow: 1, pb: 1 }),
  title: s({ display: 'block', textDecoration: 'none', lineHeight: 1.25, my: 0.5, color: 'secondary.main', fontSize: 18, overflowWrap: 'anywhere', '&:hover': { textDecoration: 'underline' } }),
  cat: s({ mb: 1.5 }),
  bold: s({ fontWeight: 700 }),
  duration: s({ mb: 1 }),
  actions: s({ p: 2, pt: 1 }),
  mainBtn: s({ flex: 1, px: 1.5 }),
  grid: s(cardGrid),
};

export const courseIconStyles = {
  tile: (size: number, a: string, b: string) =>
    s({
      width: size, height: size, flex: 'none', borderRadius: size / 4 + 'px', display: 'grid', placeItems: 'center', color: '#fff',
      background: `linear-gradient(135deg, ${a}, ${b})`, boxShadow: `0 8px 20px ${a}55, inset 0 1px 0 rgba(255,255,255,.35)`,
      transition: 'transform .4s cubic-bezier(.2,.8,.2,1)',
    }),
  icon: (size: number) => s({ fontSize: size * 0.56 }),
};

// The promo card is always black (it copies the academy's ads), so its text uses fixed light tints.
const PROMO_INK = '#F4F1EA';
const PROMO_SOFT = 'rgba(244,241,234,.82)';
const PROMO_GOLD = '#D9A441';

export const promoStyles = {
  card: (compact: boolean) =>
    s({
      position: 'relative', overflow: 'hidden', borderRadius: '14px', p: { xs: 2.25, sm: compact ? 2.5 : 3 }, color: PROMO_INK,
      background: 'radial-gradient(120% 90% at 100% 0%, #1b1b1b 0%, #0b0b0b 55%, #050505 100%)', border: '1px solid rgba(255,255,255,.12)',
      boxShadow: '0 18px 44px rgba(0,0,0,.35)', height: '100%', display: 'flex', flexDirection: 'column',
    }),
  mark: s({ position: 'absolute', right: { xs: -30, sm: 10 }, top: '50%', transform: 'translateY(-50%)', width: { xs: 160, sm: 210 }, opacity: 0.07, pointerEvents: 'none', filter: 'grayscale(1)' }),
  label: s({ color: PROMO_GOLD, fontWeight: 800, fontSize: 12, letterSpacing: 0.6 }),
  title: (compact: boolean) => s({ fontWeight: 800, fontSize: { xs: 20, sm: compact ? 20 : 24 }, lineHeight: 1.15, mt: 0.75 }),
  sub: s({ fontSize: 14, color: PROMO_SOFT, mt: 0.5 }),
  rule: s({ height: '1px', my: { xs: 2, sm: 2.5 }, background: `linear-gradient(90deg, ${PROMO_GOLD}, rgba(217,164,65,.25))` }),
  hooks: s({ mb: 1.5 }),
  hook: (compact: boolean) => s({ fontWeight: 800, fontSize: { xs: 16, sm: compact ? 16 : 17 }, letterSpacing: 0.2 }),
  flow: s({ fontSize: 13, letterSpacing: 0.4, color: PROMO_SOFT, mb: 2.5 }),
  spacer: s({ flexGrow: 1 }),
  facts: s({ mb: 2, px: { xs: 0, sm: 1 } }),
  fact: s({ flex: 1 }),
  hours: s({ fontWeight: 800, fontSize: 17, mt: 2 }),
  small: s({ fontSize: 12, color: PROMO_SOFT }),
  priceLabel: s({ fontSize: 12, letterSpacing: 0.6, color: PROMO_SOFT }),
  price: s({ fontWeight: 800, fontSize: 20 }),
  enroll: s({ py: 1.4, borderRadius: '8px', fontWeight: 800, letterSpacing: 0.6, color: '#1a1406', background: PROMO_GOLD, '&:hover': { background: '#E8B65A' } }),
  link: s({ mt: 1.25, fontSize: 12, color: PROMO_SOFT, textDecoration: 'none', '&:hover': { color: PROMO_INK }, wordBreak: 'break-all' }),
};

export const faqStyles = {
  item: faqItem,
  summary: s({ px: 2.5, py: 0.5 }),
  q: s({ fontWeight: 700 }),
  details: s({ px: 2.5, pt: 0 }),
};

const footerLink = {
  color: 'text.secondary', textDecoration: 'none', fontSize: 14, display: 'inline-block', transition: 'color .2s, transform .25s',
  '&:hover': { color: 'secondary.main', transform: 'translateX(4px)' },
} as const;

export const footerStyles = {
  footer: s({ position: 'relative', zIndex: 1, px: { xs: 1.5, md: 3 }, pb: { xs: 12, md: 4 }, mt: 6 }),
  panel: s((t) => ({
    borderRadius: '22px', border: `1px solid ${t.tx.line}`, py: { xs: 4, md: 5 }, px: { xs: 3, md: 5 },
    background: t.palette.mode === 'dark' ? 'rgba(16,23,48,.82)' : '#FFFFFF', backdropFilter: 'blur(20px)',
    boxShadow: t.palette.mode === 'dark' ? 'none' : '0 20px 60px rgba(20,32,138,.08)',
  })),
  brand: s({ fontWeight: 800, fontSize: 20, letterSpacing: '.04em', mb: 1 }),
  tagline: s({ fontSize: 14, lineHeight: 1.7 }),
  head: s({ fontWeight: 800, mb: 1.5 }),
  newsHead: s({ fontWeight: 700, fontSize: 14, mt: 2.5, mb: 1 }),
  link: s(footerLink),
  iconLink: s({ ...footerLink, display: 'flex', alignItems: 'center', gap: 1 }),
  social: s((t) => ({ border: `1px solid ${t.tx.line}` })),
  divider: s({ my: 3 }),
};

export const logoStyles = {
  wrap: (blue: string) => s({ display: 'flex', alignItems: 'center', gap: 1.25, '&:hover .tx-mark': { transform: 'rotate(-6deg) scale(1.08)', filter: `drop-shadow(0 0 14px ${blue})` } }),
  mark: (size: number) => s({ width: size * 0.92, height: size, flex: 'none', transition: 'transform .5s cubic-bezier(.2,.8,.2,1), filter .5s' }),
  markImg: s({ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }),
  words: s({ lineHeight: 1 }),
  name: s({ fontWeight: 800, letterSpacing: '0.2em', fontSize: 17, lineHeight: 1.15 }),
  blue: (blue: string) => s({ color: blue }),
  // The tagline is drawn small on purpose, but never below 11px.
  tagline: (blue: string) => s({ fontWeight: 700, letterSpacing: '0.2em', fontSize: 11, lineHeight: 1.3, color: blue }),
  full: (width: number) => s({ width, maxWidth: '100%', aspectRatio: '720 / 566' }),
  fullImg: s({ width: '100%', height: '100%', display: 'block' }),
};

export const mediaStyles = {
  frame: (ratio: string | undefined, pending: boolean) => s((t) => ({ position: 'relative', overflow: 'hidden', aspectRatio: ratio, ...(pending && shimmer(t)) })),
  img: (visible: boolean) =>
    s({ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: visible ? 1 : 0, transition: 'opacity .35s ease, transform .7s cubic-bezier(.2,.8,.2,1)' }),
  video: s((t) => ({ position: 'relative', borderRadius: '18px', overflow: 'hidden', aspectRatio: '16 / 9', bgcolor: '#0A1022', boxShadow: `0 24px 60px ${t.tx.glow}` })),
  videoEl: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } satisfies CSSProperties,
  poster: s({ width: '100%', height: '100%', objectFit: 'cover' }),
  cover: s({ position: 'absolute', inset: 0, cursor: 'pointer', background: 'linear-gradient(180deg, rgba(10,16,34,0) 40%, rgba(10,16,34,.75))' }),
  playBtn: s({ width: 76, height: 76, borderRadius: '50%', bgcolor: 'primary.main', color: 'primary.contrastText', display: 'grid', placeItems: 'center', animation: 'txpulse 1.6s ease-out infinite', transition: 'transform .25s', '&:hover': { transform: 'scale(1.1)' } }),
  playIcon: s({ fontSize: 46 }),
  watch: s({ position: 'absolute', bottom: 16, left: 20, color: '#fff', fontWeight: 700 }),
  mute: s({ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(10,16,34,.6)', color: '#fff', '&:hover': { bgcolor: 'rgba(10,16,34,.8)' } }),
};

export const previewStyles = {
  body: s({ p: { xs: 2, md: 3 } }),
  head: s({ mb: 1.5 }),
  kicker: s({ flexGrow: 1 }),
  grid: s({ mt: 0.5 }),
  title: s({ mb: 1 }),
  desc: s({ mb: 2 }),
  chips: s({ mb: 2 }),
  actions: s({ mt: 2 }),
  end: s({ height: 4 }),
};

export const recStyles = {
  plan: s({ p: { xs: 2, md: 2.5 }, mb: 3, borderRadius: '18px', bgcolor: 'transparent' }),
  stat: s({ fontWeight: 800, fontSize: 24, color: 'secondary.main' }),
  card: s((t) => ({ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', ...hoverLift(t) })),
  media: s({ position: 'relative', overflow: 'hidden' }),
  match: s({ position: 'absolute', top: 10, left: 10, fontWeight: 800 }),
  content: s({ flexGrow: 1 }),
  cat: s({ fontSize: 11 }),
  title: s({ fontWeight: 700, fontSize: 16, lineHeight: 1.3, mb: 1 }),
  why: s({ maxWidth: '100%' }),
  actions: s({ p: 2, pt: 0 }),
  price: s({ fontWeight: 800, mr: 'auto' }),
};

export const sectionStyles = {
  heading: (align: 'left' | 'center', mb: number) => s({ textAlign: align, mb }),
  title: s({ fontSize: { xs: 26, md: 36 }, my: 0.75 }),
  hl: s({ color: 'secondary.main' }),
  sub: (center: boolean) => s({ maxWidth: 640, mx: center ? 'auto' : 0, fontSize: 15 }),
  page: (py: ResponsiveStyleValue<number>) => s({ py, position: 'relative', zIndex: 1 }),
};

const cell = { px: { xs: 1, sm: 2 }, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } as const;
const ourCol = (t: Theme, strong = false) => (t.palette.mode === 'dark' ? `rgba(91,124,255,${strong ? 0.22 : 0.1})` : `rgba(11,31,107,${strong ? 0.08 : 0.04})`);

export const showcaseStyles = {
  quotes: s({ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' } }),
  quoteCard: s((t) => ({ ...glass(t, '20px'), m: 0, p: 3, display: 'flex', flexDirection: 'column', gap: 1.25, minWidth: 0 })),
  quoteIcon: s({ color: 'secondary.main', fontSize: 34 }),
  quoteText: s({ m: 0, fontSize: 15, lineHeight: 1.6, flexGrow: 1 }),
  stars: s({ color: '#F5B93F' }),
  quoteName: s({ fontWeight: 800, display: 'flex', flexDirection: 'column' }),
  quoteRole: s({ fontWeight: 500, fontSize: 13, color: 'text.secondary' }),
  tile: (index: number) =>
    s((t) => ({
      position: 'relative', p: 2, height: '100%', ...glass(t, '18px'), backdropFilter: 'blur(16px)',
      cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 1.5,
      animation: `txrise .5s cubic-bezier(.2,.8,.2,1) ${Math.min(index, 15) * 40}ms both`,
      transition: 'transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s, border-color .35s',
      '&:hover': { transform: 'translateY(-6px)', borderColor: t.tx.hl, boxShadow: `0 22px 48px ${t.tx.glow}` },
      '&:hover .tx-cicon': { transform: 'rotate(-8deg) scale(1.1)' },
      '&:hover .tx-num': { color: t.tx.hl, transform: 'scale(1.15)' },
    })),
  tileNum: s((t) => ({ position: 'absolute', top: 8, right: 14, fontWeight: 800, fontSize: 22, color: t.tx.line, transition: 'all .35s' })),
  tileHead: s({ pr: 3, minHeight: 48 }),
  tileTitle: s({ fontWeight: 700, lineHeight: 1.25, fontSize: 15, ...clamp2 }),
  tileMeta: s((t) => ({ border: `1px solid ${t.tx.line}`, borderRadius: '8px', px: 1, py: 0.5, color: 'text.secondary', fontSize: 13, whiteSpace: 'nowrap' })),
  tileIcon: s({ fontSize: 15 }),
  ellipsis: s({ overflow: 'hidden', textOverflow: 'ellipsis' }),
  spacer: s({ flexGrow: 1 }),
  tilePrice: (free: boolean) => s({ fontWeight: 800, fontSize: 13, color: free ? 'error.main' : 'text.primary' }),
  tileBtn: s({ mt: 'auto', minHeight: 40 }),
  grid: s({ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 236px), 1fr))', '& > *': { minWidth: 0 } }),

  table: s((t) => ({ maxWidth: 820, mx: 'auto', ...glass(t, '22px'), overflow: 'hidden', backdropFilter: 'blur(18px)' })),
  tableGrid: s({ display: 'grid', gridTemplateColumns: { xs: '1.5fr 1fr 1fr 1fr', sm: '2fr 1.1fr 1fr 1fr' } }),
  featureHead: s({ ...cell, justifyContent: 'flex-start', fontWeight: 800 }),
  logoHead: s((t) => ({ ...cell, bgcolor: ourCol(t, true), py: 1 })),
  colHead: s({ ...cell, fontWeight: 600, fontSize: { xs: 12, sm: 14 }, color: 'text.secondary' }),
  contents: s({ display: 'contents' }),
  rowLabel: (r = 0) => s((t) => ({ ...cell, justifyContent: 'flex-start', textAlign: 'left', borderTop: `1px solid ${t.tx.line}`, fontSize: { xs: 13, sm: 15 }, animation: r < 0 ? undefined : `txrise .5s ${r * 60}ms both` })),
  priceCell: (i: number) =>
    s((t) => ({
      ...cell, borderTop: `1px solid ${t.tx.line}`, fontWeight: 800, fontSize: { xs: 12, sm: 15 },
      color: i === 0 ? 'secondary.main' : i === 1 ? 'success.main' : 'text.primary', bgcolor: i === 0 ? ourCol(t) : undefined,
    })),
  checkCell: (i: number) => s((t) => ({ ...cell, borderTop: `1px solid ${t.tx.line}`, bgcolor: i === 0 ? ourCol(t) : undefined })),
  yes: (r: number) => s({ color: 'success.main', animation: `txpop .4s ${300 + r * 60}ms both` }),
  no: s({ color: 'error.main', opacity: 0.85 }),
  save: s({ px: 3, py: 2.5, color: '#fff', background: 'linear-gradient(110deg, #2EBD85, #0E5F49 60%, #0B3B2E)', backgroundSize: '200% 100%', animation: 'txgradient 8s ease infinite' }),
  saveKick: s({ fontWeight: 700, fontSize: 12, letterSpacing: '.12em', color: 'rgba(255,255,255,.9)' }),
  saveNum: s({ fontWeight: 800, fontSize: 28 }),
  center: s({ textAlign: 'center' }),
  saveBtn: s({ bgcolor: '#fff', color: '#0B3B2E', '&:hover': { bgcolor: '#fff' } }),
  saveNote: s({ fontSize: 12, mt: 0.75, color: 'rgba(255,255,255,.92)' }),
  bolt: s({ fontSize: 13, verticalAlign: 'middle', color: '#F5B93F' }),

  pack: (index: number) =>
    s((t) => ({
      width: 268, flex: 'none', scrollSnapAlign: 'start', borderRadius: '18px', p: 1.75, display: 'flex', flexDirection: 'column', gap: 1.25,
      bgcolor: t.palette.mode === 'dark' ? 'rgba(17,25,54,.92)' : '#fff', border: `1px solid ${t.tx.line}`,
      animation: `txrise .5s ${index * 60}ms both`, transition: 'transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s',
      '&:hover': { transform: 'translateY(-6px) rotate(-.4deg)', boxShadow: `0 24px 48px ${t.tx.glow}` },
    })),
  packCount: s({ fontSize: 12, color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }),
  packCountIcon: s({ fontSize: 14 }),
  offChip: s({ height: 20, fontSize: 11, fontWeight: 800 }),
  packTitle: s({ fontWeight: 800, fontSize: 17, lineHeight: 1.2 }),
  packKick: s({ fontSize: 11, letterSpacing: '.24em', color: 'text.secondary' }),
  packDeal: s((t) => ({ bgcolor: t.palette.mode === 'dark' ? 'rgba(245,185,63,.12)' : 'rgba(245,185,63,.18)', borderRadius: '8px', px: 1, py: 0.5, fontSize: 12 })),
  star: s({ fontSize: 14, color: '#F5B93F' }),
  muted: s({ color: 'text.secondary' }),
  packGrid: s({ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75, flexGrow: 1 }),
  packCourse: s((t) => ({ border: `1px solid ${t.tx.line}`, borderRadius: '8px', p: 0.5 })),
  packCourseName: s({ fontSize: 11, lineHeight: 1.2, ...clamp2 }),
  packMore: s({ fontSize: 12, color: 'text.secondary', alignSelf: 'center', pl: 0.5 }),
  packBtn: s({ minHeight: 38 }),
  filters: s({ mb: 2.5 }),
  rel: s({ position: 'relative' }),
  packRow: s({ display: 'flex', gap: 2, overflowX: 'auto', scrollSnapType: 'x mandatory', pb: 1.5, px: 0.5, scrollbarWidth: 'thin' }),
  arrows: s({ mt: 1 }),
  arrow: s((t) => ({ border: `1px solid ${t.tx.line}` })),
  dialogTitle: s({ fontWeight: 800 }),
  dialogRow: (i: number) => s({ animation: `txrise .4s ${i * 50}ms both` }),
  dialogText: s(grow),
  dialogName: s({ fontWeight: 700, fontSize: 14 }),
  dialogActions: s({ p: 2 }),

  plan: (featured: boolean) =>
    s((t) => ({
      position: 'relative', p: 3, height: '100%', borderRadius: '22px', border: `1px solid ${featured ? t.tx.hl : t.tx.line}`, background: t.tx.surface, backdropFilter: 'blur(18px)',
      display: 'flex', flexDirection: 'column', gap: 1.25, transition: 'transform .35s, box-shadow .35s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 26px 56px ${t.tx.glow}` },
      ...(featured && { boxShadow: `0 0 0 1px ${t.tx.hl}, 0 20px 50px ${t.tx.glow}` }),
    })),
  planTag: s({ position: 'absolute', top: 16, right: 16, fontWeight: 800 }),
  planTitle: s({ pr: 8 }),
  planNote: s((t) => ({ bgcolor: t.tx.surface, border: `1px dashed ${t.tx.line}`, borderRadius: '10px', p: 1, textAlign: 'center' })),
  planPrice: s({ fontWeight: 800, fontSize: 28 }),
  strike: s({ textDecoration: 'line-through' }),

  how: s({
    position: 'relative', overflow: 'hidden', borderRadius: '24px', p: { xs: 3, md: 5 }, color: '#fff',
    background: 'radial-gradient(120% 140% at 0% 0%, #3B2BD6 0%, #1A1250 45%, #0A1022 100%)',
  }),
  howTitle: s({ textAlign: 'center', mb: 3.5, fontSize: { xs: 22, md: 28 } }),
  step: (i: number) =>
    s({
      bgcolor: '#fff', color: '#0B1030', borderRadius: '999px 18px 18px 999px', p: 1, pr: 2.5, position: 'relative',
      animation: `txrise .6s ${i * 150}ms both`, transition: 'transform .3s', '&:hover': { transform: 'translateX(8px)' },
    }),
  stepIcon: s({ width: 52, height: 52, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: '#EEF1FB', color: '#2B2BD6', flex: 'none' }),
  stepText: s({ fontWeight: 700, flexGrow: 1 }),
  stepHl: s({ color: '#2B2BD6' }),
  stepNum: s({ fontWeight: 800, fontSize: 26, color: '#C9D0EE' }),
  sealCol: s({ display: 'flex', justifyContent: 'center' }),
  seal: s({ position: 'relative', width: 220, height: 220, display: 'grid', placeItems: 'center' }),
  sealRing: s({ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px dashed rgba(245,185,63,.6)', animation: 'txspin 18s linear infinite' }),
  sealDisc: s({ position: 'absolute', inset: 22, borderRadius: '50%', background: 'radial-gradient(circle, #F5B93F, #B8862A)', boxShadow: '0 0 60px rgba(245,185,63,.5)', animation: 'txfloat 5s ease-in-out infinite' }),
  sealText: s({ position: 'relative', textAlign: 'center', color: '#0A1022' }),
  sealIcon: s({ fontSize: 44 }),
  sealBig: s({ fontWeight: 800, fontSize: 13, letterSpacing: '.1em' }),
  sealSmall: s({ fontWeight: 800, fontSize: 11 }),

  perks: s({ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }),
  perk: (i: number, wide: boolean) =>
    s((t) => ({
      p: 1.5, ...glass(t, '14px'), animation: `txrise .45s ${i * 50}ms both`,
      gridColumn: wide ? { sm: '1 / -1' } : undefined, transition: 'transform .3s, border-color .3s',
      '&:hover': { transform: 'translateY(-3px)', borderColor: t.tx.hl },
    })),
  perkIcon: s((t) => ({ width: 38, height: 38, borderRadius: '10px', display: 'grid', placeItems: 'center', flex: 'none', border: `1px solid ${t.tx.hl}`, color: 'secondary.main' })),
  perkText: s({ fontWeight: 600, fontSize: 14 }),

  faq: faqItem,
  faqSummary: s({ px: 2.5 }),
  faqQ: s({ fontWeight: 700 }),
  faqDetails: s({ px: 2.5, pt: 0 }),
};

const fill = { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 } as const;
const edgeMask = 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%)';
const rowMask = 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)';

export const fxStyles = {
  spotlight: s({ position: 'absolute', pointerEvents: 'none', zIndex: 0, width: { xs: '160%', md: '90%' }, height: 'auto', top: { xs: -60, md: -80 }, left: { xs: '-10%', md: '10%' }, opacity: 0, animation: 'txspotlight 2s .6s ease forwards' }),
  grid: (size: number) =>
    s((t) => ({
      ...fill,
      backgroundImage: `linear-gradient(${t.tx.line} 1px, transparent 1px), linear-gradient(90deg, ${t.tx.line} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`, maskImage: edgeMask, WebkitMaskImage: edgeMask, opacity: 0.55,
    })),
  meteors: s({ ...fill, overflow: 'hidden' }),
  meteor: (m: { left: number; dur: number; delay: number }) =>
    s((t) => ({
      position: 'absolute', top: -10, left: m.left + '%', width: 2, height: 2, borderRadius: '50%', bgcolor: t.tx.hl,
      boxShadow: '0 0 0 1px rgba(255,255,255,.08)', animation: `txmeteor ${m.dur}s linear ${m.delay}s infinite`,
      '&::before': { content: '""', position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 70, height: 1, background: `linear-gradient(90deg, ${t.tx.hl}, transparent)` },
    })),
  sparkles: s(fill),
  sparkle: (p: { x: number; y: number; s: number; d: number; t: number }, color?: string) =>
    s((t) => ({ position: 'absolute', left: p.x + '%', top: p.y + '%', width: p.s * 2, height: p.s * 2, borderRadius: '50%', bgcolor: color || t.tx.hl, animation: `txtwinkle ${p.t}s ease-in-out ${p.d}s infinite` })),
  inline: s({ display: 'inline' }),
  word: (delay: number, hl: boolean) =>
    s({ display: 'inline-block', whiteSpace: 'pre', opacity: 0, animation: `txblurin .6s cubic-bezier(.2,.8,.2,1) ${delay}ms forwards`, color: hl ? 'secondary.main' : undefined }),
  flip: s({ display: 'inline-block', perspective: 600, position: 'relative' }),
  flipWord: s({ display: 'inline-block', transformOrigin: '50% 100%', animation: 'txflip .6s cubic-bezier(.2,.8,.2,1) both' }),
  moving: s((t) => ({
    position: 'relative', borderRadius: 999, p: '2px', overflow: 'hidden', isolation: 'isolate',
    transition: 'transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s',
    '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 18px 44px ${t.tx.glow}` },
    '&:active': { transform: 'scale(.96)' },
    '&::before': {
      content: '""', position: 'absolute', inset: '-150%', zIndex: -1,
      background: `conic-gradient(from 0deg, transparent 0 70%, ${t.tx.hl} 80%, #fff 85%, ${t.tx.hl} 90%, transparent 100%)`,
      animation: 'txspin 3.2s linear infinite',
    },
    '&::after': { content: '""', position: 'absolute', inset: 0, zIndex: -2, borderRadius: 999, border: `1px solid ${t.tx.line}` },
  })),
  movingInner: (filled: boolean) =>
    s((t) => ({
      display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 1, px: { xs: 3, sm: 3.5 }, py: 1.6, borderRadius: 999, fontWeight: 800, fontSize: 16, whiteSpace: 'nowrap',
      bgcolor: filled ? 'primary.main' : t.palette.mode === 'dark' ? 'rgba(10,16,34,.92)' : 'rgba(255,255,255,.95)',
      color: filled ? 'primary.contrastText' : 'text.primary', backdropFilter: 'blur(12px)',
    })),
  tiltWrap: s({ perspective: 1000, height: '100%' }),
  tilt: (clickable: boolean) =>
    s((t) => ({
      position: 'relative', height: '100%', ...glass(t, '22px'), backdropFilter: 'blur(18px)',
      transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))', transformStyle: 'preserve-3d', transition: 'transform .35s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .3s',
      cursor: clickable ? 'pointer' : undefined, overflow: 'hidden',
      '&::before': {
        content: '""', position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', opacity: 0, transition: 'opacity .3s',
        background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${t.tx.glow}, transparent 45%)`,
      },
      '&:hover': { borderColor: t.tx.hl, boxShadow: `0 30px 60px ${t.tx.glow}` },
      '&:hover::before': { opacity: 1 },
    })),
  marquee: s({ overflow: 'hidden', py: 1, maskImage: rowMask, WebkitMaskImage: rowMask, '&:hover > div': { animationPlayState: 'paused' } }),
  marqueeTrack: (seconds: number, reverse: boolean, gap: number) =>
    s({ display: 'flex', gap: gap / 8, width: 'max-content', animation: `txmarq ${seconds}s linear infinite ${reverse ? 'reverse' : 'normal'}`, pr: gap / 8 }),
  contents: s({ display: 'contents' }),
  steps: s({ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' } }),
  stepCard: s((t) => ({ ...glass(t, '20px'), p: 3, position: 'relative', minWidth: 0 })),
  stepDot: s((t) => ({ width: 40, height: 40, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 800, boxShadow: `0 0 0 6px ${t.tx.glow}`, mb: 2 })),
  stepTitle: s({ mb: 0.75, fontSize: 18 }),
  stepBody: s({ color: 'text.secondary' }),
  lamp: s({ position: 'relative', overflow: 'hidden', pt: { xs: 14, md: 18 }, pb: { xs: 6, md: 8 }, textAlign: 'center', isolation: 'isolate' }),
  lampGlow: s((t) => ({
    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70%', maxWidth: 820, height: 220, zIndex: -1,
    background: `conic-gradient(from 90deg at 50% 0%, transparent 25%, ${t.tx.hl} 50%, transparent 75%)`, opacity: 0.55, filter: 'blur(28px)',
  })),
  lampBar: s((t) => ({ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: 3, borderRadius: 3, width: '46%', maxWidth: 520, bgcolor: t.tx.hl, boxShadow: `0 0 30px 6px ${t.tx.hl}` })),
  gradientText: s((t) => ({
    background: `linear-gradient(90deg, ${t.tx.hl}, ${t.palette.mode === 'dark' ? '#8EA2FF' : '#7B5CFF'}, ${t.tx.hl})`, backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'txgradient 6s ease infinite',
  })),
};

export const shellStyles = {
  shell: s({ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'clip' }),
  main: s({ flexGrow: 1, position: 'relative', zIndex: 1 }),
  loader: s({ minHeight: '60vh', display: 'grid', placeItems: 'center' }),
  offer: s({
    position: 'relative', zIndex: 1101, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', columnGap: 1.25, rowGap: 0.25,
    px: { xs: 5, md: 6 }, py: 0.9, color: '#fff', textAlign: 'center', background: 'linear-gradient(90deg, #2B2BD6, #6A3FE0 55%, #C2365A)',
  }),
  offerIcon: s({ display: { xs: 'none', sm: 'inline-flex' } }),
  offerText: s({ fontWeight: 600, fontSize: { xs: 13, sm: 14 } }),
  offerLink: s({ color: '#FFD98A', fontWeight: 800, fontSize: { xs: 13, sm: 14 }, textDecorationColor: 'rgba(255,217,138,.6)' }),
  offerClose: s({ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', color: '#fff' }),
  header: (scrolled: boolean) => s({ position: 'sticky', top: 0, zIndex: 1100, px: { xs: 1, md: 2 }, pt: scrolled ? 0.75 : { xs: 1, md: 1.5 }, transition: 'padding .25s' }),
  bar: s((t) => ({
    maxWidth: 1240, mx: 'auto', display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.75 }, minHeight: { xs: 60, md: 68 }, px: { xs: 1, md: 2 },
    borderRadius: '18px', border: `1px solid ${t.tx.line}`, background: t.palette.mode === 'dark' ? 'rgba(16,23,48,.78)' : 'rgba(255,255,255,.8)', backdropFilter: 'blur(22px) saturate(160%)',
  })),
  logo: s({ color: 'inherit', textDecoration: 'none', mr: 1, display: 'flex', minWidth: 0 }),
  links: s({ display: { xs: 'none', lg: 'flex' } }),
  link: (on: boolean) =>
    s({
      fontWeight: 600, fontSize: 14, px: 1.25, minHeight: 40, borderRadius: '10px', position: 'relative', color: on ? 'secondary.main' : 'text.primary',
      '&::after': { content: '""', position: 'absolute', left: 10, right: 10, bottom: 4, height: 2, borderRadius: 2, bgcolor: 'secondary.main', transform: on ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform .3s' },
      '&:hover::after': { transform: 'scaleX(1)' },
    }),
  spacer: s({ flexGrow: 1 }),
  iconBtn: s({ display: { xs: 'none', sm: 'inline-flex' } }),
  login: s({ display: { xs: 'none', md: 'inline-flex' }, fontWeight: 700 }),
  cta: s({ whiteSpace: 'nowrap', px: { xs: 1.5, sm: 2.25 }, fontWeight: 800 }),
  menu: s({ display: { lg: 'none' } }),
  drawer: s({ width: 290, maxWidth: '86vw', p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }),
  drawerList: s({ mx: -1 }),
  drawerText: { fontWeight: 700 },
  whatsapp: s({
    position: 'fixed', right: { xs: 14, md: 24 }, bottom: { xs: 84, md: 24 }, zIndex: 1250, width: 56, height: 56, bgcolor: '#25D366', color: '#fff',
    boxShadow: '0 12px 30px rgba(37,211,102,.45)', '&:hover': { bgcolor: '#1EBE5A' }, '& svg': { fontSize: 30 },
  }),
  sticky: s((t) => ({
    display: { xs: 'flex', md: 'none' }, position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1240, gap: 1, p: 1.25, pb: 'calc(10px + env(safe-area-inset-bottom))',
    background: t.palette.mode === 'dark' ? 'rgba(10,16,34,.94)' : 'rgba(255,255,255,.96)', borderTop: `1px solid ${t.tx.line}`, backdropFilter: 'blur(16px)',
  })),
  stickyMain: s({ flex: 1.4, minWidth: 0, fontWeight: 800, whiteSpace: 'nowrap', px: 1 }),
  stickyAlt: s({ flex: 1, minWidth: 0, whiteSpace: 'nowrap', px: 1 }),
};

export const leadStyles = {
  form: (dense: boolean) => s(dense ? { display: 'flex', gap: 1, alignItems: 'flex-start', flexWrap: 'wrap' } : { display: 'grid', gap: 2 }),
  denseField: s({ flex: '1 1 180px', minWidth: 0 }),
  honey: s({ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }),
  submit: (dense: boolean) => s(dense ? { flex: 'none', height: 40 } : { fontWeight: 800 }),
  done: s({ py: 2 }),
  doneIcon: s({ fontSize: 44 }),
  doneText: s({ fontWeight: 700, fontSize: 17 }),
};
