# Rakhi Battle — project state

Updated: 26 August 2026, UTC

## Executive state

The Rakhi Battle product is built and has already been successfully deployed manually once through Wrangler. The consumer umbrella brand is now **BondBop**, with `https://bondbop.com` selected as the canonical production domain; the user reports the apex domain is opening successfully after Cloudflare setup. Razorpay onboarding has been submitted for review under the genuine India operator **Divya Pandey**, using the business classification **Gaming → Game developer or publisher**. Payments remain intentionally disabled until merchant approval, live credentials and a controlled real-payment test pass.

A Razorpay-readiness patch is now pushed to `main`: canonical/origin/sitemap references point to `bondbop.com`; public pages identify “Rakhi Battle by BondBop” and Divya Pandey as the India operator; `support@bondbop.com` is the public support address; standard Shipping, Digital Delivery, Cancellation & Refund, Contact, Privacy and Terms pages are present. This patch has **not yet been manually redeployed**. Configure `support@bondbop.com` forwarding to a monitored Gmail inbox before deploying it.

## Verified repository / deployment baseline

- Product baseline: `ed74ba519ffbc3f69c5eeaca34f7057b4c269fd4` — `feat: add research-inspired sibling profiles and reveal funnel`.
- Successful manual release on 25 August 2026: 11/11 tests passed; Astro check/build completed with zero errors and warnings.
- Remote D1 migration check during that release: no migrations to apply.
- Wrangler manual deploy on 25 August: success.
- Cloudflare Worker Version ID from that release: `ff17c4d9-9e2f-46ab-95d2-33cd163daea5`.
- Original Worker origin remains available as infrastructure: `https://rakhi-battle.riselikealion7.workers.dev`.
- Canonical public domain selected/configured: `https://bondbop.com`.
- The user reports `bondbop.com` resolves and opens; independent DNS propagation may still vary temporarily across resolvers.
- Razorpay application: submitted for review on 26 August 2026.
- GitHub Actions automatic deployment remains unresolved because its `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets are empty. Manual Wrangler deployment works.

Always reverify external state at the start of a new session.

## Implemented

### Product and game

- No-login creator → private sibling link → sibling → result journey.
- Eight questions with draft recovery and private opaque challenge IDs.
- Fixed `100dvh` game shell, one-question-per-screen and animated scene transitions.
- Waiting room, pair result, Family Court, replay and anonymous family-chain lineage.
- Browser-generated share/poster assets with no per-player model cost.
- Consent-based Hall of Fame.
- Truthful database-derived social proof; zero values hidden.

### Result and revenue funnel

- Memory Sync is separate from relationship quality.
- Research-inspired dimensions: Warmth, Conflict, Rivalry and Balance.
- Types: Safe-Harbour Siblings, Firecracker Family, Courtroom Companions and Independent Allies.
- Free: type, Memory Sync, two teasers and simple viral share card.
- ₹49 Exact Answer Reveal: all eight paired answers, profile and private playful verdict.
- ₹99 Rakhi Gift Pack: Reveal plus premium poster and certificate.
- ₹50 upgrade from Reveal to Gift Pack.
- Either sibling can pay; one purchase unlocks both participants.

### Platform / merchant readiness

- Astro on one Cloudflare Worker with D1.
- Razorpay Orders and server-side signature verification implemented but gated.
- `bondbop.com` is the canonical domain in the current `main` configuration.
- Public brand relationship: Rakhi Battle by BondBop.
- India operator/seller identity shown publicly: Divya Pandey.
- Public support address selected: `support@bondbop.com`.
- Pricing, Contact, Privacy, Terms, Shipping, Digital Delivery and Cancellation & Refund pages exist.
- `/shipping` exists explicitly for payment-provider website review and states that no physical goods are shipped.
- Anonymous attribution and operator analytics are implemented.

## Blocked or unresolved

| Priority | Item | State / evidence | Completion condition |
|---|---|---|---|
| P0 | Support email routing | `support@bondbop.com` is now referenced in `main`, but forwarding is not yet confirmed | Configure Cloudflare Email Routing from `support@bondbop.com` to a monitored Gmail inbox and verify receipt |
| P0 | Deploy latest BondBop/Razorpay patch | Domain/legal-policy changes are pushed to `main` but not manually released | Pull latest `main`, run `npm run release`, confirm successful Wrangler deployment |
| P0 | Live-version verification | Previous Worker release succeeded; newest domain/legal patch still needs browser smoke test | On `bondbop.com`, complete creator → sibling → result and open all policy/support pages |
| P0 | Razorpay approval | Onboarding submitted for review under Divya Pandey | Merchant review approved and live API credentials become available |
| P0 | Live payments | `PAYMENTS_ENABLED=false`; live Razorpay keys absent | Store approved live credentials in Cloudflare, run real ₹49 success/reload/refund test, then enable payments deliberately |
| P1 | Automatic deployment | Manual deployment works; GitHub Actions Cloudflare secrets remain empty | Add authorized Worker/D1 token and account ID and get one successful Actions deployment |
| P1 | Mobile visual QA | Opening/lobby still needs deliberate device review | Test 360×800, 390×844, Android/iPhone and in-app browser with zero unintended scroll |
| P1 | Analytics accounts | D1 events exist; GA4/Meta Pixel/Cloudflare Web Analytics setup is not verified | Events fire once with attribution and consent treatment confirmed |
| P1 | Meta launch accounts | Facebook Page, Instagram professional profile, ad account and billing are not verified complete | Connected in Business Suite and test creative opens correct attributed URL |

## Current best next task

Finish the public support/domain release while Razorpay reviews the application:

1. In Cloudflare Email Routing, create `support@bondbop.com` and forward it to the chosen Gmail inbox.
2. Verify the Cloudflare destination email and send a real test message to `support@bondbop.com`.
3. On the local Rakhi Battle checkout, run `git pull` and then `npm run release`.
4. Open `https://bondbop.com` in an incognito/mobile browser and verify the full two-browser game flow.
5. Open `/pricing`, `/contact`, `/privacy`, `/terms`, `/shipping`, `/delivery` and `/refund` and confirm the BondBop/Divya Pandey/support details are visible and correct.
6. Keep `PAYMENTS_ENABLED=false` until Razorpay approval and the controlled payment test.

