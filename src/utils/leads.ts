import { MAIL_WEBHOOK_URL, SITE } from '../config/site';
import type { Lead } from '../types';
import { track } from './analytics';
import { teamEmail, visitorEmail, visitorText } from './emails';
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

/** Posts one email to the Apps Script webhook. text/plain + no-cors: Apps Script accepts it without a CORS preflight; the reply cannot be read, so a delivered request counts as sent. */
const postHook = (hook: string, mail: { to: string; subject: string; html: string; text: string; replyTo?: string }) =>
  fetch(hook, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(mail) });

/**
 * Sends a lead to the academy inbox: the Google Apps Script webhook first, FormSubmit if that cannot be reached.
 * Contact messages also send the visitor a branded "we got your message" email.
 */
export async function sendLead(lead: Lead): Promise<LeadRoute> {
  const topic = lead.extra?.Topic;
  const subject = `${SUBJECTS[lead.source]}${topic ? ` (${topic})` : ''}: ${lead.name}`;
  const fields = fieldsOf(lead);
  const text = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n');
  const confirm = lead.source === 'contact';
  const hook = webhook();
  let route: LeadRoute | null = null;
  if (hook) {
    try {
      await postHook(hook, { to: SITE.inbox, subject, html: teamEmail(subject, lead, fields), text, replyTo: lead.email });
      route = 'webhook';
    } catch {
      route = null;
    }
    // The visitor's copy is a nice-to-have: a failure here must not show the form as failed.
    if (route && confirm) {
      postHook(hook, { to: lead.email, subject: `We got your message, ${lead.name.split(/\s+/)[0]} 🚀 | ${SITE.name}`, html: visitorEmail(lead, topic), text: visitorText(lead), replyTo: SITE.supportEmail }).catch(() => {});
    }
  }
  if (!route) {
    const res = await fetch(FORMSUBMIT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: subject,
        _template: 'box',
        _captcha: 'false',
        _replyto: lead.email,
        ...(confirm ? { _autoresponse: visitorText(lead) } : {}),
        ...fields,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    if (!res.ok || String(data.success) === 'false') throw new Error('The message could not be sent.');
    route = 'formsubmit';
  }
  track('generate_lead', { source: lead.source });
  return route;
}
