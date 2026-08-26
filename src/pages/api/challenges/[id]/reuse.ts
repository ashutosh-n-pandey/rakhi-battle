import type { APIRoute } from 'astro';
import { db, getChallenge, json, readJson, retentionDays, safeMetric, secureEqual, token } from '../../../../lib/server';

const MAX_ACTIVE_FAMILY_BATTLES = 12;

export const POST: APIRoute = async ({ request, params }) => {
  try {
    const sourceId = params.id ?? '';
    const source = await getChallenge(sourceId);
    if (!source) return json({ error: 'Battle not found or expired.' }, 404);

    const body = await readJson(request) as Record<string, unknown>;
    const sessionId = safeMetric(body.session_id, 80);
    if (!sessionId || !source.creator_session_id || !(await secureEqual(sessionId, source.creator_session_id))) {
      return json({ error: 'Reuse is only available on the device that created this battle.' }, 403);
    }

    const rootId = source.root_challenge_id || source.id;
    const activeFamily = await db().prepare(
      `SELECT COUNT(*) AS total
         FROM challenges
        WHERE creator_session_id = ?
          AND root_challenge_id = ?
          AND expires_at > CURRENT_TIMESTAMP`
    ).bind(source.creator_session_id, rootId).first<{ total: number }>();
    if (Number(activeFamily?.total || 0) >= MAX_ACTIVE_FAMILY_BATTLES) {
      return json({ error: 'You already have plenty of active sibling links in this Rakhi chain.' }, 429);
    }

    const id = token();
    const retention = retentionDays();
    const generation = Math.min(source.generation + 1, 32);

    await db().prepare(
      `INSERT INTO challenges
        (id, creator_name, creator_answers, leaderboard_creator_opt_in,
         creator_session_id, parent_challenge_id, root_challenge_id, generation,
         source, utm_source, utm_medium, utm_campaign, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ?))`
    ).bind(
      id,
      source.creator_name,
      source.creator_answers,
      source.leaderboard_creator_opt_in,
      source.creator_session_id,
      source.id,
      rootId,
      generation,
      'multi_sibling',
      'creator_reuse',
      'challenge',
      'rakhi2026',
      `+${retention} days`,
    ).run();

    return json({ id, creator_name: source.creator_name, expires_in_days: retention, generation }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === 'payload_too_large') return json({ error: 'Request too large.' }, 413);
    console.error(JSON.stringify({ event: 'challenge_reuse_error', message: String(error) }));
    return json({ error: 'Could not create another sibling battle. Please retry.' }, 500);
  }
};
