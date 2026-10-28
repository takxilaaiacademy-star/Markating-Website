import { lazy, Suspense, type ComponentType } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { Beams, Lamp, Meteors, Sparkles, Spotlight, TextGenerate } from '../components/Fx';
import Icon from '../components/Icon';
import { Faq, SectionHead } from '../components/Section';
import { useMounted } from '../components/types';
import { courseById } from '../data/recommend';
import { FREE_TOOLS, toolById, type FreeTool } from '../data/tools';
import { abs, faqLd, usePageMeta } from '../utils/seo';

// The tools load after the page is on screen, so the marketing pages stay light.
const TOOL_UI: Record<FreeTool['id'], ComponentType> = {
  'ats-resume-builder': lazy(() => import('../features/resume/ResumeBuilder')),
  'aptitude-test': lazy(() => import('../features/aptitude/Aptitude')),
  'interview-prep': lazy(() => import('../features/interview/Interview')),
};

function ToolLoading() {
  return (
    <div className="tool-loading" role="status">
      <span className="orb" aria-hidden="true" />
      <b>Loading the tool…</b>
    </div>
  );
}

export function ToolCard({ t, i = 0 }: { t: FreeTool; i?: number }) {
  return (
    <Link to={'/free-tools/' + t.id} className="tool-card fx-glow" style={{ ['--c' as string]: t.color }} data-tilt data-testid="tool-card">
      <Meteors count={6} seed={i * 11 + 5} />
      <span className="tool-ico">
        <Icon name={t.icon} size={24} />
      </span>
      <span className="tool-free">FREE · AI</span>
      <h3>{t.name}</h3>
      <p className="muted">{t.short}</p>
      <ul>
        {t.points.slice(0, 3).map((p) => (
          <li key={p}>
            <Icon name="check" size={14} /> {p}
          </li>
        ))}
      </ul>
      <span className="tool-go">
        Open {t.name} <Icon name="arrowRight" size={16} />
      </span>
    </Link>
  );
}

/** A strip of the three tools, for the home page and the free-courses view. */
export function ToolsStrip({ title = 'Free AI career tools', sub }: { title?: string; sub?: string }) {
  return (
    <div className="tools-strip">
      <SectionHead
        kick="New · 100% free"
        title={
          <>
            {title} <span className="grad">powered by Gemini</span>
          </>
        }
        sub={sub ?? 'Build an ATS resume, crack the aptitude round and rehearse your interview. No sign-up, no card.'}
      >
        <Link to="/free-tools" className="btn btn-ghost">
          All free tools <Icon name="arrowRight" size={16} className="ico ico-move" />
        </Link>
      </SectionHead>
      <div className="tools-grid">
        {FREE_TOOLS.map((t, i) => (
          <ToolCard key={t.id} t={t} i={i} />
        ))}
      </div>
    </div>
  );
}

export function ToolsHub() {
  usePageMeta({
    title: 'Free AI career tools: resume builder, aptitude test, mock interview',
    description: 'Free AI tools from Takxila AI Academy: an ATS-friendly resume builder, aptitude practice with solutions and an AI mock interview. No sign-up.',
    path: '/free-tools',
    jsonLd: [{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: FREE_TOOLS.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: abs('/free-tools/' + t.id), name: t.name })) }],
  });
  return (
    <>
      <section className="phero tools-hero">
        <Beams />
        <Spotlight className="is-left" />
        <Sparkles count={50} seed={21} />
        <div className="wrap">
          <p className="kick">Free AI career tools</p>
          <h1 className="phero-title">
            <TextGenerate text="Get hired faster with" /> <span className="grad">free AI tools</span>
          </h1>
          <p className="phero-sub">Resume, aptitude and interview: the three rounds between you and the offer letter. Practise all of them here, free, with Gemini AI.</p>
        </div>
      </section>
      <section className="sec sec-tight">
        <div className="wrap">
          <div className="tools-grid">
            {FREE_TOOLS.map((t, i) => (
              <ToolCard key={t.id} t={t} i={i} />
            ))}
          </div>
          <ol className="tools-path">
            {FREE_TOOLS.map((t, i) => (
              <li key={t.id} style={{ ['--c' as string]: t.color }}>
                <span className="tools-path-n">{i + 1}</span>
                <b>{['Get shortlisted', 'Clear the test', 'Win the interview'][i]}</b>
                <small className="muted">{t.name}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

export function ToolPage() {
  const { tool = '' } = useParams();
  const t = toolById(tool);
  const mounted = useMounted();
  const course = t ? courseById(t.course) : undefined;
  usePageMeta({
    title: t?.seoTitle ?? 'Free AI tools',
    description: t?.seoDesc ?? '',
    path: '/free-tools/' + tool,
    jsonLd: t
      ? [
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: t.name + ' by Takxila AI Academy', applicationCategory: 'EducationalApplication', operatingSystem: 'Any', url: abs('/free-tools/' + t.id), offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, description: t.seoDesc },
          faqLd(t.faq),
        ]
      : [],
  });
  if (!t) return <Navigate to="/free-tools" replace />;
  const UI = TOOL_UI[t.id];
  return (
    <>
      <section className="phero tool-hero" style={{ ['--c' as string]: t.color }}>
        <Beams />
        <Spotlight className="is-left" />
        <Sparkles count={36} seed={t.id.length * 7} />
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/free-tools">Free AI tools</Link>
            <Icon name="chevronRight" size={14} />
            <span>{t.name}</span>
          </nav>
          <p className="kick">{t.kicker}</p>
          <h1 className="phero-title">
            <span className="tool-emoji" aria-hidden="true">
              {t.emoji}
            </span>{' '}
            <TextGenerate text={t.title} />
          </h1>
          <p className="phero-sub">{t.sub}</p>
          <ul className="tool-points">
            {t.points.map((p) => (
              <li key={p}>
                <Icon name="checkCircle" size={15} /> {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sec sec-tight tool-sec">
        <div className="wrap">{mounted ? <Suspense fallback={<ToolLoading />}>{<UI />}</Suspense> : <ToolLoading />}</div>
      </section>
      <section className="sec sec-alt">
        <div className="wrap tool-more">
          <div>
            <SectionHead kick="Questions" title={`About the free ${t.name}`} />
            <Faq items={t.faq} />
          </div>
          <aside>
            {course && (
              <>
                <p className="kick">Go further</p>
                <CourseCard c={course} from={'tool_' + t.id} />
              </>
            )}
            <div className="tool-others">
              {FREE_TOOLS.filter((x) => x.id !== t.id).map((x) => (
                <Link key={x.id} to={'/free-tools/' + x.id} className="tool-mini fx-glow" style={{ ['--c' as string]: x.color }}>
                  <span className="tool-ico">
                    <Icon name={x.icon} size={18} />
                  </span>
                  <span>
                    <b>{x.name}</b>
                    <small className="muted">Free · AI</small>
                  </span>
                  <Icon name="arrowRight" size={16} />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <Lamp>
            <h2 className="final-title">
              Tools get you noticed. <span className="grad">Skills get you hired.</span>
            </h2>
            <p className="shead-sub">Learn the AI skills employers search for, with hands-on projects and a certificate.</p>
            <div className="hero-ctas is-center">
              <Link to="/courses?price=free" className="btn btn-gold btn-lg shine">
                Start a free course <Icon name="arrowRight" size={18} className="ico ico-move" />
              </Link>
            </div>
          </Lamp>
        </div>
      </section>
    </>
  );
}
