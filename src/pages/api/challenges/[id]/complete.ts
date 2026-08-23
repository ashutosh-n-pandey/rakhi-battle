import type { APIRoute } from 'astro';
import { cleanName, computeResult, isAnswers } from '../../../../lib/game';
import { db, getChallenge, json, parseAnswers, readJson } from '../../../../lib/server';

export const POST: APIRoute = async ({ request, params }) => {
  try {
    const id = params.id ?? '';
    const challenge = await getChallenge(id);
    if (!challenge) return json({ error: 'Challenge not found or expired.' }, 404);
    if (challenge.status === 'complete') return json({ error: 'This battle already has a result.' }, 409);

    const body = await readJson(request) as Record<string, unknown>;
    const siblingName = cleanName(body.sibling_name);
    if (!siblingName || !isAnswers(body.answers)) return json({ error: 'Check your name and answers.' }, 400);

    const result = computeResult(parseAnswers(challenge.creator_answers), body.answers);
    const update = await db().prepare(
      `UPDATE challenges
          SET sibling_name = ?, sibling_answers = ?, score = ?, result_json = ?,
              status = 'complete', completed_at = CURRENT_TIMESTAMP
        WHERE id = ? AND status = 'open'`
    ).bind(siblingName, JSON.stringify(body.answers), result.percent, JSON.stringify(result), id).run();

    if (!update.meta.changes) return json({ error: 'This battle was just completed.' }, 409);
    return json({ id, result });
  } catch (error) {
    console.error(JSON.stringify({ event: 'challenge_complete_error', message: String(error) }));
    return json({ error: 'Could not finish the battle. Please retry.' }, 500);
  }
};
