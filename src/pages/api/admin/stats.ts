import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { db, json, secureEqual } from '../../../lib/server';

const runtimeEnv = env as typeof env & { ADMIN_TOKEN?: string };

export const GET: APIRoute = async ({ request }) => {
  const supplied = request.headers.get('x-admin-token') ?? '';
  if (!runtimeEnv.ADMIN_TOKEN || !(await secureEqual(supplied, runtimeEnv.ADMIN_TOKEN))) return json({ error: 'Unauthorized.' }, 401);

  const [events, totals, sources, purchases, visitors, generations, transfers] = await db().batch([
    db().prepare(`SELECT event_name, COUNT(*) AS count, COUNT(DISTINCT session_id) AS users
                    FROM events GROUP BY event_name ORDER BY count DESC`),
    db().prepare(`SELECT COUNT(*) AS battles,
                         SUM(CASE WHEN status = 'complete' THEN 1 ELSE 0 END) AS completed,
                         AVG(CASE WHEN status = 'complete' THEN score END) AS avg_score,
                         SUM(CASE WHEN parent_challenge_id IS NOT NULL THEN 1 ELSE 0 END) AS referred_battles,
                         COUNT(DISTINCT creator_session_id) AS creators
                    FROM challenges`),
    db().prepare(`SELECT source, COUNT(*) AS battles,
                         SUM(CASE WHEN status = 'complete' THEN 1 ELSE 0 END) AS completed
                    FROM challenges GROUP BY source ORDER BY battles DESC`),
    db().prepare(`SELECT COUNT(*) AS orders,
                         SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS purchases,
                         COUNT(DISTINCT CASE WHEN status = 'paid' THEN challenge_id END) AS paid_battles,
                         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS revenue_paise
                    FROM purchases`),
    db().prepare(`SELECT COUNT(DISTINCT session_id) AS visitors FROM events`),
    db().prepare(`SELECT generation, COUNT(*) AS battles,
                         SUM(CASE WHEN status = 'complete' THEN 1 ELSE 0 END) AS completed
                    FROM challenges
                   GROUP BY generation ORDER BY generation`),
    db().prepare(`SELECT MAX(0.0, (julianday(child.created_at) -
                         julianday(COALESCE(parent.completed_at, parent.created_at))) * 1440.0) AS minutes
                    FROM challenges child
                    JOIN challenges parent ON parent.id = child.parent_challenge_id
                   ORDER BY minutes
                   LIMIT 5000`),
  ]);
  const total = totals.results[0] as Record<string, number | null> | undefined;
  const purchase = purchases.results[0] as Record<string, number | null> | undefined;
  const transferMinutes = transfers.results
    .map((row) => Number((row as { minutes?: number }).minutes))
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  const middle = Math.floor(transferMinutes.length / 2);
  const medianTransferMinutes = transferMinutes.length
    ? transferMinutes.length % 2
      ? transferMinutes[middle]
      : (transferMinutes[middle - 1] + transferMinutes[middle]) / 2
    : null;
  const completed = Number(total?.completed || 0);
  const referred = Number(total?.referred_battles || 0);
  const paidBattles = Number(purchase?.paid_battles || 0);
  return json({
    events: events.results,
    totals: total,
    sources: sources.results,
    purchases: purchase,
    generations: generations.results,
    growth: {
      visitors: Number((visitors.results[0] as { visitors?: number } | undefined)?.visitors || 0),
      viral_coefficient: completed ? referred / completed : 0,
      median_transfer_minutes: medianTransferMinutes,
      paid_conversion: completed ? paidBattles / completed : 0,
    },
  });
};
