import { useEffect, type ReactNode } from 'react';
import Icon from '../components/Icon';
import { AppContext, useAppProvider } from './types';

export function AppProvider({ children }: { children: ReactNode }) {
  const { value, note, closeNote } = useAppProvider();
  useEffect(() => {
    if (!note) return;
    const t = setTimeout(closeNote, 4200);
    return () => clearTimeout(t);
  }, [note, closeNote]);
  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="toast-host" aria-live="polite">
        {note && (
          <div key={note.id} className={'toast toast-' + note.kind} role="status">
            <Icon name={note.kind === 'error' ? 'x' : note.kind === 'info' ? 'sparkles' : 'checkCircle'} size={18} />
            <span>{note.text}</span>
            <button type="button" className="toast-x" onClick={closeNote} aria-label="Close">
              <Icon name="x" size={16} />
            </button>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}
