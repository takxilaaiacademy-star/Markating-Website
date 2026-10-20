import { MAIL_WEBHOOK_URL, SITE } from '../config/site';
import type { Lead } from '../types';
import { track } from './analytics';
import { currentUtm } from './links';
import type { LeadRoute } from './types';

const FORMSUBMIT = `https://formsubmit.co/ajax/${SITE.inbox}`;
const webhook = () => import.meta.env.VITE_MAIL_WEBHOOK || MAIL_WEBHOOK_URL;

const SUBJECTS: Record<Lead['source'], string> = {
  contact: 'Website enquiry',
  quiz: 'AI course finder lead',
  roadmap: 'Free AI roadmap request',
  newsletter: 'Newsletter sign-up',
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const phoneOk = (p: string) => /^\+?[\d\s-]{10,16}$/.test(p.trim()) && p.replace(/\D/g, '').length >= 10;

const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

function fieldsOf(lead: Lead): Record<string, string> {
  const utm = currentUtm();
  return {
    Name: lead.name,
    Email: lead.email,
    ...(lead.phone ? { Phone: lead.phone } : {}),
    ...(lead.message ? { Message: lead.message } : {}),
    ...lead.extra,
    Page: window.location.pathname,
    ...(utm.utm_source ? { Source: [utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean).join(' / ') } : {}),
    Sent: new Date().toLocaleString('en-IN'),
  };
}

function htmlOf(subject: string, fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:8px 12px;border:1px solid #e3e6ef;font-weight:700;background:#f6f7fb">${esc(k)}</td><td style="padding:8px 12px;border:1px solid #e3e6ef">${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');
  return `<div style="font-family:system-ui,sans-serif;color:#141a33"><h2 style="margin:0 0 12px">${esc(subject)}</h2><table style="border-collapse:collapse;font-size:14px">${rows}</table><p style="color:#6b7390;font-size:12px">Sent from the ${esc(SITE.name)} marketing website.</p></div>`;
}

/** Sends a lead to the academy inbox: the Google Apps Script webhook first, FormSubmit if that cannot be reached. */
export async function sendLead(lead: Lead): Promise<LeadRoute> {
  const subject = `${SUBJECTS[lead.source]}: ${lead.name}`;
  const fields = fieldsOf(lead);
  const text = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n');
  const hook = webhook();
  let route: LeadRoute | null = null;
  if (hook) {
    try {
      // text/plain + no-cors: Apps Script accepts it without a CORS preflight; the reply cannot be read, so a delivered request counts as sent.
      await fetch(hook, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ to: SITE.inbox, subject, html: htmlOf(subject, fields), text, replyTo: lead.email }),
      });
      route = 'webhook';
    } catch {
      route = null;
    }
  }
  if (!route) {
    const res = await fetch(FORMSUBMIT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, _template: 'table', _captcha: 'false', _replyto: lead.email, ...fields }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    if (!res.ok || String(data.success) === 'false') throw new Error('The message could not be sent.');
    route = 'formsubmit';
  }
  track('generate_lead', { source: lead.source });
  return route;
}
