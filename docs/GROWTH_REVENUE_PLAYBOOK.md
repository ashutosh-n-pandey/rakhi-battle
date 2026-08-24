# Rakhi Battle 2026 — growth, fun and revenue playbook

Locked: 24 August 2026

This document preserves the campaign decisions for the 25–28 August launch window. The launch remains one fast, culturally grounded sibling game. Future ideas are recorded separately so they do not expand the launch scope.

## 1. Core promise and voice

The game must never ask siblings to prove their love. It uses the Rakhi thread as the emotional entry point, shared childhood as the connection, and familiar disagreement as the humour.

Primary emotional line:

> Har Rakhi ke dhaage mein ek poora bachpan bandha hota hai.

Primary game line:

> Ek hi bachpan. Do alag kahaaniyan.

Supporting copy:

> 8 sawaalon mein kholo woh yaadein jo sirf tum dono samajhte ho—mummy ki daant, remote ki ladai, chhupayi hui mithai aur har baar ke naye excuses.

CTA:

> Apni Rakhi Battle Shuru Karo

Do not use `Pyaar bhi, proof bhi`, compatibility claims, or language implying that a low score means a weak relationship.

## 2. Frozen revenue model

The game is free to start and complete. Revenue comes from immediate digital upgrades after the basic result.

### Free

- Core eight-question paired battle.
- Basic score and one funny verdict.
- One simple branded share card that carries a subtle Rakhi Battle link/QR and drives the next visitor.

### ₹49 — Savage Mode / premium poster

- Extra savage/funny questions or verdicts already supported by the launch build.
- Deeper relationship categories and challenge themes.
- Premium 1080×1920 Story/Status poster.
- Personalized names, score and bond title.

### ₹99 — Full Reveal

- Detailed mismatch report.
- Full Rakhi Court verdict.
- Every category result.
- Multiple premium posters and clean Story/Status formats.
- Rakhi Battle certificate.
- Funny and sentimental result variants.

### Upgrade rule

Someone who already paid ₹49 must be able to reach Full Reveal by paying only the ₹50 difference. Do not charge ₹99 again.

One purchase belongs to the battle and unlocks the content for both siblings. Copy may position it as a gift: `Full report apne sibling ke liye unlock karein.`

### Payment route

- Keep the existing Razorpay Orders + server-side signature verification implementation.
- Complete merchant activation/KYC and enable UPI in Razorpay Checkout.
- Enable live payments only after keys, policy/contact/refund pages and a successful end-to-end test are complete.
- A static personal UPI QR plus manual UTR verification is an emergency fallback only. It cannot securely or instantly unlock at scale.
- No display-ad monetization is part of this launch because no publisher account is approved.

## 3. User-facing fun loop

Users should see emotion, anticipation and playful status—not business analytics.

### Personalized invitation

> Ashutosh remembers your childhood differently. Accept his Rakhi Battle.

The WhatsApp/Open Graph preview should include the challenger name whenever technically possible.

### Waiting experience

- Show real sibling progress, such as `Divya ne 5/8 answers complete kar liye`.
- While waiting, offer another sibling/cousin challenge.
- Show a blurred premium-poster preview without interrupting the game.

### Answer reveal

Reveal paired answers one by one:

> MATCH! Dono maante hain remote Ashutosh chheen leta tha.

> OBJECTION! Dono ki kahaani bilkul alag hai. Rakhi Court will investigate.

### Playful live counters

Only display truthful counts, expressed as entertainment:

- Childhoods reopened.
- Remote wars investigated.
- Mummy's favourites exposed.
- Shagun negotiations pending.

### Repeat play

After the result, invite the user to create separate battles with another brother, sister or cousin. The current result must remain accessible.

## 4. Self-spreading Rakhi Chain

The growth system is a family challenge chain, not a generic referral prompt.

1. A visitor starts from Meta, a creator, a community link or an organic share.
2. The creator sends the required personalized challenge to a sibling.
3. Both receive the result and a branded free share card.
4. Both are invited to challenge up to three more siblings/cousins.
5. Two completed downstream challenges unlock a free `Family Crown` badge.
6. Purchased posters carry a tasteful Rakhi Battle signature or QR that starts another chain.

