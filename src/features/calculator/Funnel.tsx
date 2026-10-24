import Icon from '../../components/Icon';
import LeadForm from '../../components/LeadForm';
import type { Question } from '../../types';
import { ANALYSE_STEPS, INFO_HUES, lookOf, type CalcFunnel, type Insight } from './types';

export function FunnelTop({ f }: { f: CalcFunnel }) {
  return (
    <div className="fn-top">
      <div className="fn-bar-row">
        <button type="button" className="icon-btn" onClick={f.back} disabled={!f.canBack} aria-label="Previous question">
          <Icon name="arrowLeft" size={20} />
        </button>
        <span className="fn-count" aria-live="polite">
          {f.qNum} <span>/ {f.total}</span>
        </span>
        <span style={{ width: 40 }} />
      </div>
      <div className="fn-bar" role="progressbar" aria-valuenow={Math.round(f.progress)} aria-valuemin={0} aria-valuemax={100} aria-label={`Question ${f.qNum} of ${f.total}`}>
        <i style={{ width: f.progress + '%' }} />
      </div>
    </div>
  );
}

export function QuestionScreen({ f, q }: { f: CalcFunnel; q: Question }) {
  const grid = q.opts.length > 6;
  const multi = !!q.multi;
  return (
    <div className="fn-screen">
      <h1 className="fn-q" ref={f.headRef} tabIndex={-1}>
        {q.q}
      </h1>
      <p className="fn-sub">{q.sub}</p>
      <div className={grid ? 'opts opts-grid' : 'opts'} role="group" aria-label={q.q}>
        {q.opts.map(([v, label], i) => {
          const on = f.isOn(v);
          const { icon, color } = lookOf(q.id, v, i);
          return (
            <button key={v} type="button" aria-pressed={on} onClick={() => f.pick(v)} className={'opt' + (on ? ' is-on' : '')} style={{ ['--c' as string]: color }} data-testid={`opt-${q.id}-${v}`}>
              <span className="opt-ico" aria-hidden="true">
                <Icon name={icon} size={20} />
              </span>
              <span className="opt-label">{label}</span>
              <span className={'opt-mark' + (multi ? ' is-multi' : '')} aria-hidden="true">
                {on && <Icon name="check" size={14} />}
              </span>
            </button>
          );
        })}
      </div>
      {multi && (
        <div className="fn-continue">
          <button type="button" className="btn btn-gold btn-lg" disabled={!f.canContinue} onClick={f.cont} data-testid="calc-continue">
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export function InfoScreen({ f, info }: { f: CalcFunnel; info: Insight }) {
  const [main, ...rest] = info.icons;
  return (
    <div className="fn-screen fn-info">
      <div className="info-art" aria-hidden="true">
        <span className="info-halo">
          <Icon name={main} size={40} />
        </span>
        {rest.map((ic, i) => (
          <span key={i} className={'info-bub b' + i} style={{ background: INFO_HUES[i] }}>
            <Icon name={ic} size={18} />
          </span>
        ))}
      </div>
      <p className="kick">{info.kick}</p>
      <h1 className="fn-q" ref={f.headRef} tabIndex={-1}>
        {info.title}
      </h1>
      <p className="fn-sub">{info.text}</p>
      <div className="fn-continue">
        <button type="button" className="btn btn-gold btn-lg" onClick={f.cont} data-testid="calc-continue">
          Continue
        </button>
      </div>
    </div>
  );
}

export function Analysing({ f }: { f: CalcFunnel }) {
  const R = 58;
  const C = 2 * Math.PI * R;
  return (
    <div className="fn-screen fn-analyse" role="status" aria-live="polite">
      <div className="ring">
        <svg viewBox="0 0 132 132" width="132" height="132">
          <circle cx="66" cy="66" r={R} className="ring-track" />
          <circle cx="66" cy="66" r={R} className="ring-fill" strokeDasharray={C} strokeDashoffset={C * (1 - f.pct / 100)} transform="rotate(-90 66 66)" />
        </svg>
        <b>{Math.round(f.pct)}%</b>
      </div>
      <h1 className="fn-q" ref={f.headRef} tabIndex={-1}>
        Analysing your answers…
      </h1>
      <p className="fn-sub">Picking the right level and courses for you.</p>
      <ul className="checklist">
        {ANALYSE_STEPS.map((t, i) => {
          const done = i < f.doneSteps;
          return (
            <li key={t} className={done ? 'is-done' : i === f.doneSteps ? 'is-now' : ''}>
              <Icon name={done ? 'checkCircle' : 'circle'} size={18} />
              {t}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function LeadGate({ f }: { f: CalcFunnel }) {
  return (
    <div className="fn-screen fn-gate" data-testid="quiz-lead">
      <span className="gate-badge" aria-hidden="true">
        <Icon name="unlock" size={26} />
      </span>
      <p className="kick">Your result is ready</p>
      <h1 className="fn-q" ref={f.headRef} tabIndex={-1}>
        Where should we send your AI plan?
      </h1>
      <p className="fn-sub">Get your AI score, matched courses and a copy of your plan by email. A mentor can also help you on WhatsApp.</p>
      <LeadForm
        source="quiz"
        fields={['name', 'email', 'phone']}
        required={['name', 'email', 'phone']}
        cta="Show my result"
        done="Thanks! Your AI plan is on its way to your inbox."
        extra={f.leadExtra}
        onSent={() => f.showResult(true)}
        testId="quiz-lead-form"
      />
      <button type="button" className="btn-text fn-skip" onClick={() => f.showResult(false)} data-testid="quiz-skip">
        Skip and see my result
      </button>
    </div>
  );
}
