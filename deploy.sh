#!/bin/bash
# Auto-deploy lotr-marathon when new commits are detected on main.
# Mirrors the weerklank-viewer pattern: static files, no build step.
REPO_DIR="/home/rolf/git/lotr-marathon"
WEB_DIR="/var/www/lotr.rolf.bible/html"
LOG_FILE="/home/rolf/git/lotr-marathon/deploy.log"
CHANGES=$(mktemp)

cd "$REPO_DIR" || exit 1

git fetch origin main --quiet 2>&1

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "$(date): New commits detected ($LOCAL -> $REMOTE), pulling..." >> "$LOG_FILE"
    if ! git pull origin main --quiet >> "$LOG_FILE" 2>&1; then
        echo "$(date): git pull failed!" >> "$LOG_FILE"
        exit 1
    fi
fi

# Always rsync, even when git had nothing to pull. Commits made *on this
# machine* leave local == origin, so a pull-gated deploy would silently never
# update the web root. rsync only copies what actually differs, so running it
# every 5 minutes is cheap, and it self-heals if the web root drifts.
if ! rsync -ac --delete --itemize-changes \
      --exclude '.git' \
      --exclude '.gitignore' \
      --exclude 'deploy.sh' \
      --exclude 'deploy.log' \
      --exclude 'README.md' \
      --exclude '_s_*.html' \
      "$REPO_DIR/" "$WEB_DIR/" > "$CHANGES" 2>&1; then
    echo "$(date): rsync failed!" >> "$LOG_FILE"
    rm -f "$CHANGES"
    exit 1
fi

# Only log when something actually moved, so the log stays readable instead of
# gaining an entry every 5 minutes forever.
if [ -s "$CHANGES" ]; then
    echo "$(date): Deployed $(wc -l < "$CHANGES") changed file(s):" >> "$LOG_FILE"
    sed 's/^/  /' "$CHANGES" >> "$LOG_FILE"
fi
rm -f "$CHANGES"
