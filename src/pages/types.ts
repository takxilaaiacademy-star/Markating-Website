import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COURSES } from '../data/courses';
import { TRACKS } from '../data/tracks';
import type { Course, GroupId } from '../types';

/** Lesson hours across the catalogue (courses that state their length in hours). */
export const totalHours = COURSES.reduce((n, c) => {
  const m = /([\d.]+)\+?\s*Hours/i.exec(c.meta.join(' '));
  return n + (m ? +m[1] : 0);
}, 0);

export const STEPS: [icon: string, title: string, text: string][] = [
  ['target', 'Find your course', 'Browse five tracks or take the 2-minute AI score quiz to get a plan for your goal, time and budget.'],
  ['shield', 'Enroll on the academy', 'Create your account on academy.takxila.in and pay securely by UPI, card or net banking. Free courses need no payment.'],
  ['rocket', 'Learn by doing', 'Short lessons, practice tasks and a hands-on project in every module, at your own pace.'],
  ['award', 'Get certified', 'Finish every lesson and download a certificate with a unique ID for LinkedIn and your resume.'],
];

export const PERSONAS: [icon: string, who: string, line: string, courseId: string][] = [
  ['cap', 'Students', 'Get AI-ready before your first job with daily, guided missions.', 'ready'],
  ['briefcase', 'Job seekers', 'An ATS-friendly resume, a portfolio and an AI job agent, all free.', 'ats-resume'],
  ['laptop', 'Working professionals', 'Win back hours with Claude, ChatGPT and Excel workflows.', 'claude-master'],
  ['store', 'Business owners', 'Automate WhatsApp, leads and marketing with AI agents.', 'wa-mastery'],
  ['video', 'Creators', 'Make images, video, songs and films with AI.', 'film-1'],
  ['code', 'Developers & builders', 'Ship faster with Claude Code, n8n and agentic AI.', 'claude-code'],
  ['megaphone', 'Marketers', 'Run AI-powered Google, Meta and SEO campaigns.', 'meta-ads'],
  ['baby', 'Kids aged 8 to 12', '28 missions with Claude AI and Scratch, in a regional language.', 'junior'],
];

export type SortKey = 'popular' | 'price-low' | 'price-high' | 'az';
export const SORTS: [SortKey, string][] = [
  ['popular', 'Recommended'],
  ['price-low', 'Price: low to high'],
  ['price-high', 'Price: high to low'],
  ['az', 'Name: A to Z'],
];

const isTrack = (v: string | null): v is GroupId => !!v && TRACKS.some((t) => t.id === v);

/** Courses page state lives in the URL (?track=&price=&q=&sort=), so filtered views can be shared and linked from ads. */
export function useCourseFilters() {
  const [params, setParams] = useSearchParams();
  const track = isTrack(params.get('track')) ? (params.get('track') as GroupId) : 'all';
  const free = params.get('price') === 'free';
  const q = params.get('q') ?? '';
  const sort = (SORTS.find(([k]) => k === params.get('sort'))?.[0] ?? 'popular') as SortKey;

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    let out: Course[] = COURSES.filter(
      (c) => (track === 'all' || c.group === track) && (!free || c.price === 0) && words.every((w) => c.search.includes(w)),
    );
    if (sort === 'price-low') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'az') out = [...out].sort((a, b) => a.title.localeCompare(b.title));
    return out;
  }, [track, free, q, sort]);

  return { track, free, q, sort, list, update, clear: () => setParams(new URLSearchParams(), { replace: true }) };
}
