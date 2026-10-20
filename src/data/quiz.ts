// opts: [value, label, { tag: weight }, budgetCap]. only: 'onboard' = asked after login only.
import type { Question } from "../types";

export const QB: Question[] = [
  {
    id: "gender",
    only: "onboard",
    optional: true,
    q: "What is your gender?",
    sub: "This helps us personalise your experience.",
    opts: [
      ["male", "Male"],
      ["female", "Female"],
      ["other", "Prefer not to say"],
    ],
  },
  {
    id: "age",
    q: "Which age group are you in?",
    sub: "We match the course level to the learner.",
    opts: [
      ["kid", "8–12 years (a child)", { kids: 8 }],
      ["teen", "13–17 years", { beginner: 2, challenge: 2 }],
      ["young", "18–24 years", { career: 1, challenge: 1 }],
      ["adult", "25–40 years", { productivity: 1 }],
      ["senior", "40+ years", { beginner: 1, productivity: 1 }],
    ],
  },
  {
    id: "prof",
    q: "What best describes you?",
    sub: "Pick the one closest to your work today.",
    opts: [
      ["student", "Student", { career: 2, challenge: 2, beginner: 1 }],
      [
        "pro",
        "Working professional",
        { productivity: 2, claude: 1, chat: 1, excel: 1 },
      ],
      [
        "biz",
        "Business owner",
        { business: 3, marketing: 2, whatsapp: 2, automation: 1 },
      ],
      [
        "creator",
        "Freelancer or content creator",
        { content: 3, video: 2, image: 2, film: 1 },
      ],
      ["marketer", "Marketer", { marketing: 3, ads: 3, seo: 2 }],
      ["dev", "Developer or builder", { coding: 3, agents: 3, nocode: 1 }],
      ["finance", "Finance or accounting", { finance: 4, excel: 3 }],
      ["pm", "Product or project manager", { product: 4, project: 3 }],
      ["job", "Job seeker", { career: 4, jobs: 3 }],
      ["parent", "Parent of a child aged 8–12", { kids: 6 }],
      ["teacher", "Teacher or trainer", { research: 2, content: 2, chat: 1 }],
    ],
  },
  {
    id: "heard",
    only: "onboard",
    optional: true,
    q: "Where did you first hear about AI?",
    sub: "Just curious, there is no wrong answer.",
    opts: [
      ["social", "Social media"],
      ["friends", "Friends or family"],
      ["work", "At work"],
      ["news", "News or YouTube"],
      ["school", "School or college"],
    ],
  },
  {
    id: "found",
    only: "onboard",
    optional: true,
    q: "How did you find Takxila?",
    sub: "Helps us reach more people like you.",
    opts: [
      ["insta", "Instagram"],
      ["yt", "YouTube"],
      ["wa", "WhatsApp"],
      ["ref", "A friend told me"],
      ["google", "Google search"],
      ["other", "Somewhere else"],
    ],
  },
  {
    id: "level",
    q: "How well do you know AI today?",
    sub: "Be honest, we will start you at the right level.",
    opts: [
      ["new", "I have never used it", { beginner: 3, challenge: 2 }],
      ["tried", "I tried ChatGPT a few times", { beginner: 2, chat: 1 }],
      ["weekly", "I use AI every week", { intermediate: 2 }],
      [
        "build",
        "I build things with AI",
        { advanced: 3, coding: 1, agents: 1 },
      ],
    ],
  },
  {
    id: "interests",
    multi: true,
    max: 3,
    q: "What do you want to learn?",
    sub: "Pick up to 3 topics.",
    opts: [
      [
        "chat",
        "AI assistants (ChatGPT, Claude, Gemini)",
        { chat: 3, claude: 2 },
      ],
      ["code", "Coding and building apps", { coding: 3, nocode: 2 }],
      ["agents", "AI agents and automation", { agents: 3, automation: 3 }],
      ["wa", "WhatsApp marketing", { whatsapp: 4 }],
      ["mkt", "Marketing, ads and SEO", { marketing: 3, ads: 2, seo: 2 }],
      ["design", "Images and design", { image: 3, design: 3 }],
      ["video", "Video and filmmaking", { video: 3, film: 3 }],
      ["audio", "Music, voice and audio", { audio: 3, music: 2 }],
      ["career", "Career, resume and jobs", { career: 3, jobs: 3 }],
      ["money", "Finance, Excel and data", { finance: 3, excel: 3, data: 2 }],
      ["research", "Research and writing", { research: 3, writing: 2 }],
      ["biz", "Growing a business", { business: 3, marketing: 1 }],
    ],
  },
  {
    id: "goal",
    q: "What is your main goal?",
    sub: "We put the courses that serve it first.",
    opts: [
      ["job", "Get a job or a promotion", { career: 3, jobs: 2 }],
      ["grow", "Grow my business", { business: 3, marketing: 2 }],
      ["time", "Save time at work", { productivity: 3, automation: 2 }],
      ["create", "Create content", { content: 3, video: 1, image: 1 }],
      ["build", "Build apps or products", { coding: 2, nocode: 3, agents: 1 }],
      ["fun", "Learn for fun or for school", { challenge: 3, beginner: 2 }],
    ],
  },
  {
    id: "time",
    q: "How much time can you give each day?",
    sub: "Short on time? We suggest quick wins first.",
    opts: [
      ["lt2", "10–15 minutes", { quick: 3, challenge: 1 }],
      ["mid", "20–40 minutes", { challenge: 1, intermediate: 1 }],
      ["gt5", "An hour or more", { mastery: 3 }],
    ],
  },
  {
    id: "style",
    only: "onboard",
    q: "How do you like to learn?",
    sub: "Pick the format that keeps you going.",
    opts: [
      ["daily", "Daily challenges", { challenge: 4 }],
      ["self", "Self-paced in-depth courses", { mastery: 2 }],
      ["quick", "Quick wins first", { quick: 3 }],
    ],
  },
  {
    id: "budget",
    q: "What is your budget per course?",
    sub: "We only suggest courses within it.",
    opts: [
      ["free", "Free courses only", {}, 0],
      ["299", "Up to ₹299", {}, 299],
      ["499", "Up to ₹499", {}, 499],
      ["any", "No limit", {}, 1e9],
    ],
  },
];

