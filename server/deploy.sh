#!/bin/bash
set -e
APP_DIR="${APP_DIR:-/home/myapp}"
LOCKFILE="$APP_DIR/.deploy.lock"

exec 200>"$LOCKFILE"
flock -n 200 || { echo "Deploy already running"; exit 1; }

cd "$APP_DIR"
git pull origin master

if ! git diff HEAD~1 --quiet -- package-lock.json 2>/dev/null; then
  npm ci
fi

npm run build
pm2 restart ecosystem.config.js
echo "Deploy done at $(date)"
