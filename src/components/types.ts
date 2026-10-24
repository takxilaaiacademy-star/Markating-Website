import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useToast } from '../context/types';
import { EMAIL_RE, phoneOk, sendLead } from '../utils/leads';
import type { Course, LeadSource } from '../types';

export const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');
export const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s|[-(:·•|&/]\s?)\S/g, (x) => x.toUpperCase()).replace(/\bAi\b/g, 'AI').replace(/\bSeo\b/g, 'SEO').replace(/\bUgc\b/g, 'UGC').replace(/\bLlm\b/g, 'LLM').replace(/\bMvp\b/g, 'MVP').replace(/\bAts\b/g, 'ATS').replace(/\bN8n\b/g, 'n8n');
/** Some academy titles are long and in capitals; cards show a tidy version. */
export const cardTitle = (c: Course) => {
  const t = c.title.split(/\s[:|]\s|\s—\s/)[0].trim();
  const short = t.length > 70 ? t.slice(0, t.lastIndexOf(' ', 66)) + '…' : t;
  return /[a-z]/.test(short) ? short : titleCase(short);
};
export const offPct = (c: Course) => (c.was && c.price ? Math.round((1 - c.price / c.was) * 100) : 0);

export const reduced = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const NAV_LINKS: [label: string, to: string][] = [
  ['Courses', '/courses'],
  ['Free courses', '/courses?price=free'],
  ['AI score quiz', '/ai-course-finder'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

/** True after the first paint in the browser: for bits that must match the prerendered HTML first. */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

// Lead form

export type LeadField = 'name' | 'email' | 'phone' | 'message';
export interface LeadFormProps {
  source: LeadSource;
  fields: LeadField[];
  required?: LeadField[];
  cta: string;
  done: string;
  extra?: () => Record<string, string>;
  onSent?: () => void;
  inline?: boolean;
  testId?: string;
}
type Values = Record<LeadField | 'website', string>;
const EMPTY: Values = { name: '', email: '', phone: '', message: '', website: '' };

export function useLeadForm({ source, fields, required = ['name', 'email'], extra, onSent }: LeadFormProps) {
  const toast = useToast();
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const started = useRef(Date.now());

  const set = (k: LeadField | 'website') => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((x) => ({ ...x, [k]: e.target.value }));
    if (errors[k as LeadField]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const validate = () => {
    const er: Partial<Record<LeadField, string>> = {};
    fields.forEach((k) => {
      const val = v[k].trim();
      if (!val) {
        if (required.includes(k)) er[k] = 'Please fill this in.';
        return;
      }
      if (k === 'email' && !EMAIL_RE.test(val)) er[k] = 'Enter a valid email address.';
      if (k === 'phone' && !phoneOk(val)) er[k] = 'Enter a 10-digit mobile number.';
      if (k === 'name' && val.length < 2) er[k] = 'Enter your name.';
    });
    setErrors(er);
    return !Object.keys(er).length;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy || !validate()) return;
    // Bots fill the hidden field or submit instantly: pretend it worked.
    if (v.website || Date.now() - started.current < 1200) {
      setSent(true);
      onSent?.();
      return;
    }
    setBusy(true);
    try {
      await sendLead({
        source,
        name: v.name.trim() || 'Subscriber',
        email: v.email.trim(),
        phone: v.phone.trim() || undefined,
        message: v.message.trim() || undefined,
        extra: extra?.(),
      });
      setSent(true);
      onSent?.();
    } catch {
      toast('We could not send that right now. Please try again, or message us on WhatsApp.', 'error');
    } finally {
      setBusy(false);
    }
  };
  const again = () => {
    setV(EMPTY);
    setSent(false);
    started.current = Date.now();
  };
  return { v, set, errors, busy, sent, submit, again };
}
