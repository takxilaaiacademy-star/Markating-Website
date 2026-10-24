import { Link } from 'react-router-dom';
import { Price } from '../components/CourseCard';
import Icon from '../components/Icon';
import { cardTitle, fmt } from '../components/types';
import { Analysing, FunnelTop, InfoScreen, LeadGate, QuestionScreen } from '../features/calculator/Funnel';
import { BandLegend, ScoreFactors, ScoreGauge } from '../features/calculator/ScoreGauge';
import { useCalcFunnel } from '../features/calculator/types';
import { courseById, plan } from '../data/recommend';
import { enrollUrl, registerUrl } from '../utils/links';
import { usePageMeta } from '../utils/seo';
import type { Recommendation } from '../types';

function RecGrid({ recs }: { recs: Recommendation[] }) {
  return (
    <div className="cgrid">
      {recs.map((r) => {
        const c = courseById(r.id);
        if (!c) return null;
        return (
          <article key={r.id} className="ccard rec">
            <Link to={'/course/' + c.id} className="ccard-media" tabIndex={-1} aria-hidden="true">
              <img src={c.img} alt="" width="2250" height="660" loading="lazy" decoding="async" />
              <span className="rec-match">{r.match}% match</span>
            </Link>
            <div className="ccard-body">
              <h3 className="ccard-title">
                <Link to={'/course/' + c.id}>{cardTitle(c)}</Link>
              </h3>
              <div className="rec-why">
                {r.why.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <div className="ccard-foot">
                <Price c={c} />
                <a className="btn btn-sm btn-ghost" href={enrollUrl(c, 'quiz_rec')} rel="noopener">
                  {c.price ? 'Enroll' : 'Start free'} <Icon name="arrowUpRight" size={15} />
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function PlanStats({ recs }: { recs: Recommendation[] }) {
  const p = plan(recs);
  if (!p.n) return null;
  const stats: [string, string][] = [
    [String(p.n), p.n === 1 ? 'course' : 'courses'],
    [p.hours ? p.hours + '+' : '—', 'hours of lessons'],
    [p.total ? fmt(p.total) : 'Free', 'total today'],
    [p.save ? fmt(p.save) : '—', 'you save'],
  ];
  return (
    <div className="planstats">
      {stats.map(([v, l]) => (
        <div key={l}>
          <b>{v}</b>
          <span>{l}</span>
        </div>
      ))}
      <a className="btn btn-gold" href={registerUrl('quiz_plan')} rel="noopener">
        Start my plan on the academy
      </a>
    </div>
  );
}

export default function Quiz() {
  const f = useCalcFunnel();
  usePageMeta({
    title: 'Free AI score quiz · find your AI course',
    description: 'Answer 11 quick questions and get your AI score out of 10, the courses that fit your goal, time and budget, and a full learning plan. Free, 2 minutes.',
    path: '/ai-course-finder',
  });
  const { result } = f;

  if (f.phase !== 'result' || !result) {
    return (
      <section className="sec quiz">
        <div className="quiz-glow" aria-hidden="true" />
        <div className="wrap wrap-narrow">
          <div className="funnel">
            {f.phase === 'analysing' ? (
              <Analysing f={f} />
            ) : f.phase === 'lead' ? (
              <LeadGate f={f} />
            ) : (
              <>
                <FunnelTop f={f} />
                {f.screen.kind === 'q' ? <QuestionScreen key={f.idx} f={f} q={f.screen.q} /> : <InfoScreen key={f.idx} f={f} info={f.screen.info} />}
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sec quiz-result" data-testid="quiz-result">
      <div className="wrap">
        <div className="res-head">
          <p className="kick">Your AI score is ready</p>
          <h1 className="phero-title" ref={f.headRef} tabIndex={-1}>
            Your plan to <span className="grad">{f.goalLine}</span>
          </h1>
          <p className="phero-sub">
            You scored {result.score} out of 10, which makes you a {result.band.label.toLowerCase()}. {result.band.blurb}
          </p>
          <div className="hero-ctas">
            <a className="btn btn-gold btn-lg" href={registerUrl('quiz_result')} rel="noopener">
              Create my free account
            </a>
            <button type="button" className="btn btn-ghost btn-lg" onClick={f.retake} data-testid="calc-retake">
              <Icon name="repeat" size={18} /> Retake the quiz
            </button>
          </div>
        </div>
        <div className="scorecard">
          <div className="scorecard-g">
            <ScoreGauge result={result} />
            <p className="band" style={{ color: result.band.color }}>
              {result.band.label}
            </p>
            <BandLegend />
          </div>
          <details className="scorecard-why">
            <summary>
              How we worked out your score <Icon name="chevronDown" size={18} />
            </summary>
            <ScoreFactors factors={result.factors} color={result.band.color} />
          </details>
        </div>
        <div className="res-block">
          <h2 className="shead-title">Courses for your score</h2>
          <p className="shead-sub">Made for learners at score {result.score}, best topic match first.</p>
          <RecGrid recs={f.scoreRecs} />
        </div>
        <div className="res-block">
          <h2 className="shead-title">Your learning plan</h2>
          <p className="shead-sub">Matched to your topics, goal, pace and budget.</p>
          <PlanStats recs={f.recs} />
          <RecGrid recs={f.recs} />
        </div>
      </div>
    </section>
  );
}
