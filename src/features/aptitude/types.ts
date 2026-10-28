import { useCallback, useEffect, useRef, useState } from 'react';
import { AiUnavailable, aiStatus, aiTask } from '../../utils/ai';
import { load, save } from '../../utils/storage';
import { offlineSet, SECTIONS } from './bank';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Mcq {
  q: string;
  options: string[];
  answer: number;
  explain: string;
  topic: string;
}

export interface Section {
  id: 'quant' | 'logic' | 'verbal';
  name: string;
  icon: string;
  color: string;
  topics: string[];
}

export interface Attempt {
  at: string;
  score: number;
  total: number;
  seconds: number;
  difficulty: Difficulty;
  ai: boolean;
  /** Wrong answers per topic */
  weak: Record<string, number>;
}

export type Phase = 'setup' | 'loading' | 'test' | 'result';

export const COUNTS = [5, 10, 15, 20];
export const DIFFICULTIES: [Difficulty, string, string][] = [
  ['easy', 'Easy', 'One-step basics'],
  ['medium', 'Medium', 'Placement level'],
  ['hard', 'Hard', 'Tricky, multi-step'],
];
export const EXAMS = ['General placement', 'TCS NQT', 'Infosys', 'Accenture', 'Wipro', 'Bank PO / SSC', 'CAT (easy)'];
export const SECONDS_PER_Q = 60;

const HISTORY = 'aptitude_history';

export function useAptitude() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [topics, setTopics] = useState<string[]>(() => SECTIONS.flatMap((s) => s.topics.slice(0, 3)));
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [count, setCount] = useState(10);
  const [exam, setExam] = useState(EXAMS[0]);
  const [timed, setTimed] = useState(true);
  const [aiOn, setAiOn] = useState<boolean | null>(null);
  const [useAi, setUseAi] = useState(true);
  const [questions, setQuestions] = useState<Mcq[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [flags, setFlags] = useState<boolean[]>([]);
  const [idx, setIdx] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [source, setSource] = useState<{ ai: boolean; note: string }>({ ai: false, note: '' });
  const [history, setHistory] = useState<Attempt[]>([]);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    setHistory(load<Attempt[]>(HISTORY, []));
    let live = true;
    void aiStatus().then((s) => live && setAiOn(s.ai));
    return () => {
      live = false;
      abort.current?.abort();
    };
  }, []);

  const toggleTopic = useCallback((t: string) => setTopics((x) => (x.includes(t) ? x.filter((y) => y !== t) : [...x, t])), []);
  const setSection = useCallback((id: Section['id'], on: boolean) => {
    const s = SECTIONS.find((x) => x.id === id)!;
    setTopics((x) => (on ? [...new Set([...x, ...s.topics])] : x.filter((t) => !s.topics.includes(t))));
  }, []);

  const start = useCallback(
    async (only?: string[]) => {
      const list = only?.length ? only : topics;
      setPhase('loading');
      let qs: Mcq[] = [];
      let note = '';
      let ai = false;
      if (useAi && aiOn !== false) {
        abort.current?.abort();
        const ctl = new AbortController();
        abort.current = ctl;
        try {
          const seen = load<string[]>('aptitude_seen', []);
          const r = await aiTask<{ questions: Mcq[] }>('aptitude.mcq', { topics: list, difficulty, count, exam, avoid: seen.slice(-30) }, ctl.signal);
          qs = r.questions.filter((q) => q.options.length === 4 && q.answer >= 0 && q.answer < 4);
          ai = qs.length > 0;
          save('aptitude_seen', [...seen, ...qs.map((q) => q.q.slice(0, 120))].slice(-60));
        } catch (e) {
          if (ctl.signal.aborted) return;
          if (e instanceof AiUnavailable) setAiOn(false);
          note = (e instanceof Error ? e.message : 'The AI is not available.') + ' This set comes from our offline question bank.';
        }
      }
      if (qs.length < count) qs = [...qs, ...offlineSet(list, count - qs.length, difficulty)];
      setQuestions(qs);
      setAnswers(qs.map(() => null));
      setFlags(qs.map(() => false));
      setIdx(0);
      setSource({ ai, note });
      setStartedAt(Date.now());
      setSeconds(0);
      setPhase('test');
    },
    [topics, useAi, aiOn, difficulty, count, exam],
  );

  // Clock: counts up, and in timed mode ends the test when time runs out.
  const limit = timed ? questions.length * SECONDS_PER_Q : 0;
  const finish = useCallback(() => {
    setPhase('result');
  }, []);
  useEffect(() => {
    if (phase !== 'test') return;
    const id = window.setInterval(() => setSeconds(Math.round((Date.now() - startedAt) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, [phase, startedAt]);
  useEffect(() => {
    if (phase === 'test' && limit && seconds >= limit) finish();
  }, [phase, limit, seconds, finish]);

  // Save the attempt once, when the result shows.
  const savedFor = useRef(0);
  useEffect(() => {
    if (phase !== 'result' || savedFor.current === startedAt) return;
    savedFor.current = startedAt;
    const weak: Record<string, number> = {};
    questions.forEach((q, i) => answers[i] !== q.answer && (weak[q.topic] = (weak[q.topic] || 0) + 1));
    const a: Attempt = { at: new Date().toISOString(), score: questions.filter((q, i) => answers[i] === q.answer).length, total: questions.length, seconds, difficulty, ai: source.ai, weak };
    setHistory((h) => {
      const next = [a, ...h].slice(0, 12);
      save(HISTORY, next);
      return next;
    });
  }, [phase, startedAt, questions, answers, seconds, difficulty, source.ai]);

  const choose = useCallback((i: number, opt: number) => setAnswers((a) => a.map((x, j) => (j === i ? opt : x))), []);
  const flag = useCallback((i: number) => setFlags((f) => f.map((x, j) => (j === i ? !x : x))), []);
  const restart = useCallback(() => setPhase('setup'), []);

  return {
    phase, topics, toggleTopic, setSection, difficulty, setDifficulty, count, setCount, exam, setExam, timed, setTimed, aiOn, useAi, setUseAi,
    questions, answers, flags, idx, setIdx, seconds, limit, source, history, start, finish, choose, flag, restart,
  };
}

export type AptitudeState = ReturnType<typeof useAptitude>;
