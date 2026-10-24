import { memo } from 'react';
import { Link } from 'react-router-dom';
import { durationText } from '../data/showcase';
import { trackOf } from '../data/tracks';
import { enrollUrl } from '../utils/links';
import type { Course } from '../types';
import Icon from './Icon';
import { cardTitle, fmt, offPct } from './types';

export function Price({ c, big }: { c: Course; big?: boolean }) {
  if (!c.price) return <span className={'price is-free' + (big ? ' is-big' : '')}>Free</span>;
  const off = offPct(c);
  return (
    <span className={'price' + (big ? ' is-big' : '')}>
      <b>{fmt(c.price)}</b>
      {c.was && <s>{fmt(c.was)}</s>}
      {off > 0 && <em>{off}% off</em>}
    </span>
  );
}

function CourseCard({ c, eager, from = 'card' }: { c: Course; eager?: boolean; from?: string }) {
  const t = trackOf(c.group);
  return (
    <article className="ccard" style={{ ['--c' as string]: t.color }} data-testid="course-card">
      <Link to={'/course/' + c.id} className="ccard-media" tabIndex={-1} aria-hidden="true">
        <img src={c.img} alt="" width="2250" height="660" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </Link>
      <div className="ccard-body">
        <p className="ccard-track">
          <Icon name={t.icon} size={14} />
          {t.name}
        </p>
        <h3 className="ccard-title">
          <Link to={'/course/' + c.id}>{cardTitle(c)}</Link>
        </h3>
        <p className="ccard-short">{c.short}</p>
        <div className="ccard-meta">
          <span>
            <Icon name="clock" size={14} />
            {durationText(c)}
          </span>
          <span>
            <Icon name="award" size={14} />
            Certificate
          </span>
        </div>
        <div className="ccard-foot">
          <Price c={c} />
          <a className="btn btn-sm btn-ghost ccard-enroll" href={enrollUrl(c, from)} rel="noopener" aria-label={`Enroll in ${cardTitle(c)} on the academy`}>
            {c.price ? 'Enroll' : 'Start free'}
            <Icon name="arrowUpRight" size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}
export default memo(CourseCard);