const from = (id: string, q: string, sub: string): Question => {
  const base = QB.find((x) => x.id === id) as Question;
  return { ...base, q, sub, only: undefined, optional: false };
};

// The AI course calculator funnel. Shared ids keep QB values so course matching works; tools, coding and urgency are calc-only.
export const CALC_QB: Question[] = [
  from("goal", "What would you most like AI to help you with?", "Pick your main goal. Courses that serve it come first."),
  from("prof", "Which of these sounds most like you?", "Choose the one closest to your day-to-day."),
  from("age", "How old is the learner?", "We match the course level to who is learning."),
  from("level", "How would you rate your AI experience?", "No wrong answers. We start you at the right level."),
  {
    id: "tools",
    multi: true,
    q: "Which AI tools have you used before?",
    sub: "Select all that apply.",
    opts: [
      ["chatgpt", "ChatGPT", { chat: 1 }],
      ["claude", "Claude", { claude: 1 }],
      ["gemini", "Gemini or Copilot", { productivity: 1 }],
      ["image", "Image tools like Midjourney", { image: 1, design: 1 }],
      ["video", "Video tools like Kling or Runway", { video: 1, film: 1 }],
      ["code", "Coding assistants like Cursor", { coding: 2 }],
      ["auto", "Automation like n8n or Zapier", { automation: 2, agents: 1 }],
      ["none", "None yet", { beginner: 2 }],
    ],
  },
  {
    id: "coding",
    q: "How do you feel about writing code?",
    sub: "Plenty of our courses need zero code.",
    opts: [
      ["none", "I'd rather not touch code", { nocode: 2, beginner: 1 }],
      ["read", "I can follow simple code", { nocode: 2 }],
      ["some", "I write small scripts", { coding: 1, automation: 1 }],
      ["dev", "I code most days", { coding: 3, agents: 2 }],
    ],
  },
  from("interests", "Which areas excite you most?", "Pick up to 3."),
  from("time", "How much time can you give AI learning each day?", "Short on time? We lead with quick wins."),
  from("style", "How do you learn best?", "Pick the format that keeps you going."),
  {
    id: "urgency",
    q: "When do you want to see results?",
    sub: "We pace your plan to match.",
    opts: [
      ["week", "This week", { quick: 2, challenge: 1 }],
      ["month", "Within a month", { challenge: 1, intermediate: 1 }],
      ["quarter", "In the next 3 months", { mastery: 1 }],
      ["relax", "No rush, I'm exploring", { beginner: 1 }],
    ],
  },
  from("budget", "What's your budget per course?", "We only suggest courses within it."),
];