## Owner / payment setup

- Genuine India operator and Razorpay merchant: **Divya Pandey**.
- Razorpay merchant identity, PAN/KYC and settlement bank must remain hers.
- BondBop is the umbrella consumer brand; Rakhi Battle is the current seasonal game.
- Current Razorpay classification: Gaming → Game developer or publisher.
- GitHub, Cloudflare, domain administration and technical development may be managed separately from the legal merchant identity.
- Public support route: `support@bondbop.com`; forward it to a monitored Gmail inbox.

## Controlled budget and target

- Total family-money risk ceiling: ₹15,000.
- First traffic test: approximately ₹900–₹1,000 only after payment reliability.
- Release further spend in stages only after reviewing pair completion, buyer conversion, revenue per acquired visitor and child battles per completed pair.
- Working gross-revenue target: ₹50,000.
- ₹1 lakh is a stretch result; ₹5 lakh+ requires genuine viral breakout.
- Do not plan or spend on the assumption of ₹50 lakh.
- AdSense/display ads remain deferred.

## Last known quality evidence

- 11/11 automated tests passed in the successful manual release on 25 August 2026.
- Astro check/build passed with zero errors and warnings.
- Remote D1 had no pending migrations.
- Wrangler successfully deployed production Version ID `ff17c4d9-9e2f-46ab-95d2-33cd163daea5` on 25 August.
- The BondBop/Razorpay-readiness patch pushed on 26 August still requires a fresh manual release and live smoke test.
