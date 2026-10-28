/** ATS score (0-100), never clamped. Weights: keywords 25, sections 15, contact 12, bullets 13, results 10, length 8, dates 7, readability 10. */

export type AtsSource = 'pdf' | 'docx' | 'txt' | 'builder';
export type CheckStatus = 'pass' | 'warn' | 'fail';

export interface AtsCheck {
  id: string;
  label: string;
  status: CheckStatus;
  points: number;
  max: number;
  detail: string;
  tips: string[];
}

export interface AtsResult {
  score: number;
  band: 'excellent' | 'good' | 'fair' | 'poor';
  checks: AtsCheck[];
  keywords: { matched: string[]; missing: string[]; fromJob: boolean } | null;
  stats: { words: number; bullets: number; numbers: number; actionVerbs: number; sections: string[] };
  notes: string[];
}

const ACTION_VERBS = [
  'achieved', 'analysed', 'analyzed', 'architected', 'automated', 'boosted', 'built', 'championed', 'coached', 'collaborated', 'conducted', 'configured', 'created',
  'cut', 'debugged', 'delivered', 'deployed', 'designed', 'developed', 'drove', 'enabled', 'engineered', 'established', 'evaluated', 'expanded', 'facilitated',
  'generated', 'grew', 'guided', 'handled', 'implemented', 'improved', 'increased', 'initiated', 'integrated', 'launched', 'led', 'managed', 'mentored', 'migrated',
  'modelled', 'modeled', 'negotiated', 'optimised', 'optimized', 'organised', 'organized', 'owned', 'planned', 'presented', 'produced', 'prototyped', 'reduced',
  'refactored', 'researched', 'resolved', 'scaled', 'saved', 'shipped', 'simplified', 'solved', 'spearheaded', 'streamlined', 'supported', 'tested', 'trained',
  'transformed', 'tuned', 'wrote', 'won', 'coordinated', 'curated', 'crafted', 'executed', 'fine-tuned', 'accelerated', 'audited', 'authored',
  'administered', 'assessed', 'assisted', 'calculated', 'completed', 'consolidated', 'contributed', 'converted', 'customised', 'customized', 'defined', 'documented',
  'drafted', 'earned', 'edited', 'enhanced', 'exceeded', 'forecasted', 'identified', 'influenced', 'introduced', 'investigated', 'maintained', 'measured',
  'monitored', 'operated', 'orchestrated', 'partnered', 'performed', 'pitched', 'prepared', 'prioritised', 'prioritized', 'programmed', 'published', 'raised',
  'rebuilt', 'recruited', 'redesigned', 'reported', 'restructured', 'reviewed', 'revamped', 'secured', 'standardised', 'standardized', 'taught', 'translated',
  'upgraded', 'validated', 'visualised', 'visualized', 'scripted', 'onboarded', 'served', 'sold', 'closed', 'ran',
];
const VERB_SET = new Set(ACTION_VERBS);

const SECTIONS: { id: string; label: string; weight: number; re: RegExp }[] = [
  { id: 'summary', label: 'Summary', weight: 3, re: /^(professional\s+)?(summary|profile|objective|about( me)?|career objective|professional profile)\b/i },
  { id: 'experience', label: 'Experience', weight: 4, re: /^(work\s+|professional\s+|relevant\s+)?(experience|employment( history)?|work history|internships?)\b/i },
  { id: 'education', label: 'Education', weight: 3, re: /^(education|academic( background| qualifications)?|qualifications)\b/i },
  { id: 'skills', label: 'Skills', weight: 3, re: /^((technical|key|core)\s+)?(skills|competencies|technologies|tech stack|skills? (&|and) tools)\b/i },
  { id: 'projects', label: 'Projects', weight: 1, re: /^((academic|personal|key)\s+)?projects?\b/i },
  { id: 'certs', label: 'Certifications', weight: 1, re: /^(certifications?|licen[cs]es?( (&|and) certifications)?|courses|achievements|awards)\b/i },
];

