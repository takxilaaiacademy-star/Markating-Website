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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
});
