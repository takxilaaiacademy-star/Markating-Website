import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error plain JS helper shared with tools/gen-seo.mjs
import { siteUrl } from './tools/site-url.mjs';
// @ts-expect-error plain JS, shared with the Vercel function in api/ai.js
import { handleAi, readNodeRequest } from './server/ai-core.mjs';

const siteUrlInHtml = (): Plugin => ({
  name: 'tx-site-url',
  transformIndexHtml: (html) => html.split('%SITE_URL%').join(siteUrl()),
});

/** /api/ai on your computer (npm run dev / preview), the same code Vercel runs. GEMINI_API_KEY comes from .env. */
const aiApi = (mode: string): Plugin => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const route: Connect.NextHandleFunction = (req, res, next) => {
    if (!req.url?.startsWith('/api/ai')) return next();
    void readNodeRequest(req)
      .then((r: unknown) => handleAi(r, env))
      .then((out: { status: number; body: unknown }) => {
        res.statusCode = out.status;
        res.setHeader('Cache-Control', 'no-store');
        if (out.body === null) return res.end();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(out.body));
      });
  };
  return {
    name: 'tx-ai-api',
    configureServer: (server) => void server.middlewares.use(route),
    configurePreviewServer: (server) => void server.middlewares.use(route),
  };
};

export default defineConfig(({ mode }) => ({
  plugins: [react(), siteUrlInHtml(), aiApi(mode)],
  esbuild: { drop: ['debugger'], pure: ['console.log', 'console.debug'] },
  build: {
    target: 'es2020',
    reportCompressedSize: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom|cookie|set-cookie-parser)\//.test(id)) return 'react';
          return undefined;
        },
      },
    },
  },
  ssr: { noExternal: [] },
}));
