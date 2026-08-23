import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { db, json, secureEqual } from '../../../lib/server';

export const GET: APIRoute = async ({ request }) => {
  const supplied = request.headers.get('x-admin-token') ?? '';
  if (!env.ADMIN_TOKEN || !(await secureEqual(supplied, env.ADMIN_TOKEN))) return json({ error: 'Unauthorized.' }, 401);

  const [events, totals, sources, purchases] = await db().batch([
    db().prepare(`SELECT event_name, COUNT(*) AS count, COUNT(DISTINCT session_id) AS users
                    FROM events GROUP BY event_name ORDER BY count DESC`),
    db().prepare(`SELECT COUNT(*) AS battles,
                         SUM(CASE WHEN status = 'complete' THEN 1 ELSE 0 END) AS completed,
                         AVG(CASE WHEN status = 'complete' THEN score END) AS avg_score
                    FROM challenges`),
    db().prepare(`SELECT source, COUNT(*) AS battles,
                         SUM(CASE WHEN status = 'complete' THEN 1 ELSE 0 END) AS completed
                    FROM challenges GROUP BY source ORDER BY battles DESC`),
    db().prepare(`SELECT COUNT(*) AS orders,
                         SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS purchases,
                         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS revenue_paise
                    FROM purchases`),
  ]);
  return json({ events: events.results, totals: totals.results[0], sources: sources.results, purchases: purchases.results[0] });
};
