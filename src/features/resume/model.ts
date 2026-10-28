import type { ResumeEntry } from './types';
import type { ResumeData } from './types';

/** Empty fields and sections are dropped here once, so no renderer emits a blank section or page. */

export interface DocEntry {
  title: string;
  sub: string;
  date: string;
  bullets: string[];
}

export type DocBlock =
  | { kind: 'text'; text: string }
  | { kind: 'entries'; items: DocEntry[] }
  | { kind: 'labelled'; items: { label: string; text: string }[] }
  | { kind: 'bullets'; items: string[] };

export interface DocSection {
  id: string;
  title: string;
  block: DocBlock;
}

export interface ResumeDoc {
  name: string;
  role: string;
  contact: string[];
  links: { label: string; url: string; href: string }[];
  sections: DocSection[];
}

const clean = (s: string | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();

export const month = (v: string) => {
  if (!v) return '';
  const d = new Date(v + '-01T00:00:00');
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};
export const span = (e: Pick<ResumeEntry, 'from' | 'to'>) => [month(e.from), e.to ? month(e.to) : e.from ? 'Present' : ''].filter(Boolean).join(' – ');

export const bulletLines = (s: string) =>
  (s ?? '')
    .split('\n')
    .map((l) => l.replace(/^\s*(?:[-–—•*·▪●◦>]+)\s*/, '').trim())
    .filter(Boolean);

const entries = (list: ResumeEntry[]): DocEntry[] =>
  list
    .map((e) => ({ title: clean(e.title), sub: clean(e.sub), date: span(e), bullets: bulletLines(e.points) }))
    .filter((e) => e.title || e.sub || e.bullets.length);

const prettyUrl = (u: string) => u.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/$/, '');
const href = (u: string) => (/^[a-z]+:/i.test(u) ? u : 'https://' + u);

export function buildDoc(r: ResumeData): ResumeDoc {
  const sections: DocSection[] = [];
  const summary = (r.summary ?? '').trim();
  if (summary) sections.push({ id: 'summary', title: 'Summary', block: { kind: 'text', text: summary.replace(/[ \t]+/g, ' ') } });

  const work = entries(r.work ?? []);
  if (work.length) sections.push({ id: 'work', title: 'Work Experience', block: { kind: 'entries', items: work } });

  const projects = entries(r.projects ?? []);
  if (projects.length) sections.push({ id: 'projects', title: 'Projects', block: { kind: 'entries', items: projects } });

  const education = entries(r.education ?? []);
  if (education.length) sections.push({ id: 'education', title: 'Education', block: { kind: 'entries', items: education } });

  const skills = (
    [
      ['Technical', r.skills],
      ['Soft skills', r.soft],
      ['Languages', r.languages],
      ['Interests', r.interests],
    ] as const
  )
    .map(([label, text]) => ({ label, text: clean(text) }))
    .filter((s) => s.text);
  if (skills.length) sections.push({ id: 'skills', title: 'Skills', block: { kind: 'labelled', items: skills } });

  const certs = bulletLines(r.certs ?? '');
  if (certs.length) sections.push({ id: 'certs', title: 'Certifications', block: { kind: 'bullets', items: certs } });

  const achievements = bulletLines(r.achievements ?? '');
  if (achievements.length) sections.push({ id: 'achievements', title: 'Achievements', block: { kind: 'bullets', items: achievements } });

  return {
    name: clean(r.name),
    role: clean(r.role),
    contact: [r.phone, r.email, r.city].map(clean).filter(Boolean),
    links: (r.links ?? [])
      .map((l) => ({ label: clean(l.label), url: prettyUrl(clean(l.url)), href: href(clean(l.url)) }))
      .filter((l) => l.url),
    sections,
  };
}

const wrap = (t: string, width = 110): string[] => {
  const out: string[] = [];
  for (const para of t.split('\n')) {
    let line = '';
    for (const w of para.split(/\s+/).filter(Boolean)) {
      if (line && line.length + w.length + 1 > width) {
        out.push(line);
        line = w;
      } else line = line ? line + ' ' + w : w;
    }
    if (line) out.push(line);
  }
  return out;
};

export function docToText(d: ResumeDoc): string {
  const out: string[] = [d.name, d.role, d.contact.join(' | '), d.links.map((l) => l.url).join(' | ')].filter(Boolean);
  for (const s of d.sections) {
    out.push('', s.title.toUpperCase());
    const b = s.block;
    if (b.kind === 'text') out.push(...wrap(b.text));
    else if (b.kind === 'bullets') b.items.forEach((t) => out.push('• ' + t));
    else if (b.kind === 'labelled') b.items.forEach((t) => out.push(...wrap(`${t.label}: ${t.text}`)));
    else
      b.items.forEach((e) => {
        out.push([e.title, e.date].filter(Boolean).join('    '));
        if (e.sub) out.push(e.sub);
        e.bullets.forEach((t) => out.push('• ' + t));
      });
  }
  return out.join('\n');
}

export const hasContent = (d: ResumeDoc) => !!(d.name || d.sections.length);
