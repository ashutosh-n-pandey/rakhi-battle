# Rakhi Battle 2026 — 24-hour execution plan

Locked: 24 August 2026

Objective: finish a launchable, culturally grounded, fun and monetized Rakhi Battle today. Work proceeds block by block. External account reviews start immediately and run in parallel because their timing is not controlled by the code team.

## Critical path

`Account gates → legal/payment readiness → copy freeze → product implementation → paid fulfillment → viral loop → creatives → QA/deploy → launch`

The full Rakhi Seed family map, display-ad integration and nonessential features remain post-launch.

## Block 0 — external account gates (owner: Ashutosh; start now)

### 0A. Razorpay activation

1. Create/log in to the Razorpay account.
2. Start KYC as an Individual/Unregistered Business unless a more accurate registered business type applies.
3. Prepare personal PAN, Aadhaar, valid email, Indian bank account number, account-holder name and IFSC.
4. Use the live site URL: `https://rakhi-battle.riselikealion7.workers.dev`.
5. Business activity: digital entertainment / personalized digital content. Describe the ₹49 poster and ₹99 report accurately.
6. If available and acceptable, use Razorpay assisted onboarding because normal activation may miss the event window.
7. Do not send API secrets in chat or commit them to Git.

Website verification requires live Pricing, Contact, Terms, Privacy, Refund/Cancellation and Digital Delivery/Shipping pages. Block 1 completes any gaps before final website submission.

Done when: KYC is submitted and the Razorpay dashboard shows the activation/website-review status.

### 0B. Meta identities

1. Create Facebook Page `Rakhi Battle` in the existing Meta Business portfolio.
2. Create the closest available Instagram professional handle, preferably `@rakhibattle2026`.
3. Connect Instagram to the Facebook Page and both to the Business portfolio.
4. Create/attach the Meta ad account and add its billing method.
5. Do not launch ads until the live payment and complete mobile flow pass QA.

Temporary bio:

> Ek hi bachpan. Do alag kahaaniyan. Rakhi Battle 2026 👇

Done when: the Facebook Page and Instagram profile are visible inside Meta Business Suite.

### 0C. Contact identity

Choose the public support email to display on Contact, Terms and Refund pages. It must be monitored through 28 August.

Done when: one support email is frozen.

## Block 1 — legal and payment readiness (owner: Codex)

- Add/finalize Contact page.
- Add a clear Pricing section/page for Free, ₹49 and ₹99.
- Add Refund and Cancellation policy for immediately delivered digital content and failed delivery.
- Add Digital Delivery/Shipping policy stating that no physical item is shipped.
- Review Terms and Privacy against the actual product and payment flow.
- Add the public support email and business/operator name supplied in Block 0C.
- Verify every policy is reachable from the footer without login.

Done when: all Razorpay-required URLs return HTTP 200 on mobile and contain accurate information.

## Block 2 — copy and content freeze (owner: Ashutosh + Codex)

Freeze every visible line before wider UI changes:

- Landing hero, supporting copy and CTA.
- Eight questions and answer choices.
- Personalized invitation and WhatsApp preview.
- Waiting-state copy.
- Match/mismatch reveal lines.
- Basic result and low/mid/high verdicts.
- ₹49 and ₹99 paywall copy.
- Poster, Full Reveal report and certificate wording.
- Repeat-battle, Family Court and Hall of Fame copy.
- Footer, disclaimer and support language.

Locked direction:

> Har Rakhi ke dhaage mein ek poora bachpan bandha hota hai.

> Ek hi bachpan. Do alag kahaaniyan.

Done when: one content matrix is approved and no placeholder or `proof of love` language remains.

## Block 3 — core product and fun flow (owner: Codex)

Must-have:

- Fast no-login mobile start.
- Both siblings visible in festive artwork without destructive cropping.
- Creator → personalized sibling link → sibling answers → paired result.
- Answer-by-answer `MATCH` / `OBJECTION` reveal.
- Basic result remains positive at every score.
- Waiting state preserves progress and offers another challenge.
- Refresh/back/reopen returns to the correct battle.

Nice-to-have only if the must-have flow is stable:

- Real sibling answer progress.
- Playful truthful counters.
- Family Crown badge.

Done when: two different mobile browsers can complete the entire free flow without assistance.

## Block 4 — paid fulfillment and UPI checkout (owner: Codex + Ashutosh for keys)

