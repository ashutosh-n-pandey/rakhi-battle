import type { APIRoute } from 'astro';
import { cleanName, isAnswers } from '../../../lib/game';
import { db, json, readJson, safeMetric, sourceFrom, token } from '../../../lib/server';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await readJson(request) as Record<string, unknown>;
    const creatorName = cleanName(body.creator_name);
    if (!creatorName || !isAnswers(body.answers)) return json({ error: 'Check your name and answers.' }, 400);

    const id = token();
    const retention = 45;
    await db().prepare(
      `INSERT INTO challenges
        (id, creator_name, creator_answers, source, utm_source, utm_medium, utm_campaign, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', ?))`
    ).bind(
      id,
      creatorName,
      JSON.stringify(body.answers),
      sourceFrom(body.source),
      safeMetric(body.utm_source),
      safeMetric(body.utm_medium),
      safeMetric(body.utm_campaign),
      `+${retention} days`,
    ).run();
    return json({ id, expires_in_days: retention }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === 'payload_too_large') return json({ error: 'Request too large.' }, 413);
    console.error(JSON.stringify({ event: 'challenge_create_error', message: String(error) }));
    return json({ error: 'Could not create the battle. Please retry.' }, 500);
  }
};
