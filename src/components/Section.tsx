import type { ReactNode } from 'react';

export function SectionHead({ kick, title, sub, center, children }: { kick?: string; title: ReactNode; sub?: ReactNode; center?: boolean; children?: ReactNode }) {
  return (
    <div className={'shead' + (center ? ' is-center' : '')}>
      <div>
        {kick && <p className="kick">{kick}</p>}
        <h2 className="shead-title">{title}</h2>
        {sub && <p className="shead-sub">{sub}</p>}
      </div>
      {children && <div className="shead-side">{children}</div>}
    </div>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <details key={q} className="faq-item" open={i === 0}>
          <summary>
            <span>{q}</span>
            <span className="faq-plus" aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function PageHero({ kick, title, sub, children }: { kick?: string; title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <section className="phero">
      <div className="phero-glow" aria-hidden="true" />
      <div className="wrap">
        {kick && <p className="kick">{kick}</p>}
        <h1 className="phero-title">{title}</h1>
        {sub && <p className="phero-sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
