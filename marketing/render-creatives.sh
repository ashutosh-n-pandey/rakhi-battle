#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source_dir="$script_dir/creatives"
output_dir="$source_dir/rendered"
mkdir -p "$output_dir"

for variant in a b c; do
  ffmpeg -hide_banner -loglevel error -y \
    -i "$source_dir/creative-$variant.svg" -frames:v 1 "$output_dir/creative-$variant.png"
  ffmpeg -hide_banner -loglevel error -y \
    -loop 1 -i "$output_dir/creative-$variant.png" \
    -vf "scale=1120:1992,crop=1080:1920:x='20+12*sin(t*1.4)':y='36+18*cos(t*1.1)',fps=30,format=yuv420p" \
    -t 6 -c:v libx264 -movflags +faststart "$output_dir/creative-$variant.mp4"
done

echo "Rendered three 1080x1920 PNGs and MP4s in $output_dir"
