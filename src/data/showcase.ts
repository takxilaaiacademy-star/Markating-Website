import type { Course } from "../types";

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
