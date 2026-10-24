import { Link, useParams } from 'react-router-dom';
import CourseCard, { Price } from '../components/CourseCard';
import Icon from '../components/Icon';
import { VideoPreview } from '../components/Media';
import { Faq } from '../components/Section';
import { cardTitle } from '../components/types';
import { whatsappLink } from '../config/site';
import { lessonsFor } from '../data/curriculum';
import promos from '../data/promos.json';
import { courseById } from '../data/recommend';
import { COURSE_FAQ, PERKS, durationText, howItWorks } from '../data/showcase';
import { coursesIn, trackOf } from '../data/tracks';
import { useCourseContent } from '../utils/content';
import { enrollUrl } from '../utils/links';
import { courseLd, faqLd, usePageMeta } from '../utils/seo';
import type { Course as CourseT } from '../types';
import { NotFound } from './Info';

type Promo = { hook: string[]; flow?: string[] };
const promoOf = (c: CourseT): Promo => {
  const p = promos as unknown as { byCategory: Record<string, Promo>; byCourse: Record<string, Promo> };
  return p.byCourse[c.id] ?? p.byCategory[c.cat];
};

const mins = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60 ? (m % 60) + 'm' : ''}`.trim() : m + ' min');

function Curriculum({ c }: { c: CourseT }) {
  const { content, loading } = useCourseContent(c.id);
  if (!content) {
    return (
      <section className="cblock" id="curriculum">
        <h2>Course content</h2>
        <ol className={'lessons-simple' + (loading ? ' is-loading' : '')}>
          {lessonsFor(c).map((l, i) => (
            <li key={i}>
              <span className="ls-n">{String(i + 1).padStart(2, '0')}</span>
              {l}
            </li>
          ))}
        </ol>
      </section>
    );
  }
  const lectures = content.sections.reduce((n, s) => n + s.lectures.length, 0);
  const total = content.sections.reduce((n, s) => n + s.lectures.reduce((a, l) => a + l[1], 0), 0);
  return (
    <>
      <section className="cblock">
        <h2>What you'll learn</h2>
        <ul className="learn">
          {content.learn.map((l) => (
            <li key={l}>
              <Icon name="check" size={18} />
              {l}
            </li>
          ))}
        </ul>
      </section>
      <section className="cblock" id="curriculum">
        <div className="cblock-head">
          <h2>Course content</h2>
          <p className="muted">
            {content.sections.length} sections · {lectures} lessons · {mins(total)} total
          </p>
        </div>
        <div className="sections">
          {content.sections.map((s, i) => (
            <details key={s.title} className="csec" open={i === 0}>
              <summary>
                <span className="csec-title">{s.title}</span>
                <span className="csec-meta">
                  {s.lectures.length} lessons · {mins(s.lectures.reduce((a, l) => a + l[1], 0))}
                </span>
                <Icon name="chevronDown" size={18} />
              </summary>
              <ul>
                {s.lectures.map(([t, m], j) => (
                  <li key={j}>
                    <Icon name="play" size={13} />
                    <span>{t}</span>
                    <small>{m} min</small>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
      <div className="cblock-2">
        {!!content.requirements.length && (
          <section className="cblock">
            <h2>Requirements</h2>
            <ul className="bullets">
              {content.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        )}
        {!!content.audience.length && (
          <section className="cblock">
            <h2>Who this course is for</h2>
            <ul className="bullets">
              {content.audience.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {!!content.description.length && (
        <section className="cblock prose">
          <h2>About this course</h2>
          {content.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      )}
    </>
  );
}

function CourseView({ c }: { c: CourseT }) {
  const t = trackOf(c.group);
  const { content } = useCourseContent(c.id);
  const promo = promoOf(c);
  const related = coursesIn(c.group)
    .filter((x) => x.id !== c.id)
    .slice(0, 3);
  const steps = howItWorks(c);
  const enroll = enrollUrl(c, 'course_page');
  const title = cardTitle(c);
  usePageMeta({
    title: `${title}${c.price ? '' : ' (free)'}`,
    description: (content?.subtitle || c.desc).slice(0, 300),
    path: '/course/' + c.id,
    image: c.img,
    type: 'article',
    jsonLd: [courseLd(c), faqLd(COURSE_FAQ)],
  });

  return (
    <div className="course" style={{ ['--c' as string]: t.color }}>
      <section className="chero">
        <div className="phero-glow" aria-hidden="true" />
        <div className="wrap chero-in">
          <div className="chero-copy">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/courses">Courses</Link>
              <Icon name="chevronRight" size={14} />
              <Link to={'/courses?track=' + t.id}>{t.name}</Link>
            </nav>
            <p className="chero-hook">
              {promo.hook[0]} <b>{promo.hook[1]}</b>
            </p>
            <h1 className="chero-title">{title}</h1>
            <p className="chero-sub">{content?.subtitle || c.desc}</p>
            <ul className="chips">
              <li>
                <Icon name="clock" size={15} />
                {durationText(c)}
              </li>
              <li>
                <Icon name="layers" size={15} />
                {content?.level || c.meta.find((m) => /beginner|advanced|level/i.test(m)) || 'All levels'}
              </li>
              <li>
                <Icon name="globe" size={15} />
                {content?.language || (c.id === 'junior' ? 'Regional languages' : 'English')}
              </li>
              <li>
                <Icon name="award" size={15} />
                Certificate
              </li>
            </ul>
            <ul className="chero-meta">
              {c.meta.slice(1, 5).map((m) => (
                <li key={m}>
                  <Icon name="check" size={16} />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <aside className="buy" aria-label="Enroll">
            <div className="buy-media">
              {c.video ? <VideoPreview src={c.video} cover={c.img} title={title} /> : <img src={c.img} alt="" width="2250" height="660" />}
            </div>
            <div className="buy-body">
              <Price c={c} big />
              {c.price > 0 && <p className="buy-note">Pay securely on the academy by UPI, card or net banking.</p>}
              <a className="btn btn-gold btn-lg buy-cta" href={enroll} rel="noopener" data-testid="enroll">
                {c.price ? 'Enroll now' : 'Start free now'} <Icon name="arrowUpRight" size={18} />
              </a>
              <a className="btn btn-ghost buy-wa" href={whatsappLink(`Hi Takxila, I have a question about the course: ${c.title}`)} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} /> Ask a question on WhatsApp
              </a>
              <ul className="buy-incl">
                {(content?.includes?.length ? content.includes : PERKS.slice(0, 5)).map((p) => (
                  <li key={p}>
                    <Icon name="check" size={15} />
                    {p}
                  </li>
                ))}
              </ul>
              {c.idNumber && <p className="buy-code notranslate">Course code {c.idNumber}</p>}
            </div>
          </aside>
        </div>
      </section>

      <div className="wrap course-body">
        <div className="course-main">
          <Curriculum c={c} />
          <section className="cblock">
            <h2>How it works</h2>
            <ol className="mini-steps">
              {steps.map(([a, b, rest], i) => (
                <li key={i}>
                  <span>{i + 1}</span>
                  <p>
                    {a}
                    <b>{b}</b>
                    {rest}
                  </p>
                </li>
              ))}
            </ol>
          </section>
          <section className="cblock">
            <h2>Frequently asked</h2>
            <Faq items={COURSE_FAQ} />
          </section>
        </div>
        <aside className="course-side" aria-label="Enroll">
          <div className="side-card">
            <img src={c.img} alt="" width="2250" height="660" loading="lazy" decoding="async" />
            <p className="side-title">{title}</p>
            <Price c={c} />
            <a className="btn btn-gold" href={enroll} rel="noopener">
              {c.price ? 'Enroll now' : 'Start free now'} <Icon name="arrowUpRight" size={16} />
            </a>
          </div>
        </aside>
      </div>

      {!!related.length && (
        <section className="sec sec-alt">
          <div className="wrap">
            <div className="shead">
              <div>
                <p className="kick">Keep going</p>
                <h2 className="shead-title">More in {t.name}</h2>
              </div>
              <div className="shead-side">
                <Link to={'/courses?track=' + t.id} className="btn btn-ghost">
                  See the whole track <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            </div>
            <div className="cgrid">
              {related.map((x) => (
                <CourseCard key={x.id} c={x} from="related" />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="buybar">
        <Price c={c} />
        <a className="btn btn-gold" href={enroll} rel="noopener">
          {c.price ? 'Enroll now' : 'Start free'} <Icon name="arrowUpRight" size={16} />
        </a>
      </div>
    </div>
  );
}

export default function Course() {
  const { id = '' } = useParams();
  const c = courseById(id);
  if (!c) return <NotFound />;
  return <CourseView key={c.id} c={c} />;
}
