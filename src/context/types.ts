import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import type { AlertColor, PaletteMode } from '@mui/material';
import { createAppTheme } from '../theme/theme';
import { load, save } from '../utils/storage';

export interface Toast {
  id: number;
  text: string;
  severity: AlertColor;
}

export interface AppValue {
  mode: PaletteMode;
  toggleMode: () => void;
  toast: (text: string, severity?: AlertColor) => void;
}

export const themes = { dark: createAppTheme('dark'), light: createAppTheme('light') };

export const AppContext = createContext<AppValue>({ mode: 'dark', toggleMode: () => undefined, toast: () => undefined });
export const useApp = () => useContext(AppContext);
export const useThemeMode = () => {
  const { mode, toggleMode } = useApp();
  return { mode, toggleMode };
};
export const useToast = () => useApp().toast;

export function useAppProvider() {
  const [mode, setMode] = useState<PaletteMode>(() => (load<string>('theme', 'dark') === 'light' ? 'light' : 'dark'));
  const [note, setNote] = useState<Toast | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    save('theme', mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('tx-theming');
    flushSync(() => setMode((m) => (m === 'dark' ? 'light' : 'dark')));
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('tx-theming')));
  }, []);
  const toast = useCallback((text: string, severity: AlertColor = 'success') => setNote({ id: Date.now(), text, severity }), []);
  const value = useMemo(() => ({ mode, toggleMode, toast }), [mode, toggleMode, toast]);
  return { value, theme: themes[mode], note, closeNote: () => setNote(null) };
}
