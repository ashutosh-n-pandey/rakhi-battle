# Rakhi Battle governance

Updated: 25 August 2026

## Purpose

Keep code, product intent, operational truth and future ChatGPT sessions aligned. The repository must remain sufficient to continue work without reconstructing decisions from old chats.

## Session protocol

- Start from `START_HERE.md`.
- Read all three mandatory startup files completely.
- Verify external state that may have changed: branch head, workflow result, production behaviour, payment flag and account blockers.
- State facts separately from assumptions.
- Load topic documents only when relevant.
- Before changing code, identify the accepted decision and the observable acceptance test.
- After changing code, run the relevant tests/build and update `PROJECT_STATE.md`.
- Add to `DECISION_LOG.md` when a product, commercial, legal, privacy or architecture rule changes.

## Status vocabulary

- **Implemented:** present in the repository.
- **Validated:** automated/local checks passed for the named commit.
- **Deployed:** a deployment provider reports success for the named commit.
- **Verified live:** production was opened and the expected behaviour was observed.
- **Blocked:** cannot complete without an external decision, credential, approval or provider action.

Do not use these terms interchangeably.

## Change completion rule

A material task is done only when:

1. the intended change exists;
2. relevant tests and build pass;
3. secrets and personal data are absent from the diff;
4. state/decision documentation matches the change;
5. the commit is pushed;
6. deployment and live verification are completed when the task includes release.

If deployment is blocked, report “pushed, not live” and record the blocker.

## Decision discipline

- Current accepted decisions belong in `DECISION_LOG.md`.
- Do not silently replace a decision. Record what changed, why and which older rule is superseded.
- Historical documents may explain context but cannot override current truth.
- Research-inspired entertainment must not be promoted as a validated psychological assessment.
- Payment, tax, FEMA and immigration guidance must be rechecked from authoritative/current sources before acting.

## Security and privacy

- Never commit API keys, session cookies, KYC files, identity numbers, bank data or private customer information.
- Store Worker secrets through Cloudflare and repository deployment credentials through GitHub Secrets.
- Use nicknames and opaque IDs; collect no phone/email solely to play.
- Preserve explicit Hall of Fame choice and provide private play.
- Keep public counters derived from stored events only.
- Avoid copying production data into chat or test fixtures.

## Scope control

Launch priority order:

1. reliable deployment;
2. compliant seller and live payment delivery;
3. mobile game quality;
4. measurement;
5. controlled distribution;
6. later features.

Do not delay launch for the animated family map, AdSense, broad leaderboards, extra pricing tiers, Hindi toggle, complex AI video or a general festival engine.

## Public-repository rule

This repository is public. Business strategy may be documented because the owner approved publication, but sensitive personal or financial data must never be included. If future material would create unnecessary privacy or commercial risk, move the repository private before committing it.
