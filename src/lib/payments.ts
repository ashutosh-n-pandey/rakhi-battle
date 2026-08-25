// Stable database codes retained for existing purchases:
// `savage` = Exact Answer Reveal, `full` = Rakhi Gift Pack.
export type PaidTier = 'savage' | 'full';

export const PRICES_PAISE = {
  savage: 4_900,
  full: 9_900,
  savageToFull: 5_000,
} as const;

export interface CheckoutQuote {
  amount: number;
  tier: PaidTier;
  upgradeFrom: PaidTier | null;
}

export function quoteCheckout(requested: PaidTier, current: PaidTier | null): CheckoutQuote | null {
  if (current === 'full') return null;
  if (current === 'savage') {
    if (requested === 'savage') return null;
    return { amount: PRICES_PAISE.savageToFull, tier: 'full', upgradeFrom: 'savage' };
  }
  return {
    amount: PRICES_PAISE[requested],
    tier: requested,
    upgradeFrom: null,
  };
}
