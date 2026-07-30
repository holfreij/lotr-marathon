#!/bin/bash
# Auto-deploy lotr-marathon when new commits are detected on main.
# Mirrors the weerklank-viewer pattern: static files, no build step.
REPO_DIR="/home/rolf/git/lotr-marathon"
WEB_DIR="/var/www/lotr.rolf.bible/html"
LOG_FILE="/home/rolf/git/lotr-marathon/deploy.log"

cd "$REPO_DIR" || exit 1

git fetch origin main --quiet 2>&1

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    exit 0
fi

echo "$(date): New commits detected ($LOCAL -> $REMOTE), deploying..." >> "$LOG_FILE"

if ! git pull origin main --quiet >> "$LOG_FILE" 2>&1; then
    echo "$(date): git pull failed!" >> "$LOG_FILE"
    exit 1
fi

# Copy the site, leaving repo/dev cruft behind.
if rsync -a --delete \
      --exclude '.git' \
      --exclude '.gitignore' \
      --exclude 'deploy.sh' \
      --exclude 'deploy.log' \
      --exclude 'README.md' \
      --exclude '_s_*.html' \
      "$REPO_DIR/" "$WEB_DIR/"; then
    echo "$(date): Deploy successful" >> "$LOG_FILE"
else
    echo "$(date): Deploy failed!" >> "$LOG_FILE"
    exit 1
fi
