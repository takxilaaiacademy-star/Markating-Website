/** Interview practice without the AI: a question bank, a simple interviewer and rule-based marks. */
import type { BankQuestion, Evaluation, EvalItem, HrTurn, InterviewPlan, PlanItem, Profile, Turn, TurnStage, Verdict } from './types';

export const HR_NAME = 'Priya';

const skillsOf = (p: Profile) => p.skills.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
const fresher = (p: Profile) => /student|fresher|0-1|0 /i.test(p.experience);

// Question bank (no AI)

export function offlineBank(p: Profile): BankQuestion[] {
  const [s1 = 'your main skill', s2 = s1, s3 = s2] = skillsOf(p);
  const role = p.role || 'this role';
  const f = fresher(p);
  return [
    { kind: 'hr', q: 'Tell me about yourself.', why: 'Your story, clarity and fit in under 2 minutes.', tips: ['Present, past, future: what you do now, what you did, why this role.', 'Keep it to 60-90 seconds.', `End with why ${role} excites you.`], sample: `I'm [Your Name], a ${f ? '[final-year student / recent graduate] in [your degree]' : `${role} with [X] years of experience`}. I enjoy ${s1}, and I recently [built / delivered] [a project] where I [what you did] and [the result]. I also completed practical AI training at Takxila AI Academy, which taught me to use tools like ChatGPT and Claude to work faster. I'm now looking for a ${role} role where I can use ${s1} and ${s2} to solve real problems and keep learning from a strong team.` },
    { kind: 'hr', q: `Why do you want to work as a ${role}?`, why: 'Motivation, and whether you understand the job.', tips: ['Link the role to something you have already done.', 'Show you know what the day-to-day work is.'], sample: `What I like most about ${role} work is [the part you enjoy]. I first felt this when I [project or experience], where I used ${s1} to [result]. The role lets me do that every day, and it matches where I want to grow: [your 2-year goal].` },
    { kind: 'hr', q: 'What are your strengths and one weakness?', why: 'Self-awareness and honesty.', tips: ['Prove each strength with a quick example.', 'Pick a real weakness and say what you are doing about it.'], sample: `One strength is ${s1}: in [project] I [action] and [result]. Another is learning fast; I picked up [tool] in [time]. A weakness is that I used to [real weakness], so now I [fix you use], and it has [improved how].` },
    { kind: 'technical', q: `Walk me through a project where you used ${s1}.`, why: 'Real hands-on depth, and your own contribution.', tips: ['Use I, not we, for your part.', 'Problem → approach → tools → result with a number.'], sample: `In [project], the problem was [problem]. I was responsible for [your part]. I used ${s1} to [what you built], and ${s2} for [another step]. The tricky part was [challenge]; I solved it by [approach]. The result was [number, e.g. 30% faster], and I learned [lesson].` },
    { kind: 'technical', q: `How would you explain ${s2} to someone who is not technical?`, why: 'Clarity and true understanding.', tips: ['Use a real-life analogy.', 'Then give one concrete use case.'], sample: `I'd say ${s2} is like [simple analogy]. For example, [use case in plain words]. It matters because it helps the team [benefit].` },
    { kind: 'technical', q: `What tools or AI assistants do you use to work faster as a ${role}?`, why: 'Whether you are productive and current.', tips: ['Name tools you have really used.', 'Give one example where it saved time.'], sample: `I use ${s3} daily, and AI assistants like ChatGPT and Claude to draft, check and automate routine work. For example, I [task] with [tool], which cut the time from [X] to [Y]. I always review AI output before I use it.` },
    { kind: 'behavioural', q: 'Tell me about a time you faced a tough deadline. What did you do?', why: 'Pressure handling, using the STAR method.', tips: ['Situation and task in one line each.', 'Spend most time on your actions.', 'Close with a measurable result.'], sample: 'In [situation], we had [deadline] to deliver [task]. I broke the work into [steps], [prioritised / asked for help / automated] [part], and kept the team updated daily. We delivered [on time / a day early], and [result]. I learned to [lesson].' },
    { kind: 'behavioural', q: 'Describe a mistake you made and what you learned.', why: 'Ownership and growth.', tips: ['Pick a real, small-to-medium mistake.', 'Focus on the fix and what changed after.'], sample: 'In [project] I [mistake], which caused [impact]. I owned it, told [person] right away and fixed it by [action]. Since then I [new habit], and it has not happened again.' },
    { kind: 'situational', q: 'A teammate disagrees with your approach a day before the deadline. What do you do?', why: 'Teamwork and conflict handling.', tips: ['Listen first, then compare options on facts.', 'Agree on a decision and move fast.'], sample: "I'd first listen to their reasons, because they may see a risk I missed. Then I'd compare both options on time, risk and quality. If it's still unclear, I'd ask our lead to decide quickly, and we'd both commit to it so the deadline is safe." },
    { kind: 'hr', q: 'Where do you see yourself in 3 years?', why: 'Ambition and whether you will stay.', tips: ['Show growth inside this kind of role.', 'Mention skills you will build.'], sample: `In three years I see myself as a strong ${role} who [bigger responsibility], with deeper skills in ${s1} and [new skill], and maybe mentoring new team members.` },
    { kind: 'hr', q: 'Why should we hire you?', why: 'Your pitch: skills plus attitude.', tips: ['Match 2-3 of your skills to their needs.', 'Add one proof point.'], sample: `You need someone who can [need from the job post]. I bring ${s1} and ${s2}, proven in [project] where I [result]. I learn fast, I use AI tools to work smarter, and I care about doing the job well.` },
    { kind: 'hr', q: 'Do you have any questions for us?', why: 'Curiosity and genuine interest.', tips: ['Always ask 1-2 questions.', 'Ask about the team, success in the role or learning.'], sample: 'Yes, thank you. What would success look like in the first 90 days in this role? And how does the team usually learn new tools?' },
  ];
}

