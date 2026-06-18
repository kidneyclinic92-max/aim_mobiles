#!/bin/bash
set -euo pipefail

cd /home/site/wwwroot

# Build should run during deployment (SCM_DO_BUILD_DURING_DEPLOYMENT=true).
# Fallback build if .next is missing after a failed deploy step.
if [ ! -d ".next" ]; then
  echo "No .next folder found — running production build..."
  npm run build
fi

echo "Starting Next.js on port ${PORT:-8080}..."
export PORT="${PORT:-8080}"
exec npm run start
