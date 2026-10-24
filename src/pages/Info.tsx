import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import LeadForm from '../components/LeadForm';
import { PageHero } from '../components/Section';
import { POLICY_LINKS } from '../config/marketing';
import { MAILTO_HREF, SITE, TEL_HREF, whatsappLink } from '../config/site';
import { ABOUT_SIGNOFF, ABOUT_STORY } from '../data/about';
import { COURSES } from '../data/courses';
import { FREE_COURSES, TOOLS } from '../data/tracks';
import { allCoursesUrl, mainUrl } from '../utils/links';
import { usePageMeta } from '../utils/seo';
import { totalHours } from './types';

const PILLARS: [icon: string, title: string, text: string][] = [
  ['layers', 'Frameworks, not buttons', 'Learn how to think, prompt, structure and automate, so your skills move with every new AI tool.'],
  ['rocket', 'Hands-on projects', 'Practice tasks, challenges and real-world use cases in every course.'],
  ['clock', 'Learn at your own pace', 'Anytime, anywhere, on any device, with progress saved to your account.'],
];

export function About() {
  usePageMeta({
    title: 'About us',
    description: 'TAKXILA is an AI learning platform built to make you truly AI-ready: framework-based learning, hands-on practice and a certificate for every course.',
    path: '/about',
  });
  return (
    <>
      <PageHero
        kick="About Takxila"
        title={
          <>
            Learn AI. Practice AI. <span className="grad">Become AI-ready.</span>
          </>
        }
        sub="A next-generation AI learning platform for students, job seekers, working professionals, business owners and young learners."
      />
      <section className="sec sec-tight">
        <div className="wrap">
          <dl className="stats stats-flat">
            <div>
              <dt>Courses</dt>
              <dd>{COURSES.length}</dd>
            </div>
            <div>
              <dt>Free courses</dt>
              <dd>{FREE_COURSES.length}</dd>
            </div>
            <div>
              <dt>Hours of lessons</dt>
              <dd>{Math.floor(totalHours / 50) * 50}+</dd>
            </div>
            <div>
              <dt>AI tools covered</dt>
              <dd>{TOOLS.length}+</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="sec sec-tight">
        <div className="wrap wrap-narrow story">
          {ABOUT_STORY.map((blk, i) => (
            <div key={i} className="story-block">
              {blk.heading && i > 0 && <h2>{blk.heading}</h2>}
              {blk.paras.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {blk.quote && <blockquote className="story-quote">{blk.quote}</blockquote>}
            </div>
          ))}
          <p className="story-sign">
            <b>{ABOUT_SIGNOFF.brand}</b> {ABOUT_SIGNOFF.line}
          </p>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="pillars">
            {PILLARS.map(([icon, t, d]) => (
              <div key={t} className="bx">
                <span className="bx-ico" style={{ ['--c' as string]: 'var(--brand)' }}>
                  <Icon name={icon} size={22} />
                </span>
                <h3>{t}</h3>
                <p className="muted">{d}</p>
              </div>
            ))}
          </div>
          <div className="hero-ctas is-center about-cta">
            <Link to="/courses" className="btn btn-gold btn-lg">
              See the courses <Icon name="arrowRight" size={18} />
            </Link>
            <a className="btn btn-ghost btn-lg" href={allCoursesUrl()} rel="noopener">
              Open the academy
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function Contact() {
  usePageMeta({
    title: 'Contact us',
    description: 'Questions about a course, a payment or which AI course to pick? Write to Takxila AI Academy by email, phone or WhatsApp.',
    path: '/contact',
  });
  const ways: [icon: string, title: string, text: string, href: string][] = [
    ['whatsapp', 'WhatsApp', 'Fastest reply', whatsappLink('Hi Takxila, I have a question.')],
    ['mail', 'Email', SITE.supportEmail, MAILTO_HREF],
    ['phone', 'Phone', SITE.phoneDisplay, TEL_HREF],
    ['headset', 'Help desk', 'For enrolled learners', mainUrl('/local/helpdesk/', 'contact_page')],
  ];
  return (
    <>
      <PageHero kick="Contact" title={<>Let's <span className="grad">talk.</span></>} sub="Questions about a course, a payment or which course to pick? Write to us and we will reply within one working day." />
      <section className="sec sec-tight">
        <div className="wrap contact">
          <div className="contact-ways">
            {ways.map(([icon, t, d, href]) => (
              <a key={t} href={href} className="way" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                <span className="bx-ico" style={{ ['--c' as string]: icon === 'whatsapp' ? 'var(--mint)' : 'var(--brand)' }}>
                  <Icon name={icon} size={20} />
                </span>
                <span>
                  <b>{t}</b>
                  <small>{d}</small>
                </span>
                <Icon name="arrowUpRight" size={16} />
              </a>
            ))}
          </div>
          <div className="contact-form">
            <h2>Send us a message</h2>
            <LeadForm
              source="contact"
              fields={['name', 'email', 'phone', 'message']}
              required={['name', 'email', 'message']}
              cta="Send message"
              done="Message sent. We will reply to you by email soon."
              testId="contact-form"
            />
          </div>
        </div>
      </section>
    </>
  );
}

const POLICIES: [id: string, title: string, paras: string[]][] = [
  ['privacy', 'This website and your details', [
    'When you fill in a form on this website (contact, AI score quiz or free roadmap) we receive the details you type: your name, email address, phone number if you give it, your message and your quiz answers.',
    'We use them only to reply to you, send what you asked for, and tell you about Takxila AI Academy courses and offers. You can ask us to stop or to delete your details at any time by writing to ' + SITE.supportEmail + '.',
    'We do not sell your details. Forms are delivered by email through Google Apps Script or FormSubmit. If analytics is switched on, Google Analytics and the Meta Pixel may set cookies to measure visits and ads.',
  ]],
  ['terms', 'Prices and enrolment', [
    'This website describes the courses of Takxila AI Academy. Accounts, payments and course access are provided on academy.takxila.in, under its own terms.',
    'Prices and offers shown here can change. The price shown at checkout on the academy is the one that applies.',
  ]],
];

export function Policies() {
  usePageMeta({ title: 'Policies', description: 'Privacy, terms, refund and purchase policies of Takxila AI Academy.', path: '/policies' });
  return (
    <>
      <PageHero kick="Policies" title="The fine print" sub="The full legal policies live on the academy, where you enrol and pay." />
      <section className="sec sec-tight">
        <div className="wrap wrap-narrow">
          <div className="policy-links">
            {POLICY_LINKS.map(([label, path]) => (
              <a key={path} href={mainUrl(path, 'policies_page')} rel="noopener" className="way">
                <span className="bx-ico" style={{ ['--c' as string]: 'var(--brand)' }}>
                  <Icon name="file" size={20} />
                </span>
                <span>
                  <b>{label}</b>
                  <small>On academy.takxila.in</small>
                </span>
                <Icon name="arrowUpRight" size={16} />
              </a>
            ))}
          </div>
          {POLICIES.map(([id, t, paras]) => (
            <div key={id} id={id} className="policy">
              <h2>{t}</h2>
              {paras.map((p) => (
                <p key={p} className="muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  usePageMeta({ title: 'Page not found', description: 'This page does not exist. Browse the Takxila AI Academy courses instead.', path: '/404' });
  return (
    <section className="sec notfound">
      <div className="wrap wrap-narrow">
        <p className="nf-code grad">404</p>
        <h1>This page took a wrong turn</h1>
        <p className="muted">The page you are looking for does not exist or has moved.</p>
        <div className="hero-ctas is-center">
          <Link to="/" className="btn btn-gold btn-lg">
            Go home
          </Link>
          <Link to="/courses" className="btn btn-ghost btn-lg">
            Browse courses
          </Link>
        </div>
      </div>
    </section>
  );
}
