/**
 * Gemini for the free AI tools (resume builder, aptitude practice, interview prep).
 * Runs on the server only: api/ai.js on Vercel, and the Vite dev/preview server on your computer.
 * The key comes from the environment (GEMINI_API_KEY) and never reaches the browser.
 */

const TIMEOUT_MS = 55000;
const NOT_SET_UP = 'The AI is not switched on yet (no GEMINI_API_KEY on the server), so this runs in offline mode.';
const KEY_INVALID = 'The Gemini key on the server is not valid. Create a new key (it starts with "AIza") in Google AI Studio and set GEMINI_API_KEY.';
const DAILY_LIMIT = 'The daily AI limit for this site is used up. Offline mode still works, and the AI is back tomorrow.';
const RATE_LIMIT = 'The AI is busy right now. Please wait a minute and try again.';
const SERVER_DOWN = 'The AI service is having trouble. Please try again in a moment.';
const TOO_SLOW = 'The AI took too long to answer. Please try again.';
const KEY_REASONS = ['API_KEY_INVALID', 'ACCESS_TOKEN_TYPE_UNSUPPORTED', 'API_KEY_SERVICE_BLOCKED', 'API_KEY_HTTP_REFERRER_BLOCKED', 'API_KEY_IP_ADDRESS_BLOCKED', 'SERVICE_DISABLED'];

class AiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Settings

const cfg = (env) => ({
  key: String(env.GEMINI_API_KEY || '').trim(),
  base: String(env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com').trim().replace(/\/$/, ''),
  models: [...new Set([env.GEMINI_MODEL || 'gemini-3.5-flash', ...String(env.GEMINI_FALLBACK_MODELS || 'gemini-3.5-flash-lite,gemini-3-flash-preview,gemini-2.5-flash').split(',')].map((m) => String(m).trim()).filter(Boolean))],
  perHour: Number(env.AI_REQUESTS_PER_HOUR) || 40,
  origins: String(env.AI_ALLOWED_ORIGINS || '').split(',').map((s) => s.trim().replace(/\/$/, '')).filter(Boolean),
});

// Best-effort limit per visitor (per server instance), so one visitor cannot use up the key.
const hits = new Map();
function limited(ip, perHour) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 3600000);
  if (list.length >= perHour) return true;
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return false;
}

/** Browsers send Origin on POST: only this site (and localhost) may use the key. */
function originOk(origin, host, allowed) {
  if (!origin) return true;
  let o;
  try {
    o = new URL(origin);
  } catch {
    return false;
  }
  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(o.hostname)) return true;
  if (host && o.host === host) return true;
  if (/\.vercel\.app$/.test(o.hostname) && host && /\.vercel\.app$/.test(host.split(':')[0])) return true;
  return allowed.some((a) => a === origin || a === o.host || a === o.hostname);
}

// Gemini over REST

const LEVELS = /^gemini-([3-9]|\d{2,})/;
const noLevel = new Set();

function classify(status, err) {
  const msg = String(err?.message || '').slice(0, 300);
  const details = JSON.stringify(err?.details || []);
  if (status === 401 || status === 403 || KEY_REASONS.some((r) => details.includes(r)) || (status === 400 && /API key/i.test(msg))) return ['key', msg];
  if (status === 429) return [/PerDay/.test(details) || /per day/i.test(msg) ? 'quota_day' : 'quota', msg];
  if (status === 404) return ['model', msg];
  if (status >= 500) return ['server', msg];
  return ['other', msg];
}

function textOf(payload) {
  const cand = payload?.candidates?.[0];
  if (!cand) throw new Error('no candidates');
  const text = (cand.content?.parts || []).filter((p) => !p.thought).map((p) => p.text || '').join('');
  if (!text.trim()) throw new Error('empty answer (' + cand.finishReason + ')');
  return text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
}

