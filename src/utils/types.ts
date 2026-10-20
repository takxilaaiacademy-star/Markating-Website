export interface PageMeta {
  title: string;
  description: string;
  /** Path on this site, for the canonical link and og:url */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>[];
}

export type LeadRoute = 'webhook' | 'formsubmit';
