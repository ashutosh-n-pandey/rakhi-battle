# Initial creative set

All three assets are 1080×1920 and rendered both as PNG Story ads and six-second MP4 Reels with subtle native motion. No AI image/video service is required.

| Variant | Hook | Hypothesis |
|---|---|---|
| A | “My sister says she knows everything… she scored 3/8” | Specific failure score creates curiosity and sibling tagging. |
| B | “Who is actually mummy’s favourite?” | High-recognition family dispute drives Family Court interest. |
| C | “Send this to your sibling if they’re brave enough” | Direct challenge wording maximizes link sharing. |

Primary CTA for all: free challenge. Do not advertise paid unlocks until checkout is live and verified.

Render with `bash marketing/render-creatives.sh`. Upload `rendered/*.mp4` to Reels and `rendered/*.png` to Stories. Add the live domain in Meta's destination field after deployment.
