import type { Offer, Testimonial, Utm } from "./types";

/** The real academy: every Enroll, Buy, Register and Log in button opens a page there. */
export const MAIN_SITE_URL = (import.meta.env.VITE_MAIN_SITE_URL || "https://takxila.in").replace(/\/$/, "");

/** Where this marketing site is hosted: used for canonical links, Open Graph tags and sitemap.xml. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://takxila.in").replace(/\/$/, "");

/** Paths on the main site. */
export const MAIN_PATHS = {
  register: "/register",
  login: "/login",
  courses: "/courses",
  course: (id: string) => "/course/" + id,
};

/** true: a course button opens that course on the academy LMS when it has a link there; false: always MAIN_SITE_URL/course/<id>. */
export const USE_ACADEMY_LINKS = true;

/** Added to outbound links when the visitor did not arrive with their own UTM tags. */
export const DEFAULT_UTM: Utm = { utm_source: "marketing_site", utm_medium: "website" };

export const OFFER: Offer = {
  show: true,
  text: "Limited-time prices: 20% off every AI course, and the starter courses are free.",
  cta: "Claim the offer",
  href: "/register",
  endsOn: "",
};

export const SOCIAL_LINKS: [label: "Facebook" | "Instagram" | "YouTube" | "LinkedIn" | "X", url: string][] = [
  ["Facebook", "https://www.facebook.com/"],
  ["Instagram", "https://www.instagram.com/"],
  ["YouTube", "https://www.youtube.com/"],
  ["LinkedIn", "https://www.linkedin.com/"],
  ["X", "https://x.com/"],
];

/** Learners who started with the AI course finder, shown in the social proof row. */
export const LEARNERS = 1200;

/** Sample quotes for the layout: replace them with real learner reviews (with their permission) before going live. */
export const TESTIMONIALS: Testimonial[] = [
  { name: "Working professional", role: "Operations, Pune", course: "28-Day AI Ready Challenge", quote: "Ten minutes a day was enough. By week two I was writing reports with AI instead of from scratch." },
  { name: "Business owner", role: "Retail store owner", course: "WhatsApp Automation Mastery", quote: "The WhatsApp agent now answers my customers at night. The steps were clear even without any coding." },
  { name: "Parent", role: "Parent of a 10 year old", course: "28 Days Junior AI Challenge", quote: "My son finished the missions in our own language and keeps showing us what he built." },
  { name: "Developer", role: "Freelance web developer", course: "Master The Claude Code", quote: "Practical and to the point. I ship client work faster with the agent workflows from this course." },
];

export const FREE_ROADMAP = {
  title: "Free AI career roadmap",
  sub: "A 28-day plan to go from AI beginner to AI-ready, with the tools to learn each week. We email it to you.",
};
