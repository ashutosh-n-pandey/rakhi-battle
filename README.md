# Rakhi Battle 2026

[![Deploy to Cloudflare](https://github.com/ashutosh-n-pandey/rakhi-battle/actions/workflows/deploy.yml/badge.svg)](https://github.com/ashutosh-n-pandey/rakhi-battle/actions/workflows/deploy.yml)

Mobile-first Rakhi sibling game built with Astro 7, Cloudflare Workers, D1 and deterministic browser Canvas assets. No model/API call occurs per player.

For project continuity and current status, start with [START_HERE.md](START_HERE.md).

## Local setup

```bash
npm install
cp .dev.vars.example .dev.vars
npm run db:local
npm run dev
```

Use test-only credentials in `.dev.vars`. The file is gitignored.

## Verification

```bash
npm test
npm run build
npm run deploy:dry
```

## Deployment

```bash
npx wrangler login
npm run release
npx wrangler secret put ADMIN_TOKEN
npx wrangler secret put RAZORPAY_KEY_ID
npx wrangler secret put RAZORPAY_KEY_SECRET
```

Set `PAYMENTS_ENABLED` to `true` only after live merchant activation, policies/contact/refund details are complete, and the full real-payment flow passes.

GitHub Actions deploys pushes to `main` only after repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are configured with the required Worker/D1 permissions.

## Architecture

- Astro server routes run in one Cloudflare Worker.
- D1 stores expiring challenges, Family Court votes, events, support cases and payment unlocks.
- Anonymous parent/root/generation fields measure referral chains without accounts.
- Random 96-bit opaque IDs protect unlisted links from enumeration.
- Razorpay Orders are created server-side and unlocked only after server-side HMAC verification.
- Poster PNGs are rendered in browser Canvas at 1080×1920.
- `/admin` exposes aggregate metrics only after an admin-token check.
- Server pricing: ₹49 Exact Answer Reveal, ₹99 Rakhi Gift Pack and ₹50 upgrade difference.

See `PROJECT_STATE.md`, `DECISION_LOG.md` and `docs/README.md`.
