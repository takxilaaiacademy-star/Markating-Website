/**
 * Page-wide motion, started once after hydration: reveal-on-scroll, the cursor glow on cards, 3D tilt,
 * the scroll progress bar and the bot's eyes following the cursor. All of it is skipped for visitors
 * who ask for reduced motion, and nothing here is needed to read or use the page.
 */

/** Blocks that slide in as they scroll into view. */
const REVEAL = [
  '.shead', '.ccard', '.track', '.step', '.bx', '.persona', '.cmp-row', '.freeband', '.quizband', '.final', '.faq-item', '.tool-card', '.tools-path li',
  '.freelist li', '.stats > div', '.cblock', '.buy', '.about-grid > *', '.contact-grid > *', '.apt-sec', '.iv-mode', '.rb-card', '.tool-more > *', '.fx-lamp',
].join(',');
const GLOW = '.fx-glow, .ccard, .bx, .persona, .track, .step, .quote, .freeitem';

export function initFx() {
  if (typeof window === 'undefined') return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  if (reduce || !('IntersectionObserver' in window)) return;
  root.classList.add('fx');

  // Reveal on scroll. Blocks already on screen are left alone, so nothing flickers on load.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        el.dataset.fx = 'in';
        // Hand transitions back to the page's own hover styles once the reveal is done.
        window.setTimeout(() => el.removeAttribute('data-fx'), 1300);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  const seen = new WeakSet<Element>();
  const register = (scope: ParentNode) => {
    const els = [...scope.querySelectorAll<HTMLElement>(REVEAL)];
    if (scope instanceof HTMLElement && scope.matches(REVEAL)) els.unshift(scope);
    let n = 0;
    for (const el of els) {
      if (seen.has(el)) continue;
      seen.add(el);
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) continue;
      el.style.setProperty('--fxd', String(n++ % 6));
      el.dataset.fx = 'wait';
      io.observe(el);
    }
  };
  const main = document.getElementById('root') ?? document.body;
  register(main);
  new MutationObserver((list) => {
    for (const m of list) m.addedNodes.forEach((node) => node instanceof HTMLElement && register(node));
  }).observe(main, { childList: true, subtree: true });

  // Cursor glow on cards, tilt on [data-tilt], hero cursor light, the bot's eyes.
  let raf = 0;
  let last: PointerEvent | null = null;
  let tilted: HTMLElement | null = null;
  const fab = () => document.querySelector<HTMLElement>('.txb');
  const frame = () => {
    raf = 0;
    const e = last;
    if (!e) return;
    const t = e.target instanceof Element ? e.target : null;
    const card = t?.closest<HTMLElement>(GLOW);
    if (card) {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }
    const tilt = t?.closest<HTMLElement>('[data-tilt]') ?? null;
    if (tilted && tilted !== tilt) tilted.style.transform = '';
    tilted = tilt;
    if (tilt && e.pointerType === 'mouse') {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`;
    }
    const hero = t?.closest<HTMLElement>('.hero, .phero, .chero');
    if (hero) {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--hx', `${e.clientX - r.left}px`);
      hero.style.setProperty('--hy', `${e.clientY - r.top}px`);
    }
    const b = fab();
    if (b) {
      const r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      b.style.setProperty('--ex', `${((dx / d) * Math.min(2.2, d / 60)).toFixed(2)}px`);
      b.style.setProperty('--ey', `${((dy / d) * Math.min(2.2, d / 60)).toFixed(2)}px`);
    }
  };
  window.addEventListener(
    'pointermove',
    (e) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(frame);
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => {
    if (tilted) tilted.style.transform = '';
    tilted = null;
  });

  // Scroll progress bar.
  const bar = document.createElement('div');
  bar.className = 'fx-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let sraf = 0;
  const onScroll = () => {
    sraf = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  };
  window.addEventListener('scroll', () => !sraf && (sraf = requestAnimationFrame(onScroll)), { passive: true });
  onScroll();
}
