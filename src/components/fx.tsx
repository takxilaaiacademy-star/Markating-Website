import { memo, type ReactNode } from 'react';
import { Box, ButtonBase, Typography, type SxProps, type Theme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { asArray, isHighlighted, useFlipWords, useMeteors, useSparkles, useTilt, type StepItem } from './types';
import { fxStyles as S } from './styles';

export function Spotlight({ color = 'white', sx }: { color?: string; sx?: SxProps<Theme> }) {
  return (
    <Box component="svg" aria-hidden viewBox="0 0 3787 2842" fill="none" sx={[S.spotlight, ...asArray(sx)]}>
      <g filter="url(#txsl)">
        <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill={color} fillOpacity="0.21" />
      </g>
      <defs>
        <filter id="txsl" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </Box>
  );
}

export function GridBackdrop({ size = 56, sx }: { size?: number; sx?: SxProps<Theme> }) {
  return <Box aria-hidden sx={[S.grid(size), ...asArray(sx)]} />;
}

export const Meteors = memo(function Meteors({ n = 14 }: { n?: number }) {
  const list = useMeteors(n);
  return (
    <Box aria-hidden sx={S.meteors}>
      {list.map((m, i) => (
        <Box key={i} sx={S.meteor(m)} />
      ))}
    </Box>
  );
});

export const Sparkles = memo(function Sparkles({ n = 36, color }: { n?: number; color?: string }) {
  const dots = useSparkles(n);
  return (
    <Box aria-hidden sx={S.sparkles}>
      {dots.map((p, i) => (
        <Box key={i} sx={S.sparkle(p, color)} />
      ))}
    </Box>
  );
});

export function TextGenerate({ text, hl = [], delay = 0, step = 70, sx }: { text: string; hl?: string[]; delay?: number; step?: number; sx?: SxProps<Theme> }) {
  return (
    <Box component="span" sx={[S.inline, ...asArray(sx)]}>
      {text.split(' ').map((w, i) => (
        <Box component="span" key={i} sx={S.word(delay + i * step, isHighlighted(w, hl))}>
          {w + ' '}
        </Box>
      ))}
    </Box>
  );
}

export function FlipWords({ words, ms = 2600, sx }: { words: string[]; ms?: number; sx?: SxProps<Theme> }) {
  const i = useFlipWords(words.length, ms);
  return (
    <Box component="span" sx={[S.flip, ...asArray(sx)]}>
      <Box component="span" key={i} sx={S.flipWord}>
        {words[i]}
      </Box>
    </Box>
  );
}

export function MovingBorderButton({ children, href, to, filled = false, sx }: { children: ReactNode; href?: string; to?: string; filled?: boolean; sx?: SxProps<Theme> }) {
  const link = to ? { component: RouterLink, to } : { component: 'a' as const, href, rel: 'noopener' };
  return (
    <ButtonBase {...link} sx={[S.moving, ...asArray(sx)]}>
      <Box component="span" sx={S.movingInner(filled)}>
        {children}
      </Box>
    </ButtonBase>
  );
}

export function TiltCard({ children, max = 9, sx, onClick }: { children: ReactNode; max?: number; sx?: SxProps<Theme>; onClick?: () => void }) {
  const { ref, move, leave } = useTilt(max);
  return (
    <Box sx={S.tiltWrap}>
      <Box ref={ref} onMouseMove={move} onMouseLeave={leave} onClick={onClick} sx={[S.tilt(!!onClick), ...asArray(sx)]}>
        {children}
      </Box>
    </Box>
  );
}

export function InfiniteRow({ children, seconds = 40, reverse = false, gap = 16 }: { children: ReactNode[]; seconds?: number; reverse?: boolean; gap?: number }) {
  return (
    <Box sx={S.marquee}>
      <Box sx={S.marqueeTrack(seconds, reverse, gap)}>
        {children}
        {children.map((c, i) => (
          <Box key={'dup' + i} aria-hidden sx={S.contents}>
            {c}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function Steps({ items }: { items: StepItem[] }) {
  return (
    <Box sx={S.steps}>
      {items.map((it, i) => (
        <Box key={it.title} sx={S.stepCard}>
          <Box sx={S.stepDot}>{it.icon ?? i + 1}</Box>
          <Typography variant="h6" sx={S.stepTitle}>
            {it.title}
          </Typography>
          <Box sx={S.stepBody}>{it.body}</Box>
        </Box>
      ))}
    </Box>
  );
}

export function Lamp({ children }: { children: ReactNode }) {
  return (
    <Box sx={S.lamp}>
      <Box aria-hidden sx={S.lampGlow} />
      <Box aria-hidden sx={S.lampBar} />
      {children}
    </Box>
  );
}

export function GradientText({ children, sx }: { children: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Box component="span" sx={[S.gradientText, ...asArray(sx)]}>
      {children}
    </Box>
  );
}
