import { CHAT_API_URL } from '../../config/marketing';
import { load, save } from '../../utils/storage';

export interface BotCourse {
  id: string;
  title: string;
  price: number;
  was: number | null;
  days: number | null;
  track: string;
  url: string;
  enrollUrl: string;
  img: string;
}

export interface ChatMsg {
  id: string;
  role: 'user' | 'model';
  text: string;
  courses?: BotCourse[];
  chips?: string[];
  error?: boolean;
  /** Still streaming in */
  live?: boolean;
}

export const GREETING =
  "Hey! I'm **Tx**, Takxila's AI buddy ✨ Ask me anything about AI, or tell me your goal and I'll find the right course for you.";
export const START_CHIPS = ['Which course should I start with?', 'Show me the free courses', "What's trending in AI?", 'How do I make money with AI?'];
export const NOT_CONNECTED = "Tx isn't switched on yet. Please message us on WhatsApp and a real person will help you right away.";
export const OFFLINE = 'Tx could not connect just now. Check your internet and try again, or message us on WhatsApp.';

const KEY = 'chat';
export const newId = () => Math.random().toString(36).slice(2, 10);
/** The chat lives for the browser tab, so it survives page changes and reloads but not a new visit. */
export const loadChat = (): ChatMsg[] => load<ChatMsg[]>(KEY, [], sessionStorage).filter((m) => !m.live);
export const saveChat = (msgs: ChatMsg[]) => save(KEY, msgs.length ? msgs.slice(-40) : null, sessionStorage);

/** The bot's address. Testing on your own computer with no address set: the bot running at localhost:8000 is used. */
export function botUrl(): string {
  if (CHAT_API_URL) return CHAT_API_URL;
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  return local ? `http://${location.hostname === '[::1]' ? 'localhost' : location.hostname}:8000` : '';
}

interface StreamHandlers {
  onDelta: (text: string) => void;
  onDone: (extra: { courses: BotCourse[]; chips: string[] }) => void;
}

/** Sends the conversation to the bot and reads its server-sent events. Throws Error(message) on failure. */
export async function streamChat(history: ChatMsg[], page: string, lang: string, signal: AbortSignal, h: StreamHandlers) {
  const messages = history.filter((m) => !m.error && m.text.trim()).slice(-16).map((m) => ({ role: m.role, text: m.text }));
  const api = botUrl();
  if (!api) {
    console.warn('Tx chat: no bot address. Set VITE_CHAT_API_URL (or CHAT_API_ADDRESS in src/config/marketing.ts) and rebuild.');
    throw new Error(NOT_CONNECTED);
  }
  let res: Response;
  try {
    res = await fetch(api + '/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, page, lang }),
      signal,
    });
  } catch (e) {
    if (signal.aborted) throw e;
    throw new Error(OFFLINE);
  }
  if (!res.ok || !res.body) {
    let msg = OFFLINE;
    try {
      const j = await res.json();
      if (typeof j.error === 'string') msg = j.error;
      else if (res.status === 422) msg = 'That message is a bit too long. Try a shorter one.';
    } catch {
      /* not JSON */
    }
    throw new Error(msg);
  }
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buf = '';
  let done = false;
  for (;;) {
    const { value, done: end } = await reader.read();
    if (end) break;
    buf += value;
    let i: number;
    while ((i = buf.indexOf('\n\n')) >= 0) {
      const block = buf.slice(0, i);
      buf = buf.slice(i + 2);
      const event = /^event: (.+)$/m.exec(block)?.[1];
      const data = /^data: (.*)$/m.exec(block)?.[1];
      if (!event || !data) continue;
      const d = JSON.parse(data);
      if (event === 'delta') h.onDelta(d.t);
      else if (event === 'done') {
        done = true;
        h.onDone({ courses: d.courses ?? [], chips: d.chips ?? [] });
      } else if (event === 'error') throw new Error(d.error || OFFLINE);
    }
  }
  if (!done) h.onDone({ courses: [], chips: [] });
}

// Tiny, safe Markdown: paragraphs, - and 1. lists, **bold**, *italic*, `code`, [text](https://…) and bare links.

export type Inline = { t: 'text' | 'b' | 'i' | 'code'; v: string } | { t: 'a'; v: string; href: string };
export type Block = { t: 'p'; lines: Inline[][] } | { t: 'ul' | 'ol'; items: Inline[][] };

const INLINE = /(\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>()]+[^\s<>().,!?;:'"])|\*([^*\s][^*]*)\*)/g;

export function inline(src: string): Inline[] {
  const out: Inline[] = [];
  let last = 0;
  for (const m of src.matchAll(INLINE)) {
    if (m.index! > last) out.push({ t: 'text', v: src.slice(last, m.index) });
    if (m[2]) out.push({ t: 'b', v: m[2] });
    else if (m[3]) out.push({ t: 'code', v: m[3] });
    else if (m[4]) out.push({ t: 'a', v: m[4], href: m[5] });
    else if (m[6]) out.push({ t: 'a', v: m[6].replace(/^https?:\/\/(www\.)?/, ''), href: m[6] });
    else if (m[7]) out.push({ t: 'i', v: m[7] });
    last = m.index! + m[0].length;
  }
  if (last < src.length) out.push({ t: 'text', v: src.slice(last) });
  return out;
}

export function markdown(src: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of src.replace(/\r/g, '').split('\n')) {
    const line = raw.trim();
    const prev = blocks[blocks.length - 1];
    const ul = /^[-*•]\s+(.*)$/.exec(line);
    const ol = /^\d+[.)]\s+(.*)$/.exec(line);
    if (!line) {
      if (prev) blocks.push({ t: 'p', lines: [] });
    } else if (ul || ol) {
      const t = ul ? 'ul' : 'ol';
      const item = inline((ul ?? ol)![1].replace(/^#+\s*/, ''));
      if (prev?.t === t) prev.items.push(item);
      else blocks.push({ t, items: [item] });
    } else {
      // The bot is told not to use headings; if one slips through it shows as a bold line.
      const text = inline(line.startsWith('#') ? '**' + line.replace(/^#+\s*/, '') + '**' : line);
      if (prev?.t === 'p') prev.lines.push(text);
      else blocks.push({ t: 'p', lines: [text] });
    }
  }
  return blocks.filter((b) => (b.t === 'p' ? b.lines.length : b.items.length));
}