// Mock interview (no AI)

function bank(p: Profile): [string, string, string][] {
  const [s1 = 'your main skill', s2 = s1, s3 = s2] = skillsOf(p);
  const role = p.role || 'this';
  const f = fresher(p);
  return [
    ['icebreaker', `To start, walk me through your background, and what draws you to the ${role} role.`, 'Background and motivation'],
    ['resume', f ? `Tell me about an academic or personal project where you used ${s1}. What was your part in it?` : `Walk me through a recent project where you used ${s1}. What was your exact contribution and the result?`, `Hands-on experience with ${s1}`],
    ['technical', `How would you explain ${s2} to a manager who is not technical?`, `Clarity on ${s2}`],
    ['behavioural', 'Tell me about a time you faced a difficult problem or deadline. What was the situation, what did you do, and how did it turn out?', 'Problem solving under pressure (STAR)'],
    ['situational', 'Suppose a teammate disagrees with your approach a day before a deadline. What would you do?', 'Teamwork and conflict handling'],
    ['technical', `How do you keep your skills in ${s3} up to date, and which AI tools help you?`, 'Learning habits'],
    ['behavioural', 'Tell me about a mistake you made in a project, and what you changed afterwards.', 'Ownership and learning from mistakes'],
    ['behavioural', 'What is one weakness you are actively working on?', 'Self-awareness'],
    ['motivation', `Why should we hire you for this ${role} position?`, 'Fit for the role'],
  ];
}

const pickN = (p: Profile, total: number) => {
  const b = bank(p);
  return total >= b.length ? b : [...b.slice(0, total - 1), b[b.length - 1]];
};

export function offlinePlan(p: Profile, total: number): InterviewPlan {
  const first = p.name.trim().split(/\s+/)[0];
  return {
    interviewer: HR_NAME,
    greeting: `Hello${first ? ' ' + first : ''}, I'm ${HR_NAME}, and I'll be your interviewer today. This is a short conversation of about ${total} questions for the ${p.role ? p.role + ' role' : 'role'}, so relax and answer as you would in a real interview.`,
    plan: pickN(p, total).map(([kind, topic, intent]): PlanItem => ({ kind, topic, intent })),
  };
}

const ACKS_GOOD = ['Thanks, that gives me a clear picture.', 'Okay, that makes sense.', 'Right, thanks for the detail.', 'Good, I follow you.'];
const ACKS_SHORT = ['Okay, thank you.', 'Alright.', "That's fine, thanks."];
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const isFollow = (t?: Turn) => !!t?.intent?.startsWith('Follow-up');

export function offlineTurn(p: Profile, history: Turn[], total: number, stage: TurnStage, closing?: Turn): HrTurn {
  const first = p.name.trim().split(/\s+/)[0];
  const last = history[history.length - 1];
  const list = last && words(last.a) >= 25 ? ACKS_GOOD : ACKS_SHORT;
  const ack = last ? list[history.length % list.length] : '';
  const base = { ack, followUp: false, done: false };
  if (stage === 'closing') return { ...base, question: 'Before we wrap up, do you have any questions for me about the role or the team?', intent: "Candidate's questions", kind: 'closing' };
  if (stage === 'farewell') {
    const asked = closing && words(closing.a) > 4 && !/^no\b/i.test(closing.a.trim());
    return { ...base, ack: '', done: true, kind: 'closing', intent: 'Wrap-up', question: `${asked ? "That's a good question; the hiring team will share the specifics with you. " : ''}Thank you${first ? ', ' + first : ''}, I enjoyed talking with you. Your detailed feedback will appear on the screen now.` };
  }
  if (history.length >= total) return { ...base, question: '', intent: '', kind: 'closing', done: true };
  if (last && words(last.a) < 12 && !isFollow(last) && history.length < total - 1)
    return { ...base, followUp: true, kind: 'followup', intent: 'Follow-up: a concrete example', question: 'Could you give me a specific example of that? What exactly did you do, and what was the result?' };
  const asked = history.filter((t) => !isFollow(t)).length;
  const plan = pickN(p, total);
  const [kind, question, intent] = history.length === total - 1 ? plan[plan.length - 1] : plan[Math.min(asked, plan.length - 1)];
  return { ...base, question, intent, kind };
}

