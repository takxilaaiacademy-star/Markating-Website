import { useCallback, useEffect, useRef, useState } from 'react';
import { AiUnavailable, aiStatus, aiTask } from '../../utils/ai';
import { load, save } from '../../utils/storage';
import { offlineBank, offlineEvaluate, offlinePlan, offlineTurn } from './fallback';
import { canListen, canSpeak, listen, micError, speak, stopSpeaking, type Listener } from './voice';

// Types

export interface Profile {
  name: string;
  role: string;
  experience: string;
  skills: string;
  company: string;
  jd: string;
}

export interface BankQuestion {
  kind: 'hr' | 'technical' | 'behavioural' | 'situational';
  q: string;
  why: string;
  tips: string[];
  sample: string;
}

export interface Turn {
  q: string;
  a: string;
  intent?: string;
  kind?: string;
}
export interface PlanItem {
  kind: string;
  topic: string;
  intent: string;
}
export interface InterviewPlan {
  interviewer: string;
  greeting: string;
  plan: PlanItem[];
}
export type TurnStage = 'question' | 'closing' | 'farewell';
export interface HrTurn {
  ack: string;
  question: string;
  intent: string;
  kind: string;
  followUp: boolean;
  done: boolean;
}
export type Verdict = 'good' | 'improve' | 'wrong';
export interface EvalItem extends Turn {
  marks: number;
  verdict: Verdict;
  feedback: string;
  better: string;
}
export interface Evaluation {
  score: number;
  summary: string;
  strengths: string[];
  improve: string[];
  items: EvalItem[];
}
export interface ChatLine {
  id: number;
  who: 'hr' | 'me';
  text: string;
  kind?: string;
}

export type Mode = 'bank' | 'mock';
export type Phase = 'setup' | 'bank' | 'mock' | 'report';

export const EXPERIENCE = ['Student / fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years'];
export const ROLE_IDEAS = ['Data Analyst', 'Software Developer', 'Digital Marketing Executive', 'AI Automation Specialist', 'HR Executive', 'Business Analyst', 'Sales Executive', 'Content Creator'];
export const MOCK_COUNTS = [4, 6, 8];
export const KIND_LABEL: Record<string, string> = { hr: 'HR', technical: 'Technical', behavioural: 'Behavioural', situational: 'Situational' };
export const VERDICT_LABEL: Record<Verdict, string> = { good: 'Good', improve: 'Improve', wrong: 'Needs work' };

const EMPTY: Profile = { name: '', role: '', experience: EXPERIENCE[0], skills: '', company: '', jd: '' };