const STOP = new Set(
  (
    'a an and are as at be by for from has have in is it its of on or our that the to was we were will with you your this they their them who what when where which ' +
    'about across after all also am any can could do does each etc get how if into just more most must not now off only other out over per should so some such than ' +
    'then there these those through up us use using very via well while within without would able ability years year experience experienced strong good great excellent ' +
    'team teams work working role roles candidate candidates job jobs position positions company companies looking join plus preferred required requirements requirement ' +
    'responsibilities responsibility responsible including include includes knowledge understanding skills skill familiarity familiar degree bachelor bachelors master new ' +
    'based environment opportunity opportunities apply ideal hiring hire hires seeking seek joining bonus nice wanted help make ensure like along day days week weeks ' +
    'month months high level levels multiple various key minimum least related relevant hands-on ' +
    'salary salaries benefits benefit perks compensation competitive package ctc lpa per annum location locations remote hybrid onsite on-site office offices ' +
    'full-time part-time time full part permanent contract internship-based immediate immediately joiner joiners notice period shift shifts monday friday ' +
    'equal employer employment diversity inclusive inclusion culture mission vision values value offer offers offering us we\'re you\'ll you\'re we’re you’ll ' +
    'india bangalore bengaluru mumbai delhi hyderabad pune chennai noida gurgaon gurugram kolkata ahmedabad usa uk ' +
    'qualification qualifications eligibility eligible criteria apply applying applicants applicant interview interviews resume cv email send please ' +
    'description summary overview duties duty tasks task day-to-day daily wide range world-class fast-paced dynamic growing leading best exciting passionate ' +
    'one two three four five six first plus etc. i.e e.g ie eg who\'s it\'s get got want wants need needs needed someone person people individual individuals ' +
    'expected expect expectation expectations proven track record demonstrated solid deep basic proficient proficiency comfortable exposure preferably desirable ' +
    'okay ok yes no year\'s ensure ensuring provide providing provides support supporting'
  ).split(/\s+/),
);

