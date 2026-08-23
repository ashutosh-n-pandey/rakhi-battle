import type { APIRoute } from 'astro';
import { db, json } from '../../lib/server';

export const GET: APIRoute = async () => {
  const row = await db().prepare(
    `SELECT
      (SELECT COUNT(*) FROM challenges) AS battles,
      (SELECT COUNT(*) FROM challenges WHERE status = 'complete') AS completed,
      (SELECT COUNT(*) FROM court_votes) AS votes`
  ).first<{ battles: number; completed: number; votes: number }>();
  return json(row ?? { battles: 0, completed: 0, votes: 0 }, 200, { 'Cache-Control': 'public, max-age=60' });
};
