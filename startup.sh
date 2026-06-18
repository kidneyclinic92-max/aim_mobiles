#!/bin/bash
set -euo pipefail

cd /home/site/wwwroot

# Ensure devDependencies exist for Next.js/Tailwind production builds on Azure.
if [ ! -d "node_modules/next" ]; then
  echo "Installing dependencies..."
  npm install --include=dev
elif [ ! -d "node_modules/typescript" ]; then
  echo "Installing dev dependencies for build..."
  npm install --include=dev
fi

# Build should normally run during deployment (SCM_DO_BUILD_DURING_DEPLOYMENT=true).
if [ ! -d ".next" ]; then
  echo "No .next folder found — running production build..."
  node scripts/build.js
fi

echo "Starting Next.js on port ${PORT:-8080}..."
export PORT="${PORT:-8080}"
exec node scripts/start.js
