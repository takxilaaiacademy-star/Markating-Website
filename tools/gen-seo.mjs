import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteUrl } from './site-url.mjs';

// Runs after "vite build": writes dist/sitemap.xml and dist/robots.txt from the course list.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = siteUrl(root);
const courses = [...readFileSync(resolve(root, 'src/data/courses.ts'), 'utf8').matchAll(/^\s{4}id: "([a-z0-9-]+)",$/gm)].map((m) => m[1]);
const today = new Date().toISOString().slice(0, 10);

const pages = [
  ['/', '1.0', 'weekly'],
  ['/courses', '0.9', 'weekly'],
  ['/ai-course-finder', '0.8', 'monthly'],
  ['/free-tools', '0.9', 'weekly'],
  ['/free-tools/ats-resume-builder', '0.9', 'monthly'],
  ['/free-tools/aptitude-test', '0.9', 'monthly'],
  ['/free-tools/interview-prep', '0.9', 'monthly'],
  ['/about', '0.5', 'yearly'],
  ['/contact', '0.5', 'yearly'],
  ['/policies', '0.2', 'yearly'],
  ...courses.map((id) => ['/course/' + id, '0.8', 'monthly']),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([p, pr, f]) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod><changefreq>${f}</changefreq><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`;
writeFileSync(resolve(root, 'dist/sitemap.xml'), xml);
writeFileSync(resolve(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`);
console.log(`sitemap.xml: ${pages.length} URLs on ${site} · robots.txt written`);
