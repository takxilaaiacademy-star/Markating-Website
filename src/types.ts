export type CatId =
  | "challenge"
  | "agents"
  | "claude"
  | "tools"
  | "creative"
  | "nocode"
  | "business"
  | "career"
  | "film";
export type GroupId = "challenge" | "agents" | "toolkit" | "career" | "film";
export type CatFilter = GroupId | "all" | "free";

export interface CourseData {
  id: string;
  cat: CatId;
  group: GroupId;
  kicker: string;
  title: string;
  short: string;
  desc: string;
  meta: string[];
  learn: string[];
  price: number;
  was: number | null;
  img: string;
  featured: boolean;
  tags: string[];
  shortName?: string;
  idNumber?: string;
  /** YYYY-MM-DD */
  startDate?: string;
  endDate?: string;
  days?: number;
  academyUrl?: string;
}

export interface Course extends CourseData {
  catLabel: string;
  video: string;
  search: string;
}

/** [value, label, tag weights, budget cap] */
export type QuizOption = [
  value: string,
  label: string,
  weights?: Record<string, number>,
  budgetCap?: number,
];

export interface Question {
  id: string;
  q: string;
  sub: string;
  opts: QuizOption[];
  only?: "onboard";
  optional?: boolean;
  multi?: boolean;
  max?: number;
}

export type Answers = Record<string, string | string[] | undefined>;


export interface Recommendation {
  id: string;
  match: number;
  why: string[];
}

export interface Plan {
  ids: string[];
  n: number;
  total: number;
  save: number;
  hours: number;
}

export type Lang =
  | "en"
  | "hi"
  | "bn"
  | "mr"
  | "gu"
  | "ta"
  | "te"
  | "kn"
  | "ml"
  | "pa"
  | "es_ar"
  | "es"
  | "fr_ca"
  | "fr"
  | "ru"
  | "ko"
  | "ja"
  | "zh_cn";

export type LeadSource = "contact" | "quiz" | "roadmap" | "newsletter";

export interface Lead {
  source: LeadSource;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  extra?: Record<string, string>;
}
