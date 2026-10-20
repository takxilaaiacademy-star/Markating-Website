// Score range [lowest, highest] per course (1-10, both included); courses not listed fit every score.
export const CALC_SCORES: Record<string, [number, number]> = {
  'claude-7': [1, 4],
  'mastery-14': [1, 4],
  'mastery-28': [2, 6],
  junior: [1, 3],
  ready: [1, 4],

  'wa-agent': [2, 6],
  'wa-mastery': [5, 8],
  'n8n-agents': [7, 10],
  agentic: [8, 10],

  gemini: [1, 4],
  perplexity: [1, 5],
  'omni-basics': [1, 4],
  'mj-entry': [1, 4],
  'kling-basics': [1, 4],
  'canva-ai': [1, 4],
  'claude-excel': [4, 7],
  deepseek: [4, 7],
  lovable: [4, 8],
  'chatgpt-deep': [4, 7],
  'omni-master': [5, 8],
  'genai-complete': [6, 9],
  'claude-master': [5, 8],
  'claude-deep': [7, 10],
  'mj-advanced': [7, 10],
  'kling-master': [7, 10],
  'claude-code': [8, 10],

  portfolio: [1, 4],
  'gads-setup': [1, 4],
  'nocode-web': [2, 5],
  'job-agent': [3, 7],
  'meta-ads': [4, 7],
  'ai-seo': [4, 7],
  'ai-projects': [4, 7],
  'ai-marketing': [5, 8],
  'ai-finance': [5, 8],
  'gads-mastery': [6, 9],
  'ai-pm': [7, 10],

  'film-7': [1, 4],
  'film-9': [1, 4],
  'film-1': [3, 6],
  'film-2': [4, 7],
  'film-3': [4, 7],
  'film-4': [4, 7],
  'film-5': [4, 7],
  'film-8': [4, 7],
  'film-6': [5, 8],
};

export const scoreRange = (id: string): [number, number] => CALC_SCORES[id] ?? [1, 10];
export const fitsScore = (id: string, score: number) => {
  const [lo, hi] = scoreRange(id);
  return score >= lo && score <= hi;
};
