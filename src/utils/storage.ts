const PREFIX = 'tx_';

export function load<T>(key: string, fallback: T, store?: Storage): T {
  try {
    const raw = (store ?? localStorage).getItem(PREFIX + key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown, store?: Storage): void {
  try {
    const st = store ?? localStorage;
    if (value === undefined || value === null) st.removeItem(PREFIX + key);
    else st.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: the app keeps working in memory */
  }
}
