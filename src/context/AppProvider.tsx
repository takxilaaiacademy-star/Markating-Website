import type { ReactNode } from 'react';
import { Alert, CssBaseline, GlobalStyles, Snackbar, ThemeProvider } from '@mui/material';
import { AppContext, useAppProvider } from './types';
import { motion, toastStyles as S } from './styles';

export function AppProvider({ children }: { children: ReactNode }) {
  const { value, theme, note, closeNote } = useAppProvider();
  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={motion} />
        {children}
        <Snackbar key={note?.id} open={!!note} autoHideDuration={5000} onClose={closeNote} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} sx={S.snackbar}>
          <Alert onClose={closeNote} severity={note?.severity ?? 'success'} variant="filled" sx={S.alert} data-testid="toast">
            {note?.text}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
