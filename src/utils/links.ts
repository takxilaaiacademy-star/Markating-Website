import { DEFAULT_UTM, MAIN_PATHS, MAIN_SITE_URL, USE_ACADEMY_LINKS } from '../config/marketing';
import type { Utm } from '../config/types';
import type { Course } from '../types';

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const STORE = 'tx_utm';

/** Runs once on load: UTM tags from the ad or post that brought the visitor are kept for the whole visit. */
export function captureUtm() {
  const q = new URLSearchParams(window.location.search);
  const found: Utm = {};
  KEYS.forEach((k) => {
    const v = q.get(k);
    if (v) found[k] = v.slice(0, 120);
  });
  if (!Object.keys(found).length) return;
  try {
    sessionStorage.setItem(STORE, JSON.stringify(found));
  } catch {
    /* private mode */
  }
}

export function currentUtm(): Utm {
  try {
    const raw = sessionStorage.getItem(STORE);
    if (raw) return JSON.parse(raw) as Utm;
  } catch {
    /* private mode */
  }
  return DEFAULT_UTM;
}

/** Adds UTM tags to an outbound link, keeping its own query and #hash. Pages render with the default tags (so the prerendered HTML is the same for everyone); retagOutboundLinks swaps in the visitor's own tags on click. */
export function withUtm(href: string, content?: string, utm: Utm = DEFAULT_UTM): string {
  try {
    const url = new URL(href, MAIN_SITE_URL);
    KEYS.forEach((k) => {
      const v = utm[k];
      if (v && !url.searchParams.has(k)) url.searchParams.set(k, v);
    });
    if (content && !url.searchParams.has('utm_content')) url.searchParams.set('utm_content', content);
    return url.toString();
  } catch {
    return href;
  }
}

export const mainUrl = (path: string, content?: string) => withUtm(/^https?:/.test(path) ? path : MAIN_SITE_URL + path, content);
export const registerUrl = (content = 'register') => mainUrl(MAIN_PATHS.register, content);
export const loginUrl = () => mainUrl(MAIN_PATHS.login, 'login');
export const allCoursesUrl = () => mainUrl(MAIN_PATHS.courses, 'all_courses');
export const enrollUrl = (c: Course, content = 'enroll') =>
  withUtm(USE_ACADEMY_LINKS && c.academyUrl ? c.academyUrl : MAIN_SITE_URL + MAIN_PATHS.course(c.id), content + '_' + c.id);

/** Runs once on load: when the visitor came from an ad or post, each academy link gets that visit's UTM tags at the moment it is clicked. */
export function retagOutboundLinks() {
  const host = new URL(MAIN_SITE_URL).host;
  const retag = (e: Event) => {
    const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a || a.host !== host) return;
    const utm = currentUtm();
    if (utm === DEFAULT_UTM) return;
    const url = new URL(a.href);
    KEYS.forEach((k) => {
      if (k === 'utm_content') return;
      url.searchParams.delete(k);
      const v = utm[k];
      if (v) url.searchParams.set(k, v);
    });
    a.href = url.toString();
  };
  document.addEventListener('click', retag, true);
  document.addEventListener('auxclick', retag, true);
}

/** Props for a button or link that leaves for the main site in the same tab. */
export const outbound = (href: string) => ({ component: 'a' as const, href, rel: 'noopener' });
