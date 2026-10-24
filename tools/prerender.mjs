import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Runs after both vite builds: renders every page to static HTML, so it shows instantly and search engines read it.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');
const { render, routes, CONTENT } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

for (const url of routes) {
  const { html, head, data } = render(url);
  let page = template.replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, head);
  page = page.replace('<div id="root"><!--app--></div>', `<div id="root" data-path="${url === '/404' ? '/404' : url}">${html}</div>`);
  if (data) page = page.replace('</body>', `<script type="application/json" id="tx-content">${data}</script>\n</body>`);
  const file = url === '/' ? 'index.html' : url === '/404' ? '404.html' : url.slice(1) + '/index.html';
  mkdirSync(dirname(resolve(dist, file)), { recursive: true });
  writeFileSync(resolve(dist, file), page);
}

// Curriculum JSON per course, fetched when a visitor moves between course pages.
mkdirSync(resolve(dist, 'content'), { recursive: true });
for (const [id, c] of Object.entries(CONTENT)) writeFileSync(resolve(dist, 'content', id + '.json'), JSON.stringify(c));

rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${routes.length} pages + ${Object.keys(CONTENT).length} curriculum files`);
