import type { Course } from "../types";
import { COURSES } from "./courses";
import { courseById } from "./recommend";

// Course length

export function hoursOf(c: Course): number {
  const m = c.meta.join(" ");
  const h = /(\d+)\+?\s*Hours/i.exec(m);
  if (h) return +h[1];
  const min = /(\d+)\s*Min/i.exec(m);
  if (min) return +min[1] / 60;
  const d = /(\d+)\s*Days/i.exec(m);
  if (d) return +d[1];
  return 6;
}

export function durationText(c: Course): string {
  const m = c.meta.join(" ");
  const d = /(\d+)\s*Days/i.exec(m);
  if (d) return d[1] + " days";
  const h = hoursOf(c);
  if (h < 1) return Math.round(h * 60) + " min";
  return h + (/\+\s*Hours/i.test(m) ? "+" : "") + " hours";
}


// Combo packs and plans

export type PackGroup = "build" | "create" | "market" | "career";
export const PACK_GROUPS: [PackGroup | "all", string][] = [
  ["all", "All"],
  ["build", "Agents & Building"],
  ["create", "Creative & Film"],
  ["market", "Marketing & Business"],
  ["career", "Career & Productivity"],
];

export interface Pack {
  id: string;
  title: string;
  group: PackGroup;
  courses: string[];
  price: number;
  rating: number;
}

/** Pack price: 30% off the courses' own prices, ending in 9 (so it always beats the 25% customized pack). */
const packPrice = (ids: string[]) =>
  Math.round(
    (ids.reduce((a, id) => a + (courseById(id)?.price ?? 0), 0) * 0.7) / 10,
  ) *
    10 -
  1;

export const PACKS: Pack[] = (
  [
    {
      id: "agent-builder",
      title: "AI Agent Builder",
      group: "build",
      courses: ["agentic", "wa-mastery", "claude-code", "job-agent"],
      rating: 4.9,
    },
    {
      id: "claude-pro",
      title: "Claude Pro",
      group: "build",
      courses: ["claude-master", "claude-code", "claude-deep", "claude-excel"],
      rating: 4.8,
    },
    {
      id: "nocode-founder",
      title: "No-Code Founder",
      group: "build",
      courses: ["lovable", "nocode-web", "wa-mastery", "ai-pm"],
      rating: 4.7,
    },
    {
      id: "content-creator",
      title: "AI Content Creator",
      group: "create",
      courses: ["omni-master", "mj-advanced", "kling-master", "canva-ai"],
      rating: 4.8,
    },
    {
      id: "filmmaker",
      title: "AI Filmmaker",
      group: "create",
      courses: [
        "film-1",
        "film-2",
        "film-3",
        "film-4",
        "film-5",
        "film-6",
        "film-7",
        "film-8",
        "film-9",
      ],
      rating: 4.9,
    },
    {
      id: "marketer",
      title: "AI Marketer",
      group: "market",
      courses: ["ai-marketing", "meta-ads", "gads-mastery", "ai-seo"],
      rating: 4.7,
    },
    {
      id: "business",
      title: "AI for Business",
      group: "market",
      courses: ["ai-finance", "ai-pm", "ai-projects", "claude-excel"],
      rating: 4.6,
    },
    {
      id: "power-user",
      title: "AI Power User",
      group: "career",
      courses: [
        "chatgpt-deep",
        "gemini",
        "perplexity",
        "deepseek",
        "genai-complete",
      ],
      rating: 4.8,
    },
    {
      id: "career-starter",
      title: "Career Starter",
      group: "career",
      courses: ["portfolio", "job-agent", "ready", "chatgpt-deep"],
      rating: 4.7,
    },
  ] as Omit<Pack, "price">[]
).map((p) => ({ ...p, price: packPrice(p.courses) }));

export const PAID = COURSES.filter((c) => c.price > 0);
export const listPrice = (ids: string[]) =>
  ids.reduce((a, id) => a + (courseById(id)?.price ?? 0), 0);
export const packList = (p: Pack) => listPrice(p.courses);

export const ALL_ACCESS_PRICE = 4999;

// Comparison table

export const COMPARE_COLS = ["Takxila", "YouTube", "Other platforms"] as const;
export const COMPARE_PRICE = ["₹159 – ₹399", "FREE", "₹10K – 50K"];
export const COMPARE_ROWS: [
  feature: string,
  takxila: boolean,
  youtube: boolean,
  others: boolean,
][] = [
  ["Affordable for everyone", true, true, false],
  ["Step-by-step structured path", true, false, true],
  ["Hands-on projects in every course", true, false, true],
  ["Certificate with a unique ID", true, false, true],
  ["Progress tracking and grades", true, false, true],
  ["Learning streaks and leaderboard", true, false, false],
  ["Course summary video before you buy", true, true, false],
  ["Hindi menus and regional-language challenges", true, false, false],
];
export const COMPARE_SAVE = 50000 - 499;

// Challenges

export const challengeDays = (c: Course) =>
  +(/(\d+)\s*Days/i.exec(c.meta.join(" "))?.[1] ?? 0);

export function howItWorks(
  c: Course,
): [title: string, hl: string, rest: string][] {
  const d = challengeDays(c);
  if (d)
    return [
      [
        "Join the challenge ",
        "by paying " + (c.price ? "₹" + c.price : "nothing"),
        "",
      ],
      ["Complete the ", "daily missions", ` in ${d} days`],
      ["Earn your ", "certificate", " and a leaderboard rank"],
    ];
  return [
    ["Enroll in ", "the course", c.price ? " for ₹" + c.price : " for free"],
    ["Finish the ", "lessons and projects", " at your pace"],
    ["Get a ", "certificate", " you can verify by its ID"],
  ];
}

export const PERKS: string[] = [
  "End-to-end curriculum: beginner to advanced",
  "Help with resume building and portfolio",
  "Notes, resources and project files",
  "Certificate with a unique verifiable ID",
  "Hands-on project after every module",
  "Grades, streaks and a learning leaderboard",
  "1:1 guidance through the Helpdesk",
];

export const COURSE_FAQ: [q: string, a: string][] = [
  [
    "Why take this course?",
    "Every lesson is practical and ends in something you can use. You learn with the real tools, step by step, and track your progress on your dashboard.",
  ],
  [
    "What is the benefit for me?",
    "You finish with working projects, a certificate you can share, and skills you can use at work or in your own business straight away.",
  ],
  [
    "How long do I have to finish?",
    "Learn at your own pace. Your progress, grades and streak are saved on your account.",
  ],
  [
    "Do I get a certificate?",
    "Yes. Complete every lesson and a certificate with a unique ID appears under Certificates, ready to download.",
  ],
];
