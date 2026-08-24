import type { APIRoute } from 'astro';
import { db, getChallenge, json, readJson } from '../../../../lib/server';

export const POST: APIRoute = async ({ request, params }) => {
  try {
    const id = params.id ?? '';
    const challenge = await getChallenge(id);
    if (!challenge) return json({ error: 'Challenge not found or expired.' }, 404);
    if (challenge.status === 'complete') return json({ ok: true, progress: 8 });

    const body = await readJson(request, 2_000) as Record<string, unknown>;
    const progress = Number(body.progress);
    if (!Number.isInteger(progress) || progress < 0 || progress > 8) {
      return json({ error: 'Invalid progress.' }, 400);
    }
    await db().prepare(
      `UPDATE challenges
          SET sibling_progress = CASE WHEN sibling_progress < ? THEN ? ELSE sibling_progress END
        WHERE id = ? AND status = 'open'`
    ).bind(progress, progress, id).run();
    return json({ ok: true, progress: Math.max(challenge.sibling_progress, progress) }, 202);
  } catch (error) {
    console.error(JSON.stringify({ event: 'challenge_progress_error', message: String(error) }));
    return json({ error: 'Progress could not be saved.' }, 500);
  }
};
