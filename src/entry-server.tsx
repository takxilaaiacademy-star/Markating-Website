import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { AppProvider } from './context/AppProvider';
import { HeadContext, type HeadCollector } from './context/types';
import { CONTENT } from './data/courseContent';
import { COURSES } from './data/courses';
import { FREE_TOOLS } from './data/tools';
import { primeContent } from './utils/content';
import { abs, fullTitle } from './utils/seo';

Object.entries(CONTENT).forEach(([id, c]) => primeContent(id, c));
COURSES.forEach((c) => !CONTENT[c.id] && primeContent(c.id, null));

/** Every page the prerender step writes to dist/. */
export const routes = ['/', '/courses', '/ai-course-finder', '/about', '/contact', '/policies', '/404', '/free-tools', ...FREE_TOOLS.map((t) => '/free-tools/' + t.id), ...COURSES.map((c) => '/course/' + c.id)];

export { CONTENT };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function render(url: string) {
  const head: HeadCollector = {};
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <HeadContext.Provider value={head}>
          <AppProvider>
            <App />
          </AppProvider>
        </HeadContext.Provider>
      </StaticRouter>
    </StrictMode>,
  );
  const m = head.meta;
  let headHtml = '';
  if (m) {
    const t = esc(fullTitle(m.title));
    const d = esc(m.description);
    const u = esc(abs(m.path === '/404' ? '/' : m.path));
    const img = esc(abs(m.image || '/assets/og-image.jpg'));
    headHtml = [
      `<title>${t}</title>`,
      `<meta name="description" content="${d}" />`,
      m.path === '/404' ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${u}" />`,
      `<meta property="og:title" content="${t}" />`,
      `<meta property="og:description" content="${d}" />`,
      `<meta property="og:url" content="${u}" />`,
      `<meta property="og:image" content="${img}" />`,
      `<meta property="og:type" content="${m.type || 'website'}" />`,
      `<meta name="twitter:title" content="${t}" />`,
      `<meta name="twitter:description" content="${d}" />`,
      `<meta name="twitter:image" content="${img}" />`,
      m.jsonLd?.length ? `<script type="application/ld+json" id="tx-ld-page">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>` : '',
    ].join('\n  ');
  }
  const id = /^\/course\/([a-z0-9-]+)$/.exec(url)?.[1];
  const data = id && COURSES.some((c) => c.id === id) ? JSON.stringify({ id, content: CONTENT[id] ?? null }).replace(/</g, '\\u003c') : '';
  return { html, head: headHtml, data };
}
