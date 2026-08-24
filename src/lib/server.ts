import { env } from 'cloudflare:workers';
import type { Answers, GameResult } from './game';

export interface ChallengeRow {
  id: string;
  creator_name: string;
  sibling_name: string | null;
  creator_answers: string;
  sibling_answers: string | null;
  score: number | null;
  result_json: string | null;
  status: 'open' | 'complete';
  leaderboard_creator_opt_in: number;
  leaderboard_sibling_opt_in: number;
  expires_at: string;
}

export const db = () => env.DB;

export function json(data: unknown, status = 200, headers: HeadersInit = {}): Response {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

export async function readJson(request: Request, maxBytes = 10_000): Promise<unknown> {
  const length = Number(request.headers.get('content-length') || '0');
  if (length > maxBytes) throw new Error('payload_too_large');
  return request.json();
}

export async function getChallenge(id: string): Promise<ChallengeRow | null> {
  if (!/^[a-f0-9]{24}$/.test(id)) return null;
  return db().prepare(
    `SELECT id, creator_name, sibling_name, creator_answers, sibling_answers,
            score, result_json, status, leaderboard_creator_opt_in,
            leaderboard_sibling_opt_in, expires_at
       FROM challenges
      WHERE id = ? AND expires_at > CURRENT_TIMESTAMP`
  ).bind(id).first<ChallengeRow>();
}

export async function paidTier(challengeId: string): Promise<'savage' | 'full' | null> {
  const row = await db().prepare(
    `SELECT tier FROM purchases
      WHERE challenge_id = ? AND status = 'paid'
      ORDER BY amount DESC LIMIT 1`
  ).bind(challengeId).first<{ tier: 'savage' | 'full' }>();
  return row?.tier ?? null;
}

export function parseAnswers(raw: string): Answers {
  return JSON.parse(raw) as Answers;
}

export function parseResult(raw: string): GameResult {
  return JSON.parse(raw) as GameResult;
}

export function token(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function battleCode(id: string): string {
  return `RB-${id.slice(0, 6).toUpperCase()}`;
}

export function sourceFrom(value: unknown): string {
  const source = typeof value === 'string' ? value.slice(0, 32) : 'direct';
  return /^[a-zA-Z0-9_-]+$/.test(source) ? source : 'direct';
}

export function safeMetric(value: unknown, max = 100): string | null {
  if (typeof value !== 'string') return null;
  return value.trim().slice(0, max) || null;
}

export async function secureEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const aa = encoder.encode(a);
  const bb = encoder.encode(b);
  if (aa.byteLength !== bb.byteLength) return false;
  let diff = 0;
  for (let i = 0; i < aa.byteLength; i += 1) diff |= aa[i] ^ bb[i];
  return diff === 0;
}
