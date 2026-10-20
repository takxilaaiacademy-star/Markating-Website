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
    rollupOptions: {
      output: {
        // Group by package folder. (Listing '@mui/icons-material' by name would pull in all of its thousands of icons.)
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom|@remix-run)\//.test(id)) return 'react';
          if (/node_modules\/(@mui\/(material|system|utils|styled-engine|private-theming|types)|@emotion|@babel\/runtime|react-is|react-transition-group|prop-types|clsx|stylis|hoist-non-react-statics)\//.test(id)) return 'mui';
          return undefined;
        },
      },
    },
  },
});
