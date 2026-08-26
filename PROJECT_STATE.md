# Rakhi Battle — project state

Updated: 26 August 2026, UTC

## Executive state

Rakhi Battle is live on the umbrella brand **BondBop** at `https://bondbop.com`. The apex domain resolves correctly through Cloudflare, the user reports the live site and Razorpay-facing policy pages are opening, and `support@bondbop.com` Email Routing is working to the chosen Gmail inbox. Razorpay onboarding has been submitted for review under the genuine India operator **Divya Pandey**, classified as **Gaming → Game developer or publisher**. Payments remain intentionally disabled until merchant approval, live credentials and a controlled real-payment test pass.

The latest lobby patch on `main` adds one **Info & Policies** link, a `/info` merchant/policy hub, a compact live countdown to Raksha Bandhan on **28 August 2026**, and a browser-resilient PLAY path. After the user reported that PLAY worked on desktop but was dead in DuckDuckGo Browser on a phone, the CTA was changed from a JavaScript-only button to a real `/play` link enhanced by JavaScript. Normal browsers keep the animated in-place transition; if lobby JavaScript is blocked or fails to parse, native navigation still opens the game through `/play`. Numeric separators were also removed from the countdown script for broader WebView compatibility. This newest compatibility patch still needs a fresh manual release and mobile verification.

## Verified repository / deployment baseline

- Product baseline: `ed74ba519ffbc3f69c5eeaca34f7057b4c269fd4` — `feat: add research-inspired sibling profiles and reveal funnel`.
- Successful manual release on 25 August 2026: 11/11 tests passed; Astro check/build completed with zero errors and warnings.
- Remote D1 migration check during that release: no migrations to apply.
- Cloudflare Worker Version ID from that release: `ff17c4d9-9e2f-46ab-95d2-33cd163daea5`.
- Original Worker origin remains available as infrastructure: `https://rakhi-battle.riselikealion7.workers.dev`.
- Canonical public domain: `https://bondbop.com`.
- DNS verified on 26 August 2026: Cloudflare `1.1.1.1`, Google `8.8.8.8` and the user's normal resolver all returned Cloudflare addresses for `bondbop.com`; nameservers are `aaden.ns.cloudflare.com` and `adele.ns.cloudflare.com`.
- `support@bondbop.com` forwarding to Gmail: confirmed working by the user.
- Razorpay application: submitted for review on 26 August 2026.
- GitHub Actions automatic deployment remains unresolved because its `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets are empty. Manual Wrangler deployment works.
- During a 26 August manual release attempt Wrangler briefly returned D1 error 7403; `wrangler whoami` confirmed the expected Cloudflare account and D1 write scope, `wrangler d1 list` returned the correct `rakhi-battle-db`, and subsequent D1/deployment steps worked.

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
- Opening-lobby **Info & Policies** path to `/info`; no legal/navigation clutter during the active eight-question game.
- Compact countdown to 28 August 2026, 00:00 IST; it becomes a Rakhi Day live message on 28 August and a non-countdown Rakhi message afterward.
- PLAY is progressive: a real `/play` URL is the no-JavaScript/failure fallback, while working JavaScript intercepts it to preserve the cinematic in-place transition.
- `/play` is noindex and opens the creator game directly inside the same fixed-screen game shell.

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
- `bondbop.com` is the canonical domain.
- Public brand relationship: Rakhi Battle by BondBop.
- India operator/seller identity shown publicly: Divya Pandey.
- Public support address: `support@bondbop.com`; Cloudflare Email Routing to Gmail is confirmed working.
- Pricing, Contact, Privacy, Terms, Shipping, Digital Delivery and Cancellation & Refund pages exist.
- `/shipping` exists explicitly for payment-provider website review and states that no physical goods are shipped.
- `/info` is the merchant/policy hub linking the required customer-information pages.
- Anonymous attribution and operator analytics are implemented.

## Blocked or unresolved

| Priority | Item | State / evidence | Completion condition |
|---|---|---|---|
| P0 | Deploy latest lobby/compatibility patch | Info/countdown plus resilient `/play` fallback are on `main` but not yet manually released | Pull latest `main`, run `npm run release`, confirm successful Wrangler deployment |
| P0 | Mobile PLAY verification | Desktop PLAY worked; DuckDuckGo Browser on phone failed before the fallback patch | After deploy, verify PLAY in DuckDuckGo Browser plus a mainstream mobile browser; both must enter the game |
| P0 | Live-version verification | Current BondBop deployment works; newest compatibility patch still needs a quick browser check | Verify lobby, `/info`, PLAY, then complete creator → sibling → result |
| P0 | Razorpay approval | Onboarding submitted for review under Divya Pandey | Merchant review approved and live API credentials become available |
| P0 | Live payments | `PAYMENTS_ENABLED=false`; live Razorpay keys absent | Store approved live credentials in Cloudflare, run real ₹49 success/reload/refund test, then enable payments deliberately |
| P1 | Automatic deployment | Manual deployment works; GitHub Actions Cloudflare secrets remain empty | Add authorized Worker/D1 token and account ID and get one successful Actions deployment |
| P1 | Mobile visual QA | New countdown/info strip must not squeeze the fixed lobby on small screens | Test 360×800, 390×844, Android/iPhone and in-app browser with zero unintended scroll |
| P1 | Analytics accounts | D1 events exist; GA4/Meta Pixel/Cloudflare Web Analytics setup is not verified | Events fire once with attribution and consent treatment confirmed |
| P1 | Meta launch accounts | Facebook Page, Instagram professional profile, ad account and billing are not verified complete | Connected in Business Suite and test creative opens correct attributed URL |

## Current best next task

Release and verify the resilient PLAY patch while Razorpay review continues:

1. In the local Rakhi Battle checkout run `git pull` and then `npm run release`.
2. Open `https://bondbop.com` in DuckDuckGo Browser on the same phone that previously failed.
3. Tap PLAY. If the enhanced transition is unavailable, the browser must still navigate to `/play` and show the creator game.
4. Repeat in Chrome/Safari/Firefox mobile and confirm the normal animated transition still works.
5. Confirm **Info & Policies** opens `/info` and the Rakhi countdown remains visible only on the lobby.
6. Keep `PAYMENTS_ENABLED=false` until Razorpay approval and the controlled payment test.

## Owner / payment setup

- Genuine India operator and Razorpay merchant: **Divya Pandey**.
- Razorpay merchant identity, PAN/KYC and settlement bank must remain hers.
- BondBop is the umbrella consumer brand; Rakhi Battle is the current seasonal game.
- Current Razorpay classification: Gaming → Game developer or publisher.
- GitHub, Cloudflare, domain administration and technical development may be managed separately from the legal merchant identity.
- Public support route: `support@bondbop.com` → monitored Gmail via Cloudflare Email Routing.

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
- Astro check/build passed with zero errors and warnings in that release.
- Remote D1 had no pending migrations.
- Wrangler successfully deployed the BondBop/Razorpay-readiness patch after the transient 26 August D1 authorization error was resolved.
- Desktop PLAY worked on the deployed lobby; DuckDuckGo Browser on phone did not react to the JavaScript-only CTA, which triggered the progressive `/play` fallback change.
- The latest fallback changes are on `main` and require a fresh local `npm run release` plus mobile verification.
