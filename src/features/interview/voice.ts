// The DOM lib does not ship SpeechRecognition types, so these are the parts we use.
interface RecResult {
  isFinal: boolean;
  0: { transcript: string };
}
interface RecEvent {
  resultIndex: number;
  results: ArrayLike<RecResult>;
}
interface Rec {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: RecEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  onaudiostart: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type RecCtor = new () => Rec;

const recCtor = (): RecCtor | null => {
  const w = window as unknown as { SpeechRecognition?: RecCtor; webkitSpeechRecognition?: RecCtor };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;
export const canListen = () => typeof window !== 'undefined' && !!recCtor();

/** Waits for the voice list (Chrome fills it asynchronously). */
function voices(): Promise<SpeechSynthesisVoice[]> {
  const now = speechSynthesis.getVoices();
  if (now.length) return Promise.resolve(now);
  return new Promise((res) => {
    const done = () => res(speechSynthesis.getVoices());
    speechSynthesis.addEventListener('voiceschanged', done, { once: true });
    setTimeout(done, 1200);
  });
}

let chosen: SpeechSynthesisVoice | null | undefined;
const FEMALE = /female|neerja|heera|veena|kajal|swara|aditi|raveena|aria|jenny|sonia|libby|natasha|samantha|zira|hazel|susan|karen|moira|tessa|serena|fiona|victoria|ava|allison|emma|michelle/i;
const MALE = /\bmale\b|ravi|prabhat|rishi|hemant|david|mark|guy|ryan|daniel|alex|fred|george|james|thomas|christopher|eric|roger|brian/i;

export async function pickVoice(): Promise<SpeechSynthesisVoice | null> {
  if (chosen !== undefined) return chosen;
  const list = (await voices()).filter((v) => /^en[-_]/i.test(v.lang));
  const rank = (v: SpeechSynthesisVoice) => {
    const lang = v.lang.replace('_', '-').toLowerCase();
    let r = lang === 'en-in' ? 0 : lang === 'en-gb' ? 1 : lang === 'en-us' ? 1.2 : 2;
    if (/natural|neural|online|premium|enhanced/i.test(v.name)) r -= 1.5;
    if (/google/i.test(v.name)) r -= 1;
    if (FEMALE.test(v.name.replace(/\bmale\b/i, ''))) r -= 1;
    if (MALE.test(v.name.replace(/female/i, ''))) r += 2;
    return r;
  };
  chosen = list.sort((a, b) => rank(a) - rank(b))[0] || null;
  return chosen;
}

let lastBoundary = 0;
export const speechPulse = () => Math.max(0, 1 - (performance.now() - lastBoundary) / 260);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Speaks sentence by sentence (Chrome cuts long utterances). Resolves when done or cancelled. */
export async function speak(text: string, isCancelled: () => boolean): Promise<void> {
  if (!canSpeak()) return;
  const voice = await pickVoice();
  const parts = text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) || [text];
  for (const part of parts) {
    if (isCancelled()) return;
    await new Promise<void>((res) => {
      const u = new SpeechSynthesisUtterance(part);
      if (voice) u.voice = voice;
      u.lang = voice?.lang || 'en-IN';
      u.rate = 0.97;
      u.pitch = 1.04;
      lastBoundary = performance.now();
      u.onboundary = () => {
        lastBoundary = performance.now();
      };
      // onend is not always fired (tab hidden, some Linux voices); never hang the interview on it
      const guard = setTimeout(res, 2500 + part.length * 90);
      u.onend = u.onerror = () => {
        clearTimeout(guard);
        res();
      };
      speechSynthesis.speak(u);
    });
    if (!isCancelled()) await wait(part.endsWith('?') ? 320 : 200);
  }
}

export const stopSpeaking = () => {
  if (canSpeak()) speechSynthesis.cancel();
};

export const afterSpeech = async () => {
  stopSpeaking();
  // Chrome may abort a recognition started while its own speech is still playing
  for (let i = 0; i < 20 && canSpeak() && speechSynthesis.speaking; i++) await wait(50);
  await wait(250);
};

export type MicCode =
  | 'not-allowed' | 'service-not-allowed' | 'no-mic' | 'audio-capture' | 'mic-busy' | 'network' | 'no-speech' | 'language-not-supported' | 'insecure' | 'start-failed' | 'nothing-heard';

/** Errors that stop the mic from starting on its own again; tapping the mic retries. */
export const MIC_BLOCKING = new Set<string>(['not-allowed', 'service-not-allowed', 'no-mic', 'audio-capture', 'mic-busy', 'network', 'language-not-supported', 'insecure', 'start-failed']);

const TYPE = ' You can type your answer meanwhile.';
export function micError(code: string): string {
  switch (code) {
    case 'not-allowed':
      return 'Microphone access is blocked for this site. Click the icon left of the address, set Microphone to Allow, then tap the mic.' + TYPE;
    case 'service-not-allowed':
      return 'This browser does not allow speech-to-text here. Use Google Chrome or Microsoft Edge on a computer or Android.' + TYPE;
    case 'no-mic':
      return 'No microphone was found. Plug one in, or turn it on in your system settings (on Windows: Settings > Privacy & security > Microphone), then tap the mic.' + TYPE;
    case 'audio-capture':
    case 'mic-busy':
      return 'The browser could not record from your microphone. Close other apps using it (Zoom, Teams, WhatsApp), check it is allowed in your system settings (on Windows: Settings > Privacy & security > Microphone), then tap the mic.' + TYPE;
    case 'network':
      return "Speech-to-text could not reach Google's speech service (it needs internet in Chrome). Check your connection or VPN, then tap the mic." + TYPE;
    case 'language-not-supported':
      return 'Speech-to-text does not support English (India) or English (US) in this browser.' + TYPE;
    case 'insecure':
      return 'The microphone only works on https:// pages or http://localhost. Open the site that way, or type your answers.';
    case 'no-speech':
      return "We didn't hear anything. Check the right microphone is selected and not muted, then tap the mic and speak." + TYPE;
    case 'nothing-heard':
      return "We didn't catch any words. Tap the mic and speak a little louder, or type your answer.";
    default:
      return 'Speech-to-text could not start. Tap the mic to try again.' + TYPE;
  }
}

/** Asks for the microphone (shows the browser prompt). The stream feeds the level meter. */
export async function requestMic(): Promise<{ stream: MediaStream | null; error?: MicCode }> {
  if (!window.isSecureContext) return { stream: null, error: 'insecure' };
  if (!navigator.mediaDevices?.getUserMedia) return { stream: null, error: 'no-mic' };
  try {
    return { stream: await navigator.mediaDevices.getUserMedia({ audio: true }) };
  } catch (e) {
    const n = (e as DOMException).name;
    const error: MicCode = n === 'NotAllowedError' || n === 'SecurityError' ? 'not-allowed' : n === 'NotFoundError' || n === 'OverconstrainedError' ? 'no-mic' : 'mic-busy';
    return { stream: null, error };
  }
}

/** 'granted' | 'denied' | 'prompt', or null where the browser cannot tell. */
export async function micPermission(): Promise<PermissionState | null> {
  try {
    return (await navigator.permissions.query({ name: 'microphone' as PermissionName })).state;
  } catch {
    return null;
  }
}

let lastHeard = 0;
/** 0-1 pulse from recognised speech, for the level meter when no mic stream is open. */
export const micPulse = () => Math.max(0, 1 - (performance.now() - lastHeard) / 400);

export interface Listener {
  /** Finish now and hand over what was heard. */
  stop: () => void;
  /** Cancel without handing anything over. */
  abort: () => void;
}

const FATAL = new Set(['not-allowed', 'service-not-allowed', 'audio-capture', 'network', 'language-not-supported', 'bad-grammar']);
const LANGS = ['en-IN', 'en-US'];

/** Keeps recognition running (Chrome ends sessions on short silences) until silenceMs of quiet after speech, idleMs with none, or stop(). */
export function listen(opts: {
  silenceMs?: number;
  idleMs?: number;
  onText: (t: string) => void;
  onLive?: (on: boolean) => void;
  onDone: (text: string, error?: string) => void;
}): Listener | null {
  const Ctor = recCtor();
  if (!Ctor) return null;
  const silenceMs = opts.silenceMs ?? 3000;
  const idleMs = opts.idleMs ?? 20000;
  let lang = 0;
  let finals = '';
  let interim = '';
  let rec: Rec | null = null;
  let finished = false;
  let stopping = false;
  let heard = false;
  let lastActive = Date.now();
  let quick = 0;
  let silence: ReturnType<typeof setTimeout> | undefined;
  let backstop: ReturnType<typeof setTimeout> | undefined;
  const full = () => (finals + ' ' + interim).replace(/\s+/g, ' ').trim();

  const finish = (error?: string) => {
    if (finished) return;
    finished = true;
    clearTimeout(silence);
    clearTimeout(backstop);
    opts.onLive?.(false);
    opts.onDone(full(), error);
  };
  const stop = () => {
    if (finished) return;
    stopping = true;
    clearTimeout(silence);
    try {
      rec?.stop();
    } catch {
      finish();
    }
    // onend normally follows within a second; never leave the answer hanging on it
    backstop = setTimeout(() => finish(), 1500);
  };

  const startOne = () => {
    const r = new Ctor();
    rec = r;
    const began = Date.now();
    let err: string | undefined;
    r.lang = LANGS[lang];
    r.continuous = true;
    r.interimResults = true;
    r.onaudiostart = () => rec === r && opts.onLive?.(true);
    r.onresult = (e) => {
      if (rec !== r || finished) return;
      interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const x = e.results[i];
        if (x.isFinal) finals += ' ' + x[0].transcript;
        else interim += ' ' + x[0].transcript;
      }
      heard = heard || !!full();
      lastActive = Date.now();
      lastHeard = performance.now();
      opts.onText(full());
      clearTimeout(silence);
      if (!stopping) silence = setTimeout(stop, silenceMs);
    };
    r.onerror = (e) => {
      if (rec === r) err = e.error;
    };
    r.onend = () => {
      if (rec !== r || finished) return;
      if (interim) finals += ' ' + interim;
      interim = '';
      if (err === 'language-not-supported' && lang < LANGS.length - 1) {
        lang++;
        return startOne();
      }
      if (err && FATAL.has(err)) return finish(err);
      if (stopping) return finish(heard ? undefined : 'nothing-heard');
      if (Date.now() - lastActive > idleMs) return finish(heard ? undefined : 'no-speech');
      // Sessions that end at once again and again mean something else holds the mic
      quick = Date.now() - began < 1000 ? quick + 1 : 0;
      if (quick >= 3) return finish(heard ? undefined : err === 'aborted' ? 'audio-capture' : 'start-failed');
      setTimeout(() => !finished && !stopping && startOne(), 200);
    };
    try {
      r.start();
    } catch {
      finish('start-failed');
    }
  };

  startOne();
  if (finished) return null;
  return {
    stop,
    abort: () => {
      finished = true;
      clearTimeout(silence);
      clearTimeout(backstop);
      opts.onLive?.(false);
      try {
        rec?.abort();
      } catch {
        /* already stopped */
      }
    },
  };
}