const STOP = new Set('a an and are as at be but by for from has have i in is it me my of on or our so that the their them then there this to was we were what when where which who why will with you your about into just like more most also very can could would should been being do does did'.split(' '));
const FILLERS = ['um', 'uh', 'umm', 'like', 'basically', 'actually', 'you know', 'kind of', 'sort of', 'i mean', 'literally'];
const STAR = ['situation', 'task', 'action', 'result', 'outcome', 'impact', 'for example', 'for instance', 'because', 'so that', 'i led', 'i built', 'i improved', 'i decided', 'we achieved', 'learned'];
const hitsOf = (text: string, list: string[]) => list.reduce((n, w) => n + (text.match(new RegExp(`\\b${w}\\b`, 'g'))?.length || 0), 0);

function scoreAnswer(p: Profile, t: Turn): EvalItem {
  const text = ` ${t.a.toLowerCase()} `;
  const n = words(t.a);
  const topic = new Set([p.role, p.skills, t.q].join(' ').toLowerCase().split(/[^a-z0-9+#]+/).filter((w) => w.length >= 4 && !STOP.has(w)));
  const relevant = [...topic].filter((w) => text.includes(w)).length;
  const star = hitsOf(text, STAR) + (/\d/.test(text) ? 1 : 0);
  const fillers = hitsOf(text, FILLERS);
  const marks = Math.max(0, Math.min(10, (n >= 60 ? 4 : n >= 35 ? 3 : n >= 20 ? 2 : n >= 8 ? 1 : 0) + Math.min(3, relevant) + Math.min(3, star) - Math.min(2, Math.floor(fillers / 3))));
  const verdict: Verdict = n < 8 || marks < 4 ? 'wrong' : marks >= 7 ? 'good' : 'improve';
  const notes: string[] = [];
  if (n < 8) notes.push('The answer is too short to judge; aim for 45 to 90 seconds.');
  else if (n < 35) notes.push(`Only ${n} words: add a concrete example and the result.`);
  else notes.push(`Good length (${n} words).`);
  notes.push(star >= 2 ? 'Clear structure with actions and outcomes.' : 'Use STAR: Situation, Task, Action, Result, ideally with a number.');
  if (fillers >= 3) notes.push(`About ${fillers} filler words (um, like, basically); pause instead.`);
  const [s1 = 'my core skill'] = skillsOf(p);
  return {
    q: t.q, a: t.a, marks, verdict, feedback: notes.join(' '),
    better: verdict === 'good' ? 'Strong answer. Keep it, and close with one line on how it helps this team.' : `Situation: set the context of a real project in one line. Task: what you had to achieve as the ${p.role || 'candidate'}. Action: the steps you took, naming ${s1}. Result: a measurable outcome (time saved, accuracy, users) and what you learned.`,
  };
}

export function offlineEvaluate(p: Profile, history: Turn[]): Evaluation {
  const items = history.map((t) => scoreAnswer(p, t));
  const avg = items.length ? items.reduce((s, i) => s + i.marks, 0) / items.length : 0;
  const good = items.filter((i) => i.verdict === 'good').length;
  const avgWords = history.reduce((s, t) => s + words(t.a), 0) / Math.max(1, history.length);
  const strengths: string[] = [];
  const improve: string[] = [];
  if (avgWords >= 35) strengths.push('Your answers had enough detail.');
  else improve.push('Give longer answers with one concrete example each.');
  if (items.some((i) => i.feedback.includes('Clear structure'))) strengths.push('Some answers used a clear action-and-result structure.');
  else improve.push('Practise the STAR method (Situation, Task, Action, Result).');
  if (good) strengths.push(`${good} of ${items.length} answers were rated good.`);
  improve.push(`Name your skills (${p.skills || 'your tools'}) and link them to the ${p.role || 'role'}.`);
  return { score: Math.round(avg * 10), summary: `Offline practice score, based on answer length, relevant keywords, structure and filler words. ${good} of ${items.length} answers looked strong.`, strengths, improve, items };
}
