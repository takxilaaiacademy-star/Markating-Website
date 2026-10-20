import { alpha, lighten } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

type Sx = SxProps<Theme>;

export const accent: Sx = { color: 'secondary.main' };

export const scoreCard: Sx = (t) => ({
  p: { xs: 2, md: 3 }, mb: 4, borderRadius: '24px', border: `1px solid ${t.tx.line}`,
  background: t.palette.mode === 'dark' ? 'linear-gradient(135deg, rgba(245,185,63,.08), rgba(72,104,255,.10))' : 'linear-gradient(135deg, rgba(43,43,214,.06), rgba(60,200,230,.08))',
  animation: 'txrise .5s both',
});
export const gaugeCol: Sx = { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1 };
export const bandLabel = (color: string): Sx => ({ fontWeight: 800, fontSize: 22, color });
export const sectionHead: Sx = { mb: 2 };
export const sectionTitle: Sx = { fontSize: { xs: 20, md: 24 } };
export const block: Sx = { mb: 4 };

export const gauge = (size: number): Sx => ({ position: 'relative', width: size, height: size, flex: 'none' });
export const gaugeCenter: Sx = { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' };
export const gaugeNum = (color: string, size: number): Sx => ({ fontWeight: 800, fontSize: Math.round(size * 0.27), lineHeight: 1, color });
export const gaugeOf: Sx = { fontWeight: 700 };
export const legend: Sx = { mt: 0.5 };
export const legendDot = (color: string): Sx => ({ width: 10, height: 10, borderRadius: '50%', bgcolor: color, flex: 'none' });
export const legendText: Sx = { fontSize: 12, color: 'text.secondary' };

export const factorRow: Sx = (t) => ({ p: 1.25, borderRadius: '12px', border: `1px solid ${t.tx.line}`, background: t.tx.surface });
export const factorHead: Sx = { minWidth: 0 };
export const factorLabel: Sx = { fontWeight: 800, fontSize: 14, flexGrow: 1, minWidth: 0 };
export const factorPts: Sx = { fontWeight: 800, fontSize: 13, color: 'text.secondary', flex: 'none' };
export const factorAnswer: Sx = { fontSize: 13, fontWeight: 600, overflowWrap: 'anywhere' };
export const factorReason: Sx = { fontSize: 13, color: 'text.secondary' };
export const factorBar: Sx = (t) => ({ height: 4, borderRadius: 4, bgcolor: t.tx.line, my: 0.75, overflow: 'hidden' });
export const factorFill = (pct: number, color: string): Sx => ({ height: '100%', width: `${pct}%`, bgcolor: color, transition: 'width .8s' });
export const formula: Sx = { display: 'block', mt: 1, color: 'text.secondary', fontSize: 12.5 };


export const subHead: Sx = { fontWeight: 800, fontSize: 18, mb: 1.5, mt: 1 };

const still = { '@media (prefers-reduced-motion: reduce)': { animation: 'none', transition: 'none' } };
const ink = (t: Theme, color: string) => (t.palette.mode === 'dark' ? lighten(color, 0.3) : color);

export const funnel: Sx = { maxWidth: 640, mx: 'auto', minWidth: 0 };
export const topBar: Sx = { display: 'grid', gridTemplateColumns: '40px 1fr 40px', alignItems: 'center', mb: 1 };
export const backBtn = (show: boolean): Sx => ({ visibility: show ? 'visible' : 'hidden' });
export const stepCount: Sx = { textAlign: 'center', fontWeight: 800, fontSize: 14 };
export const stepOf: Sx = { color: 'text.secondary', fontWeight: 600 };
export const bar: Sx = (t) => ({
  height: 6, borderRadius: 6, mb: { xs: 3, md: 4 }, bgcolor: t.tx.line,
  '& .MuiLinearProgress-bar': { borderRadius: 6, background: `linear-gradient(90deg, ${t.tx.hl}, ${ink(t, '#8B5CF6')})`, ...still },
});
const enter = {
  '@keyframes cfIn': { from: { opacity: 0, transform: 'translateX(18px)' }, to: { opacity: 1, transform: 'none' } },
  animation: 'cfIn .32s ease-out both', ...still,
};
export const screenIn: Sx = enter;
export const qTitle: Sx = { fontSize: { xs: 24, md: 32 }, fontWeight: 800, textAlign: 'center', lineHeight: 1.2, outline: 'none', mb: 1 };
export const qSub: Sx = { textAlign: 'center', color: 'text.secondary', mb: { xs: 2.5, md: 3.5 } };
export const optList: Sx = { display: 'grid', gap: 1.25 };
export const optGrid: Sx = { display: 'grid', gap: 1.25, gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))' } };

