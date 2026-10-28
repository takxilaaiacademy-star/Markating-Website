import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppProvider';
import { initAnalytics } from './utils/analytics';
import { primeContent } from './utils/content';
import { captureUtm, retagOutboundLinks } from './utils/links';
import { initFx } from './utils/fx';
import { guardDomForTranslation } from './utils/siteTranslate';
import type { CourseContent } from './data/courseContent';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/home.css';
import './styles/pages.css';
import './styles/fx.css';
import './styles/tools.css';

guardDomForTranslation();
captureUtm();
retagOutboundLinks();
initAnalytics();

// A prerendered course page carries its curriculum inline: use it so hydration matches the HTML.
const inline = document.getElementById('tx-content');
if (inline?.textContent) {
  try {
    const { id, content } = JSON.parse(inline.textContent) as { id: string; content: CourseContent | null };
    primeContent(id, content);
  } catch {
    /* fetched on demand instead */
  }
}

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
// Prerendered HTML is the unfiltered page; a filtered catalogue link (?track=, ?q=…) renders fresh instead of hydrating.
const prerendered = root.dataset.path === location.pathname.replace(/\/$/, '') || (root.dataset.path === '/' && location.pathname === '/');
const filtered = /[?&](track|price|q|sort)=/.test(location.search);
if (root.firstElementChild && prerendered && !filtered) hydrateRoot(root, app);
else createRoot(root).render(app);
// Motion starts once the page is interactive.
const startFx = () => initFx();
if ('requestIdleCallback' in window) requestIdleCallback(startFx, { timeout: 1200 });
else setTimeout(startFx, 300);
