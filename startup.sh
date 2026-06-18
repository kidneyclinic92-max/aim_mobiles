#!/bin/bash
set -euo pipefail

cd /home/site/wwwroot

echo "=== Aim Mobiles startup ==="
echo "Working directory: $(pwd)"

has_build() {
  [ -f ".next/BUILD_ID" ]
}

# Ensure dependencies exist.
if [ ! -d "node_modules/next" ]; then
  echo "Installing dependencies..."
  npm ci --include=dev 2>/dev/null || npm install --include=dev
fi

# Build if missing or incomplete (empty .next folder is treated as no build).
if ! has_build; then
  echo "No valid production build found — running webpack build..."
  rm -rf .next
  node scripts/build.js
fi

if ! has_build; then
  echo "ERROR: Production build failed — .next/BUILD_ID still missing."
  exit 1
fi

echo "Production build ready: $(cat .next/BUILD_ID)"
echo "Starting Next.js on port ${PORT:-8080}..."
export PORT="${PORT:-8080}"
export NODE_ENV=production
exec node scripts/start.js
