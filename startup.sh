#!/bin/bash
set -euo pipefail

cd /home/site/wwwroot

echo "=== Aim Mobiles startup ==="
echo "Working directory: $(pwd)"

# Ensure dependencies exist (GitHub Actions artifact should include node_modules + .next).
if [ ! -d "node_modules/next" ]; then
  echo "Installing dependencies..."
  npm ci --include=dev || npm install --include=dev
fi

if [ ! -d ".next" ]; then
  echo "No .next folder — running webpack production build..."
  node scripts/build.js
else
  echo ".next folder found — skipping build."
fi

echo "Starting Next.js on port ${PORT:-8080}..."
export PORT="${PORT:-8080}"
export NODE_ENV=production
exec node scripts/start.js
