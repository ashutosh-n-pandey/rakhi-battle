import type { APIRoute } from 'astro';
import { challengeIdFrom, db, json, readJson, safeMetric, token } from '../../lib/server';

const categories = new Set(['payment', 'delivery', 'privacy', 'technical', 'other']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await readJson(request, 5_000) as Record<string, unknown>;
    const category = safeMetric(body.category, 20);
    const email = safeMetric(body.email, 120)?.toLowerCase() ?? '';
    const message = safeMetric(body.message, 1_500) ?? '';
    const sessionId = safeMetric(body.session_id, 80);
    const challengeId = challengeIdFrom(body.challenge_id);
    if (!category || !categories.has(category) || !emailPattern.test(email) || message.length < 20) {
      return json({ error: 'Add a valid email and at least 20 characters of detail.' }, 400);
    }

    if (sessionId) {
      const recent = await db().prepare(
        `SELECT COUNT(*) AS count FROM support_requests
          WHERE session_id = ? AND created_at > datetime('now', '-1 hour')`
      ).bind(sessionId).first<{ count: number }>();
      if (Number(recent?.count || 0) >= 3) return json({ error: 'Too many recent requests. Please try again later.' }, 429);
    }

    const id = token();
    await db().prepare(
      `INSERT INTO support_requests (id, category, email, challenge_id, session_id, message)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(id, category, email, challengeId, sessionId, message).run();
    return json({ ok: true, case_id: `RB-${id.slice(0, 8).toUpperCase()}` }, 201);
  } catch (error) {
    console.error(JSON.stringify({ event: 'support_request_error', message: String(error) }));
    return json({ error: 'Support request could not be saved.' }, 500);
  }
};
