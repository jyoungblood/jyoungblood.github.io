#!/usr/bin/env bash

set -euo pipefail

GIT_BRANCH="master"
COMMIT_MESSAGE="Deploy - $(date +"%Y-%m-%d %T")"

# Build locally with the token from .env before publishing anything.
npm run build

# Preserve the original workflow: commit and push pending source changes.
if [[ -n "$(git status --porcelain --untracked-files=normal)" ]]; then
  if [[ -t 0 ]]; then
    read -r -p "Commit message (default: $COMMIT_MESSAGE): " NEW_MESSAGE
    [[ -n "$NEW_MESSAGE" ]] && COMMIT_MESSAGE="$NEW_MESSAGE"
  fi

  git add --all
  git commit -m "$COMMIT_MESSAGE"
fi

git push origin "$GIT_BRANCH"

# Publish only the generated site to the root of the gh-pages branch.
./node_modules/.bin/gh-pages \
  --dist dist \
  --nojekyll \
  --message "$COMMIT_MESSAGE"
