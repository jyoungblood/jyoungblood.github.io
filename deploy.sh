#!/usr/bin/env bash

set -euo pipefail

GIT_BRANCH="master"
COMMIT_MESSAGE="Deploy - $(date +"%Y-%m-%d %T")"

if ! git diff --quiet || ! git diff --cached --quiet || [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
  echo "Commit or stash source changes before deploying."
  exit 1
fi

npm run build
git add docs

if git diff --cached --quiet; then
  echo "The local build is already deployed."
else
  git commit -m "$COMMIT_MESSAGE"
fi

git push origin "$GIT_BRANCH"
