import { memo, useState, type ReactNode } from 'react';
import { ScoreRing } from '../../components/Fx';
import Icon from '../../components/Icon';
import { useToast } from '../../context/types';
import { OFFLINE_NOTE } from '../../utils/ai';
import { ResumePaper } from './ResumePaper';
import { THEMES } from './themes';
import { ATS_TARGET, COURSE_PICKS, EXAMPLE_PROMPTS, LABELS, PERSONAL, useResumeAi, useResumeWorkspace, type ListKey, type OnValue, type ResumeEntry, type ResumeAi, type Workspace } from './types';
import type { AtsResult } from './ats';

const BAND: Record<AtsResult['band'], [string, string]> = {
  excellent: ['Excellent', 'var(--mint)'],
  good: ['Good', 'var(--sky)'],
  fair: ['Fair', 'var(--gold)'],
  poor: ['Needs work', 'var(--red)'],
};

const Field = memo(function Field({ name, label, value, onValue, multiline, rows = 3, flagged }: { name: string; label: string; value: string; onValue: OnValue; multiline?: boolean; rows?: number; flagged?: boolean }) {
  const id = 'rb-' + name.replace(/\./g, '-');
  return (
    <label className={'rb-field' + (flagged ? ' is-example' : '')} htmlFor={id}>
      <span>{label}</span>
      {multiline ? (
        <textarea id={id} rows={rows} value={value} onChange={(e) => onValue(name, e.target.value)} />
      ) : (
        <input id={id} type="text" value={value} onChange={(e) => onValue(name, e.target.value)} />
      )}
    </label>
  );
});

const EntryList = memo(function EntryList({ list, items, flags, onValue, onAdd, onRemove }: { list: ListKey; items: ResumeEntry[]; flags: boolean[]; onValue: OnValue; onAdd: (l: ListKey) => void; onRemove: (l: ListKey) => void }) {
  const [a, b, c] = LABELS[list];
  return (
    <>
      {items.map((e, i) => (
        <div key={i} className={'rb-entry' + (flags[i] ? ' is-example' : '')}>
          {flags[i] && <span className="rb-example-tag">Example: replace with yours</span>}
          <div className="rb-grid2">
            <Field name={`${list}.${i}.title`} label={a} value={e.title} onValue={onValue} />
            <Field name={`${list}.${i}.sub`} label={b} value={e.sub} onValue={onValue} />
            <label className="rb-field" htmlFor={`rb-${list}-${i}-from`}>
              <span>From</span>
              <input id={`rb-${list}-${i}-from`} type="month" value={e.from} onChange={(x) => onValue(`${list}.${i}.from`, x.target.value)} />
            </label>
            <label className="rb-field" htmlFor={`rb-${list}-${i}-to`}>
              <span>To (empty = present)</span>
              <input id={`rb-${list}-${i}-to`} type="month" value={e.to} onChange={(x) => onValue(`${list}.${i}.to`, x.target.value)} />
            </label>
          </div>
          <Field name={`${list}.${i}.points`} label={c} value={e.points} onValue={onValue} multiline rows={4} />
        </div>
      ))}
      <div className="rb-addrow">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => onAdd(list)}>
          <Icon name="plus" size={15} /> Add
        </button>
        {items.length > 1 && (
          <button type="button" className="btn-text" onClick={() => onRemove(list)}>
            Remove last
          </button>
        )}
      </div>
    </>
  );
});

function Card({ icon, title, hint, children }: { icon: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="rb-card fx-glow">
      <h3 className="rb-card-title">
        <span className="rb-card-ico">
          <Icon name={icon} size={17} />
        </span>
        {title}
      </h3>
      {hint && <p className="rb-hint">{hint}</p>}
      {children}
    </section>
  );
}

