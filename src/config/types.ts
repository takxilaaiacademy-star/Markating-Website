export interface Offer {
  show: boolean;
  /** Short line in the top banner */
  text: string;
  cta: string;
  /** A path on the main academy site, or a full https link */
  href: string;
  /** YYYY-MM-DD: the banner hides itself after this day. Empty: no end date. */
  endsOn: string;
}

export interface Testimonial {
  name: string;
  role: string;
  course: string;
  quote: string;
}

export type Utm = Partial<Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content', string>>;
