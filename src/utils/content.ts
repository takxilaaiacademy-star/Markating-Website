import { useEffect, useState } from 'react';
import type { CourseContent } from '../data/courseContent';

// The full curriculum of every course is large, so the browser never downloads all of it:
// a prerendered course page carries its own curriculum inline, and other courses are fetched
// from /content/<id>.json (written at build time) when you open them.
const cache = new Map<string, CourseContent | null>();

export const primeContent = (id: string, c: CourseContent | null) => cache.set(id, c);

export function useCourseContent(id: string): { content: CourseContent | null; loading: boolean } {
  const [, rerender] = useState(0);
  const known = cache.has(id);
  useEffect(() => {
    if (cache.has(id)) return;
    let live = true;
    fetch(`/content/${id}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<CourseContent>) : null))
      .catch(() => null)
      .then((c) => {
        cache.set(id, c);
        if (live) rerender((n) => n + 1);
      });
    return () => {
      live = false;
    };
  }, [id]);
  return { content: cache.get(id) ?? null, loading: !known };
}
