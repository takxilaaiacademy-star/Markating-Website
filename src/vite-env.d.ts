/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAIN_SITE_URL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_MAIL_WEBHOOK?: string;
  readonly VITE_GA_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_CHAT_API_URL?: string;
  readonly VITE_AI_API_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
