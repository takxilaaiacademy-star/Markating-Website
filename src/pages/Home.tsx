import { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Icon from '../components/Icon';
import { Beams, FlipWords, InfiniteCards, Lamp, Meteors, Sparkles, Spotlight, Ticker } from '../components/Fx';
import { LazyLoop } from '../components/Media';
import { Faq, SectionHead } from '../components/Section';
import { cardTitle, fmt } from '../components/types';
import { LEARNERS, TESTIMONIALS } from '../config/marketing';
import { FAQ } from '../data/content';
import { COURSES } from '../data/courses';
import { courseById } from '../data/recommend';
import { COMPARE_COLS, COMPARE_PRICE, COMPARE_ROWS } from '../data/showcase';
import { BESTSELLERS, FREE_COURSES, LOWEST_PRICE, TOOLS, TRACKS, coursesIn, fromPrice } from '../data/tracks';
import { enrollUrl, registerUrl } from '../utils/links';
import { faqLd, usePageMeta } from '../utils/seo';
import { ToolsStrip } from './Tools';
import { PERSONAS, STEPS, totalHours } from './types';
import type { GroupId } from '../types';

const pick = (ids: string[]) => ids.map((id) => courseById(id)!).filter(Boolean);

function Hero() {
  const deck = pick(['claude-code', 'n8n-agents', 'film-3']);
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <Beams />
        <Spotlight className="is-left" />
        <Spotlight className="is-right" fill="#9b7bff" />
        <Sparkles count={60} seed={11} />
      </div>
      <div className="wrap hero-in">
        <div className="hero-copy">
          <div className="hero-chips">
            <Link to="/courses" className="hero-chip">
              <span className="hero-chip-dot" />
              {COURSES.length} AI courses · 5 tracks · {FREE_COURSES.length} free
              <Icon name="arrowRight" size={14} />
            </Link>
            <Link to="/free-tools" className="hero-chip is-new mb-border" data-testid="hero-tools-chip">
              <span className="mb-inner">
                <b>NEW</b> Free AI resume, aptitude & interview tools <Icon name="arrowRight" size={14} />
              </span>
            </Link>
          </div>
          <h1 className="hero-title">
            <span className="fx-line" style={{ animationDelay: '.05s' }}>Master AI.</span>{' '}
            <span className="fx-line grad" style={{ animationDelay: '.2s' }}>
              Transform your career.
            </span>{' '}
            <span className="fx-line" style={{ animationDelay: '.35s' }}>Grow your business.</span>
          </h1>
          <p className="hero-flip">
            Made for <FlipWords words={['students', 'job seekers', 'creators', 'founders', 'marketers', 'developers']} className="grad" />
          </p>
          <p className="hero-sub">
            Practical, framework-first AI courses taught step by step: AI agents, Claude, ChatGPT, Gemini, Midjourney, AI video and filmmaking, marketing and careers. Learn
            by doing, finish real projects and earn a certificate.
          </p>
          <div className="hero-ctas">
            <Link to="/courses" className="btn btn-gold btn-lg shine">
              Explore all courses <Icon name="arrowRight" size={18} className="ico ico-move" />
            </Link>
            <Link to="/ai-course-finder" className="btn btn-ghost btn-lg">
              <Icon name="target" size={18} /> Get my AI score
            </Link>
          </div>
          <ul className="hero-trust">
            <li>
              <Icon name="gift" size={16} /> {FREE_COURSES.length} courses free
            </li>
            <li>
              <Icon name="wallet" size={16} /> Paid from {fmt(LOWEST_PRICE)}
            </li>
            <li>
              <Icon name="award" size={16} /> Certificate with a unique ID
            </li>
          </ul>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="deck">
            {deck.map((c, i) => (
              <img key={c.id} src={c.img} alt="" width="2250" height="660" className={'deck-card d' + i} {...(i === 0 ? { fetchpriority: "high" } : {})} decoding="async" />
            ))}
          </div>
          <div className="float f1">
            <span className="float-ico" style={{ background: 'var(--mint)' }}>
              <Icon name="checkCircle" size={16} />
            </span>
            <span>
              <b>Lesson complete</b>
              <small>Build your first AI agent</small>
            </span>
          </div>
          <div className="float f2">
            <span className="float-ring">
              8<small>/10</small>
            </span>
            <span>
              <b>Your AI score</b>
              <small>Advanced builder</small>
            </span>
          </div>
          <div className="float f3">
            <span className="float-ico" style={{ background: 'var(--gold)' }}>
              <Icon name="award" size={16} />
            </span>
            <span>
              <b>Certificate earned</b>
              <small>ID TX-AIToolMst-14</small>
            </span>
          </div>
        </div>
      </div>
      <div className="wrap">
        <dl className="stats">
          <div>
            <dt>Courses</dt>
            <dd>
              <Ticker value={COURSES.length} />
            </dd>
          </div>
          <div>
            <dt>Hours of lessons</dt>
            <dd>
              <Ticker value={Math.floor(totalHours / 50) * 50} suffix="+" />
            </dd>
          </div>
          <div>
            <dt>AI tools covered</dt>
            <dd>
              <Ticker value={TOOLS.length} suffix="+" />
            </dd>
          </div>
          <div>
            <dt>Learners took the AI quiz</dt>
            <dd>
              <Ticker value={LEARNERS} suffix="+" />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...TOOLS, ...TOOLS];
  return (
    <section className="marquee" aria-label="AI tools you will learn">
      <p className="marquee-label">Learn the AI tools the world runs on</p>
      <div className="marquee-track">
        <ul className="marquee-row">
          {row.map((t, i) => (
            <li key={i} aria-hidden={i >= TOOLS.length}>
              <Icon name="sparkles" size={14} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tracks() {
  return (
    <section className="sec" id="tracks">
      <div className="wrap">
        <SectionHead kick="Five learning tracks" title={<>Pick a track. <span className="grad">Own the outcome.</span></>} sub="Every track is a structured path from beginner to advanced, built around what you want AI to do for you." />
        <div className="tracks">
          {TRACKS.map((t, i) => {
            const list = coursesIn(t.id);
            const cover = courseById(t.cover)!;
            const free = list.filter((c) => !c.price).length;
            return (
              <Link key={t.id} to={'/courses?track=' + t.id} className={'track t' + i} style={{ ['--c' as string]: t.color }} data-tilt>
                <div className="track-top">
                  <span className="track-ico">
                    <Icon name={t.icon} size={22} />
                  </span>
                  <span className="track-count">
                    {list.length} courses{free ? ` · ${free} free` : ''}
                  </span>
                </div>
                <h3 className="track-name">{t.name}</h3>
                <p className="track-tag">{t.tagline}</p>
                <p className="track-blurb">{t.blurb}</p>
                <span className="track-foot">
                  {free === list.length ? 'All free' : 'From ' + fmt(fromPrice(list))}
                  <Icon name="arrowRight" size={16} />
                </span>
                <img className="track-cover" src={cover.img} alt="" width="2250" height="660" loading="lazy" decoding="async" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Bestsellers() {
  const [tab, setTab] = useState<GroupId | 'all'>('all');
  const top = pick(BESTSELLERS);
  const list = tab === 'all' ? top.slice(0, 6) : coursesIn(tab).slice(0, 6);
  return (
    <section className="sec sec-alt" id="bestsellers">
      <div className="wrap">
        <SectionHead kick="Most loved" title="Learners' favourite AI courses" sub="Start with the courses most learners pick first. Every course has a summary video, hands-on projects and a certificate.">
          <Link to="/courses" className="btn btn-ghost">
            All {COURSES.length} courses <Icon name="arrowRight" size={16} className="ico ico-move" />
          </Link>
        </SectionHead>
        <div className="tabs" role="tablist" aria-label="Filter by track">
          {([['all', 'Best sellers'], ...TRACKS.map((t) => [t.id, t.name])] as [GroupId | 'all', string][]).map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className={'tab' + (tab === id ? ' is-on' : '')} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="cgrid">
          {list.map((c) => (
            <CourseCard key={c.id} c={c} from="home_best" />
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeBand() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="freeband">
          <div className="freeband-copy">
            <p className="kick">Zero risk</p>
            <h2 className="shead-title">
              Start with <span className="grad">{FREE_COURSES.length} free courses</span>
            </h2>
            <p className="shead-sub">Create your free academy account and start learning in minutes. No card needed.</p>
            <a className="btn btn-gold btn-lg" href={registerUrl('free_band')} rel="noopener">
              Create my free account <Icon name="arrowRight" size={18} className="ico ico-move" />
            </a>
          </div>
          <ul className="freelist">
            {FREE_COURSES.map((c) => (
              <li key={c.id}>
                <Link to={'/course/' + c.id} className="freeitem">
                  <img src={c.img} alt="" width="2250" height="660" loading="lazy" decoding="async" />
                  <span>
                    <b>{cardTitle(c)}</b>
                    <small>{c.short}</small>
                  </span>
                  <span className="free-tag">FREE</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="sec" id="how">
      <div className="wrap">
        <SectionHead center kick="How it works" title="From curious to AI-ready in four steps" />
        <ol className="steps">
          {STEPS.map(([icon, title, text], i) => (
            <li key={title} className="step">
              <span className="step-n">0{i + 1}</span>
              <span className="step-ico">
                <Icon name={icon} size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Why() {
  const vid = courseById('claude-code')!;
  return (
    <section className="sec sec-alt" id="why">
      <div className="wrap">
        <SectionHead kick="Why Takxila" title={<>Built to make you <span className="grad">truly AI-ready</span></>} sub="Not a playlist of videos. A learning system with frameworks, practice and proof of skill." />
        <div className="bento">
          <div className="bx bx-quote">
            <Icon name="quote" size={30} />
            <p className="bx-big">Tools may change. Frameworks stay.</p>
            <p className="muted">
              Instead of teaching which buttons to click, our courses teach how to think, prompt, structure, analyse and automate, so your skills carry over to ChatGPT, Claude, Gemini and
              the tools that are not out yet.
            </p>
          </div>
          <div className="bx bx-video">
            <LazyLoop src={vid.video} poster={vid.img} label="Course summary video preview" />
            <div className="bx-video-cap">
              <span className="bx-ico" style={{ ['--c' as string]: 'var(--gold)' }}>
                <Icon name="play" size={20} />
              </span>
              <div>
                <h3>Watch before you enroll</h3>
                <p className="muted">Every course has a short summary video and a full curriculum, so you know exactly what you get.</p>
              </div>
            </div>
          </div>
          <div className="bx">
            <span className="bx-ico" style={{ ['--c' as string]: 'var(--mint)' }}>
              <Icon name="rocket" size={22} />
            </span>
            <h3>Learn by doing</h3>
            <p className="muted">Prompts, exercises, challenges and a project after every module. You use AI, not just watch it.</p>
          </div>
          <div className="bx">
            <span className="bx-ico" style={{ ['--c' as string]: 'var(--gold)' }}>
              <Icon name="award" size={22} />
            </span>
            <h3>Certificate with a unique ID</h3>
            <p className="muted">Finish every lesson and download a certificate you can verify and share on LinkedIn and your resume.</p>
          </div>
          <div className="bx">
            <span className="bx-ico" style={{ ['--c' as string]: 'var(--sky)' }}>
              <Icon name="chart" size={22} />
            </span>
            <h3>Grades, streaks, leaderboard</h3>
            <p className="muted">Your academy dashboard tracks progress, grades and your learning streak, so you keep going.</p>
          </div>
          <div className="bx">
            <span className="bx-ico" style={{ ['--c' as string]: 'var(--pink)' }}>
              <Icon name="globe" size={22} />
            </span>
            <h3>Learn in your language</h3>
            <p className="muted">The academy speaks 14 languages, and the Junior AI Challenge is taught in regional languages.</p>
          </div>
          <div className="bx">
            <span className="bx-ico" style={{ ['--c' as string]: 'var(--violet)' }}>
              <Icon name="headset" size={22} />
            </span>
            <h3>Real help when you are stuck</h3>
            <p className="muted">1:1 guidance through the help desk, email and WhatsApp.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className="sec" id="compare">
      <div className="wrap wrap-narrow">
        <SectionHead center kick="Compare" title="Structured like a premium course. Priced for everyone." />
        <div className="compare" role="table" aria-label="Takxila compared with YouTube and other platforms">
          <div className="cmp-row cmp-head" role="row">
            <span role="columnheader">What you get</span>
            {COMPARE_COLS.map((c, i) => (
              <span key={c} role="columnheader" className={i === 0 ? 'is-us' : ''}>
                {c}
              </span>
            ))}
          </div>
          {COMPARE_ROWS.map(([label, ...cells]) => (
            <div key={label} className="cmp-row" role="row">
              <span role="rowheader">{label}</span>
              {cells.map((ok, i) => (
                <span key={i} role="cell" className={(i === 0 ? 'is-us ' : '') + (ok ? 'yes' : 'no')}>
                  <Icon name={ok ? 'check' : 'x'} size={18} />
                  <span className="sr-only">{ok ? 'Yes' : 'No'}</span>
                </span>
              ))}
            </div>
          ))}
          <div className="cmp-row cmp-price" role="row">
            <span role="rowheader">Typical price</span>
            {COMPARE_PRICE.map((p, i) => (
              <span key={p} role="cell" className={i === 0 ? 'is-us' : ''}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Personas() {
  return (
    <section className="sec sec-alt" id="for-you">
      <div className="wrap">
        <SectionHead kick="Made for you" title="Whoever you are, there is a path" />
        <div className="personas">
          {PERSONAS.map(([icon, who, line, id]) => {
            const c = courseById(id)!;
            return (
              <Link key={who} to={'/course/' + id} className="persona">
                <span className="persona-ico">
                  <Icon name={icon} size={22} />
                </span>
                <h3>{who}</h3>
                <p className="muted">{line}</p>
                <span className="persona-pick">
                  <span>
                    <small>Start with</small>
                    <b>{cardTitle(c)}</b>
                  </span>
                  <Icon name="arrowRight" size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QuizBand() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="quizband">
          <Meteors count={16} seed={4} />
          <div className="quizband-art" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="qgauge">
              <circle cx="60" cy="60" r="50" className="qg-track" />
              <circle cx="60" cy="60" r="50" className="qg-fill" />
            </svg>
            <span className="qgauge-num">
              ?<small>/10</small>
            </span>
          </div>
          <div className="quizband-copy">
            <p className="kick">Free · 2 minutes</p>
            <h2 className="shead-title">What is your AI score?</h2>
            <p className="shead-sub">Answer 11 quick questions. Get your AI score out of 10, the courses that fit your goal, time and budget, and a learning plan.</p>
            <Link to="/ai-course-finder" className="btn btn-gold btn-lg">
              Take the free quiz <Icon name="arrowRight" size={18} className="ico ico-move" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  return (
    <section className="sec" id="stories">
      <div className="wrap">
        <SectionHead center kick="Learner stories" title="What learners say" />
        <InfiniteCards className="quotes-inf" speed={45}>
          {TESTIMONIALS.map((t) => (
            <figure key={t.quote} className="quote">
              <div className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" size={15} />
                ))}
              </div>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <span className="quote-av" aria-hidden="true">
                  {t.name[0]}
                </span>
                <span>
                  <b>{t.name}</b>
                  <small>
                    {t.role} · {t.course}
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </InfiniteCards>
      </div>
    </section>
  );
}

function FinalCta() {
  const first = courseById('wa-agent')!;
  return (
    <section className="sec">
      <div className="wrap">
        <div className="final">
          <div className="final-glow" aria-hidden="true" />
          <Sparkles count={45} seed={9} />
          <Lamp>
            <h2 className="final-title">
              The AI future is being built now.
              <br />
              <span className="grad">Build yours.</span>
            </h2>
            <p className="shead-sub">Your first AI agent course is free and takes 30 minutes. Start today on the Takxila AI Academy.</p>
            <div className="hero-ctas is-center">
              <a className="btn btn-gold btn-lg shine" href={enrollUrl(first, 'final_cta')} rel="noopener">
                Start the free course <Icon name="arrowRight" size={18} className="ico ico-move" />
              </a>
              <Link to="/courses" className="btn btn-ghost btn-lg">
                Browse courses
              </Link>
            </div>
          </Lamp>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta({
    title: 'Takxila AI Academy · Master AI. Transform your career. Grow your business.',
    description: `${COURSES.length} practical AI courses: AI agents, Claude, ChatGPT, Gemini, Midjourney, Kling, AI filmmaking, marketing and careers. Hands-on projects and a certificate. ${FREE_COURSES.length} courses free, paid from ${fmt(LOWEST_PRICE)}.`,
    path: '/',
    jsonLd: [faqLd(FAQ)],
  });
  return (
    <>
      <Hero />
      <Marquee />
      <Tracks />
      <Bestsellers />
      <FreeBand />
      <section className="sec sec-alt" id="free-tools">
        <div className="wrap">
          <ToolsStrip />
        </div>
      </section>
      <HowItWorks />
      <Why />
      <Personas />
      <Compare />
      <QuizBand />
      <Testimonials />
      <section className="sec sec-alt" id="faq">
        <div className="wrap wrap-narrow">
          <SectionHead center kick="FAQ" title="Questions, answered" />
          <Faq items={FAQ} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
