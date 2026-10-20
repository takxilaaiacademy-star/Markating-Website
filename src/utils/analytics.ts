type Fbq = ((...args: unknown[]) => void) & { queue: unknown[]; loaded: boolean; version: string; push: Fbq; callMethod?: (...a: unknown[]) => void };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: Fbq;
    _fbq?: unknown;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const ID_RE = /^[A-Za-z0-9-]+$/;

function addScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Google Analytics and the Meta Pixel load only when their ID is set in .env. */
export function initAnalytics() {
  if (GA_ID && ID_RE.test(GA_ID)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
    addScript('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
  }
  if (PIXEL_ID && ID_RE.test(PIXEL_ID)) {
    const fbq = function (this: unknown) {
      const self = window.fbq!;
      if (self.callMethod) self.callMethod.apply(this, arguments as unknown as unknown[]);
      else self.queue.push(arguments);
    } as unknown as Fbq;
    Object.assign(fbq, { queue: [], loaded: true, version: '2.0', push: fbq });
    window.fbq = fbq;
    window._fbq = fbq;
    fbq('init', PIXEL_ID);
    addScript('https://connect.facebook.net/en_US/fbevents.js');
  }
}

export function trackPage(path: string, title: string) {
  window.gtag?.('event', 'page_view', { page_path: path, page_title: title });
  window.fbq?.('track', 'PageView');
}

export function track(event: string, params: Record<string, string> = {}) {
  window.gtag?.('event', event, params);
  if (event === 'generate_lead') window.fbq?.('track', 'Lead', params);
}
