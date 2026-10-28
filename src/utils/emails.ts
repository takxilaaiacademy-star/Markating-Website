/**
 * Branded HTML emails for the website forms. Email apps ignore <style> blocks and modern CSS, so these are
 * table layouts with inline styles, a solid colour behind every gradient, and a PNG logo (no SVG or WebP).
 */
import { SITE, whatsappLink } from '../config/site';
import { SITE_URL, SOCIAL_LINKS } from '../config/marketing';

const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);
const para = (s: string) => esc(s).replace(/\n/g, '<br>');

const C = { ink: '#141a33', muted: '#5f6785', line: '#e6e8f2', soft: '#f5f6fb', brand: '#5b5cf0', violet: '#8b5cf6', gold: '#f5b93f', mint: '#10b981', night: '#0b1024' };
const FONT = "font-family:'Plus Jakarta Sans',Segoe UI,Roboto,Helvetica,Arial,sans-serif";

function button(href: string, label: string, kind: 'gold' | 'ghost' = 'gold') {
  const style =
    kind === 'gold'
      ? `background:${C.gold};color:${C.night};border:1px solid ${C.gold}`
      : `background:#ffffff;color:${C.brand};border:1px solid ${C.line}`;
  return `<a href="${esc(href)}" target="_blank" style="${style};display:inline-block;padding:12px 22px;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;${FONT};margin:4px 6px 4px 0">${esc(label)}</a>`;
}

/** The shared frame: dark gradient header with the logo, a white card, and the footer with social links. */
function frame({ preheader, kicker, title, body }: { preheader: string; kicker: string; title: string; body: string }) {
  const socials = SOCIAL_LINKS.map(([label, url]) => `<a href="${esc(url)}" target="_blank" style="color:#aab1d6;text-decoration:none;font-size:12px;margin:0 6px">${label}</a>`).join('·');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(kicker)}</title></head>
