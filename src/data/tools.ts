/** The free AI career tools (pages under /free-tools). */
export interface FreeTool {
  id: 'ats-resume-builder' | 'aptitude-test' | 'interview-prep';
  name: string;
  short: string;
  kicker: string;
  title: string;
  sub: string;
  icon: string;
  color: string;
  emoji: string;
  points: string[];
  seoTitle: string;
  seoDesc: string;
  faq: [string, string][];
  /** Course shown as the next step */
  course: string;
}

export const FREE_TOOLS: FreeTool[] = [
  {
    id: 'ats-resume-builder', name: 'ATS Resume Builder', short: 'Paste a job post, get a one-page resume that scores 85+ in ATS checks. Download a clean PDF.',
    kicker: 'Free · AI resume builder', title: 'Build an ATS-friendly resume in 60 seconds', emoji: '📄',
    sub: 'Paste any job post or just type the role. Gemini AI writes your whole resume, our ATS checker scores it line by line, and you download a recruiter-ready PDF.',
    icon: 'file', color: 'var(--mint)', points: ['ATS score 85+ target', '5 recruiter-approved themes', 'Live preview + PDF download', 'Saved in your browser'],
    seoTitle: 'Free ATS-Friendly Resume Builder with AI', seoDesc: 'Free AI resume builder: paste a job description, get a one-page ATS-friendly resume that scores 85+, with live ATS check and PDF download. No sign-up.',
    faq: [
      ['Is it really free?', 'Yes. No sign-up and no payment. Your resume is saved only in your own browser.'],
      ['What is an ATS score?', 'Most companies filter resumes with an applicant tracking system. Our checker scores keywords, sections, contact details, bullet points, results and length, the same things those filters read.'],
      ['Why are some details in [brackets]?', 'We never invent facts about you. Anything we do not know, like your college or a number, is shown as an [example] for you to replace before you download.'],
      ['Does it work without the AI?', 'Yes. If the AI is busy, the resume is built on your device with our role templates and still scored by the ATS checker.'],
    ],
    course: 'ats-resume',
  },
  {
    id: 'aptitude-test', name: 'Aptitude Practice', short: 'Placement-style quant, reasoning and verbal questions with a timer, worked solutions and topic scores.',
    kicker: 'Free · AI aptitude practice', title: 'Crack the aptitude round', emoji: '🧠',
    sub: 'Unlimited practice for TCS NQT, Infosys, Accenture, bank and campus tests. Pick your topics, beat the clock, and learn the shortcut behind every answer.',
    icon: 'calculator', color: 'var(--gold)', points: ['20+ topics: quant, reasoning, verbal', 'Fresh questions from Gemini AI', 'Timer and question navigator', 'Worked solutions + weak-topic retry'],
    seoTitle: 'Free Aptitude Test Practice with Solutions', seoDesc: 'Free online aptitude practice for placements: quantitative aptitude, logical reasoning and verbal ability with timer, AI-generated questions and worked solutions.',
    faq: [
      ['Which exams is this good for?', 'Campus placements and company tests like TCS NQT, Infosys, Wipro, Accenture and Cognizant, plus bank and SSC basics.'],
      ['Are the answers correct?', 'Number questions in offline mode are generated and solved by code, so the answer is always computed. AI questions are solved step by step by the AI and come with the full working.'],
      ['Can I practise only my weak topics?', 'Yes. After each test, tap Practise weak topics to get a new set on the topics you scored below 60%.'],
    ],
    course: 'ready',
  },
  {
    id: 'interview-prep', name: 'Interview Prep', short: 'A mock interview with Priya, our AI interviewer. Talk or type, then get marks and a better answer for every question.',
    kicker: 'Free · AI mock interview', title: 'Practise your interview with an AI interviewer', emoji: '🎤',
    sub: 'Priya plans a real interview for your role, asks follow-ups when your answer is vague, and scores every answer with feedback. Or get the questions you will most likely face, with model answers.',
    icon: 'bot', color: 'var(--violet)', points: ['Role-based mock interview', 'Speak or type your answers', 'Marks out of 10 + better answer', 'Likely questions with samples'],
    seoTitle: 'Free AI Mock Interview Practice', seoDesc: 'Free AI mock interview for freshers and professionals: role-based HR, technical and behavioural questions, voice answers, marks and model answers.',
    faq: [
      ['Can I answer with my voice?', 'Yes, in Chrome and Edge. Tap the mic and speak; your words appear in the answer box. You can always type instead.'],
      ['How is my answer scored?', 'Each answer gets marks out of 10 for relevance, depth, clarity, structure and examples, plus a stronger sample answer built from what you said.'],
      ['Is my interview recorded?', 'No. Nothing is stored on our servers. Your answers are sent to the AI only to score them.'],
    ],
    course: 'job-agent',
  },
];

export const toolById = (id: string) => FREE_TOOLS.find((t) => t.id === id);
