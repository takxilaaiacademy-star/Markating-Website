import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScoreRing } from '../../components/Fx';
import Icon from '../../components/Icon';
import { OFFLINE_NOTE } from '../../utils/ai';
import { speechPulse } from './voice';
import { EXPERIENCE, KIND_LABEL, MOCK_COUNTS, ROLE_IDEAS, VERDICT_LABEL, useInterview, type InterviewState } from './types';

function Setup({ s }: { s: InterviewState }) {
  const p = s.profile;
  return (
    <div className="iv-setup">
      <div className="iv-modes" role="radiogroup" aria-label="Practice mode">
        {(
          [
            ['mock', 'bot', 'Mock interview with Priya', 'A real back-and-forth interview. She listens, asks follow-ups, then scores every answer.'],
            ['bank', 'book', 'Likely questions + model answers', 'The questions you will most likely face for this role, with tips and a sample answer.'],
          ] as const
        ).map(([m, icon, title, text]) => (
          <button key={m} type="button" role="radio" aria-checked={s.mode === m} className={'iv-mode fx-glow' + (s.mode === m ? ' is-on' : '')} onClick={() => s.setMode(m)}>
            <span className="iv-mode-ico">
              <Icon name={icon} size={22} />
            </span>
            <b>{title}</b>
            <small>{text}</small>
            <span className="iv-radio" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="iv-form mb-border">
        <div className="mb-inner">
          <div className="rb-grid2">
            <label className="rb-field">
              <span>Role you are preparing for *</span>
              <input value={p.role} onChange={(e) => s.set('role', e.target.value)} placeholder="e.g. Data Analyst" list="iv-roles" data-testid="iv-role" />
              <datalist id="iv-roles">
                {ROLE_IDEAS.map((r) => (
                  <option key={r} value={r} />
                ))}
              </datalist>
            </label>
            <label className="rb-field">
              <span>Your first name (optional)</span>
              <input value={p.name} onChange={(e) => s.set('name', e.target.value)} placeholder="So Priya can greet you" />
            </label>
            <label className="rb-field">
              <span>Experience</span>
              <select value={p.experience} onChange={(e) => s.set('experience', e.target.value)}>
                {EXPERIENCE.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="rb-field">
              <span>Company (optional)</span>
              <input value={p.company} onChange={(e) => s.set('company', e.target.value)} placeholder="e.g. Infosys" />
            </label>
            <label className="rb-field rb-span2">
              <span>Your top skills</span>
              <input value={p.skills} onChange={(e) => s.set('skills', e.target.value)} placeholder="e.g. Excel, SQL, Power BI, ChatGPT" />
            </label>
            <label className="rb-field rb-span2">
              <span>Job description (optional, makes the questions sharper)</span>
              <textarea rows={3} value={p.jd} onChange={(e) => s.set('jd', e.target.value)} placeholder="Paste the job post here" />
            </label>
          </div>
          <div className="rb-chips">
            <small>Quick pick:</small>
            {ROLE_IDEAS.slice(0, 6).map((r) => (
              <button key={r} type="button" className={'chip' + (p.role === r ? ' is-on' : '')} onClick={() => s.set('role', r)}>
                {r}
              </button>
            ))}
          </div>
          {s.mode === 'mock' && (
            <div className="apt-row apt-toggles">
              <span className="apt-label">Questions</span>
              <div className="seg">
                {MOCK_COUNTS.map((n) => (
                  <button key={n} type="button" className={s.total === n ? 'is-on' : ''} onClick={() => s.setTotal(n)} aria-pressed={s.total === n}>
                    {n}
                  </button>
                ))}
              </div>
              {s.canVoice && (
                <label className="tog">
                  <input type="checkbox" checked={s.voice} onChange={(e) => s.setVoice(e.target.checked)} />
                  <span /> Priya speaks out loud
                </label>
              )}
            </div>
          )}
          {s.error && <p className="field-err">{s.error}</p>}
          {s.aiOn === false && (
            <p className="rb-off">
              <Icon name="shield" size={15} /> {OFFLINE_NOTE}
            </p>
          )}
          <button type="button" className="btn btn-gold btn-lg shine" onClick={() => void s.start()} data-testid="iv-start">
            <Icon name={s.mode === 'mock' ? 'play' : 'sparkles'} size={18} /> {s.mode === 'mock' ? 'Start my mock interview' : 'Show my likely questions'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Bank({ s }: { s: InterviewState }) {
  const [kind, setKind] = useState<string>('all');
  const list = s.bank.filter((q) => kind === 'all' || q.kind === kind);
  const kinds = [...new Set(s.bank.map((q) => q.kind))];
  if (s.busy)
    return (
      <div className="tool-loading" role="status">
        <span className="orb" aria-hidden="true" />
        <b>{s.busy}</b>
      </div>
    );
  return (
    <div className="iv-bank" data-testid="iv-bank">
      <div className="iv-bank-head">
        <h2>
          {s.bank.length} questions for <span className="grad">{s.profile.role}</span>
        </h2>
        <div className="tabs">
          {['all', ...kinds].map((k) => (
            <button key={k} type="button" className={'tab' + (kind === k ? ' is-on' : '')} onClick={() => setKind(k)}>
              {k === 'all' ? 'All' : KIND_LABEL[k] ?? k}
            </button>
          ))}
        </div>
      </div>
      {s.note && <p className="rb-off">{s.note}</p>}
      <div className="faq iv-qs">
        {list.map((q, i) => (
          <details key={q.q} className="faq-item" open={i === 0}>
            <summary>
              <span>
                <em className={'iv-kind k-' + q.kind}>{KIND_LABEL[q.kind] ?? q.kind}</em> {q.q}
              </span>
              <span className="faq-plus" aria-hidden="true" />
            </summary>
            <div className="iv-qbody">
              <p className="muted">
                <b>What they test:</b> {q.why}
              </p>
              <ul className="iv-tips">
                {q.tips.map((t) => (
                  <li key={t}>
                    <Icon name="check" size={14} /> {t}
                  </li>
                ))}
              </ul>
              <div className="iv-sample">
                <small>Sample answer (make it yours)</small>
                <p>{q.sample}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
      <div className="apt-actions">
        <button type="button" className="btn btn-gold shine" onClick={() => (s.setMode('mock'), s.reset())}>
          <Icon name="bot" size={16} /> Now practise them with Priya
        </button>
        <button type="button" className="btn-text" onClick={s.reset}>
          Change role
        </button>
      </div>
    </div>
  );
}

/** Priya's face: her mouth moves with the speech, rings pulse while she talks, and she blinks. */
function PriyaFace({ speaking, thinking, listening }: { speaking: boolean; thinking: boolean; listening: boolean }) {
  const mouth = useRef<SVGEllipseElement>(null);
  useEffect(() => {
    if (!speaking) {
      mouth.current?.setAttribute('ry', '1.6');
      return;
    }
    let raf = 0;
    const tick = () => {
      // speechPulse is 1 right after each spoken word and fades to 0; add a little wobble so it looks alive.
      const open = 1.6 + speechPulse() * 4.2 + Math.abs(Math.sin(performance.now() / 90)) * 1.4;
      mouth.current?.setAttribute('ry', open.toFixed(2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speaking]);
  return (
    <div className={'iv-avatar' + (thinking ? ' is-thinking' : '') + (speaking ? ' is-speaking' : '') + (listening ? ' is-listening' : '')} aria-hidden="true">
      <svg viewBox="0 0 48 48" width="46" height="46">
        <defs>
          <linearGradient id="iv-skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffd9c2" />
            <stop offset="1" stopColor="#f2b896" />
          </linearGradient>
        </defs>
        <path d="M8 30c0-12 7-20 16-20s16 8 16 20c0 6-2 10-4 12H12c-2-2-4-6-4-12z" fill="#2b1a3d" />
        <ellipse cx="24" cy="25" rx="11" ry="12.5" fill="url(#iv-skin)" />
        <path d="M13 22c2-8 7-11 12-11 5 0 9 3 10 9-4-3-9-5-14-4-3 1-6 3-8 6z" fill="#2b1a3d" />
        <g className="iv-eyes">
          <ellipse cx="19.5" cy="25" rx="1.5" ry="1.8" fill="#2b1a3d" />
          <ellipse cx="28.5" cy="25" rx="1.5" ry="1.8" fill="#2b1a3d" />
        </g>
        <circle cx="16.5" cy="29.5" r="1.8" fill="#ff8fa3" opacity=".55" />
        <circle cx="31.5" cy="29.5" r="1.8" fill="#ff8fa3" opacity=".55" />
        <ellipse ref={mouth} cx="24" cy="32" rx="2.8" ry="1.6" fill="#b4385a" />
      </svg>
    </div>
  );
}

function Mock({ s }: { s: InterviewState }) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [s.lines.length, s.busy]);
  const asked = s.asked();
  return (
    <div className="iv-mock" data-testid="iv-mock">
      <div className="iv-call">
        <PriyaFace speaking={s.speaking} thinking={!!s.busy} listening={s.listening} />
        <div>
          <b>
            Priya <span className={'iv-state' + (s.speaking ? ' is-on' : '')}>{s.speaking ? 'speaking…' : s.listening ? 'listening…' : s.busy ? 'thinking…' : 'live'}</span>
          </b>
          <small className="muted">AI interviewer · {s.profile.role}</small>
        </div>
        {s.canVoice && (
          <>
            <button type="button" className="icon-btn" onClick={s.replay} aria-label="Hear the question again" title="Hear the question again" disabled={s.speaking}>
              <Icon name="repeat" size={17} />
            </button>
            <button type="button" className={'icon-btn' + (s.voice ? ' is-on' : '')} onClick={s.toggleVoice} aria-pressed={s.voice} aria-label={s.voice ? 'Mute Priya' : 'Let Priya speak'} title={s.voice ? 'Mute Priya' : 'Let Priya speak'} data-testid="iv-voice">
              <Icon name={s.voice ? 'volume' : 'volumeOff'} size={18} />
            </button>
          </>
        )}
        <span className="iv-progress">
          {Math.min(asked + 1, s.total)} / {s.total}
        </span>
        <button type="button" className="btn btn-ghost btn-sm" onClick={s.endEarly}>
          End & score
        </button>
      </div>
      {s.note && <p className="rb-off">{s.note}</p>}
      <div className="iv-chat" aria-live="polite">
        {s.lines.map((l) => (
          <div key={l.id} className={'iv-line is-' + l.who}>
            {l.who === 'hr' && l.kind && l.kind !== 'greeting' && <em className={'iv-kind k-' + l.kind}>{KIND_LABEL[l.kind] ?? l.kind}</em>}
            <p>{l.text}</p>
          </div>
        ))}
        {s.busy && (
          <div className="iv-line is-hr is-typing">
            <p>
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>{' '}
              {s.busy}
            </p>
          </div>
        )}
        <div ref={end} />
      </div>
      <form
        className="iv-answer"
        onSubmit={(e) => {
          e.preventDefault();
          void s.answer();
        }}
      >
        <textarea
          rows={3}
          value={s.draft}
          onChange={(e) => s.setDraft(e.target.value)}
          placeholder={s.listening ? 'Listening… speak your answer' : 'Type your answer (aim for 4 to 6 sentences), or use the mic'}
          disabled={!!s.busy}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) void s.answer();
          }}
          data-testid="iv-answer"
        />
        <div className="iv-answer-btns">
          {s.canMic && (
            <button type="button" className={'icon-btn iv-mic' + (s.listening ? ' is-live' : '')} onClick={s.toggleMic} aria-pressed={s.listening} aria-label={s.listening ? 'Stop listening' : 'Answer with your voice'}>
              <Icon name="headset" size={20} />
            </button>
          )}
          <button type="submit" className="btn btn-gold" disabled={!!s.busy} data-testid="iv-send">
            Send <Icon name="send" size={15} />
          </button>
        </div>
      </form>
      {s.micNote && <p className="rb-off">{s.micNote}</p>}
      <p className="apt-foot muted">{s.offline ? 'Offline practice: questions from our bank, rule-based marks.' : '✨ Powered by Gemini AI.'} Ctrl + Enter sends.</p>
    </div>
  );
}

function Report({ s }: { s: InterviewState }) {
  const r = s.report!;
  return (
    <div className="iv-report" data-testid="iv-report">
      <div className="apt-score mb-border">
        <div className="mb-inner">
          <ScoreRing score={r.score} size={110} label="Interview score" good={75} />
          <div>
            <h3>{r.score >= 75 ? 'Interview ready 🔥' : r.score >= 50 ? 'Nearly there 💪' : 'Keep practising 🌱'}</h3>
            <p className="muted">{r.summary}</p>
            <div className="apt-actions">
              <button type="button" className="btn btn-gold shine" onClick={() => void s.start()}>
                <Icon name="repeat" size={16} /> Practise again
              </button>
              <button type="button" className="btn-text" onClick={s.reset}>
                Change role
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="iv-sw">
        <div className="rb-card">
          <h3 className="rb-card-title">
            <span className="rb-card-ico">
              <Icon name="star" size={16} />
            </span>
            Strengths
          </h3>
          <ul className="iv-tips">
            {(r.strengths.length ? r.strengths : ['You finished the interview: showing up is half the battle 💪', 'Each answer below comes with a stronger version to learn from']).map((x) => (
              <li key={x}>
                <Icon name="check" size={14} /> {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="rb-card">
          <h3 className="rb-card-title">
            <span className="rb-card-ico">
              <Icon name="target" size={16} />
            </span>
            What to work on
          </h3>
          <ul className="iv-tips">
            {r.improve.map((x) => (
              <li key={x}>
                <Icon name="arrowRight" size={14} /> {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ol className="apt-review">
        {r.items.map((it, i) => (
          <li key={i} className={it.verdict === 'good' ? 'is-ok' : it.verdict === 'improve' ? 'is-mid' : 'is-bad'}>
            <p className="apt-rq">
              <span className="iv-marks">{it.marks}/10</span>
              {it.q}
            </p>
            <p className="iv-yours">
              <small>Your answer</small>
              {it.a || '(no answer)'}
            </p>
            <p className="apt-ex">
              <b>{VERDICT_LABEL[it.verdict]}:</b> {it.feedback}
            </p>
            {it.better && (
              <div className="iv-sample">
                <small>A stronger answer</small>
                <p>{it.better}</p>
              </div>
            )}
          </li>
        ))}
      </ol>
      <div className="apt-next-steps fx-glow">
        <Icon name="file" size={22} />
        <div>
          <b>Make your resume match this role.</b>
          <p className="muted">Our free ATS resume builder writes a job-ready resume that scores 85+.</p>
        </div>
        <Link to="/free-tools/ats-resume-builder" className="btn btn-ghost btn-sm">
          Build my resume <Icon name="arrowRight" size={15} />
        </Link>
      </div>
    </div>
  );
}

export default function Interview() {
  const s = useInterview();
  return (
    <div className="iv" data-testid="interview">
      {s.phase === 'setup' && <Setup s={s} />}
      {s.phase === 'bank' && <Bank s={s} />}
      {s.phase === 'mock' && <Mock s={s} />}
      {s.phase === 'report' && s.report && <Report s={s} />}
    </div>
  );
}
