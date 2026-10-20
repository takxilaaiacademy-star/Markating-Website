import type { Course } from '../types';

const cache = new Map<string, string[]>();
export function lessonsFor(c: Course): string[] {
  const hit = cache.get(c.id);
  if (hit) return hit;
  const m = /(\d+)\s*(Modules|Missions|easy steps)/i.exec(c.meta.join(' '));
  const n = Math.max(Math.min(m ? +m[1] : c.learn.length, 12), c.learn.length);
  const list = Array.from({ length: n }, (_, i) => (i < c.learn.length ? c.learn[i] : 'Hands-on project ' + (i - c.learn.length + 1)));
  cache.set(c.id, list);
  return list;
}
