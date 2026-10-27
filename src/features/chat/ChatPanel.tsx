import { Fragment, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/Icon';
import { fmt } from '../../components/types';
import { SITE_URL } from '../../config/marketing';
import { whatsappLink } from '../../config/site';
import { COURSES } from '../../data/courses';
import { track } from '../../utils/analytics';
import { enrollUrl, withUtm } from '../../utils/links';
import { savedLanguage } from '../../utils/siteTranslate';
import { GREETING, START_CHIPS, loadChat, markdown, newId, saveChat, streamChat, type BotCourse, type ChatMsg, type Inline } from './types';
import '../../styles/chat.css';

const isPhone = () => window.matchMedia('(max-width: 720px)').matches;
const sitePath = (href: string) => (href.startsWith(SITE_URL + '/') ? href.slice(SITE_URL.length) : '');

function Inlines({ parts, onNav }: { parts: Inline[]; onNav: () => void }) {
  return (
    <>
      {parts.map((p, i) => {
        if (p.t === 'b') return <strong key={i}>{p.v}</strong>;
        if (p.t === 'i') return <em key={i}>{p.v}</em>;
        if (p.t === 'code') return <code key={i}>{p.v}</code>;
        if (p.t === 'a') {
          const path = sitePath(p.href);
          return path ? (
            <Link key={i} to={path} onClick={onNav}>
              {p.v}
            </Link>
          ) : (
            <a key={i} href={withUtm(p.href, 'chatbot')} target="_blank" rel="noopener noreferrer">
              {p.v}
            </a>
          );
        }
        return <Fragment key={i}>{p.v}</Fragment>;
      })}
    </>
  );
}

function Rich({ text, onNav }: { text: string; onNav: () => void }) {
  return (
    <>
      {markdown(text).map((b, i) =>
        b.t === 'p' ? (
          <p key={i}>
            {b.lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                <Inlines parts={l} onNav={onNav} />
              </Fragment>
            ))}
          </p>
        ) : (
          (() => {
            const List = b.t;
            return (
              <List key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inlines parts={it} onNav={onNav} />
                  </li>
                ))}
              </List>
            );
          })()
        ),
      )}
    </>
  );
}

