import type { APIRoute } from 'astro';
import { getChallenge, json, paidTier, parseAnswers, parseResult } from '../../../../lib/server';

export const GET: APIRoute = async ({ params }) => {
  const challenge = await getChallenge(params.id ?? '');
  if (!challenge) return json({ error: 'Result not found or expired.' }, 404);
  if (challenge.status !== 'complete' || !challenge.result_json || !challenge.sibling_answers || !challenge.sibling_name) {
    return json({ error: 'Your sibling has not completed the battle yet.' }, 409);
  }
  return json({
    id: challenge.id,
    creator_name: challenge.creator_name,
    sibling_name: challenge.sibling_name,
    creator_answers: parseAnswers(challenge.creator_answers),
    sibling_answers: parseAnswers(challenge.sibling_answers),
    result: parseResult(challenge.result_json),
    paid_tier: await paidTier(challenge.id),
  });
};
