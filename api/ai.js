// Vercel serverless function: POST /api/ai runs a free-tool AI task with Gemini; GET /api/ai says whether the AI is on.
// Set GEMINI_API_KEY in Vercel → Project → Settings → Environment Variables. It never reaches the browser.
import { handleAi } from '../server/ai-core.mjs';

export default async function handler(req, res) {
  const out = await handleAi(
    {
      method: req.method,
      body: req.body,
      origin: req.headers.origin || '',
      host: req.headers['x-forwarded-host'] || req.headers.host || '',
      ip: String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim(),
    },
    process.env,
  );
  res.setHeader('Cache-Control', 'no-store');
  if (out.body === null) return res.status(out.status).end();
  res.status(out.status).json(out.body);
}
