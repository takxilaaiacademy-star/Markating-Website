import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { PageMeta } from '../utils/types';

export type ToastKind = 'success' | 'info' | 'error';
export interface Toast {
  id: number;
  text: string;
  kind: ToastKind;
}

export interface AppValue {
  toast: (text: string, kind?: ToastKind) => void;
}

export const AppContext = createContext<AppValue>({ toast: () => undefined });
export const useToast = () => useContext(AppContext).toast;

/** Filled in while a page renders on the server, so the prerender step can write each page's own <head>. */
export interface HeadCollector {
  meta?: PageMeta;
}
export const HeadContext = createContext<HeadCollector | null>(null);

export function useAppProvider() {
  const [note, setNote] = useState<Toast | null>(null);
  const toast = useCallback((text: string, kind: ToastKind = 'success') => setNote({ id: Date.now(), text, kind }), []);
  const value = useMemo(() => ({ toast }), [toast]);
  return { value, note, closeNote: () => setNote(null) };
}

/** Light/dark lives on <html data-theme>, set before paint by index.html, so no React state is needed for it. */
export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.classList.add('tx-theming');
  root.dataset.theme = next;
  try {
    localStorage.setItem('tx_theme', JSON.stringify(next));
  } catch {
    /* private mode */
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#F6F7FB' : '#070B18');
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('tx-theming')));
}
