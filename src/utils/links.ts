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

/** Adds the visit's UTM tags to an outbound link, keeping its own query and #hash. */
export function withUtm(href: string, content?: string): string {
  try {
    const url = new URL(href, MAIN_SITE_URL);
    const utm = currentUtm();
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

/** Props for a button or link that leaves for the main site in the same tab. */
export const outbound = (href: string) => ({ component: 'a' as const, href, rel: 'noopener' });
