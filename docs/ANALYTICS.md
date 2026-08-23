# Analytics contract

The client keeps an anonymous random session ID in local storage and preserves first-known attribution. Events are written to D1 with no phone number, email or contact-list data.

| Event | When |
|---|---|
| `landing_view` | Home rendered |
| `battle_start` | Creator submits nickname / replay CTA |
| `battle_creator_complete` | Challenge stored |
| `challenge_share_click` | WhatsApp, native share or copy tapped |
| `challenge_open` | Sibling accepts and starts |
| `challenge_complete` | Sibling result stored |
| `pair_result_view` | Completed result viewed |
| `poster_download` | PNG download invoked |
| `poster_share` | Native file share succeeds |
| `family_court_create` | Court CTA opened |
| `family_court_vote` | Vote stored |
| `new_battle_from_vote` | Court voter starts own battle |
| `savage_checkout_start` / `full_reveal_checkout_start` | Upgrade tapped |
| `savage_purchase` / `full_reveal_purchase` | Server-verified payment returns success |

## Core calculations

- Creator completion = `battle_creator_complete / battle_start`
- Share intent = unique creators with `challenge_share_click / battle_creator_complete`
- Sibling completion = `challenge_complete / challenge_open`
- Pair result to poster = (`poster_download` + `poster_share`) / `pair_result_view`
- Viral visitors per acquired visitor = unique non-paid referral sessions / unique paid-attributed sessions
- Buyer conversion = verified paid purchases / completed pairs
- Revenue per acquired visitor = verified revenue / unique paid-attributed sessions

Do not infer actual WhatsApp sends from button clicks. A click is share intent; downstream `challenge_open` is the verified outcome.