function AiPanel({ ai, w }: { ai: ResumeAi; w: Workspace }) {
  const [showCourses, setShowCourses] = useState(false);
  const { live, result, steps, working, target } = ai;
  const band = live ? BAND[live.band] : null;
  return (
    <section className="rb-ai mb-border" id="create">
      <div className="mb-inner">
        <div className="rb-ai-head">
          <span className="rb-ai-badge">
            <Icon name="sparkles" size={15} /> Gemini AI
          </span>
          <h2>Paste a job post, or just type the role you want</h2>
          <p className="muted">
            We write a complete one-page resume for that job, with every section filled, and keep improving it until it scores {ATS_TARGET}+ in our ATS check. Details we do not know are shown as
            [examples] for you to replace.
          </p>
        </div>
        <div className="rb-chips">
          <small>Try:</small>
          {EXAMPLE_PROMPTS.map((p) => (
            <button key={p} type="button" className="chip" onClick={() => w.setJd(p)} disabled={working}>
              {p}
            </button>
          ))}
        </div>
        <label className="rb-field rb-jd" htmlFor="rb-jd">
          <span className="sr-only">Job description or resume request</span>
          <textarea
            id="rb-jd"
            rows={5}
            value={w.jd}
            onChange={(e) => w.setJd(e.target.value)}
            disabled={working}
            placeholder={'Paste the full job post (title, duties, skills), or type a request like "Python developer with 2 years experience"'}
            data-testid="jd-input"
          />
          {ai.inputError && <em className="field-err">{ai.inputError}</em>}
        </label>
        {target && !working && (
          <p className="rb-target" data-testid="ai-target">
            <span className="chip is-on">{target.kind === 'prompt' ? 'Short request' : 'Job post'}</span>
            {target.kind === 'prompt'
              ? `A complete ${target.role} resume${target.years ? ` with ${target.years} years of experience` : target.level === 'intern' ? ' for an internship' : ' for a fresher'}, scored against a typical ${target.role} job post.`
              : `Resume for ${target.role}, scored against ${target.keywords.length} keywords from this post.`}
          </p>
        )}
        <div className="rb-courses">
          <button type="button" className="btn-text" onClick={() => setShowCourses((v) => !v)} aria-expanded={showCourses}>
            <Icon name="award" size={15} /> Finished a Takxila course? Add it as real training {w.taken.length ? `(${w.taken.length} added)` : ''}
            <Icon name="chevronDown" size={14} />
          </button>
          {showCourses && (
            <div className="rb-course-list">
              {COURSE_PICKS.map((c) => (
                <button key={c.id} type="button" className={'chip' + (w.taken.includes(c.id) ? ' is-on' : '')} onClick={() => w.toggleCourse(c.id)} aria-pressed={w.taken.includes(c.id)}>
                  {w.taken.includes(c.id) && <Icon name="check" size={13} />}
                  {c.title}
                </button>
              ))}
              <small className="muted">Up to 3. They become projects and training on your resume.</small>
            </div>
          )}
        </div>
        <div className="rb-actions">
          <button type="button" className="btn btn-gold btn-lg shine" onClick={ai.create} disabled={working} data-testid="create-resume">
            {working ? <span className="spin" aria-hidden="true" /> : <Icon name="sparkles" size={18} />}
            {working ? 'Creating…' : 'Create my resume'}
          </button>
          {working && (
            <button type="button" className="btn btn-ghost" onClick={ai.cancel}>
              Cancel
            </button>
          )}
          {ai.aiOn === false && !working && (
            <span className="rb-off">
              <Icon name="shield" size={15} /> {OFFLINE_NOTE}
            </span>
          )}
        </div>
        {steps.length > 0 && (
          <ol className="rb-steps" aria-live="polite" data-testid="ai-steps">
            {steps.map((st) => (
              <li key={st.text} className={st.done ? 'is-done' : ''}>
                {st.done ? <Icon name="checkCircle" size={16} /> : <span className="spin" aria-hidden="true" />}
                {st.text}
              </li>
            ))}
          </ol>
        )}
        {result && !working && (
          <div className="rb-result" data-testid="ai-result">
            <ScoreRing score={result.score} label="ATS score" good={ATS_TARGET} />
            <div className="rb-result-text">
              <b data-testid="ai-score">
                ATS score {result.score}
                {result.reached ? ' 🎉' : ''}
              </b>
              <p className="muted">
                Was {result.before} before. {result.matched.length} of {result.total} job keywords are in your resume now.
                {result.offline && ' Built on your device.'}
              </p>
              {result.hint && <p className="rb-hint">{result.hint}</p>}
              {result.matched.length > 0 && (
                <div className="rb-kw">
                  {result.matched.slice(0, 18).map((k) => (
                    <span key={k} className="kw is-ok">
                      <Icon name="check" size={12} />
                      {k}
                    </span>
                  ))}
                </div>
              )}
              {result.notes.length > 0 && (
                <ul className="rb-notes">
                  {result.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rb-result-btns">
              <button type="button" className="btn btn-ghost btn-sm" onClick={ai.undo} disabled={!ai.canUndo}>
                Undo
              </button>
              <button type="button" className="btn btn-gold btn-sm" onClick={ai.keep}>
                <Icon name="check" size={15} /> Keep
              </button>
            </div>
          </div>
        )}
        {live && band && !working && (!result || live.score !== result.score) && (
          <div className="rb-live" data-testid="ai-live-score">
            <ScoreRing score={live.score} size={58} label="Live ATS score" good={ATS_TARGET} />
            <div>
              <b style={{ color: band[1] }}>{band[0]} match for this job right now</b>
              <p className="muted">{live.score < ATS_TARGET ? `Click Create my resume to reach ${ATS_TARGET}+.` : 'Your resume reads well for this job.'}</p>
              {live.score < ATS_TARGET && !!live.keywords?.missing.length && (
                <div className="rb-kw">
                  {live.keywords.missing.slice(0, 12).map((k) => (
                    <span key={k} className="kw is-miss">
                      <Icon name="x" size={12} />
                      {k}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function AtsChecks({ w, ai }: { w: Workspace; ai: ResumeAi }) {
  const res = ai.live;
  if (!res) return null;
  return (
    <section className="rb-card rb-checks fx-glow" id="ats-score">
      <h3 className="rb-card-title">
        <span className="rb-card-ico">
          <Icon name="target" size={17} />
        </span>
        ATS check, line by line
      </h3>
      <ul>
        {res.checks.map((c) => (
          <li key={c.id} className={'is-' + c.status}>
            <span className="rb-check-ico">
              <Icon name={c.status === 'pass' ? 'check' : c.status === 'warn' ? 'eye' : 'x'} size={13} />
            </span>
            <span>
              <b>
                {c.label} <small>{Math.round(c.points)}/{c.max}</small>
              </b>
              <small className="muted">{c.status === 'pass' ? c.detail : c.tips[0] || c.detail}</small>
            </span>
          </li>
        ))}
      </ul>
      {w.placeholders.length > 0 && <p className="rb-hint">{w.placeholders.length} example detail(s) still to replace before you send it.</p>}
    </section>
  );
}

export default function ResumeBuilder() {
  const toast = useToast();
  const w = useResumeWorkspace(toast);
  const ai = useResumeAi(w);
  const { r, onValue, theme } = w;

  return (
    <div className="rb" data-testid="resume-builder">
      <AiPanel ai={ai} w={w} />

      {w.placeholders.length > 0 && (
        <div className="rb-banner" data-testid="examples-banner">
          <Icon name="eye" size={18} />
          <span>
            <b>Replace the highlighted example details with your own.</b> {w.placeholders.length} example detail{w.placeholders.length > 1 ? 's are' : ' is'} still in your resume. Text in [square
            brackets] is an example: put your real college, company, numbers and links there, or delete what does not apply.
          </span>
        </div>
      )}

      <div className="rb-cols">
        <div className="rb-form">
          <Card icon="user" title="Personal information">
            <div className="rb-grid2">
              {PERSONAL.map(([k, label, span]) => (
                <div key={k} className={span === 'full' ? 'rb-span2' : ''}>
                  <Field name={k} label={label} value={r[k]} onValue={onValue} />
                </div>
              ))}
            </div>
          </Card>
          <Card icon="globe" title="Profile links" hint="LinkedIn matters most to recruiters.">
            {r.links.map((l, i) => (
              <div key={i} className="rb-grid-link">
                <Field name={`links.${i}.label`} label="Label" value={l.label} onValue={onValue} />
                <Field name={`links.${i}.url`} label="Link" value={l.url} onValue={onValue} />
              </div>
            ))}
            <div className="rb-addrow">
              <button type="button" className="btn btn-ghost btn-sm" onClick={w.addLink}>
                <Icon name="plus" size={15} /> Add link
              </button>
              {r.links.length > 0 && (
                <button type="button" className="btn-text" onClick={w.dropLink}>
                  Remove last
                </button>
              )}
            </div>
          </Card>
          <Card icon="file" title="Summary" hint="2 to 3 lines: who you are, what you do best, what you want next.">
            <Field name="summary" label="Summary" value={r.summary} onValue={onValue} multiline rows={4} />
          </Card>
          <Card icon="briefcase" title="Work experience" hint="Internships and freelance work count too.">
            <EntryList list="work" items={r.work} flags={w.flags.work} onValue={onValue} onAdd={w.addEntry} onRemove={w.dropEntry} />
          </Card>
          <Card icon="rocket" title="Projects">
            <EntryList list="projects" items={r.projects} flags={w.flags.projects} onValue={onValue} onAdd={w.addEntry} onRemove={w.dropEntry} />
          </Card>
          <Card icon="cap" title="Education">
            <EntryList list="education" items={r.education} flags={w.flags.education} onValue={onValue} onAdd={w.addEntry} onRemove={w.dropEntry} />
          </Card>
          <Card icon="zap" title="Skills" hint="Comma separated. Use the exact names from job posts.">
            <Field name="skills" label="Technical skills" value={r.skills} onValue={onValue} />
            <Field name="soft" label="Soft skills" value={r.soft} onValue={onValue} />
            <Field name="languages" label="Languages" value={r.languages} onValue={onValue} />
            <Field name="interests" label="Interests (optional)" value={r.interests ?? ''} onValue={onValue} />
          </Card>
          <Card icon="award" title="Certifications">
            <Field name="certs" label="One per line" value={r.certs} onValue={onValue} multiline />
          </Card>
          <Card icon="trophy" title="Achievements" hint="Awards, rankings, hackathons, leadership roles. One per line.">
            <Field name="achievements" label="One per line" value={r.achievements ?? ''} onValue={onValue} multiline />
          </Card>
          <div className="rb-addrow">
            <button
              type="button"
              className="btn-text"
              onClick={() => {
                if (window.confirm('Clear the whole resume and start again?')) w.reset();
              }}
            >
              Start a new resume
            </button>
            <span className="muted rb-saved">
              <Icon name={w.status === 'saved' ? 'checkCircle' : 'clock'} size={14} /> {w.status === 'saved' ? 'Saved in this browser' : 'Saving…'}
            </span>
          </div>
        </div>

        <div className="rb-side">
          <div className="rb-preview">
            <div className="rb-preview-head">
              <b>Live preview</b>
              {w.pages !== null && w.pages > 0 && (
                <span className={'chip' + (w.pages === 1 ? ' is-ok' : '')} data-testid="pdf-pages">
                  PDF: {w.pages} page{w.pages > 1 ? 's' : ''}
                </span>
              )}
              <button type="button" className="btn btn-gold btn-sm shine" onClick={w.onDownload} disabled={w.busy} data-testid="download-pdf">
                {w.busy ? <span className="spin" aria-hidden="true" /> : <Icon name="download" size={16} />} Download PDF
              </button>
            </div>
            <div className="rb-themes" role="radiogroup" aria-label="Resume theme">
              {THEMES.map((t) => (
                <button key={t.id} type="button" role="radio" aria-checked={w.themeId === t.id} className={'chip' + (w.themeId === t.id ? ' is-on' : '')} onClick={() => w.pickTheme(t.id)} title={t.blurb}>
                  <span className="rb-swatch" style={{ background: t.color.heading }} />
                  {t.name}
                </button>
              ))}
            </div>
            <ResumePaper doc={w.doc} theme={theme} />
            <p className="rb-hint">All themes are ATS safe: one column, standard headings, real selectable text.</p>
          </div>
          <AtsChecks w={w} ai={ai} />
        </div>
      </div>

      {w.confirm && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="rb-confirm-title">
          <div className="modal-card">
            <h3 id="rb-confirm-title">Example details are still in your resume</h3>
            <p className="muted">Replace these with your own details first, or they will appear in the PDF as they are:</p>
            <ul className="rb-notes" data-testid="examples-list">
              {w.placeholders.slice(0, 12).map((p, i) => (
                <li key={i}>
                  <b>{p.where}</b>: {p.text}
                </li>
              ))}
            </ul>
            <div className="modal-btns">
              <button type="button" className="btn btn-ghost" onClick={w.downloadAnyway}>
                Download anyway
              </button>
              <button type="button" className="btn btn-gold" onClick={w.closeConfirm} autoFocus>
                Edit them first
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