const PHRASES = [
  'machine learning', 'deep learning', 'data analysis', 'data analytics', 'data science', 'data visualization', 'data visualisation', 'natural language processing',
  'computer vision', 'prompt engineering', 'generative ai', 'large language models', 'power bi', 'google analytics', 'google ads', 'meta ads', 'facebook ads',
  'project management', 'product management', 'customer service', 'customer success', 'problem solving', 'rest api', 'rest apis', 'web development', 'react native',
  'node.js', 'next.js', 'ci/cd', 'a/b testing', 'digital marketing', 'social media', 'content writing', 'content creation', 'microsoft excel', 'business analysis',
  'cloud computing', 'unit testing', 'version control', 'agile methodology', 'stakeholder management', 'ui/ux', 'search engine optimization', 'lead generation',
  'email marketing', 'performance marketing', 'financial modelling', 'financial modeling', 'video editing', 'graphic design', 'sales pipeline', 'cold calling',
  'ai agents', 'workflow automation', 'marketing automation', 'no-code', 'low-code', 'large language model', 'llm', 'chatgpt', 'google sheets', 'data entry',
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
const has = (text: string, term: string) => new RegExp(`(^|[^a-z0-9+#])${escapeRe(term)}($|[^a-z0-9+#])`, 'i').test(text);

const stem = (w: string) =>
  w
    .toLowerCase()
    .replace(/(ations?|ions?|ments?|ings?|ers?|ed|es|s|ly|ity|ies|ive)$/, '')
    .replace(/(e)$/, '');

const stemsOf = (text: string) => new Set((text.toLowerCase().match(/[a-z][a-z0-9+#.\-/]*[a-z0-9+#]|[a-z]/g) ?? []).map((w) => stem(w.replace(/\.$/, ''))));

function matches(text: string, stems: Set<string>, term: string): boolean {
  if (has(text, term)) return true;
  const parts = term.split(/\s+/);
  return parts.length > 1 ? parts.every((p) => has(text, p) || (p.length >= 3 && stems.has(stem(p)))) : term.length >= 4 && stems.has(stem(term));
}

export function jobKeywords(jd: string, max = 20): string[] {
  const low = jd.toLowerCase();
  const found: string[] = PHRASES.filter((p) => has(low, p));
  const counts = new Map<string, number>();
  for (const raw of low.match(/[a-z][a-z0-9+#.\-/]*[a-z0-9+#]|[a-z]/g) ?? []) {
    const w = raw.replace(/\.$/, '');
    if (w.length < 2 || STOP.has(w) || /^\d/.test(w)) continue;
    if (w.length < 3 && !/^(ai|ml|ui|ux|qa|bi|js|go|r|c#|c\+\+|hr|pr|ar|vr)$/.test(w)) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  // Capitalised words that are not at the start of a sentence are usually tools or products.
  const proper = new Set((jd.match(/(?<=[a-z0-9,;:)] )[A-Z][A-Za-z0-9+#.]{1,}/g) ?? []).map((w) => w.toLowerCase().replace(/\.$/, '')));
  const inPhrase = (w: string) => found.some((p) => p.split(/\s+/).includes(w));
  const seen = new Set<string>();
  const ranked = [...counts.entries()]
    .filter(([w]) => !inPhrase(w))
    .map(([w, n]) => [w, n + (proper.has(w) ? 2 : 0) + (/[+#./]/.test(w) ? 1 : 0)] as const)
    .filter(([w, n]) => n >= 2 || proper.has(w))
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .map(([w]) => w)
    .filter((w) => {
      const s = stem(w);
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
  return [...found, ...ranked].slice(0, max);
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const status = (points: number, max: number): CheckStatus => (points >= max * 0.8 ? 'pass' : points >= max * 0.45 ? 'warn' : 'fail');

const MONTH = '(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\.?';
const DATE_RANGE = new RegExp(`((${MONTH}\\s+)?(19|20)\\d{2}|\\d{1,2}/(19|20)\\d{2})\\s*(–|—|-|to)\\s*((${MONTH}\\s+)?(19|20)\\d{2}|\\d{1,2}/(19|20)\\d{2}|present|current|now|till date)`, 'i');
const ANY_DATE = new RegExp(`(${MONTH}\\s+(19|20)\\d{2}|\\b(19|20)\\d{2}\\b)`, 'i');
const stripNoise = (l: string) =>
  l
    .replace(new RegExp(DATE_RANGE.source, 'gi'), ' ')
    .replace(new RegExp(`${MONTH}\\s+(19|20)\\d{2}`, 'gi'), ' ')
    .replace(/\b(19|20)\d{2}\b/g, ' ')
    .replace(/\S+@\S+/g, ' ')
    .replace(/\+?\d[\d\s().-]{8,}\d/g, ' ')
    .replace(/(https?:\/\/|www\.)\S+|\S+\.(com|in|io|dev|me|org)\S*/gi, ' ');
const QUANT = /(\d+(\.\d+)?\s?(%|x\b|k\b|m\b|\+|lakh|lakhs|crore|cr\b|hrs?\b|hours|mins?\b|minutes|users|clients|customers|students|projects|days|weeks|months|people|members|leads|sales|orders|downloads|views|followers|videos|posts|pages|tickets|apps)|[₹$€£]\s?\d|\b\d{2,}\b|\b\d+\s?(to|-)\s?\d+\b)/i;

export function scoreResume(rawText: string, opts: { source?: AtsSource; jobDescription?: string } = {}): AtsResult {
  const text = rawText.replace(/\r\n?/g, '\n');
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const words = (text.match(/[A-Za-z0-9][\w'’+#./-]*/g) ?? []).length;
  const checks: AtsCheck[] = [];
  const notes: string[] = [];

  // 1. Contact information (12)
  const email = /[\w.+-]+@[\w-]+\.[\w.-]+/.test(text);
  const phone = /(\+?\d[\d\s().-]{8,}\d)/.test(text);
  const linkedin = /linkedin\.com\/|linkedin/i.test(text);
  const otherLink = /(github\.com|gitlab\.com|behance\.net|portfolio|https?:\/\/|www\.)/i.test(text);
  const contactPts = (email ? 5 : 0) + (phone ? 4 : 0) + (linkedin ? 3 : otherLink ? 2 : 0);
  checks.push({
    id: 'contact', label: 'Contact information', points: contactPts, max: 12, status: status(contactPts, 12),
    detail: [email ? 'Email found' : 'No email', phone ? 'phone found' : 'no phone', linkedin ? 'LinkedIn found' : otherLink ? 'a profile link (no LinkedIn)' : 'no LinkedIn'].join(', ') + '.',
    tips: [
      !email && 'Add a professional email address at the top.',
      !phone && 'Add a phone number with country code, e.g. +91 98765 43210.',
      !linkedin && 'Add your LinkedIn URL (linkedin.com/in/your-name); recruiters check it first.',
    ].filter(Boolean) as string[],
  });

  // 2. Standard section headings (15)
  const headingLines = lines.filter((l) => l.length <= 48 && !/[.,;]$/.test(l));
  const found = SECTIONS.filter((s) => headingLines.some((l) => s.re.test(l.replace(/[:\-–—|]+$/, '').trim())));
  const hasSec = (id: string) => found.some((s) => s.id === id);
  let sectionPts = found.reduce((n, s) => n + s.weight, 0);
  // Freshers: a Projects section stands in for most of the Experience points.
  if (!hasSec('experience') && hasSec('projects')) sectionPts += 2;
  const missingSections = SECTIONS.filter((s) => !found.includes(s) && !(s.id === 'experience' && hasSec('projects')));
  checks.push({
    id: 'sections', label: 'Standard section headings', points: sectionPts, max: 15, status: status(sectionPts, 15),
    detail: found.length ? `Found: ${found.map((s) => s.label).join(', ')}.` : 'No standard headings found.',
    tips: missingSections
      .filter((s) => s.weight >= 3)
      .map((s) => `Add a "${s.label}" section with that exact heading so the ATS can file it.`)
      .concat(found.length < 3 ? ['Avoid creative headings like "My Journey"; ATS parsers look for standard names.'] : []),
  });

  // 3. Length (8)
  const lenPts = words >= 300 && words <= 900 ? 8 : words >= 220 && words <= 1100 ? 6 : words >= 150 && words <= 1400 ? 3 : words > 0 ? 1 : 0;
  checks.push({
    id: 'length', label: 'Length', points: lenPts, max: 8, status: status(lenPts, 8),
    detail: `${words} words (aim for 300–900: about one page for freshers, two for senior roles).`,
    tips: words < 300 ? ['Add 2–4 bullet points per role or project describing what you did and the result.'] : words > 900 ? ['Trim older or less relevant items; keep the strongest 3–5 bullets per role.'] : [],
  });

  // 4. Bullets and action verbs (13)
  const bulletRe = /^([•●▪◦·*\-–—>]|\d+[.)])\s+/;
  const bulletLines = lines.filter((l) => bulletRe.test(l));
  const firstWords = (bulletLines.length ? bulletLines : lines).map((l) => l.replace(bulletRe, '').split(/\s+/)[0]?.toLowerCase().replace(/[^a-z-]/g, '') ?? '');
  const verbsUsed = new Set(firstWords.filter((w) => VERB_SET.has(w)));
  const bulletPts = clamp(bulletLines.length, 0, 8) * 0.75;
  const verbPts = clamp(verbsUsed.size, 0, 6) * (7 / 6);
  const bvPts = Math.min(13, Math.round(bulletPts + verbPts));
  checks.push({
    id: 'bullets', label: 'Bullet points and action verbs', points: bvPts, max: 13, status: status(bvPts, 13),
    detail: `${bulletLines.length} bullet point${bulletLines.length === 1 ? '' : 's'}, ${verbsUsed.size} different action verb${verbsUsed.size === 1 ? '' : 's'}${verbsUsed.size ? ` (${[...verbsUsed].slice(0, 5).join(', ')})` : ''}.`,
    tips: [
      bulletLines.length < 6 && 'Write experience and projects as bullet points, one achievement per line (aim for 6+ in total).',
      verbsUsed.size < 5 && 'Start bullets with strong verbs: Built, Automated, Led, Reduced, Launched, Improved.',
    ].filter(Boolean) as string[],
  });

  // 5. Quantified results (10): bullets and sentences only, never dates or phone numbers
  const prose = bulletLines.length ? bulletLines : lines.filter((l) => l.length > 40);
  const numberHits = prose.filter((l) => QUANT.test(stripNoise(l)));
  const ratio = prose.length ? numberHits.length / prose.length : 0;
  const qPts = numberHits.length >= 5 || (numberHits.length >= 3 && ratio >= 0.4) ? 10 : numberHits.length >= 3 ? 7 : numberHits.length >= 1 ? 4 : 0;
  checks.push({
    id: 'numbers', label: 'Quantified results', points: qPts, max: 10, status: status(qPts, 10),
    detail: `${numberHits.length} bullet${numberHits.length === 1 ? '' : 's'} with numbers, percentages or amounts (dates and phone numbers do not count).`,
    tips: qPts < 10 ? ['Add measurable impact: "cut report time by 40%", "served 1,200 users", "saved ₹2 lakh a year".'] : [],
  });

  // 6. Keywords (25)
  const jd = (opts.jobDescription ?? '').trim();
  let keywords: AtsResult['keywords'] = null;
  if (jd.length >= 40) {
    const terms = jobKeywords(jd);
    const stems = stemsOf(text);
    const matched = terms.filter((k) => matches(text, stems, k));
    const missing = terms.filter((k) => !matched.includes(k));
    const kRatio = terms.length ? matched.length / terms.length : 0;
    // 80% coverage earns the full 25: nobody should stuff every word of a job post.
    const kPts = Math.round(clamp(kRatio / 0.8, 0, 1) * 25);
    keywords = { matched, missing, fromJob: true };
    checks.push({
      id: 'keywords', label: 'Job description keywords', points: kPts, max: 25, status: status(kPts, 25),
      detail: `${matched.length} of ${terms.length} key terms from the job description appear in your resume (${Math.round(kRatio * 100)}%).`,
      tips: missing.length ? [`Work these in where they are true for you: ${missing.slice(0, 8).join(', ')}.`, 'Mirror the exact wording of the job post (e.g. "Power BI", not just "BI").'] : [],
    });
  } else {
    const skillLine = lines.findIndex((l) => SECTIONS[3].re.test(l));
    const skillText = skillLine >= 0 ? lines.slice(skillLine, skillLine + 6).join(', ') : '';
    const items = skillText.split(/[,;|•\n]/).map((s) => s.trim()).filter((s) => s.length > 1 && s.length < 40).length;
    const kPts = skillLine < 0 ? 5 : items >= 10 ? 20 : items >= 6 ? 16 : 11;
    checks.push({
      id: 'keywords', label: 'Skills keywords', points: kPts, max: 25, status: status(kPts, 25),
      detail: skillLine < 0 ? 'No skills list found.' : `About ${items} skills listed. Paste a job description for an exact keyword match.`,
      tips: [skillLine < 0 ? 'Add a Skills section listing tools and technologies, comma separated.' : items < 10 ? 'List 10–15 specific tools and skills (e.g. Python, ChatGPT API, Power BI, Zapier).' : '', 'Paste the job description to see matched and missing keywords.'].filter(Boolean),
    });
  }

  // 7. Dates (7)
  const rangeLines = lines.filter((l) => DATE_RANGE.test(l)).length;
  const dateLines = lines.filter((l) => ANY_DATE.test(l)).length;
  const dPts = rangeLines >= 2 ? 7 : rangeLines === 1 ? 5 : dateLines ? 3 : 0;
  checks.push({
    id: 'dates', label: 'Dates for roles and education', points: dPts, max: 7, status: status(dPts, 7),
    detail: rangeLines ? `${rangeLines} date range${rangeLines > 1 ? 's' : ''} found (e.g. Jan 2023 – Present).` : dateLines ? 'Some years found, but no clear date ranges.' : 'No dates found.',
    tips: rangeLines >= 2 ? [] : ['Give every job, internship and degree a "Mon YYYY – Mon YYYY" (or "– Present") date range.'],
  });

  // 8. Readability for parsers (10)
  const longLines = lines.filter((l) => l.length > 220).length;
  const capsWords = (text.match(/\b[A-Z]{4,}\b/g) ?? []).filter((w) => !/^(HTML|JSON|AWS|GCP|REST|HTTP|HTTPS|SQL|NLP|MERN|SAAS|CRUD|UI|UX|API|APIS|IELTS|TOEFL|GPA|CGPA|MBA|BTECH|MTECH|BCA|MCA|SUMMARY|EXPERIENCE|WORK|EDUCATION|SKILLS|PROJECTS|CERTIFICATIONS)$/.test(w));
  const capsRatio = words ? capsWords.length / words : 0;
  const odd = text.match(/[✀-➿☀-⛿\u{1F300}-\u{1FAFF}★☆✓✔✗✘➤➢►▶❖◆◇■□]/gu) ?? [];
  const tableish = lines.filter((l) => (l.match(/\s{4,}|\t/g) ?? []).length >= 3 || (l.match(/\|/g) ?? []).length >= 4).length;
  let rPts = 10;
  const rTips: string[] = [];
  if (longLines) { rPts -= Math.min(3, longLines); rTips.push(`${longLines} very long line${longLines > 1 ? 's' : ''}: split long paragraphs into short bullets.`); }
  if (capsRatio > 0.06) { rPts -= 3; rTips.push('Too much ALL CAPS text; use normal case for body text (headings are fine).'); }
  if (odd.length) { rPts -= Math.min(4, Math.ceil(odd.length / 3)); rTips.push(`Remove symbols ATS software mangles (${[...new Set(odd)].slice(0, 6).join(' ')}); use plain "•" bullets.`); }
  if (tableish > 2) { rPts -= 3; rTips.push('Looks like tables or columns. Use a single-column layout so the text is read in order.'); }
  rPts = clamp(rPts, 0, 10);
  checks.push({
    id: 'readability', label: 'Readability for ATS parsers', points: rPts, max: 10, status: status(rPts, 10),
    detail: rTips.length ? `${rTips.length} issue${rTips.length > 1 ? 's' : ''} found.` : 'Clean text: no long lines, heavy caps, tables or special symbols.',
    tips: rTips,
  });

  // File type (informational)
  const src = opts.source ?? 'txt';
  if (src === 'pdf') notes.push('PDF with selectable text: fine for most ATS. If a portal asks for Word, upload a .docx instead. Images and text inside pictures cannot be read.');
  else if (src === 'docx') notes.push('DOCX: the most widely supported format for ATS portals.');
  else if (src === 'txt') notes.push('Plain text is easy to parse but looks plain to humans; send a PDF or DOCX when you apply.');
  else notes.push('Scored from your builder resume. Its PDF uses real, selectable text in one column, with no tables or images.');

  const score = clamp(Math.round(checks.reduce((n, c) => n + c.points, 0)), 0, 100);
  return {
    score,
    band: score >= 85 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'fair' : 'poor',
    checks,
    keywords,
    stats: { words, bullets: bulletLines.length, numbers: numberHits.length, actionVerbs: verbsUsed.size, sections: found.map((s) => s.label) },
    notes,
  };
}
