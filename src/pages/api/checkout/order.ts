import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { db, getChallenge, json, readJson } from '../../../lib/server';

const prices = { savage: 4_900, full: 9_900 } as const;
const runtimeEnv = env as typeof env & {
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    if (String(runtimeEnv.PAYMENTS_ENABLED) !== 'true' || !runtimeEnv.RAZORPAY_KEY_ID || !runtimeEnv.RAZORPAY_KEY_SECRET) {
      return json({ error: 'Paid upgrades are being activated. The free game and poster are fully available.' }, 503);
    }
    const body = await readJson(request) as Record<string, unknown>;
    const tier = body.tier === 'full' ? 'full' : body.tier === 'savage' ? 'savage' : null;
    const challengeId = typeof body.challenge_id === 'string' ? body.challenge_id : '';
    if (!tier) return json({ error: 'Invalid upgrade.' }, 400);
    const challenge = await getChallenge(challengeId);
    if (!challenge || challenge.status !== 'complete') return json({ error: 'Complete the battle first.' }, 409);

    const amount = prices[tier];
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${runtimeEnv.RAZORPAY_KEY_ID}:${runtimeEnv.RAZORPAY_KEY_SECRET}`)}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ amount, currency: 'INR', receipt: `rb_${challengeId}`, notes: { challenge_id: challengeId, tier } }),
    });
    if (!response.ok) {
      console.error(JSON.stringify({ event: 'razorpay_order_error', status: response.status }));
      return json({ error: 'Secure checkout could not start. Please retry.' }, 502);
    }
    const order = await response.json() as { id: string; amount: number };
    await db().prepare(
      `INSERT INTO purchases (order_id, challenge_id, tier, amount)
       VALUES (?, ?, ?, ?)`
    ).bind(order.id, challengeId, tier, amount).run();
    return json({ order_id: order.id, amount, key_id: runtimeEnv.RAZORPAY_KEY_ID, tier });
  } catch (error) {
    console.error(JSON.stringify({ event: 'checkout_order_exception', message: String(error) }));
    return json({ error: 'Checkout unavailable.' }, 500);
  }
};
