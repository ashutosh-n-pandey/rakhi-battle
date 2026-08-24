import type { APIRoute } from 'astro';
import { savageVerdict } from '../../../../lib/game';
import { getChallenge, json, paidTier, parseAnswers, parseResult } from '../../../../lib/server';

export const GET: APIRoute = async ({ params }) => {
  const challenge = await getChallenge(params.id ?? '');
  if (!challenge) return json({ error: 'Result not found or expired.' }, 404);
  if (challenge.status !== 'complete' || !challenge.result_json || !challenge.sibling_answers || !challenge.sibling_name) {
    return json({ error: 'Your sibling has not completed the battle yet.' }, 409);
  }
  const tier = await paidTier(challenge.id);
  const result = parseResult(challenge.result_json);
  const response: Record<string, unknown> = {
    id: challenge.id,
    creator_name: challenge.creator_name,
    sibling_name: challenge.sibling_name,
    result,
    paid_tier: tier,
  };
  if (tier) response.savage_verdict = savageVerdict(result, challenge.creator_name, challenge.sibling_name);
  if (tier === 'full') {
    response.creator_answers = parseAnswers(challenge.creator_answers);
    response.sibling_answers = parseAnswers(challenge.sibling_answers);
  }
  return json(response);
};
