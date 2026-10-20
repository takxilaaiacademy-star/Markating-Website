import type { SxProps, Theme } from '@mui/material';
import type { GlobalStylesProps } from '@mui/material';

export const motion: GlobalStylesProps['styles'] = {
  '@keyframes txdrift': {
    '0%,100%': { transform: 'translate(0,0) scale(1)' },
    '33%': { transform: 'translate(80px,-50px) scale(1.15)' },
    '66%': { transform: 'translate(-60px,60px) scale(.9)' },
  },
  '@keyframes txrise': { from: { opacity: 0, transform: 'translateY(28px)' }, to: { opacity: 1, transform: 'none' } },
  '@keyframes txpop': { from: { opacity: 0, transform: 'scale(.92)' }, to: { opacity: 1, transform: 'none' } },
  '@keyframes txmarq': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
  '@keyframes txfloat': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
  '@keyframes txshimmer': { from: { backgroundPosition: '-400px 0' }, to: { backgroundPosition: '400px 0' } },
  '@keyframes txpulse': { '0%': { boxShadow: '0 0 0 0 rgba(245,185,63,.55)' }, '100%': { boxShadow: '0 0 0 16px rgba(245,185,63,0)' } },
  '@keyframes txspin': { to: { transform: 'rotate(360deg)' } },
  '@keyframes txspotlight': { '0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(.5)' }, '100%': { opacity: 1, transform: 'translate(-50%, -40%) scale(1)' } },
  '@keyframes txmeteor': { '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 }, '70%': { opacity: 1 }, '100%': { transform: 'rotate(215deg) translateX(-900px)', opacity: 0 } },
  '@keyframes txgradient': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
  '@keyframes txblurin': { from: { opacity: 0, filter: 'blur(10px)', transform: 'translateY(8px)' }, to: { opacity: 1, filter: 'blur(0)', transform: 'none' } },
  '@keyframes txflip': { from: { opacity: 0, transform: 'translateY(60%) rotateX(-70deg)', filter: 'blur(6px)' }, to: { opacity: 1, transform: 'none', filter: 'blur(0)' } },
  '@keyframes txtwinkle': { '0%,100%': { opacity: 0.15, transform: 'scale(.6)' }, '50%': { opacity: 1, transform: 'scale(1)' } },
  '.tx-theming *, .tx-theming *::before, .tx-theming *::after': { transition: 'none !important' },
  '.tx-reduce *, .tx-reduce *::before, .tx-reduce *::after': { animation: 'none !important', transition: 'none !important' },
  'iframe.goog-te-banner-frame, iframe.skiptranslate, .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame, .VIpgJd-ZVi9od-ORHb-OEVmcd, .VIpgJd-ZVi9od-aZ2wEe-wOHMyf, .VIpgJd-yAWNEb-L7lbkb':
    { display: 'none !important' },
  'body': { top: '0 !important' },
  'font[style]': { background: 'none !important', boxShadow: 'none !important' },
  '.goog-text-highlight': { background: 'none !important', boxShadow: 'none !important' },
};

export const toastStyles = {
  snackbar: { bottom: { xs: 88, md: 24 } } as SxProps<Theme>,
  alert: { fontWeight: 600, maxWidth: 'calc(100vw - 32px)' } as SxProps<Theme>,
};