- Preserve existing Razorpay Orders and server-side HMAC verification.
- Test immediately with Razorpay Test Mode keys.
- Keep ₹49 Savage/premium poster and ₹99 Full Reveal.
- One verified purchase unlocks the battle for both siblings.
- A ₹49 buyer upgrades to Full Reveal for only ₹50 more.
- Show accurate blurred previews before payment.
- UPI is presented by Razorpay Checkout when live mode is activated.
- Preserve entitlement after refresh and payment retry.
- Ensure ₹49 poster and ₹99 report deliver exactly what their copy promises.

Secret-entry commands are run locally by Ashutosh and never pasted into chat:

```bash
npx wrangler secret put RAZORPAY_KEY_ID
npx wrangler secret put RAZORPAY_KEY_SECRET
```

Set `PAYMENTS_ENABLED=true` only after a complete live test.

Emergency fallback if live activation misses the deadline:

- Static merchant/personal UPI intent or QR.
- Unique order code and UTR submission.
- Manual bank verification before unlock.
- Display a clear `manual verification may take time` message.
- Stop accepting manual orders if verification volume becomes unmanageable.

Done when: success, failure, tampered signature, retry and reload-unlock cases pass.

## Block 5 — minimum viral loop and tracking (owner: Codex)

- Personalized WhatsApp/native-share message.
- Preserve `ref`, UTM and parent attribution in downstream links.
- Free branded share card with subtle play link/QR.
- After result, challenge up to three more siblings/cousins.
- Support multiple battles per person without overwriting prior results.
- Record anonymous parent → child generation relationships.
- Keep the operator headline view to visitors, viral coefficient, transfer time, paid conversion and revenue.

Post-launch: full animated Rakhi Seed family map.

Done when: a test chain can be followed from seed visitor through at least two downstream generations.

## Block 6 — launch creative kit (owner: Codex; begins after Block 2 copy freeze)

Create three vertical 9:16 reels first. Prefer controlled motion graphics from strong festive stills, kinetic text and sound over slow or unpredictable complex AI video generation.

### Reel A — tradition/emotion

1. Rakhi thread close-up.
2. `Har Rakhi ke dhaage mein…`
3. Childhood memory moments.
4. `…ek poora bachpan bandha hota hai.`
5. Game and CTA.

### Reel B — humour

- Remote war.
- Mummy's favourite.
- Mithai theft.
- `Ek hi ghar mein bade hue… phir answers itne alag kaise?`

### Reel C — long distance

- Siblings in different cities.
- Shared childhood flashes.
- `Shehar alag hain. Bachpan abhi bhi same hai.`

Also create:

- Three square feed posts.
- Six WhatsApp Status creatives.
- Captions, hashtags, alt text and page bio.
- One creator/community sharing kit.

Done when: all assets open correctly on Android and have safe text margins for Reels/Stories UI.

## Block 7 — Meta setup and controlled launch (owner: Ashutosh + Codex)

- Publish the three organic profile posts before running ads.
- Install/configure Meta Pixel events only after consent/policy handling is accurate.
- Verify landing, start, pair completion and purchase events.
- Begin with a small creative test, not the full budget.
- Use the same landing message as the creative angle.
- Stop spend immediately if payment or fulfillment fails.

Done when: a real ad preview opens the correct live page and attribution survives through purchase.

## Block 8 — final QA, deployment and launch operations (owner: Codex + Ashutosh)

- Run automated tests, production build and deploy dry run.
- Apply required remote D1 migrations from the correct project directory.
- Deploy to Cloudflare.
- Test Chrome, Android in-app browser and iPhone/Safari if available.
- Test 360×800 and 390×844 layouts.
- Verify poster crop, download, native share and QR.
- Verify privacy, terms, contact, pricing, refund and delivery pages.
- Verify payment, unlock and support contact.
- Record deployed version ID and launch time.

Done when: the live production smoke-test checklist passes with no critical defect.

## Strict deferrals

Do not delay launch for:

- Full Rakhi Seed visualization.
- Display-ad network approval/integration.
- City/national public leaderboard expansion.
- Extra pricing tiers.
- Complex AI-generated video scenes.
- A reusable multi-festival platform.

## First action now

Ashutosh begins Block 0A Razorpay KYC immediately, then completes 0B Meta identities and supplies the Block 0C support email. Codex begins Block 1 in parallel as soon as the support identity is known; generic placeholders may be prepared while waiting.