const optBase = (t: Theme, on: boolean): object => ({
  width: '100%', minWidth: 0, borderRadius: '16px', border: '1.5px solid', textAlign: 'left',
  borderColor: on ? t.tx.hl : t.tx.line, bgcolor: on ? alpha(t.tx.hl, t.palette.mode === 'dark' ? 0.16 : 0.07) : t.palette.background.paper,
  boxShadow: on ? `0 0 0 3px ${alpha(t.tx.hl, 0.18)}` : 'none',
  transition: 'border-color .2s, background-color .2s, box-shadow .2s, transform .15s',
  '@media (hover: hover)': { '&:hover': { borderColor: t.tx.hl, transform: 'translateY(-1px)' } },
  '&:active': { transform: 'scale(.99)' },
  '&.Mui-focusVisible': { outline: `2px solid ${t.tx.hl}`, outlineOffset: 2 },
  ...still,
});
export const optRow = (on: boolean): Sx => (t) => ({ ...optBase(t, on), display: 'flex', alignItems: 'center', gap: 1.5, p: 1.25, pr: 1.75, minHeight: 64 });
export const optTile = (on: boolean): Sx => (t) => ({ ...optBase(t, on), position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', textAlign: 'center', gap: 1, p: 1.5, pt: 2, minHeight: 118 });
export const iconTile = (color: string, big = false): Sx => (t) => ({
  width: big ? 48 : 44, height: big ? 48 : 44, borderRadius: '14px', flex: 'none', display: 'grid', placeItems: 'center',
  bgcolor: alpha(color, t.palette.mode === 'dark' ? 0.22 : 0.13), color: ink(t, color), '& svg': { fontSize: big ? 28 : 25 },
});
export const optLabel: Sx = { fontWeight: 700, fontSize: { xs: 14.5, md: 15.5 }, lineHeight: 1.3, flexGrow: 1, minWidth: 0, overflowWrap: 'anywhere' };
export const tileLabel: Sx = { fontWeight: 700, fontSize: { xs: 13.5, md: 14.5 }, lineHeight: 1.3, overflowWrap: 'anywhere' };
export const mark = (on: boolean, multi: boolean, tile = false): Sx => (t) => ({
  ...(tile ? { position: 'absolute', top: 8, right: 8 } : {}),
  width: 22, height: 22, flex: 'none', borderRadius: multi ? '7px' : '50%', border: '2px solid', display: 'grid', placeItems: 'center',
  borderColor: on ? t.tx.hl : t.tx.line, bgcolor: on ? t.tx.hl : 'transparent', color: t.palette.mode === 'dark' ? t.tx.acfg : '#fff',
  '& svg': { fontSize: 16 }, transition: 'background-color .2s, border-color .2s', ...still,
});
export const continueBar: Sx = { position: 'sticky', bottom: 0, mt: 3, py: 2, pr: { xs: '68px', sm: 0 }, zIndex: 2 };
export const infoCta: Sx = { mt: 4 };
export const continueBtn: Sx = (t) => ({ py: 1.5, fontSize: 16, borderRadius: '14px', boxShadow: `0 10px 28px ${alpha(t.tx.bg, 0.55)}` });

export const info: Sx = { ...enter, textAlign: 'center', pt: { xs: 1, md: 2 } };
export const infoArt: Sx = { position: 'relative', width: 220, height: 180, mx: 'auto', mb: 3 };
export const infoHalo: Sx = (t) => ({
  position: 'absolute', left: '50%', top: '50%', width: 132, height: 132, borderRadius: '50%', transform: 'translate(-50%, -50%)',
  display: 'grid', placeItems: 'center', color: t.tx.hl,
  background: `radial-gradient(circle, ${alpha(t.tx.hl, 0.22)}, ${alpha(t.tx.hl, 0.04)} 70%)`, border: `1px dashed ${alpha(t.tx.hl, 0.4)}`,
  '& svg': { fontSize: 60 },
});
const ORBIT = [{ left: 6, top: 18 }, { right: 6, top: 10 }, { left: 22, bottom: 4 }, { right: 18, bottom: 12 }];
export const infoBubble = (i: number, color: string): Sx => (t) => ({
  ...ORBIT[i % ORBIT.length], position: 'absolute', width: 48, height: 48, borderRadius: '16px', display: 'grid', placeItems: 'center',
  bgcolor: t.palette.background.paper, color: ink(t, color), border: `1px solid ${t.tx.line}`, boxShadow: `0 8px 22px ${alpha('#000', 0.12)}`,
  animation: `txfloat ${5 + i}s ease-in-out infinite`, ...still,
});
export const infoKick: Sx = { color: 'secondary.main', fontWeight: 800 };
export const infoTitle: Sx = { fontSize: { xs: 26, md: 34 }, fontWeight: 800, lineHeight: 1.15, outline: 'none', my: 1 };
export const infoText: Sx = { color: 'text.secondary', fontSize: { xs: 15.5, md: 17 }, maxWidth: 480, mx: 'auto' };

export const analyse: Sx = { ...enter, textAlign: 'center', pt: { xs: 2, md: 4 } };
export const ring: Sx = { position: 'relative', display: 'inline-flex', mb: 3 };
export const ringTrack: Sx = (t) => ({ color: t.tx.line, position: 'absolute', left: 0 });
export const ringFill: Sx = { color: 'secondary.main', '& circle': { strokeLinecap: 'round' } };
export const ringNum: Sx = { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 30 };
export const checklist: Sx = { maxWidth: 380, mx: 'auto', mt: 3, textAlign: 'left' };
export const checkRow = (done: boolean): Sx => ({ display: 'flex', alignItems: 'center', gap: 1.25, py: 0.9, opacity: done ? 1 : 0.55, transition: 'opacity .3s', ...still });
export const checkIcon = (done: boolean): Sx => ({ color: done ? 'success.main' : 'text.secondary', fontSize: 24 });
export const checkText: Sx = { fontWeight: 700, fontSize: 15 };

export const resultHead: Sx = { ...enter, textAlign: 'center', mb: 3 };
export const resultKick: Sx = { color: 'secondary.main', fontWeight: 800 };
export const resultHeadline: Sx = { fontSize: { xs: 28, md: 40 }, fontWeight: 800, lineHeight: 1.12, outline: 'none', my: 1 };
export const resultLead: Sx = { color: 'text.secondary', maxWidth: 560, mx: 'auto', fontSize: { xs: 15, md: 16.5 } };
export const resultBtns: Sx = { justifyContent: 'center', mt: 2.5, flexWrap: 'wrap', gap: 1 };
export const accordion: Sx = (t) => ({ background: 'transparent', border: `1px solid ${t.tx.line}`, borderRadius: '14px !important', '&:before': { display: 'none' }, boxShadow: 'none' });

export const gate: Sx = { maxWidth: 520, mx: 'auto', textAlign: 'center', '& form': { textAlign: 'left' } };
export const gateBadge: Sx = (t) => ({ width: 64, height: 64, mx: 'auto', mb: 2, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'primary.main', color: 'primary.contrastText', boxShadow: `0 0 0 10px ${t.tx.glow}`, '& svg': { fontSize: 32 } });
export const skip: Sx = { mt: 2, color: 'text.secondary', fontWeight: 600 };