<body style="margin:0;padding:0;background:${C.soft}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.soft}"><tr><td align="center" style="padding:28px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;border-radius:20px;overflow:hidden;background:#ffffff;border:1px solid ${C.line}">
    <tr><td bgcolor="${C.night}" style="background:${C.night};background-image:linear-gradient(135deg,#0b1024 0%,#26206b 55%,#5b2a86 100%);padding:28px 32px 30px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="padding-right:10px"><img src="${SITE_URL}/icon-192.png" width="40" height="40" alt="" style="display:block;border-radius:10px"></td>
        <td style="${FONT};color:#ffffff;font-weight:800;font-size:17px;letter-spacing:2px">TAKXILA<div style="font-weight:600;font-size:10px;letter-spacing:3px;color:#c9b8ff">AI ACADEMY</div></td>
      </tr></table>
      <p style="${FONT};margin:26px 0 6px;color:${C.gold};font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase">${esc(kicker)}</p>
      <h1 style="${FONT};margin:0;color:#ffffff;font-size:26px;line-height:1.25;font-weight:800">${title}</h1>
    </td></tr>
    <tr><td style="${FONT};padding:28px 32px 8px;color:${C.ink};font-size:15px;line-height:1.65">${body}</td></tr>
    <tr><td style="padding:8px 32px 28px"><div style="height:1px;background:${C.line}"></div></td></tr>
    <tr><td bgcolor="${C.night}" style="background:${C.night};padding:22px 32px;text-align:center;${FONT}">
      <p style="margin:0 0 8px;color:#ffffff;font-weight:700;font-size:14px">${esc(SITE.name)}</p>
      <p style="margin:0 0 10px">${socials}</p>
      <p style="margin:0;color:#7d84a8;font-size:11px">${esc(SITE.supportEmail)} · ${esc(SITE.phoneDisplay)} · <a href="${SITE_URL}" style="color:#7d84a8">${esc(SITE_URL.replace(/^https?:\/\//, ''))}</a></p>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

function detailsTable(fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(
      ([k, v], i) =>
        `<tr><td style="padding:11px 14px;${i ? `border-top:1px solid ${C.line};` : ''}width:120px;vertical-align:top;color:${C.muted};font-size:13px;font-weight:700">${esc(k)}</td><td style="padding:11px 14px;${i ? `border-top:1px solid ${C.line};` : ''}font-size:14px;color:${C.ink}">${para(v)}</td></tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.line};border-radius:14px;border-collapse:separate;background:${C.soft}">${rows}</table>`;
}

/** The email the academy receives: who wrote, what they asked, and one-tap reply buttons. */
export function teamEmail(subject: string, lead: { name: string; email: string; phone?: string; message?: string }, fields: Record<string, string>) {
  const { Message, ...rest } = fields;
  const phone = lead.phone?.replace(/\D/g, '');
  const body = `
    <p style="margin:0 0 18px">You have a new message from <b>${esc(lead.name)}</b> on the website.</p>
    ${Message ? `<div style="margin:0 0 20px;padding:16px 18px;border-left:4px solid ${C.brand};background:#f1f0ff;border-radius:0 12px 12px 0;font-size:15px">${para(Message)}</div>` : ''}
    ${detailsTable(rest)}
    <p style="margin:22px 0 8px">
      ${button(`mailto:${lead.email}?subject=${encodeURIComponent('Re: ' + subject)}`, 'Reply by email')}
      ${phone ? button(`https://wa.me/${phone.length === 10 ? '91' + phone : phone}`, 'WhatsApp them', 'ghost') : ''}
    </p>`;
  return frame({ preheader: `${lead.name}: ${(lead.message || subject).slice(0, 90)}`, kicker: 'New website enquiry', title: esc(subject), body });
}

/** The confirmation the visitor receives, with a copy of their message and a few things to do while they wait. */
export function visitorEmail(lead: { name: string; message?: string }, topic?: string) {
  const first = lead.name.split(/\s+/)[0] || 'there';
  const link = (path: string) => `${SITE_URL}${path}${path.includes('?') ? '&' : '?'}utm_source=email&utm_medium=autoreply&utm_campaign=contact`;
  const tile = (emoji: string, title: string, text: string, href: string) =>
    `<td width="33%" valign="top" style="padding:6px"><a href="${esc(href)}" target="_blank" style="display:block;text-decoration:none;padding:16px 14px;border:1px solid ${C.line};border-radius:14px;background:${C.soft};${FONT}"><div style="font-size:22px">${emoji}</div><div style="margin-top:6px;font-weight:800;font-size:14px;color:${C.ink}">${title}</div><div style="margin-top:4px;font-size:12px;line-height:1.5;color:${C.muted}">${text}</div></a></td>`;
  const body = `
    <p style="margin:0 0 14px">Hi ${esc(first)} 👋</p>
    <p style="margin:0 0 18px">Thanks for writing to us. Your message reached the ${esc(SITE.name)} team${topic ? ` (topic: <b>${esc(topic)}</b>)` : ''}, and a real person will reply to this email <b>within one working day</b>.</p>
    ${lead.message ? `<p style="margin:0 0 6px;color:${C.muted};font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase">Your message</p><div style="margin:0 0 22px;padding:16px 18px;border-left:4px solid ${C.violet};background:#f6f2ff;border-radius:0 12px 12px 0;color:${C.ink}">${para(lead.message)}</div>` : ''}
    <p style="margin:0 0 10px;font-weight:800">While you wait ✨</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 -6px 14px"><tr>
      ${tile('🎓', 'Free courses', 'Start learning AI today, no card needed.', link('/courses?price=free'))}
      ${tile('📄', 'ATS resume', 'Build a resume that gets shortlisted.', link('/free-tools/ats-resume-builder'))}
      ${tile('🎤', 'Mock interview', 'Practise with Priya, our AI interviewer.', link('/free-tools/interview-prep'))}
    </tr></table>
    <p style="margin:6px 0 10px">Need an answer right now? We usually reply fastest on WhatsApp.</p>
    <p style="margin:0 0 6px">${button(whatsappLink('Hi Takxila, I just sent a message on the website.'), 'Chat on WhatsApp')}${button(link('/courses'), 'Explore all courses', 'ghost')}</p>
    <p style="margin:18px 0 0;color:${C.muted};font-size:13px">Cheers,<br><b style="color:${C.ink}">Team Takxila</b></p>`;
  return frame({
    preheader: `We got your message, ${first}. We will reply within one working day.`,
    kicker: 'Message received',
    title: `We got your message, ${esc(first)}! <span style="color:${C.gold}">🚀</span>`,
    body,
  });
}

/** Plain-text version of the confirmation, for email apps that do not show HTML (and FormSubmit's auto-reply). */
export function visitorText(lead: { name: string; message?: string }) {
  const first = lead.name.split(/\s+/)[0] || 'there';
  return `Hi ${first},\n\nThanks for writing to ${SITE.name}. We got your message and a real person will reply within one working day.\n\n${lead.message ? `Your message:\n${lead.message}\n\n` : ''}While you wait:\n- Free courses: ${SITE_URL}/courses?price=free\n- Free ATS resume builder: ${SITE_URL}/free-tools/ats-resume-builder\n- AI mock interview: ${SITE_URL}/free-tools/interview-prep\n\nNeed a faster answer? WhatsApp us: ${whatsappLink('Hi Takxila')}\n\nCheers,\nTeam Takxila`;
}
