import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Icon from '../components/Icon';
import { PageHero } from '../components/Section';
import { fmt } from '../components/types';
import { MAIN_CATEGORIES } from '../config/marketing';
import { COURSES } from '../data/courses';
import { FREE_COURSES, LOWEST_PRICE, TRACKS, coursesIn } from '../data/tracks';
import { mainUrl } from '../utils/links';
import { courseListLd, usePageMeta } from '../utils/seo';
import { SORTS, useCourseFilters, type SortKey } from './types';

export default function Courses() {
  const f = useCourseFilters();
  const active = TRACKS.find((t) => t.id === f.track);
  usePageMeta({
    title: active ? `${active.name}: AI courses` : 'All AI courses',
    description: active
      ? `${active.blurb} ${coursesIn(active.id).length} courses with hands-on projects and a certificate.`
      : `Browse all ${COURSES.length} Takxila AI courses across 5 tracks: AI challenges, AI agents, the AI toolkit, careers and AI filmmaking. ${FREE_COURSES.length} free, paid from ${fmt(LOWEST_PRICE)}.`,
    path: '/courses',
    jsonLd: [courseListLd(COURSES)],
  });
  const filtered = f.track !== 'all' || f.free || !!f.q;

  return (
    <>
      <PageHero
        kick={active ? active.tagline : 'Course catalogue'}
        title={active ? active.name : <>Every AI skill, <span className="grad">one academy</span></>}
        sub={active ? active.blurb : `${COURSES.length} practical courses across five tracks. ${FREE_COURSES.length} are free and paid courses start at ${fmt(LOWEST_PRICE)}.`}
      />
      <section className="sec sec-tight">
        <div className="wrap">
          <div className="filters" role="search">
            <label className="search">
              <Icon name="search" size={18} />
              <span className="sr-only">Search courses</span>
              <input
                type="search"
                placeholder="Search: Claude, agents, video, Excel…"
                value={f.q}
                onChange={(e) => f.update({ q: e.target.value || null })}
                data-testid="course-search"
              />
            </label>
            <label className="select">
              <span className="sr-only">Sort</span>
              <select value={f.sort} onChange={(e) => f.update({ sort: e.target.value === 'popular' ? null : (e.target.value as SortKey) })}>
                {SORTS.map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} />
            </label>
          </div>
          <div className="pills" aria-label="Filter by track">
            <button type="button" className={'pill' + (f.track === 'all' ? ' is-on' : '')} onClick={() => f.update({ track: null })} aria-pressed={f.track === 'all'}>
              All tracks <span>{COURSES.length}</span>
            </button>
            {TRACKS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={'pill' + (f.track === t.id ? ' is-on' : '')}
                style={{ ['--c' as string]: t.color }}
                onClick={() => f.update({ track: t.id })}
                aria-pressed={f.track === t.id}
              >
                <Icon name={t.icon} size={15} />
                {t.name} <span>{coursesIn(t.id).length}</span>
              </button>
            ))}
            <button type="button" className={'pill pill-free' + (f.free ? ' is-on' : '')} onClick={() => f.update({ price: f.free ? null : 'free' })} aria-pressed={f.free}>
              <Icon name="gift" size={15} /> Free only
            </button>
          </div>
          <p className="result-line" aria-live="polite">
            {f.list.length} {f.list.length === 1 ? 'course' : 'courses'}
            {filtered && (
              <button type="button" className="btn-text" onClick={f.clear}>
                Clear filters
              </button>
            )}
          </p>
          {f.list.length ? (
            <div className="cgrid">
              {f.list.map((c, i) => (
                <CourseCard key={c.id} c={c} eager={i < 3} from="catalogue" />
              ))}
            </div>
          ) : (
            <div className="empty">
              <Icon name="search" size={28} />
              <h2>No course matches “{f.q}”</h2>
              <p className="muted">Try a tool name like Claude, Gemini or n8n, or take the quiz and we will pick for you.</p>
              <Link to="/ai-course-finder" className="btn btn-gold">
                Get my AI score
              </Link>
            </div>
          )}
          {active && MAIN_CATEGORIES[active.id] && (
            <p className="cat-link">
              <a className="btn-text" href={mainUrl(MAIN_CATEGORIES[active.id]!, 'catalogue_category')} rel="noopener">
                See this track on the academy <Icon name="arrowUpRight" size={15} />
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
