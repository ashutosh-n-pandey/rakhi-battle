# Rakhi Battle 2026 — decision log

Updated: 23 August 2026

| Finding | Implication | Product decision |
|---|---|---|
| Raksha Bandhan is on 28 August 2026; the launch window is five days. | Every nonessential dependency destroys test time. | Freeze one 8-question game, one free Story poster and one Family Court loop. |
| Existing friendship/sibling quizzes prove that create → share link → score is understood. | The base mechanic is not differentiated. | Differentiate through Rakhi timing, paired verdicts, Indian sibling humour, attractive free poster and family voting. |
| Competitors commonly use 10–15 questions and leaderboards. | Longer quizzes create more content but increase mobile abandonment. | Use 8 large-tap questions targeting 60–90 seconds. Add only real aggregate counts later. |
| Status/Story images are a distribution surface, but AI generation per user is wasteful. | Poster quality matters more than AI novelty. | Generate 1080×1920 posters deterministically in browser Canvas at near-zero marginal cost. |
| Indian gateway onboarding requires KYC/business verification and compliant site policies. | Payments cannot be assumed live on day one. | Build Razorpay Orders + server signature verification now; keep it disabled until merchant activation and keys. |
| One-time ₹49/₹99 upgrades are low-friction hypotheses; the traffic window is too short for a four-price test. | Early A/B pricing would fragment already-small samples. | Launch ₹49 Savage / ₹99 Full Reveal. Test price only after at least 20 checkout starts per tier. |
| Cloudflare D1 is available on the free Workers tier and binds directly to Workers. | Server state and analytics can remain low-cost without a separate vendor. | One Astro Worker + D1. No per-play model/API calls. |
| A quiz answer is the creator's opinion, not objective truth. | Presenting it as fact can create genuine conflict. | Label the result as entertainment and route disagreements to Family Court votes. |

## Frozen MVP

- No login, email, phone or install.
- Creator nickname + eight canonical pair questions.
- One cryptographically random challenge link.
- First sibling response closes the battle.
- Match result, winner, four summary categories.
- Free 1080×1920 result poster with tasteful domain CTA.
- Family Court with four questions, one vote per browser session.
- Anonymous event funnel with referral/UTM preservation.
- Razorpay-ready ₹49 and ₹99 upgrades; disabled without live credentials.
- Operator dashboard protected by an admin secret.
- 45-day intended retention.

## Explicitly deferred

- Hindi toggle, city leaderboards, affiliates, sponsorship, Turnstile, multiple poster themes, Reels automation, price A/B tests and a reusable festival engine.
