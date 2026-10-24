import Icon from './Icon';
import { useLeadForm, type LeadField, type LeadFormProps } from './types';

const LABELS: Record<LeadField, string> = { name: 'Your name', email: 'Email', phone: 'Mobile / WhatsApp number', message: 'How can we help?' };
const TYPES: Record<LeadField, string> = { name: 'text', email: 'email', phone: 'tel', message: 'text' };
const AUTO: Record<LeadField, string> = { name: 'name', email: 'email', phone: 'tel', message: 'off' };

export default function LeadForm(props: LeadFormProps) {
  const f = useLeadForm(props);
  const { fields, required = ['name', 'email'], cta, inline, testId, source } = props;
  if (f.sent) {
    return (
      <div className={'lead-done' + (inline ? ' is-inline' : '')} role="status" data-testid={testId && testId + '-done'}>
        <Icon name="checkCircle" size={22} />
        <span>{props.done}</span>
        {!inline && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={f.again}>
            Send another
          </button>
        )}
      </div>
    );
  }
  return (
    <form className={'lead' + (inline ? ' is-inline' : '')} noValidate onSubmit={f.submit} data-testid={testId}>
      {fields.map((k) => {
        const id = `${source}-${k}`;
        const label = LABELS[k] + (required.includes(k) ? '' : ' (optional)');
        const err = f.errors[k];
        const common = {
          id,
          name: k,
          value: f.v[k],
          onChange: f.set(k),
          placeholder: label,
          'aria-invalid': !!err,
          'aria-describedby': err ? id + '-err' : undefined,
          autoComplete: AUTO[k],
        };
        return (
          <div key={k} className={'field' + (err ? ' has-err' : '')}>
            <label htmlFor={id} className="sr-only">
              {label}
            </label>
            {k === 'message' ? <textarea rows={4} {...common} /> : <input type={TYPES[k]} inputMode={k === 'phone' ? 'tel' : undefined} {...common} />}
            {err && (
              <span id={id + '-err'} className="field-err">
                {err}
              </span>
            )}
          </div>
        );
      })}
      <label className="honey" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={f.v.website} onChange={f.set('website')} />
      </label>
      <button type="submit" className="btn btn-gold" disabled={f.busy}>
        {f.busy ? 'Sending…' : cta}
        {!f.busy && <Icon name="send" size={16} />}
      </button>
    </form>
  );
}
