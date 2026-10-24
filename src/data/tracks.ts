import { COURSES } from './courses';
import type { Course, GroupId } from '../types';

export interface Track {
  id: GroupId;
  name: string;
  tagline: string;
  blurb: string;
  icon: string;
  /** CSS colour token for the track's accents */
  color: string;
  /** Course shown on the track card */
  cover: string;
}

export const TRACKS: Track[] = [
  {
    id: 'challenge', name: 'AI Challenges', tagline: 'Win the AI race', icon: 'trophy', color: 'var(--gold)', cover: 'mastery-28',
    blurb: 'Daily missions for 7 to 28 days. One tool a day, real skills in weeks, not years. Includes the Junior challenge for ages 8 to 12.',
  },
  {
    id: 'agents', name: 'AI Agents & Agentic AI', tagline: 'Let AI do the work', icon: 'bot', color: 'var(--mint)', cover: 'n8n-agents',
    blurb: 'Build and sell AI agents, voice agents and WhatsApp automations with n8n, LangChain, CrewAI and more.',
  },
  {
    id: 'toolkit', name: 'Master the AI Toolkit', tagline: 'Master AI, master your future', icon: 'layers', color: 'var(--brand)', cover: 'claude-master',
    blurb: 'Deep dives into Claude, ChatGPT, Gemini, Perplexity, DeepSeek, Midjourney, Kling, Canva, Lovable and Omni.',
  },
  {
    id: 'career', name: 'AI Career Accelerator', tagline: 'Win your career with AI', icon: 'briefcase', color: 'var(--pink)', cover: 'meta-ads',
    blurb: 'AI for marketing, ads, SEO, finance, product and project management, plus a free resume builder and job agent.',
  },
  {
    id: 'film', name: 'AI Filmmaking Framework', tagline: 'Master the system, not just a tool', icon: 'film', color: 'var(--violet)', cover: 'film-3',
    blurb: 'Nine parts from prompts and images to video, voice, avatars, UGC ads, NotebookLM, lead generation and AI songs.',
  },
];

export const trackOf = (id: GroupId) => TRACKS.find((t) => t.id === id)!;
export const coursesIn = (id: GroupId): Course[] => COURSES.filter((c) => c.group === id);
export const fromPrice = (list: Course[]) => Math.min(...list.filter((c) => c.price > 0).map((c) => c.price));

export const FREE_COURSES = COURSES.filter((c) => c.price === 0);
export const PAID_COURSES = COURSES.filter((c) => c.price > 0);
export const LOWEST_PRICE = fromPrice(COURSES);

/** Hand-picked best sellers for the home page. */
export const BESTSELLERS = ['mastery-28', 'n8n-agents', 'claude-code', 'genai-complete', 'ready', 'kling-master', 'chatgpt-deep', 'meta-ads', 'film-3', 'junior', 'lovable', 'mj-advanced'];

/** The tools taught across the catalogue, for the marquee. */
export const TOOLS = [
  'ChatGPT', 'Claude', 'Claude Code', 'Gemini', 'Perplexity', 'DeepSeek', 'Midjourney', 'Kling AI', 'Google Omni', 'Canva AI', 'Lovable', 'Bolt.new', 'n8n',
  'LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'ElevenLabs', 'HeyGen', 'Suno', 'NotebookLM', 'Google Ads', 'Meta Ads', 'Zapier', 'Scratch', 'Excel',
];