function CourseCards({ list, onNav }: { list: BotCourse[]; onNav: () => void }) {
  return (
    <div className="txc-cards">
      {list.map((b) => {
        const c = COURSES.find((x) => x.id === b.id);
        const price = c?.price ?? b.price;
        const was = c?.was ?? b.was;
        return (
          <div className="txc-card" key={b.id}>
            <img src={c?.img ?? b.img} alt="" width="2250" height="660" loading="lazy" decoding="async" />
            <div className="txc-card-b">
              <span className="txc-card-t">{b.title}</span>
              <span className="txc-card-m">
                <span className={'txc-price' + (price ? '' : ' is-free')}>{price ? fmt(price) : 'FREE'}</span>
                {!!price && !!was && <s>{fmt(was)}</s>}
              </span>
              <span className="txc-card-a">
                <Link
                  className="txc-btn"
                  to={'/course/' + b.id}
                  onClick={() => {
                    track('chat_course_view', { course: b.id });
                    onNav();
                  }}
                >
                  Details
                </Link>
                <a className="txc-btn is-gold" href={c ? enrollUrl(c, 'chatbot') : withUtm(b.enrollUrl, 'chatbot_' + b.id)} rel="noopener" onClick={() => track('chat_course_enroll', { course: b.id })}>
                  {price ? 'Enroll' : 'Start free'} <Icon name="arrowRight" size={14} />
                </a>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const { pathname } = useLocation();
  const [msgs, setMsgs] = useState<ChatMsg[]>(loadChat);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const stick = useRef(true);

  useEffect(() => {
    input.current?.focus({ preventScroll: true });
    if (isPhone()) document.body.classList.add('txc-lock');
    const esc = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => {
      document.body.classList.remove('txc-lock');
      window.removeEventListener('keydown', esc);
      abort.current?.abort();
    };
  }, [onClose]);

  useEffect(() => {
    if (!busy) saveChat(msgs);
    const el = log.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [msgs, busy]);

  useEffect(() => {
    const el = input.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, [text]);

  const navAway = () => {
    if (isPhone()) onClose();
  };

  const patch = (id: string, f: (m: ChatMsg) => ChatMsg) => setMsgs((list) => list.map((m) => (m.id === id ? f(m) : m)));

  const send = async (raw: string) => {
    const q = raw.trim().slice(0, 1500);
    if (!q || busy) return;
    const user: ChatMsg = { id: newId(), role: 'user', text: q };
    const bot: ChatMsg = { id: newId(), role: 'model', text: '', live: true };
    // "Try again" after an error replaces the failed question instead of asking it twice.
    const prev = msgs[msgs.length - 1]?.error ? msgs.slice(0, -2) : msgs;
    const history = [...prev.filter((m) => !m.error), user];
    setMsgs([...prev.map((m) => ({ ...m, chips: undefined })), user, bot]);
    setText('');
    setBusy(true);
    stick.current = true;
    track('chat_message', { page: pathname });
    const ctl = new AbortController();
    abort.current = ctl;
    try {
      await streamChat(history, pathname, savedLanguage(), ctl.signal, {
        onDelta: (t) => patch(bot.id, (m) => ({ ...m, text: m.text + t })),
        onDone: ({ courses, chips }) => patch(bot.id, (m) => ({ ...m, courses, chips, live: false })),
      });
    } catch (e) {
      if (ctl.signal.aborted) patch(bot.id, (m) => ({ ...m, live: false, text: m.text || '…' }));
      else patch(bot.id, (m) => ({ ...m, live: false, error: true, text: (e as Error).message, chips: [q] }));
    } finally {
      abort.current = null;
      setBusy(false);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (busy) abort.current?.abort();
    else send(text);
  };
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(text);
    }
  };
  const reset = () => {
    abort.current?.abort();
    setMsgs([]);
    saveChat([]);
    input.current?.focus();
  };

  const last = msgs[msgs.length - 1];
  const chips = !msgs.length ? START_CHIPS : !busy && last?.chips?.length ? last.chips : [];
  const waText = 'Hi Takxila, I was chatting with Tx on your website and want to talk to a person.';

  return (
    <section className="txc" role="dialog" aria-label="Chat with Tx, the Takxila AI assistant" aria-modal="false">
      <header className="txc-hd">
        <span className="txc-av" aria-hidden="true">
          <img src="/assets/logo-mark.webp" width="24" height="26" alt="" />
        </span>
        <span className="txc-who">
          <b className="notranslate">
            Tx <span className="txc-tag">AI</span>
          </b>
          <small>Online · replies in seconds</small>
        </span>
        <a className="txc-ib is-wa" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" aria-label="Talk to a person on WhatsApp" title="Talk to a person on WhatsApp">
          <Icon name="whatsapp" size={20} />
        </a>
        {msgs.length > 0 && (
          <button type="button" className="txc-ib" onClick={reset} aria-label="Start a new chat" title="New chat">
            <Icon name="repeat" size={18} />
          </button>
        )}
        <button type="button" className="txc-ib" onClick={onClose} aria-label="Close the chat">
          <Icon name="x" size={20} />
        </button>
      </header>

      <div
        className="txc-log"
        ref={log}
        aria-live="polite"
        aria-busy={busy}
        onScroll={(e) => {
          const el = e.currentTarget;
          stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
        }}
      >
        <div className="txc-row">
          <div className="txc-bub">
            <Rich text={GREETING} onNav={navAway} />
          </div>
        </div>
        {msgs.map((m) => (
          <div key={m.id} className={'txc-row' + (m.role === 'user' ? ' is-user' : '')}>
            {m.live && !m.text ? (
              <div className="txc-bub txc-dots" aria-label="Tx is typing">
                <i />
                <i />
                <i />
              </div>
            ) : (
              <div className={'txc-bub' + (m.error ? ' is-err' : '') + (m.live ? ' txc-caret' : '')}>
                {m.role === 'user' ? m.text : <Rich text={m.text} onNav={navAway} />}
                {m.error && (
                  <span className="txc-err-act">
                    <a className="txc-btn is-wa" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
                      <Icon name="whatsapp" size={14} /> WhatsApp us
                    </a>
                  </span>
                )}
              </div>
            )}
            {!!m.courses?.length && <CourseCards list={m.courses} onNav={navAway} />}
          </div>
        ))}
        {chips.length > 0 && (
          <div className="txc-chips">
            {chips.map((c) => (
              <button key={c} type="button" className="txc-chip" onClick={() => send(c)}>
                {last?.error ? 'Try again' : c}
              </button>
            ))}
          </div>
        )}
      </div>

      <footer className="txc-ft">
        <form className="txc-form" onSubmit={submit}>
          <label htmlFor="txc-in" className="sr-only">
            Message Tx
          </label>
          <textarea
            id="txc-in"
            ref={input}
            className="txc-in"
            rows={1}
            maxLength={1500}
            placeholder="Ask Tx anything about AI…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKey}
            enterKeyHint="send"
          />
          <button type="submit" className={'txc-send' + (busy ? ' is-stop' : '')} disabled={!busy && !text.trim()} aria-label={busy ? 'Stop the answer' : 'Send'}>
            {busy ? <Icon name="x" size={17} /> : <Icon name="send" size={17} />}
          </button>
        </form>
        <p className="txc-note">
          <span>Tx is AI and can make mistakes.</span>
          <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={13} /> Talk to a human
          </a>
        </p>
      </footer>
    </section>
  );
}
