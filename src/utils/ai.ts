/** The free tools' AI: POST /api/ai on this site (api/ai.js on Vercel), or VITE_AI_API_URL when the AI runs elsewhere. */
const API = (import.meta.env.VITE_AI_API_URL || '').replace(/\/$/, '') + '/api/ai';

export class AiUnavailable extends Error {}

let status: Promise<{ ai: boolean; reason: string }> | null = null;

/** Whether the server has a Gemini key. Asked once per visit. */
export function aiStatus(): Promise<{ ai: boolean; reason: string }> {
  status ??= fetch(API, { signal: AbortSignal.timeout(6000) })
    .then((r) => (r.ok ? r.json() : { ai: false, reason: '' }))
    .then((j) => ({ ai: !!j.ai, reason: String(j.reason || '') }))
    .catch(() => ({ ai: false, reason: '' }));
  return status;
}

export const OFFLINE_NOTE = 'Offline mode: built on your device with our own question banks and rules. Switch on the AI by adding GEMINI_API_KEY on the server.';

/** Runs one AI task. Throws AiUnavailable when the AI is off (use the offline version), Error(message) for other problems. */
export async function aiTask<T>(task: string, body: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task, ...body }), signal });
  } catch (e) {
    if (signal?.aborted) throw e;
    throw new AiUnavailable('Could not reach the AI. Check your internet connection.');
  }
  let j: Record<string, unknown> = {};
  try {
    j = await res.json();
  } catch {
    /* not JSON: the site has no AI route (e.g. static hosting) */
    throw new AiUnavailable('The AI is not available on this host.');
  }
  if (res.ok) return j as T;
  const msg = typeof j.error === 'string' ? j.error : 'The AI is not available right now.';
  if (j.offline || res.status === 404 || res.status === 405 || res.status === 503 || res.status === 429 || res.status >= 500) throw new AiUnavailable(msg);
  throw new Error(msg);
}
