import { useEffect } from 'react';
import { SITE_URL } from '../config/marketing';
import { SITE } from '../config/site';
import type { Course } from '../types';
import { trackPage } from './analytics';
import type { PageMeta } from './types';

const DEFAULT_IMAGE = '/assets/og-image.jpg';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

const abs = (path: string) => (/^https?:/.test(path) ? path : SITE_URL + path);

/** Title, description, canonical, Open Graph, Twitter and JSON-LD for the page that is open. */
export function usePageMeta({ title, description, path, image = DEFAULT_IMAGE, type = 'website', jsonLd = [] }: PageMeta) {
  const ld = JSON.stringify(jsonLd);
  useEffect(() => {
    const full = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
    document.title = full;
    setMeta('name', 'description', description);
    setCanonical(abs(path));
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', abs(path));
    setMeta('property', 'og:image', abs(image));
    setMeta('property', 'og:type', type);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', abs(image));
    document.getElementById('tx-ld-page')?.remove();
    if (ld !== '[]') {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = 'tx-ld-page';
      s.textContent = ld;
      document.head.appendChild(s);
    }
    trackPage(path, full);
  }, [title, description, path, image, type, ld]);
}

export const courseLd = (c: Course): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: c.title,
  description: c.desc,
  courseCode: c.idNumber,
  url: abs('/course/' + c.id),
  image: abs(c.img),
  inLanguage: c.id === 'junior' ? 'hi' : 'en',
  provider: { '@type': 'Organization', name: SITE.name, sameAs: SITE_URL },
  offers: { '@type': 'Offer', price: c.price, priceCurrency: 'INR', category: c.price ? 'Paid' : 'Free', availability: 'https://schema.org/InStock' },
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: c.meta[0] ? 'PT' + (parseInt(c.meta[0], 10) || 4) + 'H' : undefined },
});

export const courseListLd = (list: Course[]): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: list.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: abs('/course/' + c.id), name: c.title })),
});

export const faqLd = (qa: [string, string][]): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
