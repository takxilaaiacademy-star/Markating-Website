const PREFIX = 'tx_';

export function load<T>(key: string, fallback: T, store: Storage = localStorage): T {
  try {
    const raw = store.getItem(PREFIX + key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown, store: Storage = localStorage): void {
  try {
    if (value === undefined || value === null) store.removeItem(PREFIX + key);
    else store.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: the app keeps working in memory */
  }
}
