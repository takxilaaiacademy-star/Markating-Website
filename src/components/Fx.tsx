/**
 * Aceternity-style effects (Spotlight, Background Beams, Meteors, Sparkles, Text Generate, Flip Words, Lamp,
 * Moving Border, Infinite Moving Cards), written in plain React + CSS so the site stays fast and prerenders.
 * Everything renders the same on the server and in the browser; motion is CSS, and it switches off for
 * visitors who ask for reduced motion.
 */
import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

/** Same "random" numbers on the server and in the browser, so hydration matches. */
const seeded = (seed: number) => () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

export function Spotlight({ className = '', fill = 'white' }: { className?: string; fill?: string }) {
  return (
    <svg className={'fx-spotlight ' + className} viewBox="0 0 3787 2842" fill="none" aria-hidden="true">
      <g filter="url(#fx-spot-blur)">
        <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill={fill} fillOpacity="0.21" />
      </g>
      <defs>
        <filter id="fx-spot-blur" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}

const BEAM_PATHS = Array.from({ length: 14 }, (_, i) => {
  const o = i * 7;
  return `M${-380 + o} ${-189 - i * 8}C${-380 + o} ${-189 - i * 8} ${-312 + o} ${216 - i * 8} ${152 + o} ${343 - i * 8}C${616 + o} ${470 - i * 8} ${684 + o} ${875 - i * 8} ${684 + o} ${875 - i * 8}`;
});

/** Background Beams: soft curved lines with light running along them. */
export function Beams({ className = '' }: { className?: string }) {
  return (
    <div className={'fx-beams ' + className} aria-hidden="true">
      <svg viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {BEAM_PATHS.map((d, i) => (
          <path key={'b' + i} d={d} stroke="url(#fx-beam-base)" strokeOpacity="0.35" strokeWidth="0.6" />
        ))}
        {BEAM_PATHS.map((d, i) =>
          i % 2 ? null : <path key={'l' + i} d={d} className="fx-beam-run" stroke="url(#fx-beam-light)" strokeWidth="1.1" pathLength={100} style={{ animationDelay: `${(i * 0.73) % 6}s`, animationDuration: `${7 + (i % 5)}s` }} />,
        )}
        <defs>
          <radialGradient id="fx-beam-base" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(352 34) rotate(90) scale(555 1560)">
            <stop offset="0.07" stopColor="var(--fx-beam-a, #6474ff)" />
            <stop offset="0.24" stopColor="var(--fx-beam-b, #9b7bff)" />
            <stop offset="0.43" stopColor="var(--fx-beam-c, #38bdf8)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fx-beam-light" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#18CCFC" stopOpacity="0" />
            <stop offset="0.3" stopColor="#18CCFC" />
            <stop offset="0.6" stopColor="#AE48FF" />
            <stop offset="1" stopColor="#F5B93F" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Meteors: thin streaks falling across a card. */
export function Meteors({ count = 14, seed = 7 }: { count?: number; seed?: number }) {
  const r = seeded(seed);
  return (
    <span className="fx-meteors" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="fx-meteor" style={{ left: `${Math.floor(r() * 110) - 5}%`, animationDelay: `${(r() * 6).toFixed(2)}s`, animationDuration: `${(4 + r() * 6).toFixed(2)}s` }} />
      ))}
    </span>
  );
}

/** Sparkles: a field of twinkling particles. */
export function Sparkles({ count = 40, seed = 3, className = '' }: { count?: number; seed?: number; className?: string }) {
  const r = seeded(seed);
  return (
    <span className={'fx-sparkles ' + className} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const s = 1 + Math.floor(r() * 3);
        return <i key={i} style={{ left: `${(r() * 100).toFixed(2)}%`, top: `${(r() * 100).toFixed(2)}%`, width: s, height: s, animationDelay: `${(r() * 4).toFixed(2)}s`, animationDuration: `${(2 + r() * 3).toFixed(2)}s` }} />;
      })}
    </span>
  );
}

/** Text Generate Effect: words fade in one by one, from blur to sharp. The full text is in the HTML for SEO. */
export function TextGenerate({ text, delay = 0, step = 0.06, className = '' }: { text: string; delay?: number; step?: number; className?: string }) {
  return (
    <span className={'fx-words ' + className}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ animationDelay: `${(delay + i * step).toFixed(2)}s` }}>
          {w}{' '}
        </span>
      ))}
    </span>
  );
}

/** Flip Words: cycles through words; the first one is in the HTML. */
export function FlipWords({ words, ms = 2600, className = '' }: { words: string[]; ms?: number; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % words.length), ms);
    return () => window.clearInterval(id);
  }, [words.length, ms]);
  return (
    <span className={'fx-flip ' + className}>
      <span key={i} className="fx-flip-word">
        {words[i].split('').map((ch, j) => (
          <span key={j} style={{ animationDelay: `${j * 0.03}s` }}>
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Lamp: a glowing light bar above a heading. */
export function Lamp({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={'fx-lamp ' + className}>
      <div className="fx-lamp-light" aria-hidden="true">
        <span className="fx-lamp-cone l" />
        <span className="fx-lamp-cone r" />
        <span className="fx-lamp-bar" />
        <span className="fx-lamp-glow" />
      </div>
      <div className="fx-lamp-body">{children}</div>
    </div>
  );
}

/** Infinite Moving Cards: a slow, pausable marquee. The copy is hidden from screen readers. */
export function InfiniteCards({ children, speed = 40, reverse, className = '' }: { children: ReactNode; speed?: number; reverse?: boolean; className?: string }) {
  const items = Children.toArray(children);
  return (
    <div className={'fx-inf ' + className} style={{ ['--fx-speed' as string]: `${speed}s` }}>
      <ul className={'fx-inf-row' + (reverse ? ' is-rev' : '')}>
        {items.map((c, i) => (
          <li key={'a' + i}>{c}</li>
        ))}
        {items.map((c, i) => (
          <li key={'b' + i} aria-hidden="true" className="fx-inf-copy">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Number Ticker: counts up when it scrolls into view. The real number is in the HTML. */
export function Ticker({ value, suffix = '', format = (n: number) => n.toLocaleString('en-IN') }: { value: number; suffix?: string; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setShown(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref} className="fx-ticker">
      {format(shown)}
      {suffix}
    </span>
  );
}

/** Score ring used by the free tools. */
export function ScoreRing({ score, size = 76, label, good = 85 }: { score: number; size?: number; label?: string; good?: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const color = score >= good ? 'var(--mint)' : score >= 60 ? 'var(--gold)' : 'var(--red)';
  return (
    <span className="ring" style={{ width: size, height: size, ['--ring' as string]: color }} role="img" aria-label={`${label ?? 'Score'} ${score} out of 100`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={r} className="ring-track" />
        <circle cx="50" cy="50" r={r} className="ring-fill" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(100, Math.max(0, score)) / 100)} />
      </svg>
      <b>{score}</b>
    </span>
  );
}
