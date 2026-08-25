# Rakhi Battle — project state

Updated: 25 August 2026, UTC

## Executive state

The core game is built on `main`, including the fixed-screen runtime and research-inspired reveal funnel. On 25 August 2026 the user ran `npm run release` locally against the Rakhi Battle project: all 11 tests passed, Astro check/build completed with zero errors or warnings, D1 reported no pending migrations, and Wrangler successfully uploaded and deployed the `rakhi-battle` Worker. Cloudflare returned production Version ID `ff17c4d9-9e2f-46ab-95d2-33cd163daea5` at `https://rakhi-battle.riselikealion7.workers.dev`. Browser-level live behaviour still needs a final human smoke test. GitHub Actions automatic deployment remains broken because its Cloudflare credentials are empty. Payments remain intentionally disabled until the genuine seller completes Razorpay activation and a real end-to-end purchase test passes.

## Verified repository / deployment baseline

- Product baseline: `ed74ba519ffbc3f69c5eeaca34f7057b4c269fd4`.
- Product baseline message: `feat: add research-inspired sibling profiles and reveal funnel`.
- Governance baseline before this state update: `a78e0c2d29703bf48bf4278c10a12230bf5981de`.
- Manual release on 25 August 2026: 11/11 tests passed; Astro check/build completed with zero errors and warnings.
- Remote D1 migration check: no migrations to apply.
- Wrangler manual deploy: success.
- Cloudflare Worker Version ID: `ff17c4d9-9e2f-46ab-95d2-33cd163daea5`.
- Production origin: `https://rakhi-battle.riselikealion7.workers.dev`.
- GitHub Actions remains unresolved: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are empty in the runner, so automatic deployment still fails.
- Repository visibility: public.
- Final creator → sibling → result browser smoke test is still required before calling the product verified live.

Always reverify these facts at the start of a new session; do not treat this snapshot as live telemetry.

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

### Platform

- Astro on one Cloudflare Worker.
- D1 for challenges, votes, events, support and verified unlocks.
- Razorpay Orders and server-side signature verification implemented but gated.
- Policy, pricing, contact, refund and digital-delivery pages exist.
- Anonymous attribution and operator analytics are implemented.

## Blocked or unresolved

| Priority | Item | State / evidence | Completion condition |
|---|---|---|---|
| P0 | Live-version verification | Manual Wrangler deployment succeeded, but browser flow has not yet been smoke-tested | Open production and complete creator → sibling → result using two browser sessions |
| P0 | Seller identity | Wife will genuinely operate the India business; public seller/support identity is not frozen | Seller, bank beneficiary, Razorpay KYC and website identity all match |
| P0 | Live payments | `PAYMENTS_ENABLED=false`; live Razorpay keys absent | KYC approved, secrets stored in Cloudflare, real ₹49 success/refund/reload test passes |
| P1 | Automatic deployment | Manual deployment works; GitHub Actions Cloudflare secrets are empty | Add authorized Worker/D1 token and account ID and get one successful Actions deployment |
| P1 | Mobile visual QA | Quiz typography was strengthened; opening/lobby text still needs a deliberate mobile-weight review | Test 360×800, 390×844, Android/iPhone and in-app browser with zero unintended scroll |
| P1 | Analytics accounts | D1 events exist; GA4/Meta Pixel/Cloudflare Web Analytics setup is not verified | Events fire once with attribution and consent treatment confirmed |
| P1 | Meta launch accounts | Facebook Page, Instagram professional profile, ad account and billing are not verified complete | Connected in Business Suite and test creative opens correct attributed URL |
| P1 | Support operations | Monitored WhatsApp Business/support route not frozen | Public contact works and refund/support owner can respond |
| P2 | Custom domain | Workers URL remains the configured origin | Optional after deployment/payment stability; do not delay validation |

## Current best next task

Verify the manually deployed production Worker and continue Razorpay onboarding:

1. Open `https://rakhi-battle.riselikealion7.workers.dev` on a phone/incognito browser.
2. Confirm the landing screen visibly says Rakhi Battle and has no broken assets or unintended scrolling.
3. Create one challenge, open its private link in a second browser/session, complete the sibling answers and reach the result.
4. Check Pricing, Contact, Privacy, Terms, Refund and Delivery pages from production.
5. If those pass, submit the Workers URL to Razorpay for website verification.

Do not enable payments yet.

## Owner setup sequence

1. Wife creates/activates Razorpay as the genuine individual/sole proprietor using her matching Indian KYC and settlement account.
2. Freeze seller name, monitored support email and refund contact; update the website if needed.
3. Configure Meta Page, Instagram professional account, ad account and WhatsApp Business.
4. Store live Razorpay secrets only in Cloudflare; run a controlled real purchase and refund/delivery test.
5. Install/verify analytics.
6. Spend only the first controlled traffic tranche and review KPIs before any scale-up.

## Controlled budget and target

- Total family-money risk ceiling: ₹15,000.
- First traffic test: approximately ₹900–₹1,000 after payment reliability.
- Release further spend in stages only after reviewing pair completion, buyer conversion, revenue per acquired visitor and child battles per completed pair.
- Working gross-revenue target: ₹50,000.
- ₹1 lakh is a stretch result; ₹5 lakh+ requires genuine viral breakout.
- Do not plan or spend on the assumption of ₹50 lakh.
- AdSense and display ads are deferred because they distract from completion and require separate approval/traffic.

## Last known quality evidence

- 11/11 automated tests passed in the successful local release on 25 August 2026.
- Astro check/build passed with zero errors and warnings.
- Remote D1 had no pending migrations.
- Wrangler successfully deployed production Version ID `ff17c4d9-9e2f-46ab-95d2-33cd163daea5`.
- Browser-level end-to-end verification remains pending.
