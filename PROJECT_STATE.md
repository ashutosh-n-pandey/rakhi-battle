# Rakhi Battle — project state

Updated: 25 August 2026, UTC

## Executive state

The core game is built on `main`, including the fixed-screen runtime and research-inspired reveal funnel. Code validation passes, but the newest product version is not verified live because GitHub Actions cannot deploy without Cloudflare credentials. Payments are intentionally disabled until the genuine seller completes Razorpay activation and a real end-to-end purchase test passes.

## Verified repository baseline

- Code baseline before this governance update: `ed74ba519ffbc3f69c5eeaca34f7057b4c269fd4`.
- Baseline message: `feat: add research-inspired sibling profiles and reveal funnel`.
- GitHub Actions run 23: 11 tests passed; Astro build completed with zero errors and warnings.
- Deployment step failed because both `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` were empty in the runner.
- Repository visibility: public.
- Production origin configured in Wrangler: `https://rakhi-battle.riselikealion7.workers.dev`.
- Latest `main` is not verified live. The public origin may still serve an earlier manually deployed version.

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
| P0 | Automatic deployment | GitHub Actions Cloudflare secrets are empty; no successful Actions deployment | Add authorized Worker/D1 token and account ID, deploy, then smoke-test latest `main` |
| P0 | Seller identity | Wife will genuinely operate the India business; public seller/support identity is not frozen | Seller, bank beneficiary, Razorpay KYC and website identity all match |
| P0 | Live payments | `PAYMENTS_ENABLED=false`; live Razorpay keys absent | KYC approved, secrets stored in Cloudflare, real ₹49 success/refund/reload test passes |
| P0 | Live-version verification | Latest product commit is not confirmed on production | Check visual/runtime markers and full two-browser flow after deployment |
| P1 | Mobile visual QA | Quiz typography was strengthened; opening/lobby text still needs a deliberate mobile-weight review | Test 360×800, 390×844, Android/iPhone and in-app browser with zero unintended scroll |
| P1 | Analytics accounts | D1 events exist; GA4/Meta Pixel/Cloudflare Web Analytics setup is not verified | Events fire once with attribution and consent treatment confirmed |
| P1 | Meta launch accounts | Facebook Page, Instagram professional profile, ad account and billing are not verified complete | Connected in Business Suite and test creative opens correct attributed URL |
| P1 | Support operations | Monitored WhatsApp Business/support route not frozen | Public contact works and refund/support owner can respond |
| P2 | Custom domain | Workers URL remains the configured origin | Optional after deployment/payment stability; do not delay validation |

## Current best next task

Fix GitHub → Cloudflare deployment:

1. Add repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
2. Token must have the minimum permissions needed for Worker deployment and the bound D1 database.
3. Re-run the workflow or push a safe commit.
4. Confirm tests/build pass and `Deploy Worker` succeeds.
5. Verify the complete creator → sibling → result funnel on the live origin.

Do not enable payments during this task.

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

- 11/11 automated tests passed on the product baseline.
- Astro check/build passed with zero errors and warnings.
- This governance-only update does not itself prove the live product is current.
