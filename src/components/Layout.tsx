import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { FREE_ROADMAP, OFFER, POLICY_LINKS, SOCIAL_LINKS } from '../config/marketing';
import { MAILTO_HREF, SITE, TEL_HREF, whatsappLink } from '../config/site';
import { toggleTheme } from '../context/types';
import { LANGS } from '../data/languages';
import { TRACKS } from '../data/tracks';
import { COURSES } from '../data/courses';
import { allCoursesUrl, loginUrl, mainUrl, registerUrl } from '../utils/links';
import { track } from '../utils/analytics';
import { applySiteLanguage, savedLanguage } from '../utils/siteTranslate';
import { load, save } from '../utils/storage';
import Icon from './Icon';
import TxBot from './TxBot';
import LeadForm from './LeadForm';
import { NAV_LINKS, useMounted } from './types';
import type { Lang } from '../types';

export function Logo() {
  return (
    <Link to="/" className="logo notranslate" aria-label={SITE.name + ' home'}>
      <img src="/assets/logo-mark-dark.webp" width="30" height="33" alt="" className="logo-dark" />
      <img src="/assets/logo-mark.webp" width="30" height="33" alt="" className="logo-light" />
      <span className="logo-text">
        <b>TAKXILA</b>
        <small>AI ACADEMY</small>
      </span>
    </Link>
  );
}

