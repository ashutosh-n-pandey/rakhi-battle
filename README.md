# Rakhi Battle 2026

Mobile-first Rakhi sibling challenge built with Astro 7, Cloudflare Workers, D1 and deterministic browser Canvas posters. No model/API call occurs per player.

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
npm run db:remote
npm run deploy
npx wrangler secret put ADMIN_TOKEN
npx wrangler secret put RAZORPAY_KEY_ID
npx wrangler secret put RAZORPAY_KEY_SECRET
```

Set `PAYMENTS_ENABLED` to `true` only after live merchant activation, policies/contact/refund details are complete, and the test flow passes.

Alternatively, the included GitHub Actions workflow deploys on `main` after repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are configured.

## Architecture

- Astro server routes run in one Cloudflare Worker.
- D1 stores expiring challenges, Family Court votes, events and payment unlocks.
- Anonymous parent/root/generation fields support referral-chain measurement without accounts.
- Random 96-bit opaque IDs protect unlisted links from enumeration.
- Razorpay Orders are created server-side; checkout callbacks are unlocked only after server-side HMAC verification.
- Poster PNGs are rendered in the browser at 1080×1920.
- `/admin` reads aggregate metrics only after an admin-token check.
- Payment pricing is enforced on the server, including the ₹50 Savage-to-Full upgrade difference.

See `DECISION_LOG.md`, `docs/ANALYTICS.md` and `docs/LAUNCH_RUNBOOK.md`.