export function useInterview() {
  const [profile, setProfile] = useState<Profile>(EMPTY);
  const [mode, setMode] = useState<Mode>('mock');
  const [total, setTotal] = useState(6);
  const [voice, setVoice] = useState(false);
  const [phase, setPhase] = useState<Phase>('setup');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [aiOn, setAiOn] = useState<boolean | null>(null);
  const [offline, setOffline] = useState(false);
  const [note, setNote] = useState('');
  const [bank, setBank] = useState<BankQuestion[]>([]);
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [report, setReport] = useState<Evaluation | null>(null);
  const [draft, setDraft] = useState('');
  const [listening, setListening] = useState(false);
  const [micNote, setMicNote] = useState('');
  const [can, setCan] = useState({ mic: false, voice: false });
  const [speaking, setSpeaking] = useState(false);

  const st = useRef({ plan: [] as PlanItem[], history: [] as Turn[], current: null as Turn | null, closing: false, offline: false, cancelled: false });
  const listener = useRef<Listener | null>(null);
  const lineId = useRef(0);

  useEffect(() => {
    setCan({ mic: canListen(), voice: canSpeak() });
    // Priya talks by default wherever the browser can speak; the visitor can mute her.
    setVoice(canSpeak());
    setProfile((p) => ({ ...p, ...load<Partial<Profile>>('interview_profile', {}) }));
    let live = true;
    void aiStatus().then((s) => {
      if (!live) return;
      setAiOn(s.ai);
      if (!s.ai) setOffline(true);
    });
    return () => {
      live = false;
      st.current.cancelled = true;
      listener.current?.abort();
      stopSpeaking();
    };
  }, []);

  const set = useCallback(<K extends keyof Profile>(k: K, v: Profile[K]) => setProfile((p) => ({ ...p, [k]: v })), []);

  /** AI first; on any AI outage the rest of this session runs offline. */
  const viaAi = useCallback(async <T,>(task: string, body: Record<string, unknown>, local: () => T): Promise<T> => {
    if (!st.current.offline) {
      try {
        return await aiTask<T>(task, body);
      } catch (e) {
        st.current.offline = true;
        setOffline(true);
        setNote((e instanceof Error ? e.message : 'The AI is not available.') + ' Continuing in offline mode.');
        if (!(e instanceof AiUnavailable)) console.warn(e);
      }
    }
    return local();
  }, []);

  const say = useCallback(
    (who: ChatLine['who'], text: string, kind?: string) => {
      if (!text.trim()) return;
      setLines((l) => [...l, { id: ++lineId.current, who, text, kind }]);
    },
    [],
  );

  const speakOut = useCallback(
    async (text: string) => {
      if (!voice || !canSpeak()) return;
      setSpeaking(true);
      try {
        await speak(text, () => st.current.cancelled);
      } finally {
        setSpeaking(false);
      }
    },
    [voice],
  );

  const ask = useCallback(
    async (stage: TurnStage) => {
      const s = st.current;
      setBusy(stage === 'farewell' ? 'Priya is wrapping up…' : 'Priya is thinking…');
      const turn = await viaAi<HrTurn>('interview.next', { profile, history: s.history, total, plan: s.plan, stage, closing: s.closing ? s.current : undefined }, () =>
        offlineTurn(profile, s.history, total, stage, s.closing && s.current ? s.current : undefined),
      );
      setBusy('');
      if (s.cancelled) return null;
      const text = [turn.ack, turn.question].filter(Boolean).join(' ');
      say('hr', text, turn.kind);
      void speakOut(text);
      return turn;
    },
    [profile, total, viaAi, say, speakOut],
  );

  const finishInterview = useCallback(async () => {
    const s = st.current;
    setBusy('Scoring your answers…');
    const ev = await viaAi<Evaluation>('interview.evaluate', { profile, history: s.history }, () => offlineEvaluate(profile, s.history));
    setBusy('');
    if (s.cancelled) return;
    setReport(ev);
    setPhase('report');
    const past = load<{ at: string; role: string; score: number }[]>('interview_history', []);
    save('interview_history', [{ at: new Date().toISOString(), role: profile.role, score: ev.score }, ...past].slice(0, 10));
  }, [profile, viaAi]);

  const start = useCallback(async () => {
    if (!profile.role.trim()) return setError('Type the role you are preparing for.');
    setError('');
    save('interview_profile', { ...profile, jd: profile.jd.slice(0, 3000) });
    const s = st.current;
    s.offline = aiOn === false;
    s.cancelled = false;
    setOffline(s.offline);
    setNote('');
    if (mode === 'bank') {
      setBusy('Finding the questions you will most likely face…');
      setPhase('bank');
      const r = await viaAi<{ questions: BankQuestion[] }>('interview.questions', { profile, count: 12 }, () => ({ questions: offlineBank(profile) }));
      setBank(r.questions);
      setBusy('');
      return;
    }
    s.history = [];
    s.closing = false;
    s.current = null;
    setLines([]);
    setReport(null);
    setDraft('');
    setPhase('mock');
    setBusy('Priya is joining…');
    const plan = await viaAi<InterviewPlan>('interview.plan', { profile, total }, () => offlinePlan(profile, total));
    s.plan = plan.plan;
    say('hr', plan.greeting, 'greeting');
    await speakOut(plan.greeting);
    const turn = await ask('question');
    if (turn) s.current = { q: turn.question, a: '', intent: turn.intent, kind: turn.kind };
  }, [profile, aiOn, mode, total, viaAi, say, speakOut, ask]);

  const answer = useCallback(async () => {
    const text = draft.trim();
    const s = st.current;
    if (!s.current || busy) return;
    listener.current?.stop();
    stopSpeaking();
    say('me', text || '(skipped)');
    setDraft('');
    const t: Turn = { ...s.current, a: text };
    if (s.closing) {
      s.current = t;
      await ask('farewell');
      await finishInterview();
      return;
    }
    s.history = [...s.history, t];
    if (s.history.length >= total) {
      s.closing = true;
      const turn = await ask('closing');
      if (turn) s.current = { q: turn.question, a: '', intent: turn.intent, kind: 'closing' };
      return;
    }
    const turn = await ask('question');
    if (!turn) return;
    if (turn.done) return finishInterview();
    s.current = { q: turn.question, a: '', intent: turn.intent, kind: turn.kind };
  }, [draft, busy, say, ask, total, finishInterview]);

  const reset = useCallback(() => {
    st.current.cancelled = true;
    listener.current?.abort();
    stopSpeaking();
    setBusy('');
    setPhase('setup');
  }, []);

  const endEarly = useCallback(() => {
    if (!st.current.history.length) return reset();
    listener.current?.abort();
    stopSpeaking();
    void finishInterview();
  }, [finishInterview, reset]);


  const toggleMic = useCallback(() => {
    if (listening) return listener.current?.stop();
    stopSpeaking();
    setMicNote('');
    const base = draft ? draft.trim() + ' ' : '';
    listener.current = listen({
      onText: (t) => setDraft(base + t),
      onLive: setListening,
      onDone: (_t, err) => {
        setListening(false);
        if (err) setMicNote(micError(err));
      },
    });
    if (!listener.current) setMicNote(micError('start-failed'));
  }, [listening, draft]);

  /** Mutes or unmutes Priya mid-interview; muting stops her at once. */
  const toggleVoice = useCallback(() => {
    if (voice) {
      stopSpeaking();
      setSpeaking(false);
    }
    setVoice(!voice);
  }, [voice]);

  /** Reads Priya's last message again. */
  const replay = useCallback(() => {
    const last = [...lines].reverse().find((l) => l.who === 'hr');
    if (!last || !canSpeak()) return;
    stopSpeaking();
    setSpeaking(true);
    void speak(last.text, () => st.current.cancelled).finally(() => setSpeaking(false));
  }, [lines]);

  return {
    speaking, toggleVoice, replay,
    profile, set, mode, setMode, total, setTotal, voice, setVoice, phase, busy, error, aiOn, offline, note, bank, lines, report, draft, setDraft,
    listening, micNote, canMic: can.mic, canVoice: can.voice, start, answer, endEarly, reset, toggleMic,
    asked: () => st.current.history.length,
  };
}

export type InterviewState = ReturnType<typeof useInterview>;
