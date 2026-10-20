import { readFileSync } from 'node:fs';

/** The marketing site's own address: VITE_SITE_URL from the environment or .env, else the default in src/config/marketing.ts. */
export function siteUrl(root = process.cwd()) {
  let env = process.env.VITE_SITE_URL;
  if (!env) {
    for (const f of ['.env.production.local', '.env.local', '.env.production', '.env']) {
      try {
        const m = /^\s*VITE_SITE_URL\s*=\s*"?([^"\n]+)"?/m.exec(readFileSync(root + '/' + f, 'utf8'));
        if (m) {
          env = m[1].trim();
          break;
        }
      } catch {
        /* no such file */
      }
    }
  }
  const src = readFileSync(root + '/src/config/marketing.ts', 'utf8');
  const fallback = /SITE_URL = \(import\.meta\.env\.VITE_SITE_URL \|\| "([^"]+)"\)/.exec(src)?.[1] ?? 'https://takxila.in';
  return (env || fallback).replace(/\/$/, '');
}
