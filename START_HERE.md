# Rakhi Battle — start here

Updated: 25 August 2026

This repository is the durable source of truth for the Rakhi Battle project. Do not rely on memory from an earlier chat when the repository can answer the question.

## Mandatory startup sequence

When the user types **START**:

1. Open public branch `main` for `ashutosh-n-pandey/rakhi-battle`.
2. Read this file, `PROJECT_STATE.md` and `DECISION_LOG.md` completely.
3. Verify the latest `main` commit and the latest GitHub Actions deployment result.
4. Open the configured production origin and determine whether the latest product commit is actually live.
5. Give a short brief: current status, blockers and the single best next task.
6. Load only the additional document(s) needed for that task from the map below.

Never ask the user to repeat established project context. Never claim a deployment, test, payment or account is complete without current evidence.

## Goal

Launch a mobile-first Rakhi sibling game that feels like an interactive video: one fixed screen, zero page scrolling during the playable journey, cinematic scene transitions, fast choices and a curiosity-led result funnel. Monetize through optional digital reveals and keepsakes while preserving a free viral share loop.

Immediate commercial window: Raksha Bandhan, 28 August 2026.

## Current product in one paragraph

Two siblings answer eight shared-childhood questions through a private link. The free result shows Memory Sync, a warm research-inspired relationship type, two answer teasers and a simple share card. ₹49 unlocks every exact answer plus the four-dimension profile. ₹99 unlocks the Rakhi Gift Pack with premium poster and certificate; a ₹49 buyer upgrades for ₹50. Either sibling may pay and one purchase unlocks the battle for both.

## Source-of-truth order

1. Code, migrations and deployment configuration describe what is implemented.
2. `PROJECT_STATE.md` records what is currently verified, blocked and next.
3. `DECISION_LOG.md` records accepted product and business decisions.
4. Canonical topic documents below explain the decision in detail.
5. Historical plans are context only and cannot override the three files above.

If documents conflict, do not guess. Inspect code and live behaviour, then update the canonical documents in the same change.

## Document map

| Need | Read |
|---|---|
| Current status, blockers, priorities | `PROJECT_STATE.md` |
| Locked decisions and superseded rules | `DECISION_LOG.md` |
| Agent/project governance | `GOVERNANCE.md` |
| Game, animation, mobile and UX standard | `docs/GAME_EXPERIENCE_STANDARD.md` |
| Psychology model and paid-result ladder | `docs/PSYCHOLOGY_REVENUE_MODEL.md` |
| Seller, payments, tax boundaries, Meta and budget | `docs/BUSINESS_OPERATIONS.md` |
| Events and KPI definitions | `docs/ANALYTICS.md` |
| Deployment and release checks | `docs/LAUNCH_RUNBOOK.md`, `README.md` |
| Cultural hooks, distribution and future chain | `docs/GROWTH_REVENUE_PLAYBOOK.md` |
| Marketing copy and creative rules | `marketing/CAPTIONS.md`, `marketing/CREATIVE_BRIEF.md` |
| Earlier execution history | `docs/24_HOUR_EXECUTION_PLAN.md`, `docs/BACKBONE_CHECKPOINT.md` |

The 24-hour plan, backbone checkpoint and older growth pricing sections contain historical terminology. Current pricing and deliverables come from `DECISION_LOG.md` and `docs/PSYCHOLOGY_REVENUE_MODEL.md`.

## Non-negotiables

- No fabricated users, activity, purchases, testimonials or leaderboard counts.
- No claim that the game diagnoses, proves or scientifically grades a relationship.
- No gender rule requiring a brother, sister, younger or older participant to pay.
- No advertising spend until checkout, delivery and measurement work end to end.
- No secrets, PAN, Aadhaar, bank details, tokens or private KYC material in Git or chat.
- A material product change is incomplete until state and decision documentation are updated.