User-facing chain titles can include:

- Chain Starter
- Bachpan Messenger
- Family Influencer
- Rakhi Legend

The immediate launch may use the challenge-three prompt and share card even if the full visual chain is deferred.

## 5. Minimal operator view

The operator dashboard needs only five headline numbers:

1. Live/unique visitors.
2. Viral coefficient: completed child challenges per completed parent.
3. Median transfer time from parent completion to child completion.
4. Verified purchase conversion.
5. Verified revenue.

Source, referral, generation and tier details can remain drill-down data. Users never see these commercial labels.

The referral graph uses anonymous identifiers:

- `visitor_id`
- `battle_id`
- `invite_id`
- `parent_visitor_id`
- `ref`
- `generation`

D1 remains the source of truth for battles, referral relationships and payments. High-volume behavioural events may later move to Workers Analytics Engine. A copied bare domain without its referral token cannot be reliably attributed.

## 6. Content attacks using the same game

Do not depend on one advertisement. Publish several entry angles that all lead to the same experience:

- Tradition: `Har Rakhi ke dhaage mein ek poora bachpan bandha hota hai.`
- Nostalgia: `Ek hi bachpan. Do alag kahaaniyan.`
- Humour: `Ek hi ghar mein bade hue… phir answers itne alag kaise?`
- Provocation: `Mummy ka asli favourite kaun tha?`
- Distance: `Shehar alag hain. Bachpan abhi bhi same hai.`
- Status pride: `Hamara official sibling score 7/8. Tumhara kitna hai?`

Recurring short-form themes:

- Mummy's Favourite Battle
- Remote Chor Battle
- Secret Leaker Battle
- Shagun Negotiator Battle
- Long-distance Sibling Battle
- Cousin Special

The landing message may be selected from a query parameter so the page matches the creative while the game stays identical.

## 7. Distribution without large upfront fees

- Create a dedicated Facebook Page and matching Instagram identity for Rakhi Battle.
- Seed WhatsApp family, college, alumni, housing, parenting and city communities.
- Give creators, meme pages and community captains unique `?ref=` links.
- Proposed performance payout: ₹15 per verified ₹49 sale and ₹30 per verified ₹99 sale.
- Record direct and downstream generations from each referral link before calculating payout.
- Never claim a share, sale, live count or `most popular` tier unless the underlying event actually exists.

## 8. Post-launch vision — Rakhi Seeds and the family connection map

This is the strongest reusable future idea, but it must not delay the 2026 launch.

Every first battle creates a `Rakhi Seed`. Every later challenge grows a branch. A family can then see:

- Who planted the original seed.
- Which sibling/cousin connected each branch.
- Where the viewer sits in the chain.
- Number of connected family members.
- Longest branch and fastest-growing branch.
- Aggregate family score and playful family title.
- A three-day animated timeline showing the seed spreading.

Example user copy:

> This Rakhi Seed was started by Aditi in Prayagraj. You are the seventh person and third generation in the Pandey Family Chain.

To protect interest and privacy:

- Show the chain only after the main result, never before the game.
- Default to first names/nicknames and approximate city only with explicit consent.
- Allow an anonymous node.
- Do not expose answers, payments, phone numbers or private challenge links on the map.
- Keep the map visually simple: current user, seed origin and nearest branches first; expand on tap.
- Make the chain a reward and storytelling device, not another registration form.

After Rakhi, the same seed engine can support Bhai Dooj, family reunions and other relationship events, but no reusable-engine work belongs in the current launch.

## 9. Launch scope guardrail

Must ship before promotion:

1. Strong cultural hero copy and properly cropped festive artwork.
2. Creator → sibling → result mobile flow.
3. Free share card and premium poster/report previews.
4. ₹49/₹99 UPI-capable verified checkout and ₹50 upgrade path.
5. Personalized WhatsApp share and repeat-battle CTA.
6. Referral/generation attribution sufficient for the five-number operator view.
7. Mobile, payment, refresh and poster QA.

Explicitly defer if they threaten launch:

- Full animated seed map.
- City or national public leaderboards.
- Display-ad network integration.
- A new payment provider when Razorpay activation is possible.
- More pricing tiers or a general festival platform.

