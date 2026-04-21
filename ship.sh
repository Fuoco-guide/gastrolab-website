#!/bin/bash
# ship.sh — deploy The Gastro Lab to GitHub Pages
set -e

echo "The Gastro Lab — Deploy"
echo "========================"

# Init git if needed
if [ ! -d ".git" ]; then
  echo "Initialising git repository…"
  git init
  git checkout -b main 2>/dev/null || true
fi

# Stage & commit
git add -A
if git diff --staged --quiet; then
  echo "Nothing new to commit."
else
  MSG="Deploy: $(date '+%Y-%m-%d %H:%M')"
  git commit -m "$MSG"
  echo "Committed: $MSG"
fi

# Check for remote
if ! git remote get-url origin &>/dev/null; then
  echo ""
  echo "No remote configured yet. Add one with:"
  echo "  git remote add origin https://github.com/YOUR_USERNAME/gastrolab-website.git"
  echo "Then run ./ship.sh again."
  echo ""
  echo "After pushing, enable Pages at:"
  echo "  Repo Settings → Pages → Branch: main → / (root) → Save"
  exit 0
fi

# Push
git push -u origin main
echo ""
echo "✓ Pushed. GitHub Pages will update in ~30 seconds."
echo "  Settings → Pages → Branch: main → / (root) → Save (first time only)"
