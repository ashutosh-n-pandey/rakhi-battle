import type { APIRoute } from 'astro';
import { challengeIdFrom, db, json, readJson, safeMetric, sourceFrom } from '../../lib/server';

const allowed = new Set([
  'landing_view', 'battle_start', 'battle_creator_complete', 'challenge_share_click',
  'challenge_open', 'challenge_complete', 'pair_result_view', 'poster_download',
  'poster_share', 'family_court_create', 'family_court_vote', 'new_battle_from_vote',
  'savage_checkout_start', 'savage_purchase', 'full_reveal_checkout_start',
  'full_reveal_purchase', 'gift_click', 'waiting_view', 'premium_poster_download',
  'certificate_download', 'repeat_battle_click', 'support_submit',
]);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await readJson(request, 5_000) as Record<string, unknown>;
    const eventName = safeMetric(body.event, 50);
    const sessionId = safeMetric(body.session_id, 80);
    if (!eventName || !allowed.has(eventName) || !sessionId) return json({ ok: false }, 400);
    const challengeId = challengeIdFrom(body.challenge_id);
    const payload = body.payload && typeof body.payload === 'object'
      ? JSON.stringify(body.payload).slice(0, 1_000)
      : null;
    await db().prepare(
      `INSERT INTO events
        (event_name, session_id, challenge_id, source, utm_source, utm_medium, utm_campaign, payload_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      eventName,
      sessionId,
      challengeId,
      sourceFrom(body.source),
      safeMetric(body.utm_source),
      safeMetric(body.utm_medium),
      safeMetric(body.utm_campaign),
      payload,
    ).run();
    return json({ ok: true }, 202);
  } catch {
    return json({ ok: false }, 400);
  }
};
