import type { APIRoute } from 'astro';
import { courtQuestionKeys, type AnswerId } from '../../../lib/game';
import { db, getChallenge, json, readJson, safeMetric, sourceFrom, token } from '../../../lib/server';

type CourtVotes = Record<(typeof courtQuestionKeys)[number], AnswerId>;

function validVotes(value: unknown): value is CourtVotes {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return courtQuestionKeys.every((key) => ['creator', 'sibling', 'both'].includes(String((value as Record<string, unknown>)[key])));
}

export const GET: APIRoute = async ({ params }) => {
  const id = params.id ?? '';
  const challenge = await getChallenge(id);
  if (!challenge || challenge.status !== 'complete' || !challenge.sibling_name) return json({ error: 'Court not found.' }, 404);
  const rows = await db().prepare('SELECT votes_json FROM court_votes WHERE challenge_id = ?').bind(id).all<{ votes_json: string }>();
  const totals = Object.fromEntries(courtQuestionKeys.map((key) => [key, { creator: 0, sibling: 0, both: 0 }])) as Record<string, Record<string, number>>;
  for (const row of rows.results) {
    const votes = JSON.parse(row.votes_json) as CourtVotes;
    for (const key of courtQuestionKeys) totals[key][votes[key]] += 1;
  }
  return json({ creator_name: challenge.creator_name, sibling_name: challenge.sibling_name, vote_count: rows.results.length, totals });
};

export const POST: APIRoute = async ({ request, params }) => {
  try {
    const id = params.id ?? '';
    const challenge = await getChallenge(id);
    if (!challenge || challenge.status !== 'complete') return json({ error: 'Court not found.' }, 404);
    const body = await readJson(request, 5_000) as Record<string, unknown>;
    const sessionId = safeMetric(body.session_id, 80);
    if (!sessionId || !validVotes(body.votes)) return json({ error: 'Complete every vote.' }, 400);
    await db().prepare(
      `INSERT INTO court_votes (id, challenge_id, session_id, votes_json, source)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(token(), id, sessionId, JSON.stringify(body.votes), sourceFrom(body.source)).run();
    return json({ ok: true }, 201);
  } catch (error) {
    if (String(error).includes('UNIQUE')) return json({ error: 'You already voted in this Family Court.' }, 409);
    console.error(JSON.stringify({ event: 'court_vote_error', message: String(error) }));
    return json({ error: 'Vote failed. Please retry.' }, 500);
  }
};
