#!/usr/bin/env bash
set -euo pipefail

if [ -z "${PREVIEW_RUNNER_TOKEN:-}" ]; then
  echo "Set PREVIEW_RUNNER_TOKEN before exposing the preview runner." >&2
  exit 1
fi

export PREVIEW_RUNNER_ENABLED=true
export PREVIEW_RUNNER_LOG_DIR="${PREVIEW_RUNNER_LOG_DIR:-$(pwd)/.preview-runner}"

exec pnpm dev --host "${PREVIEW_RUNNER_HOST:-localhost}" --port "${PREVIEW_RUNNER_PORT:-5173}"
