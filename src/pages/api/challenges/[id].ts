import type { APIRoute } from 'astro';
import { getChallenge, json } from '../../../lib/server';

export const GET: APIRoute = async ({ params }) => {
  const challenge = await getChallenge(params.id ?? '');
  if (!challenge) return json({ error: 'Challenge not found or expired.' }, 404);
  return json({
    id: challenge.id,
    creator_name: challenge.creator_name,
    sibling_name: challenge.sibling_name,
    score: challenge.score,
    sibling_progress: challenge.sibling_progress,
    generation: challenge.generation,
    status: challenge.status,
    completed: challenge.status === 'complete',
  });
};
