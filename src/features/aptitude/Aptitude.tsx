import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import { OFFLINE_NOTE } from '../../utils/ai';
import { SECTIONS, sectionOf } from './bank';
import { COUNTS, DIFFICULTIES, EXAMS, useAptitude, type AptitudeState } from './types';

const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;
const LETTERS = ['A', 'B', 'C', 'D'];

function Setup({ a }: { a: AptitudeState }) {
  const best = a.history.length ? Math.max(...a.history.map((h) => Math.round((h.score / h.total) * 100))) : null;
  return (
    <div className="apt-setup">
      <div className="apt-sections">
        {SECTIONS.map((s) => {
          const on = s.topics.filter((t) => a.topics.includes(t)).length;
          return (
            <section key={s.id} className="apt-sec fx-glow" style={{ ['--c' as string]: s.color }}>
              <header>
                <span className="apt-sec-ico">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3>{s.name}</h3>
                <button type="button" className="btn-text" onClick={() => a.setSection(s.id, on < s.topics.length)}>
                  {on < s.topics.length ? 'Select all' : 'Clear'}
                </button>
              </header>
              <div className="apt-topics">
                {s.topics.map((t) => (
                  <button key={t} type="button" className={'chip' + (a.topics.includes(t) ? ' is-on' : '')} aria-pressed={a.topics.includes(t)} onClick={() => a.toggleTopic(t)}>
                    {a.topics.includes(t) && <Icon name="check" size={13} />}
                    {t}
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="apt-opts mb-border">
        <div className="mb-inner">
          <div className="apt-row">
            <span className="apt-label">Difficulty</span>
            <div className="seg">
              {DIFFICULTIES.map(([d, label, hint]) => (
                <button key={d} type="button" className={a.difficulty === d ? 'is-on' : ''} onClick={() => a.setDifficulty(d)} aria-pressed={a.difficulty === d} title={hint}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="apt-row">
            <span className="apt-label">Questions</span>
            <div className="seg">
              {COUNTS.map((n) => (
                <button key={n} type="button" className={a.count === n ? 'is-on' : ''} onClick={() => a.setCount(n)} aria-pressed={a.count === n}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="apt-row">
            <label className="apt-label" htmlFor="apt-exam">
              Exam style
            </label>
            <label className="select">
              <select id="apt-exam" value={a.exam} onChange={(e) => a.setExam(e.target.value)}>
                {EXAMS.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} />
            </label>
          </div>
          <div className="apt-row apt-toggles">
            <label className="tog">
              <input type="checkbox" checked={a.timed} onChange={(e) => a.setTimed(e.target.checked)} />
              <span /> Timer ({a.count} min)
            </label>
            <label className="tog">
              <input type="checkbox" checked={a.useAi && a.aiOn !== false} disabled={a.aiOn === false} onChange={(e) => a.setUseAi(e.target.checked)} />
              <span /> Fresh questions from Gemini AI
            </label>
          </div>
          {a.aiOn === false && (
            <p className="rb-off">
              <Icon name="shield" size={15} /> {OFFLINE_NOTE}
            </p>
          )}
          <button type="button" className="btn btn-gold btn-lg shine apt-go" onClick={() => void a.start()} disabled={!a.topics.length} data-testid="apt-start">
            <Icon name="zap" size={18} /> Start {a.count}-question practice
          </button>
          {!a.topics.length && <p className="field-err">Pick at least one topic.</p>}
        </div>
      </div>

      {a.history.length > 0 && (
        <section className="apt-history">
          <h3>
            Your last attempts {best !== null && <span className="chip is-ok">Best {best}%</span>}
          </h3>
          <div className="apt-bars" aria-label="Scores of your last attempts">
            {a.history
              .slice(0, 10)
              .reverse()
              .map((h) => {
                const p = Math.round((h.score / h.total) * 100);
                return (
                  <span key={h.at} style={{ height: Math.max(6, p) + '%' }} title={`${p}% · ${h.difficulty} · ${new Date(h.at).toLocaleDateString()}`}>
                    <i>{p}</i>
                  </span>
                );
              })}
          </div>
        </section>
      )}
    </div>
  );
}

function Test({ a }: { a: AptitudeState }) {
  const q = a.questions[a.idx];
  const done = a.answers.filter((x) => x !== null).length;
  const left = a.limit ? a.limit - a.seconds : 0;
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      const n = '1234abcd'.indexOf(e.key.toLowerCase());
      if (n >= 0) a.choose(a.idx, n % 4);
      if (e.key === 'ArrowRight') a.setIdx(Math.min(a.questions.length - 1, a.idx + 1));
      if (e.key === 'ArrowLeft') a.setIdx(Math.max(0, a.idx - 1));
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [a]);
  if (!q) return null;
  const sec = sectionOf(q.topic);
  return (
    <div className="apt-test" data-testid="apt-test">
      <div className="apt-top">
        <span className="chip" style={{ ['--c' as string]: sec.color }}>
          <Icon name={sec.icon} size={13} /> {q.topic}
        </span>
        <span className="apt-count">
          {a.idx + 1} / {a.questions.length}
        </span>
        <span className={'apt-clock' + (a.limit && left < 60 ? ' is-low' : '')} aria-live="off">
          <Icon name="timer" size={15} /> {a.limit ? mmss(left) : mmss(a.seconds)}
        </span>
      </div>
      <div className="apt-progress" aria-hidden="true">
        <span style={{ width: (done / a.questions.length) * 100 + '%' }} />
      </div>
      <div className="apt-q mb-border" key={a.idx}>
        <div className="mb-inner">
          <p className="apt-qtext">{q.q}</p>
          <div className="apt-options" role="radiogroup" aria-label="Answer options">
            {q.options.map((o, i) => (
              <button key={i} type="button" role="radio" aria-checked={a.answers[a.idx] === i} className={'apt-opt' + (a.answers[a.idx] === i ? ' is-on' : '')} onClick={() => a.choose(a.idx, i)} data-testid="apt-option">
                <span className="apt-letter">{LETTERS[i]}</span>
                {o}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="apt-nav">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => a.setIdx(Math.max(0, a.idx - 1))} disabled={a.idx === 0}>
          <Icon name="arrowLeft" size={15} /> Back
        </button>
        <button type="button" className={'btn btn-ghost btn-sm' + (a.flags[a.idx] ? ' is-flag' : '')} onClick={() => a.flag(a.idx)} aria-pressed={a.flags[a.idx]}>
          <Icon name="star" size={15} /> {a.flags[a.idx] ? 'Marked' : 'Mark for review'}
        </button>
        {a.idx < a.questions.length - 1 ? (
          <button type="button" className="btn btn-gold btn-sm" onClick={() => a.setIdx(a.idx + 1)} data-testid="apt-next">
            Next <Icon name="arrowRight" size={15} />
          </button>
        ) : (
          <button type="button" className="btn btn-gold btn-sm shine" onClick={a.finish} data-testid="apt-submit">
            Submit <Icon name="check" size={15} />
          </button>
        )}
      </div>
      <div className="apt-dots" aria-label="Question navigator">
        {a.questions.map((_, i) => (
          <button key={i} type="button" className={(i === a.idx ? 'is-cur ' : '') + (a.answers[i] !== null ? 'is-done ' : '') + (a.flags[i] ? 'is-flag' : '')} onClick={() => a.setIdx(i)} aria-label={`Question ${i + 1}`}>
            {i + 1}
          </button>
        ))}
      </div>
      <p className="apt-foot muted">
        {a.source.ai ? '✨ Fresh questions written by Gemini AI.' : 'Offline question bank: numbers change every time.'} Keys 1 to 4 pick an answer, arrows move.{' '}
        <button type="button" className="btn-text" onClick={a.finish}>
          Submit now
        </button>
      </p>
      {a.source.note && <p className="rb-off">{a.source.note}</p>}
    </div>
  );
}

function Result({ a }: { a: AptitudeState }) {
  const right = a.questions.filter((q, i) => a.answers[i] === q.answer).length;
  const pct = Math.round((right / a.questions.length) * 100);
  const byTopic = new Map<string, [number, number]>();
  a.questions.forEach((q, i) => {
    const [r, t] = byTopic.get(q.topic) ?? [0, 0];
    byTopic.set(q.topic, [r + (a.answers[i] === q.answer ? 1 : 0), t + 1]);
  });
  const weak = [...byTopic].filter(([, [r, t]]) => r / t < 0.6).map(([t]) => t);
  const mood = pct >= 80 ? ['Placement ready 🔥', 'You are scoring like the top candidates. Try Hard mode next.'] : pct >= 50 ? ['Good going 💪', 'A little practice on your weak topics and you are there.'] : ['Keep practising 🌱', 'Read the worked solutions below, then retry your weak topics.'];
  return (
    <div className="apt-result" data-testid="apt-result">
      <div className="apt-score mb-border">
        <div className="mb-inner">
          <div className="apt-big">
            <b>{pct}%</b>
            <span>
              {right} of {a.questions.length} correct · {mmss(a.seconds)}
            </span>
          </div>
          <div>
            <h3>{mood[0]}</h3>
            <p className="muted">{mood[1]}</p>
            <div className="apt-actions">
              {weak.length > 0 && (
                <button type="button" className="btn btn-gold shine" onClick={() => void a.start(weak)}>
                  <Icon name="target" size={16} /> Practise weak topics
                </button>
              )}
              <button type="button" className="btn btn-ghost" onClick={() => void a.start()}>
                <Icon name="repeat" size={16} /> New set
              </button>
              <button type="button" className="btn-text" onClick={a.restart}>
                Change topics
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="apt-topicbars">
        {[...byTopic].map(([t, [r, n]]) => (
          <div key={t} className="apt-tb">
            <span>{t}</span>
            <span className="apt-tb-bar">
              <i style={{ width: (r / n) * 100 + '%', background: r / n >= 0.6 ? 'var(--mint)' : 'var(--gold)' }} />
            </span>
            <b>
              {r}/{n}
            </b>
          </div>
        ))}
      </div>
      <ol className="apt-review">
        {a.questions.map((q, i) => {
          const ok = a.answers[i] === q.answer;
          return (
            <li key={i} className={ok ? 'is-ok' : 'is-bad'}>
              <p className="apt-rq">
                <span className="apt-mark">{ok ? <Icon name="check" size={14} /> : <Icon name="x" size={14} />}</span>
                {q.q}
              </p>
              <p className="apt-ra">
                {!ok && (
                  <span className="kw is-miss">
                    Your answer: {a.answers[i] === null ? 'skipped' : q.options[a.answers[i]!]}
                  </span>
                )}
                <span className="kw is-ok">Correct: {q.options[q.answer]}</span>
              </p>
              {q.explain && <p className="apt-ex">{q.explain}</p>}
            </li>
          );
        })}
      </ol>
      <div className="apt-next-steps fx-glow">
        <Icon name="rocket" size={22} />
        <div>
          <b>Aptitude done. Now ace the interview round.</b>
          <p className="muted">Practise with Priya, our AI interviewer, and get marks and a better answer for every question.</p>
        </div>
        <Link to="/free-tools/interview-prep" className="btn btn-ghost btn-sm">
          Interview prep <Icon name="arrowRight" size={15} />
        </Link>
      </div>
    </div>
  );
}

export default function Aptitude() {
  const a = useAptitude();
  return (
    <div className="apt" data-testid="aptitude">
      {a.phase === 'setup' && <Setup a={a} />}
      {a.phase === 'loading' && (
        <div className="tool-loading" role="status">
          <span className="orb" aria-hidden="true" />
          <b>Cooking up your questions…</b>
          <small className="muted">Gemini is writing a fresh set. This takes a few seconds.</small>
        </div>
      )}
      {a.phase === 'test' && <Test a={a} />}
      {a.phase === 'result' && <Result a={a} />}
    </div>
  );
}