async function generate(c, system, prompt, schema, { temperature = 0.6, maxTokens = 8192, thinking = 'low' } = {}) {
  if (!c.key) throw new AiError(503, NOT_SET_UP);
  const end = Date.now() + TIMEOUT_MS;
  const failed = [];
  for (const model of c.models) {
    let moved = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      const left = end - Date.now();
      if (left < 2000) throw new AiError(504, TOO_SLOW);
      const gen = { responseMimeType: 'application/json', responseSchema: schema, temperature, maxOutputTokens: maxTokens };
      if (thinking && LEVELS.test(model) && !noLevel.has(model)) gen.thinkingConfig = { thinkingLevel: thinking };
      let res;
      try {
        res = await fetch(`${c.base}/v1beta/models/${model}:generateContent`, {
          method: 'POST',
          headers: { 'x-goog-api-key': c.key, 'Content-Type': 'application/json' },
          body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: gen }),
          signal: AbortSignal.timeout(left),
        });
      } catch (e) {
        if (e?.name === 'TimeoutError') throw new AiError(504, TOO_SLOW);
        throw new AiError(502, 'Could not reach the AI service. Please try again in a moment.');
      }
      if (res.ok) {
        try {
          return JSON.parse(textOf(await res.json()));
        } catch (e) {
          console.warn(`Gemini ${model} gave unusable JSON (attempt ${attempt + 1}):`, String(e).slice(0, 200));
          continue;
        }
      }
      let err = {};
      try {
        err = (await res.json()).error || {};
      } catch {
        /* not JSON */
      }
      const [kind, msg] = classify(res.status, err);
      if (res.status === 400 && gen.thinkingConfig && /think/i.test(msg)) {
        noLevel.add(model);
        continue;
      }
      console.warn(`Gemini ${model} HTTP ${res.status} (${kind}): ${msg}`);
      if (kind === 'key') throw new AiError(503, KEY_INVALID);
      if (kind === 'other') throw new AiError(502, 'The AI could not handle this request' + (msg ? ': ' + msg.slice(0, 160) : '.'));
      failed.push(kind);
      moved = true;
      break;
    }
    if (!moved) throw new AiError(502, 'The AI gave an answer we could not read. Please try again.');
  }
  if (failed.includes('quota_day')) throw new AiError(429, DAILY_LIMIT);
  if (failed.includes('quota')) throw new AiError(429, RATE_LIMIT);
  if (failed.includes('server')) throw new AiError(502, SERVER_DOWN);
  throw new AiError(503, `None of the AI models (${c.models.join(', ')}) are available. Check GEMINI_MODEL.`);
}

// Schemas and helpers

const S = { type: 'STRING' };
const STRS = { type: 'ARRAY', items: S };
const INT = { type: 'INTEGER' };
const obj = (props) => ({ type: 'OBJECT', properties: props, required: Object.keys(props), propertyOrdering: Object.keys(props) });
const str = (v, max = 4000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const arr = (v) => (Array.isArray(v) ? v : []);
const cleanPoints = (s) =>
  str(s, 6000)
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.replace(/^\s*(?:[-–—•*·▪●◦>]+|\d+[.)])\s*/, '').trim())
    .filter(Boolean)
    .join('\n');
