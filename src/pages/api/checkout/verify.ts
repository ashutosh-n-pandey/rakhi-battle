import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { db, json, readJson, secureEqual } from '../../../lib/server';

const runtimeEnv = env as typeof env & { RAZORPAY_KEY_SECRET?: string };

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    if (String(runtimeEnv.PAYMENTS_ENABLED) !== 'true' || !runtimeEnv.RAZORPAY_KEY_SECRET) return json({ error: 'Payments disabled.' }, 503);
    const body = await readJson(request) as Record<string, unknown>;
    const orderId = typeof body.razorpay_order_id === 'string' ? body.razorpay_order_id : '';
    const paymentId = typeof body.razorpay_payment_id === 'string' ? body.razorpay_payment_id : '';
    const signature = typeof body.razorpay_signature === 'string' ? body.razorpay_signature : '';
    if (!orderId || !paymentId || !signature) return json({ error: 'Missing payment proof.' }, 400);

    const purchase = await db().prepare(
      `SELECT order_id, tier, amount, status FROM purchases WHERE order_id = ?`
    ).bind(orderId).first<{ order_id: string; tier: string; amount: number; status: string }>();
    if (!purchase) return json({ error: 'Unknown order.' }, 404);
    if (purchase.status === 'paid') return json({ ok: true, tier: purchase.tier });

    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(runtimeEnv.RAZORPAY_KEY_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
    );
    const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${orderId}|${paymentId}`));
    if (!(await secureEqual(bytesToHex(digest), signature))) return json({ error: 'Payment signature failed.' }, 400);

    await db().prepare(
      `UPDATE purchases SET status = 'paid', provider_payment_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE order_id = ? AND status = 'created'`
    ).bind(paymentId, orderId).run();
    return json({ ok: true, tier: purchase.tier });
  } catch (error) {
    console.error(JSON.stringify({ event: 'checkout_verify_exception', message: String(error) }));
    return json({ error: 'Payment verification failed.' }, 500);
  }
};
