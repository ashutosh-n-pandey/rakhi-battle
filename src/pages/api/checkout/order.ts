import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { db, getChallenge, json, paidTier, readJson } from '../../../lib/server';
import { quoteCheckout, type PaidTier } from '../../../lib/payments';

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
    const tier: PaidTier | null = body.tier === 'full' ? 'full' : body.tier === 'savage' ? 'savage' : null;
    const challengeId = typeof body.challenge_id === 'string' ? body.challenge_id : '';
    if (!tier) return json({ error: 'Invalid upgrade.' }, 400);
    const challenge = await getChallenge(challengeId);
    if (!challenge || challenge.status !== 'complete') return json({ error: 'Complete the battle first.' }, 409);

    const quote = quoteCheckout(tier, await paidTier(challengeId));
    if (!quote) return json({ error: 'This battle already owns that upgrade.', already_unlocked: true }, 409);
    const { amount } = quote;
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${runtimeEnv.RAZORPAY_KEY_ID}:${runtimeEnv.RAZORPAY_KEY_SECRET}`)}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        receipt: `rb_${challengeId}_${Date.now().toString(36)}`.slice(0, 40),
        notes: { challenge_id: challengeId, tier: quote.tier, upgrade_from: quote.upgradeFrom || 'none' },
      }),
    });
    if (!response.ok) {
      console.error(JSON.stringify({ event: 'razorpay_order_error', status: response.status }));
      return json({ error: 'Secure checkout could not start. Please retry.' }, 502);
    }
    const order = await response.json() as { id: string; amount: number };
    await db().prepare(
      `INSERT INTO purchases (order_id, challenge_id, tier, amount)
       VALUES (?, ?, ?, ?)`
    ).bind(order.id, challengeId, quote.tier, amount).run();
    return json({
      order_id: order.id,
      amount,
      key_id: runtimeEnv.RAZORPAY_KEY_ID,
      tier: quote.tier,
      upgrade_from: quote.upgradeFrom,
    });
  } catch (error) {
    console.error(JSON.stringify({ event: 'checkout_order_exception', message: String(error) }));
    return json({ error: 'Checkout unavailable.' }, 500);
  }
};