const spoken = (t) =>
  str(t, 2000)
    .replace(/[*_#`]+/g, '')
    .replace(/^\s*question\s*\d+\s*[:.-]\s*/i, '')
    .replace(/\s+/g, ' ')
    .replace(/^"|"$/g, '')
    .trim();
const shuffle = (a) => {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
};

// Resume

const ENTRY = obj({ title: S, sub: S, from: S, to: S, points: S });
const RESUME_SCHEMA = obj({ role: S, summary: S, education: { type: 'ARRAY', items: ENTRY }, work: { type: 'ARRAY', items: ENTRY }, projects: { type: 'ARRAY', items: ENTRY }, skills: S, soft: S, keywords: STRS, notes: STRS });
const RESUME_GEN_SCHEMA = obj({
  targetJob: S, role: S, summary: S,
  education: { type: 'ARRAY', items: ENTRY }, work: { type: 'ARRAY', items: ENTRY }, projects: { type: 'ARRAY', items: ENTRY },
  courseProjects: { type: 'ARRAY', items: obj({ course: INT, title: S, tools: S, points: S }) },
  extraProjects: { type: 'ARRAY', items: ENTRY },
  skills: S, soft: S, achievements: S, interests: S, keywords: STRS, notes: STRS,
});

const RESUME_SYSTEM = `You are an expert resume writer and ATS (applicant tracking system) specialist who has screened
thousands of resumes for Indian and global employers. For a target job you write a complete, one-page,
ATS-friendly resume that scores 85+ in keyword ATS filters and impresses a recruiter in a 7-second scan.

Sources of facts: the candidate's resume (may be nearly empty) and the Takxila AI Academy courses they took
(real training they did).

EXAMPLE DETAILS IN [SQUARE BRACKETS]: the candidate will fill in what we do not know. Anything that is not in
the candidate's facts (a college, company, grade, metric, hackathon, link) is written as a realistic example
inside square brackets so the candidate sees it and replaces it, e.g. "[Your College Name]", "[Company Name]",
"cut report time by [40%]", "[8.0] CGPA", "[college hackathon]". Hard rules (breaking any is a failure):
- NEVER present an invented employer, institution, degree, certification or number without square brackets.
  Numbers from the candidate's text or the course facts are real: write them without brackets.
- Keep every education, work and project entry of the candidate in the same order and count. Copy title, sub,
  from and to exactly; you only rewrite "points". Entries whose title contains [square brackets] are example
  entries: write strong, typical bullets for that role in them, with bracketed example numbers.
- "points" is plain text, one bullet per line separated by "\\n", no bullet symbols, no markdown. Each bullet one
  line of 14-24 words starting with a strong PAST-TENSE action verb (Built, Analyzed, Automated, Designed,
  Developed, Created, Documented, Presented, Improved, Delivered...).
  Use at least 7 DIFFERENT starting verbs across the whole resume. No first person ("I", "my").
  Work: 3-5 bullets each. For the candidate's own (non-example) roles every bullet must describe work their own
  text states or clearly implies. Education: 0-2.
- At least 5 bullets across the resume contain a number (real, or a bracketed example).

Keyword coverage (this is what makes the ATS score 85+):
- Use the target job's exact keywords and phrases with the same spelling and casing. Every keyword in REQUIRED
  KEYWORDS must appear somewhere in the resume.
- "skills": comma-separated hard skills and tools: EVERY required keyword that is a skill, tool or technique,
  then the tools from the courses, then the candidate's existing skills. Max 30, no duplicates.
- "soft": comma-separated soft skills the job asks for, max 8.
- "summary": 3 sentences, 55-85 words, no first person. Opens with the target role, names 8-10 of the most
  important required keywords and mentions the Takxila AI Academy training when courses are given. Claim years
  of experience only when the candidate's request or their work entries state them.
- "role": the job title of the target job (or the target role if given).
- "keywords": the required keywords you used. "notes": 3-6 short notes (under 20 words each) on what you wrote,
  including a reminder to replace the bracketed examples and remove any skill the candidate has not used.
Write in clear international English.`;

const GEN_TASK = `Write the full resume as JSON.
- "targetJob": when the candidate gave a SHORT REQUEST instead of a job description, first write the typical job
  post for that role and level as plain text, 180-300 words: "Job title: ...", a one-line intro, then
  "Responsibilities:" and "Requirements:" with "- " lines naming the 15-20 most common hard skills, tools and
  soft skills employers ask for in that role. Everything else is written for this job post. When a job
  description is given, return "".
- Rewrite summary, role, skills, soft and every existing entry's points for the target job.
- "courseProjects": one project for EACH course listed under COURSES, in the same order (at most 3).
  "course" is the course's number. "title": a short, specific project name for what the learner built in that
  course. "tools": 3-6 comma-separated tools or methods from the course skills. "points": 3 bullets showing what
  they did and the result. Describe only work the course's topics cover. Never name a company or client.
  If COURSES is empty, return an empty array.
- "extraProjects": exactly NEW_PROJECTS strong example projects typical for this role (0 means an empty array):
  "title" a specific project name, "sub" 3-5 tools from the required keywords, "from"/"to" "" and "points"
  3 bullets with bracketed example metrics (e.g. "[10,000] records", "[35%]").
- "achievements": when the candidate has none, 2-3 example achievements for this role, one per line, with the
  specifics in brackets; otherwise "".
- "interests": 2-4 short interests that suit the role, comma separated.
Return JSON only.`;

const ENTRY_KEYS = ['education', 'work', 'projects'];
const entryOf = (e) => ({ title: str(e?.title, 300), sub: str(e?.sub, 300), from: str(e?.from, 20), to: str(e?.to, 20), points: str(e?.points, 4000) });
const filled = (e) => !!(e.title || e.sub || e.points);
const cleanResume = (r = {}) => ({
  name: str(r.name, 120), role: str(r.role, 160), phone: str(r.phone, 60), email: str(r.email, 160), city: str(r.city, 120), summary: str(r.summary, 3000),
  links: arr(r.links).slice(0, 8).map((l) => ({ label: str(l?.label, 40), url: str(l?.url, 300) })),
  education: arr(r.education).slice(0, 8).map(entryOf), work: arr(r.work).slice(0, 8).map(entryOf), projects: arr(r.projects).slice(0, 8).map(entryOf),
  skills: str(r.skills, 2000), soft: str(r.soft, 1000), languages: str(r.languages, 300), certs: str(r.certs, 3000), achievements: str(r.achievements, 3000), interests: str(r.interests, 300),
});
const resumeFacts = (r) => JSON.stringify({ role: r.role, summary: r.summary, education: r.education, work: r.work, projects: r.projects, skills: r.skills, soft: r.soft, languages: r.languages, certs: r.certs, achievements: r.achievements }, null, 1);

function coursesFacts(courses) {
  if (!courses.length) return '(none)';
  return courses
    .slice(0, 3)
    .map((c, i) => `${i}. ${str(c.title, 200)} (status: ${str(c.status, 20) || 'completed'}; lessons: ${Number(c.lessonsTotal) || '-'}; duration: ${str(c.duration, 40) || '-'})\n   skills: ${arr(c.skills).slice(0, 12).map((s) => str(s, 60)).join(', ') || '-'}\n   topics: ${arr(c.topics).slice(0, 12).map((s) => str(s, 120)).join('; ') || '-'}`)
    .join('\n');
}

function mergeResume(orig, ai, targetRole) {
  const out = { ...orig };
  out.summary = str(ai.summary, 3000) || orig.summary;
  out.role = str(targetRole, 160) || str(ai.role, 160) || orig.role;
  out.skills = str(ai.skills, 2000) || orig.skills;
  out.soft = str(ai.soft, 1000) || orig.soft;
  out.achievements = orig.achievements || cleanPoints(ai.achievements);
  out.interests = orig.interests || str(ai.interests, 300);
  for (const k of ENTRY_KEYS) {
    const fresh = arr(ai[k]);
    out[k] = orig[k].map((e, i) => {
      if (!(e.title || e.sub)) return e;
      return { ...e, points: cleanPoints(fresh[i]?.points) || e.points };
    });
  }
  return out;
}
const resumeAnswer = (orig, ai, targetRole) => ({
  resume: mergeResume(orig, ai, targetRole),
  keywords: arr(ai.keywords).map((k) => str(k, 80)).filter(Boolean).slice(0, 40),
  notes: arr(ai.notes).map((n) => str(n, 200)).filter(Boolean).slice(0, 10),
});
const required = (kws) => [...new Set(arr(kws).map((k) => str(k, 80)).filter(Boolean))].join(', ') || '(pick them from the job description)';

async function resumeGenerate(c, b) {
  const jd = str(b.jobDescription, 12000);
  const req = str(b.request, 1000);
  const targetRole = str(b.targetRole, 160);
  if (!jd && !req && !targetRole) throw new AiError(400, 'Paste a job description or type the resume you want first.');
  const resume = cleanResume(b.resume);
  const courses = arr(b.courses).slice(0, 3);
  const own = resume.projects.filter(filled);
  const newProjects = Math.max(0, 3 - own.length - Math.min(3, courses.length));
  const target = jd ? `JOB DESCRIPTION:\n"""\n${jd}\n"""` : `SHORT REQUEST (no job description; write targetJob first):\n"""\n${req || targetRole}\n"""`;
  const prompt = [
    'Tone: polished and professional, balanced and credible.',
    `Target role: ${targetRole || '(not given, take the job title from the job description)'}`,
    target,
    `REQUIRED KEYWORDS: ${required(b.keywords)}${jd ? '' : ' (typical for the role; add the other keywords your targetJob names)'}`,
    `COURSES (Takxila AI Academy, real training the candidate took):\n${coursesFacts(courses)}`,
    `NEW_PROJECTS: ${newProjects}`,
    `CANDIDATE RESUME (JSON):\n${resumeFacts(resume)}`,
    GEN_TASK,
  ].join('\n\n');
  const ai = await generate(c, RESUME_SYSTEM, prompt, RESUME_GEN_SCHEMA, { temperature: 0.5, maxTokens: 16384 });
  const out = resumeAnswer(resume, ai, targetRole);
  const used = new Set();
  const courseProjects = arr(ai.courseProjects)
    .filter((p) => Number.isInteger(p?.course) && p.course >= 0 && p.course < Math.min(3, courses.length) && !used.has(p.course) && str(p.title) && used.add(p.course))
    .map((p) => ({ title: str(p.title, 200), sub: [str(p.tools, 300).replace(/,\s*$/, ''), 'Takxila AI Academy'].filter(Boolean).join(', '), from: str(courses[p.course].from, 10), to: str(courses[p.course].to, 10), points: cleanPoints(p.points) }));
  const extra = arr(ai.extraProjects)
    .slice(0, newProjects)
    .map((p) => {
      let title = str(p?.title, 200);
      const sub = str(p?.sub, 300);
      const points = cleanPoints(p?.points);
      if (title && points && !(title + sub + points).includes('[')) title += ' [example]';
      return { title, sub, from: '', to: '', points };
    })
    .filter((p) => p.title && p.points);
  out.resume.projects = [...out.resume.projects.filter(filled), ...courseProjects, ...extra];
  out.targetJob = jd ? '' : str(ai.targetJob, 6000);
  return out;
}

async function resumeImprove(c, b) {
  const resume = cleanResume(b.resume);
  const missing = arr(b.missingKeywords).map((k) => str(k, 80)).filter(Boolean).join(', ') || '(none)';
  const tips = arr(b.tips).map((t) => '- ' + str(t, 300)).filter((t) => t.length > 2).join('\n') || '- (none)';
  const prompt = [
    'Tone: polished and professional, balanced and credible.',
    `JOB DESCRIPTION:\n"""\n${str(b.jobDescription, 12000) || '(none given)'}\n"""`,
    `REQUIRED KEYWORDS our ATS check found MISSING from the resume: ${missing}\nAdd EVERY missing keyword with the job description's spelling: skills, tools and techniques go into "skills"; soft skills into "soft"; domain words into the summary or a bullet where they fit.`,
    `ATS check tips to fix:\n${tips}`,
    `CANDIDATE RESUME (JSON):\n${resumeFacts(resume)}`,
    'Improve the resume so it scores higher in the ATS check. Keep everything already strong, every keyword already present and every [bracketed] example detail. Keep each entry\'s title, sub, from and to. Return JSON only.',
  ].join('\n\n');
  const ai = await generate(c, RESUME_SYSTEM, prompt, RESUME_SCHEMA, { temperature: 0.4, maxTokens: 16384 });
  return resumeAnswer(resume, ai, '');
}

// Aptitude practice

const MCQ_SCHEMA = obj({
  questions: {
    type: 'ARRAY',
    items: obj({ q: S, options: { type: 'ARRAY', items: S, minItems: 4, maxItems: 4 }, answer: INT, explain: S, topic: S }),
  },
});

const APTITUDE_SYSTEM = `You are a senior aptitude-test setter for Indian campus placements and company hiring tests
(TCS NQT, Infosys, Wipro, Accenture, Cognizant, AMCAT, CAT-lite and bank exams). You write fair, exam-style
multiple-choice questions with exactly one correct answer.
Rules:
- Exactly 4 options: one correct, three plausible distractors from typical mistakes (wrong formula, unit slip,
  off-by-one, reversed ratio). Similar length and style. Never "All of the above" or "None of the above".
- For numeric questions, SOLVE THE QUESTION YOURSELF STEP BY STEP BEFORE writing it, and make sure the correct
  option is exactly right. Use clean numbers (Indian context is welcome: rupees, km, trains, shops).
- "answer" is the 0-based index of the correct option.
- "explain": the full worked solution in 1-4 short steps, under 70 words, ending with the answer, plus a quick
  shortcut or trick when one exists.
- "topic": the sub-topic, e.g. "Percentages", "Time and Work", "Number Series", "Blood Relations", "Synonyms".
- Questions under 45 words, options under 14 words. No duplicates. Spread across the requested topics.
- Difficulty: easy = one step; medium = two to three steps; hard = multi-step, placement-exam level traps.
- Plain text only, no markdown or LaTeX. Use ^ for powers and / for fractions.`;

async function aptitudeMcq(c, b) {
  const count = Math.min(20, Math.max(3, Number(b.count) || 10));
  const difficulty = ['easy', 'medium', 'hard'].includes(b.difficulty) ? b.difficulty : 'medium';
  const topics = arr(b.topics).map((t) => str(t, 60)).filter(Boolean).slice(0, 12);
  const exam = str(b.exam, 80);
  const prompt = `Write exactly ${count} ${difficulty} aptitude questions.\nTopics: ${topics.join(', ') || 'a mix of quantitative, logical reasoning and verbal ability'}\n${exam ? `Style it like: ${exam}\n` : ''}Avoid these questions already seen: ${arr(b.avoid).slice(0, 30).map((q) => str(q, 120)).join(' | ') || '(none)'}\nReturn JSON only.`;
  const ai = await generate(c, APTITUDE_SYSTEM, prompt, MCQ_SCHEMA, { temperature: 0.8, maxTokens: 16384, thinking: 'medium' });
  const seen = new Set();
  const questions = [];
  for (const item of arr(ai.questions)) {
    const opts = arr(item?.options).map((o) => str(o, 200));
    const q = str(item?.q, 600);
    const a = Number(item?.answer);
    if (opts.length !== 4 || opts.some((o) => !o) || new Set(opts.map((o) => o.toLowerCase())).size !== 4 || !(a >= 0 && a <= 3) || !q || seen.has(q.toLowerCase())) continue;
    seen.add(q.toLowerCase());
    const correct = opts[a];
    const mixed = shuffle(opts);
    questions.push({ q, options: mixed, answer: mixed.indexOf(correct), explain: str(item.explain, 800), topic: str(item.topic, 60) });
    if (questions.length === count) break;
  }
  if (!questions.length) throw new AiError(502, 'The AI gave an answer we could not read. Please try again.');
  return { questions };
}

// Interview preparation

const QBANK_SCHEMA = obj({
  questions: { type: 'ARRAY', items: obj({ kind: S, q: S, why: S, tips: STRS, sample: S }) },
});

const QBANK_SYSTEM = `You are a senior hiring manager and interview coach in India. For a role you list the questions
the candidate is MOST likely to face in a real interview, and coach them to answer well.
For each question:
- "kind": hr, technical, behavioural or situational.
- "q": the question as an interviewer would ask it, under 30 words.
- "why": what the interviewer is really testing, one sentence under 20 words.
- "tips": 2-3 short, specific tips (under 16 words each) on how to answer this question.
- "sample": a strong sample answer in first person, 70-120 words, natural spoken English. Technical answers
  must be correct. Use [square brackets] for personal details the candidate must fill in (project, company,
  number). For behavioural questions use the STAR shape (Situation, Task, Action, Result).
Order: 2-3 HR openers first, then mostly technical questions for the role and level, then behavioural and
situational ones. No duplicates. Plain text only, no markdown.`;

async function interviewQuestions(c, b) {
  const p = profileOf(b.profile);
  if (!p.role) throw new AiError(400, 'Type the role you are preparing for first.');
  const count = Math.min(15, Math.max(4, Number(b.count) || 10));
  const focus = str(b.focus, 30);
  const prompt = `CANDIDATE PROFILE:\n${profileText(p)}\n\nWrite exactly ${count} questions${focus && focus !== 'mixed' ? `, mostly ${focus} questions` : ''}. Return JSON only.`;
  const ai = await generate(c, QBANK_SYSTEM, prompt, QBANK_SCHEMA, { temperature: 0.6, maxTokens: 16384 });
  const questions = arr(ai.questions)
    .map((x) => ({ kind: ['hr', 'technical', 'behavioural', 'situational'].includes(str(x?.kind).toLowerCase().replace('behavioral', 'behavioural')) ? str(x.kind).toLowerCase().replace('behavioral', 'behavioural') : 'technical', q: str(x?.q, 400), why: str(x?.why, 300), tips: arr(x?.tips).map((t) => str(t, 200)).filter(Boolean).slice(0, 4), sample: str(x?.sample, 1500) }))
    .filter((x) => x.q)
    .slice(0, count);
  if (!questions.length) throw new AiError(502, 'The AI gave an answer we could not read. Please try again.');
  return { questions };
}

const INTERVIEWER = 'Priya';
const KINDS = new Set(['icebreaker', 'resume', 'technical', 'behavioural', 'situational', 'motivation', 'followup', 'closing']);
const kindOf = (k, d = 'technical') => {
  const v = str(k).toLowerCase().replace('behavioral', 'behavioural');
  return KINDS.has(v) ? v : d;
};
const PLAN_SCHEMA = obj({ greeting: S, plan: { type: 'ARRAY', items: obj({ kind: S, topic: S, intent: S }) } });
const TURN_SCHEMA = obj({ ack: S, question: S, intent: S, kind: S, followUp: { type: 'BOOLEAN' } });
const EVAL_SCHEMA = obj({
  items: { type: 'ARRAY', items: obj({ relevance: INT, depth: INT, clarity: INT, structure: INT, examples: INT, marks: INT, verdict: { type: 'STRING', enum: ['good', 'improve', 'wrong'] }, feedback: S, better: S }) },
  summary: S, strengths: STRS, improve: STRS,
});

const PERSONA = `You are ${INTERVIEWER}, a senior HR Manager running a realistic job interview for a Takxila AI Academy learner.
You are warm, attentive and professional, like an experienced Indian corporate interviewer: you listen closely, refer
back to what the candidate actually said, and keep the conversation flowing naturally.
What you write may be spoken aloud by text-to-speech: plain conversational English, short sentences, no markdown,
no lists, no emojis, no labels like "Question 3:", no quotation marks around what you say.`;

const PLAN_SYSTEM = `${PERSONA}

TASK: before the interview starts, plan it.
"greeting": what you say when the call connects, 2-3 sentences, under 55 words. Greet the candidate by first name
(or warmly if no name), introduce yourself as Priya, name the role, say it's a short conversation of about N
questions and put them at ease. Do NOT ask a question in the greeting.
"plan": exactly N items in the order you will ask them, each with:
- "kind": one of icebreaker, resume, technical, behavioural, situational, motivation
- "topic": a SPECIFIC topic taken from the profile (a project, tool or skill); never vague when specifics exist
- "intent": one short sentence on what you want to learn about the candidate from it
Item 1 is always the icebreaker. The last item is motivation / fit. In between, balance resume deep-dives, technical
questions on the skills and target role, and at least one behavioural (STAR) question; add a situational question when
N >= 6. Size the technical depth to the experience level. No two items on the same topic.`;

const NEXT_SYSTEM = `${PERSONA}

TASK: say your next turn in the interview. Return:
"ack": a brief, natural reaction to the candidate's LAST answer (3-14 words) mentioning a concrete detail they said.
Be honest: for a weak, empty or "I don't know" answer use a neutral, kind line; never gush. Empty for the first question.
"question": ONE question, under 35 words, conversational and specific. Link it to something they said earlier where it fits.
"intent": a short internal note (under 15 words) on what this question tests.
"kind": icebreaker, resume, technical, behavioural, situational, motivation or followup.
"followUp": true when this is a follow-up on the previous answer.
How to choose:
- If the last answer was vague, very short, generic, had no example or dodged the question, and the previous question
  was NOT already a follow-up, ask ONE polite, pointed follow-up on that same topic.
- Otherwise take the next planned topic that is not yet covered; keep the final question as motivation / fit.
- Technical questions are practical and scenario-based, not textbook definitions, and match their level.
- Never repeat a question, never give the answer, never be harsh.`;

const CLOSING_SYSTEM = `${PERSONA}

TASK: the planned questions are done. Return "ack": a short reaction to their last answer (3-14 words), and "question":
invite their questions about the role or the team (under 25 words). "intent": "Candidate's questions". "kind": "closing". "followUp": false.`;

const FAREWELL_SYSTEM = `${PERSONA}

TASK: the candidate was asked if they have any questions; their reply is given. Return "ack": "". "question": your
closing words, under 70 words: if they asked something, answer briefly in general terms (never invent salaries,
policies, dates or names), then thank them, say you enjoyed the conversation, and that their detailed feedback will
appear on screen now. "intent": "Wrap-up". "kind": "closing". "followUp": false.`;

const EVAL_SYSTEM = `You are a senior interview coach assessing a mock job interview. Score honestly so the candidate
learns exactly what to fix; do not inflate scores. Answers may have been spoken and transcribed by speech recognition,
so ignore missing punctuation and small mis-heard words; judge the content.
Each question may carry the interviewer's intent in [brackets]: judge the answer against that intent.
For EACH question/answer pair, in the same order, score 0-10 on relevance, depth, clarity, structure (STAR for
behavioural questions) and examples, then "marks" 0-10 = your overall judgement for that answer.
Anchors: empty, "I don't know" or off-topic = 0-2. One vague sentence = 2-4. Relevant but generic = 4-6. Clear,
specific, structured with an example = 7-8. Outstanding = 9-10. Technically wrong statements cap marks at 4.
"verdict": "good" (7-10), "improve" (4-6), "wrong" (0-3).
"feedback": 2 sentences to the candidate ("you"), under 50 words: one concrete thing that worked (or say plainly that the
answer was missing), then the single most important fix.
"better": a strong sample answer in first person, 60-110 words, using their own facts (never invent employers, numbers
or tools; use [brackets] where facts are missing). Technically correct.
"summary": 2-3 honest sentences on overall performance and readiness. "strengths": 2-4 short points. "improve": 2-4
short, actionable points. Plain text only, no markdown.`;

function profileOf(p = {}) {
  return { name: str(p.name, 80), role: str(p.role, 120), experience: str(p.experience, 60), skills: str(p.skills, 600), company: str(p.company, 120), jd: str(p.jd, 6000), resumeText: str(p.resumeText, 6000) };
}
function profileText(p) {
  const lines = [`Name: ${p.name || 'Candidate'}`, `Target role: ${p.role || '-'}`, `Experience: ${p.experience || '-'}`, `Skills: ${p.skills || '-'}`];
  if (p.company) lines.push(`Company: ${p.company}`);
  if (p.jd) lines.push(`Job description:\n"""\n${p.jd}\n"""`);
  if (p.resumeText) lines.push(`Resume:\n"""\n${p.resumeText}\n"""`);
  return lines.join('\n');
}
const historyOf = (h) => arr(h).slice(0, 30).map((x) => ({ q: str(x?.q, 600), a: str(x?.a, 3000), intent: str(x?.intent, 200) })).filter((x) => x.q);
const historyText = (h) => h.map((x, i) => `Q${i + 1}${x.intent ? ' [' + x.intent + ']' : ''}: ${x.q}\nA${i + 1}: ${x.a || '(no answer)'}`).join('\n\n');

async function interviewPlan(c, b) {
  const p = profileOf(b.profile);
  const total = Math.min(10, Math.max(3, Number(b.total) || 6));
  const ai = await generate(c, PLAN_SYSTEM, `CANDIDATE PROFILE:\n${profileText(p)}\n\nN = ${total}.\nPlan exactly ${total} items. Return JSON.`, PLAN_SCHEMA, { temperature: 0.7, maxTokens: 8192 });
  const plan = arr(ai.plan)
    .filter((i) => str(i?.topic))
    .slice(0, total)
    .map((i, n) => ({ kind: n === 0 ? 'icebreaker' : kindOf(i.kind), topic: spoken(i.topic), intent: spoken(i.intent) }));
  if (!str(ai.greeting)) throw new AiError(502, 'The AI gave an answer we could not read. Please try again.');
  return { interviewer: INTERVIEWER, greeting: spoken(ai.greeting), plan };
}

async function interviewNext(c, b) {
  const p = profileOf(b.profile);
  const history = historyOf(b.history);
  const total = Math.min(12, Math.max(3, Number(b.total) || 6));
  const stage = ['question', 'closing', 'farewell'].includes(b.stage) ? b.stage : 'question';
  const n = history.length;
  let system;
  let prompt;
  if (stage === 'farewell') {
    const cl = historyOf([b.closing])[0] || { q: 'Do you have any questions for me?', a: '' };
    system = FAREWELL_SYSTEM;
    prompt = `CANDIDATE PROFILE:\n${profileText(p)}\n\nYou asked: ${cl.q}\nCandidate replied: ${cl.a || '(no questions)'}\nReturn JSON.`;
  } else if (stage === 'closing') {
    system = CLOSING_SYSTEM;
    prompt = `CANDIDATE PROFILE:\n${profileText(p)}\n\nINTERVIEW SO FAR:\n${historyText(history)}\nReturn JSON.`;
  } else if (n >= total) {
    return { ack: '', question: 'Thank you, that brings us to the end of the interview. I will prepare your feedback now.', intent: 'Wrap-up', kind: 'closing', followUp: false, done: true };
  } else {
    const k = n + 1;
    const plan = arr(b.plan).slice(0, 12).map((x, i) => `${i + 1}. [${str(x?.kind, 20)}] ${str(x?.topic, 200)} - ${str(x?.intent, 200)}`).join('\n') || '(no plan: choose sensibly)';
    const lastFollow = n > 0 && history[n - 1].intent.toLowerCase().startsWith('follow-up');
    system = NEXT_SYSTEM;
    prompt =
      `CANDIDATE PROFILE:\n${profileText(p)}\n\nYOUR INTERVIEW PLAN:\n${plan}\n\nINTERVIEW SO FAR:\n${n ? historyText(history) : '(not started)'}\n\nThis is question ${k} of ${total} (${total - k} left after this).` +
      (k === 1 ? ' This is the first question: the icebreaker, no ack. You have ALREADY greeted them, so go straight into a warm opener.' : '') +
      (lastFollow ? ' The previous question was already a follow-up, so move on.' : '') +
      (k === total && k > 1 ? ' This is the final question: make it the motivation / fit question.' : '') +
      ' Return JSON.';
  }
  const ai = await generate(c, system, prompt, TURN_SCHEMA, { temperature: 0.75, maxTokens: 4096 });
  if (!str(ai.question)) throw new AiError(502, 'The AI gave an answer we could not read. Please try again.');
  const follow = !!ai.followUp && stage === 'question' && n > 0;
  let intent = spoken(ai.intent);
  if (follow && !intent.toLowerCase().startsWith('follow-up')) intent = 'Follow-up: ' + (intent || 'more detail');
  return {
    ack: (n === 0 && stage === 'question') || stage === 'farewell' ? '' : spoken(ai.ack),
    question: spoken(ai.question),
    intent,
    kind: stage !== 'question' ? 'closing' : follow ? 'followup' : kindOf(ai.kind),
    followUp: follow,
    done: stage === 'farewell',
  };
}

async function interviewEvaluate(c, b) {
  const p = profileOf(b.profile);
  const history = historyOf(b.history);
  if (!history.length) throw new AiError(400, 'Answer at least one question first.');
  const ai = await generate(c, EVAL_SYSTEM, `CANDIDATE PROFILE:\n${profileText(p)}\n\nINTERVIEW (${history.length} questions):\n${historyText(history)}\n\nReturn JSON with exactly ${history.length} items, one per question, in order.`, EVAL_SCHEMA, { temperature: 0.2, maxTokens: 16384 });
  let total = 0;
  const items = history.map((h, i) => {
    const r = arr(ai.items)[i] || {};
    const answered = h.a.length >= 3;
    const marks = answered ? Math.max(0, Math.min(10, Math.round(Number(r.marks) || 0))) : 0;
    total += marks;
    return {
      q: h.q, a: h.a, marks,
      verdict: marks >= 7 ? 'good' : marks >= 4 ? 'improve' : 'wrong',
      feedback: answered ? str(r.feedback, 600) || 'This answer could not be assessed.' : 'No answer was given. Even a short, honest attempt scores better.',
      better: str(r.better, 1500),
    };
  });
  const score = Math.round((total / history.length) * 10);
  return { score, summary: str(ai.summary, 800), strengths: arr(ai.strengths).map((s) => str(s, 200)).filter(Boolean).slice(0, 6), improve: arr(ai.improve).map((s) => str(s, 200)).filter(Boolean).slice(0, 6), items };
}

const TASKS = {
  'resume.generate': resumeGenerate,
  'resume.improve': resumeImprove,
  'aptitude.mcq': aptitudeMcq,
  'interview.questions': interviewQuestions,
  'interview.plan': interviewPlan,
  'interview.next': interviewNext,
  'interview.evaluate': interviewEvaluate,
};

/**
 * One entry point for every host. Returns { status, body }.
 * req: { method, body (parsed JSON or string), origin, host, ip }
 */
export async function handleAi(req, env) {
  const c = cfg(env);
  if (req.method === 'OPTIONS') return { status: 204, body: null };
  if (req.method === 'GET') return { status: 200, body: { ai: !!c.key, reason: c.key ? '' : NOT_SET_UP } };
  if (req.method !== 'POST') return { status: 405, body: { error: 'Use POST.' } };
  if (!originOk(req.origin, req.host, c.origins)) return { status: 403, body: { error: 'This site is not allowed to use the AI.' } };
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      return { status: 400, body: { error: 'Send JSON.' } };
    }
  }
  const run = TASKS[body?.task];
  if (!run) return { status: 404, body: { error: 'Unknown AI task.' } };
  if (!c.key) return { status: 503, body: { error: NOT_SET_UP, offline: true } };
  if (limited(req.ip || 'anon', c.perHour)) return { status: 429, body: { error: 'You have used the AI a lot this hour. Offline mode still works; the AI is back soon.' } };
  try {
    return { status: 200, body: await run(c, body) };
  } catch (e) {
    if (e instanceof AiError) return { status: e.status, body: { error: e.message, offline: e.status === 503 } };
    console.error('AI task failed', e);
    return { status: 500, body: { error: 'Something went wrong with the AI. Please try again.' } };
  }
}

/** Reads a Node request into the shape handleAi wants (used by the Vite dev server). */
export async function readNodeRequest(req) {
  let raw = '';
  if (req.method === 'POST') {
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > 200000) break;
    }
  }
  return {
    method: req.method,
    body: raw,
    origin: req.headers.origin || '',
    host: req.headers['x-forwarded-host'] || req.headers.host || '',
    ip: String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim(),
  };
}
