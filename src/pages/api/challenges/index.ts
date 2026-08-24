import type { APIRoute } from 'astro';
import { cleanName, isAnswers } from '../../../lib/game';
import { challengeIdFrom, db, json, readJson, retentionDays, safeMetric, sourceFrom, token } from '../../../lib/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await readJson(request) as Record<string, unknown>;
    const creatorName = cleanName(body.creator_name);
    if (!creatorName || !isAnswers(body.answers)) return json({ error: 'Check your name and answers.' }, 400);

    const id = token();
    const retention = retentionDays();
    const requestedParentId = challengeIdFrom(body.parent_challenge_id);
    const parent = requestedParentId
      ? await db().prepare(
        `SELECT id, root_challenge_id, generation
           FROM challenges
          WHERE id = ? AND status = 'complete' AND expires_at > CURRENT_TIMESTAMP`
      ).bind(requestedParentId).first<{ id: string; root_challenge_id: string | null; generation: number }>()
      : null;
    const parentId = parent?.id ?? null;
    const rootId = parent ? parent.root_challenge_id || parent.id : id;
    const generation = parent ? Math.min(parent.generation + 1, 32) : 0;
    await db().prepare(
      `INSERT INTO challenges
        (id, creator_name, creator_answers, leaderboard_creator_opt_in,
         creator_session_id, parent_challenge_id, root_challenge_id, generation,
         source, utm_source, utm_medium, utm_campaign, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ?))`
    ).bind(
      id,
      creatorName,
      JSON.stringify(body.answers),
      body.leaderboard_opt_in === true ? 1 : 0,
      safeMetric(body.session_id, 80),
      parentId,
      rootId,
      generation,
      sourceFrom(body.source),
      safeMetric(body.utm_source),
      safeMetric(body.utm_medium),
      safeMetric(body.utm_campaign),
      `+${retention} days`,
    ).run();
    return json({ id, expires_in_days: retention, generation }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === 'payload_too_large') return json({ error: 'Request too large.' }, 413);
    console.error(JSON.stringify({ event: 'challenge_create_error', message: String(error) }));
    return json({ error: 'Could not create the battle. Please retry.' }, 500);
  }
};
