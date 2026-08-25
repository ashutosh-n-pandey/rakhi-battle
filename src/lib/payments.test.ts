import { describe, expect, it } from 'vitest';
import { PRICES_PAISE, quoteCheckout } from './payments';

describe('payment entitlement quotes', () => {
  it('quotes the two direct purchase prices', () => {
    expect(quoteCheckout('savage', null)).toEqual({ amount: PRICES_PAISE.savage, tier: 'savage', upgradeFrom: null });
    expect(quoteCheckout('full', null)).toEqual({ amount: PRICES_PAISE.full, tier: 'full', upgradeFrom: null });
  });

  it('charges only the difference when Reveal upgrades to the Gift Pack', () => {
    expect(quoteCheckout('full', 'savage')).toEqual({
      amount: PRICES_PAISE.savageToFull,
      tier: 'full',
      upgradeFrom: 'savage',
    });
  });

  it('does not sell an entitlement the battle already owns', () => {
    expect(quoteCheckout('savage', 'savage')).toBeNull();
    expect(quoteCheckout('full', 'full')).toBeNull();
    expect(quoteCheckout('savage', 'full')).toBeNull();
  });
});