function OfferBar() {
  const offerOn = OFFER.show && (!OFFER.endsOn || new Date(OFFER.endsOn + 'T23:59:59') >= new Date());
  if (!offerOn) return null;
  const close = () => {
    document.documentElement.classList.add('tx-offer-off');
    try {
      sessionStorage.setItem('tx_offer_off', 'true');
    } catch {
      /* private mode */
    }
  };
  return (
    <div className="offer" role="region" aria-label="Offer">
      <div className="wrap offer-in">
        <span className="offer-pill">OFFER</span>
        <span className="offer-text">{OFFER.text}</span>
        <a className="offer-cta" href={mainUrl(OFFER.href, 'offer_bar')} rel="noopener">
          {OFFER.cta} <Icon name="arrowRight" size={15} />
        </a>
        <button type="button" className="offer-x" onClick={close} aria-label="Hide the offer">
          <Icon name="x" size={16} />
        </button>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, search } = useLocation();
  useEffect(() => setOpen(false), [pathname, search]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const [menuTop, setMenuTop] = useState(0);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    setMenuTop(document.querySelector('.hdr')?.getBoundingClientRect().bottom ?? 0);
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <header className={'hdr' + (scrolled ? ' is-scrolled' : '')}>
      <div className="wrap hdr-in">
        <Logo />
        <nav className="hdr-nav" aria-label="Main">
          {NAV_LINKS.map(([label, to]) => (
            <NavLink key={to} to={to} end className={({ isActive }) => 'hdr-link' + (isActive && !(to.includes('?') && !search) ? ' is-on' : '')}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hdr-actions">
          <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label="Switch light or dark theme">
            <Icon name="sun" size={19} className="ico sun" />
            <Icon name="moon" size={19} className="ico moon" />
          </button>
          <a className="hdr-link hide-sm" href={loginUrl()} rel="noopener">
            Log in
          </a>
          <a className="btn btn-gold btn-sm hide-xs" href={registerUrl('header')} rel="noopener">
            Start free
          </a>
          <button type="button" className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mnav" aria-label="Menu">
            <Icon name={open ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </div>
      <div id="mnav" className={'mnav' + (open ? ' is-open' : '')} hidden={!open} style={menuTop ? { top: menuTop } : undefined}>
        <nav className="wrap mnav-in" aria-label="Mobile">
          {[['Home', '/'] as [string, string], ...NAV_LINKS].map(([label, to]) => (
            <Link key={to} to={to} className="mnav-link">
              {label}
              <Icon name="chevronRight" size={18} />
            </Link>
          ))}
          <p className="mnav-kick">Tracks</p>
          <div className="mnav-tracks">
            {TRACKS.map((t) => (
              <Link key={t.id} to={'/courses?track=' + t.id} className="mnav-track" style={{ ['--c' as string]: t.color }}>
                <Icon name={t.icon} size={16} />
                {t.name}
              </Link>
            ))}
          </div>
          <div className="mnav-cta">
            <a className="btn btn-gold btn-lg" href={registerUrl('mobile_menu')} rel="noopener">
              Create my free account
            </a>
            <a className="btn btn-ghost btn-lg" href={loginUrl()} rel="noopener">
              Log in to the academy
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function LanguagePicker() {
  const mounted = useMounted();
  const [lang, setLang] = useState<Lang>('en');
  useEffect(() => {
    const l = savedLanguage();
    setLang(l);
    if (l !== 'en') applySiteLanguage(l);
  }, []);
  return (
    <label className="lang notranslate">
      <Icon name="globe" size={16} />
      <span className="sr-only">Site language</span>
      <select
        value={lang}
        disabled={!mounted}
        onChange={(e) => {
          const l = e.target.value as Lang;
          setLang(l);
          applySiteLanguage(l);
        }}
      >
        {LANGS.map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size={14} />
    </label>
  );
}

function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-news">
          <div>
            <h2 className="ftr-news-title">{FREE_ROADMAP.title}</h2>
            <p className="muted">{FREE_ROADMAP.sub}</p>
          </div>
          <LeadForm source="roadmap" fields={['email']} required={['email']} cta="Email me the roadmap" done="Done! Check your inbox for the roadmap." inline testId="roadmap-form" />
        </div>
        <div className="ftr-grid">
          <div className="ftr-brand">
            <Logo />
            <p className="muted">Master the AI frameworks. Own the AI future. Practical AI courses with hands-on projects and a certificate for every learner.</p>
            <div className="ftr-social">
              {SOCIAL_LINKS.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="icon-btn">
                  <Icon name={label === 'X' ? 'x' : label.toLowerCase()} filled size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="ftr-h">Tracks</h3>
            <ul className="ftr-list">
              {TRACKS.map((t) => (
                <li key={t.id}>
                  <Link to={'/courses?track=' + t.id}>{t.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/courses">All {COURSES.length} courses</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="ftr-h">Takxila</h3>
            <ul className="ftr-list">
              <li>
                <Link to="/ai-course-finder">AI score quiz</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a href={allCoursesUrl()} rel="noopener">
                  Academy course catalogue
                </a>
              </li>
              <li>
                <a href={mainUrl('/local/helpdesk/', 'footer')} rel="noopener">
                  Help desk
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="ftr-h">Policies</h3>
            <ul className="ftr-list">
              {POLICY_LINKS.map(([label, path]) => (
                <li key={path}>
                  <a href={mainUrl(path, 'footer_policy')} rel="noopener">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="ftr-h">Talk to us</h3>
            <ul className="ftr-list ftr-contact">
              <li>
                <a href={MAILTO_HREF}>
                  <Icon name="mail" size={16} /> {SITE.supportEmail}
                </a>
              </li>
              <li>
                <a href={TEL_HREF}>
                  <Icon name="phone" size={16} /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink('Hi Takxila, I have a question about your AI courses.')} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={16} /> WhatsApp us
                </a>
              </li>
            </ul>
            <LanguagePicker />
          </div>
        </div>
        <div className="ftr-base">
          <span>© {new Date().getFullYear()} TAKXILA™ AI Academy. All rights reserved.</span>
          <span className="muted">Enrolment, payment and learning happen on academy.takxila.in.</span>
        </div>
      </div>
    </footer>
  );
}

const FAB_TEXT = 'Hi Takxila, I want help choosing an AI course.';

const loadChat = () => import('../features/chat/ChatPanel');
const ChatPanel = lazy(loadChat);

/** The animated AI bot button opens Tx, the AI chat. Before the page is interactive it is still a plain WhatsApp link. */
function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [tease, setTease] = useState(false);
  const fab = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (load('chat_seen', false, sessionStorage)) return;
    const t = window.setTimeout(() => setTease(true), 7000);
    return () => window.clearTimeout(t);
  }, []);
  const seen = () => {
    setTease(false);
    save('chat_seen', true, sessionStorage);
  };
  const close = useCallback(() => {
    setOpen(false);
    fab.current?.focus();
  }, []);
  return (
    <>
      {tease && !open && (
        <div className="txc-tease" role="status">
          <button type="button" className="txc-tease-go" onClick={() => (seen(), setOpen(true))}>
            <b>yo 👋 stuck choosing a course?</b>
            Ask Tx, our AI buddy. No cap, replies in seconds ✨
          </button>
          <button type="button" className="txc-tease-x" onClick={seen} aria-label="Hide this message">
            <Icon name="x" size={15} />
          </button>
        </div>
      )}
      {open && (
        <Suspense fallback={null}>
          <ChatPanel onClose={close} />
        </Suspense>
      )}
      <a
        ref={fab}
        className={'fab txc-fab txb' + (open ? ' is-open' : '')}
        href={whatsappLink(FAB_TEXT)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={open ? 'Close the chat' : 'Chat with Tx, our AI assistant'}
        aria-expanded={open}
        onPointerEnter={loadChat}
        onFocus={loadChat}
        onClick={(e) => {
          e.preventDefault();
          if (!open) track('chat_open', {});
          seen();
          setOpen((o) => !o);
        }}
      >
        <span className="txb-ring" aria-hidden="true" />
        <span className="txb-face">{open ? <Icon name="x" size={24} /> : <TxBot size={40} />}</span>
        <span className="txc-fab-ai" aria-hidden="true">
          AI
        </span>
        {!open && (
          <span className="txb-wave" aria-hidden="true">
            👋
          </span>
        )}
      </a>
    </>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const [navs, setNavs] = useState(0);
  const first = useRef(pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname !== first.current) setNavs((n) => n + 1);
  }, [pathname]);
  return (
    <>
      <a href="#main" className="skip">
        Skip to main content
      </a>
      <OfferBar />
      <Header />
      <main id="main">
        <div key={pathname} className={'fx-page' + (navs ? ' is-nav' : '')}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <ChatLauncher />
    </>
  );
}
