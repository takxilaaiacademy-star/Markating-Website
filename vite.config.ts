import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error plain JS helper shared with tools/gen-seo.mjs
import { siteUrl } from './tools/site-url.mjs';

const siteUrlInHtml = (): Plugin => ({
  name: 'tx-site-url',
  transformIndexHtml: (html) => html.split('%SITE_URL%').join(siteUrl()),
});

export default defineConfig({
  plugins: [react(), siteUrlInHtml()],
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
});
