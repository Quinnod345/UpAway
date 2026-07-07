#!/usr/bin/env bash
set -euo pipefail

if [ -z "${PREVIEW_RUNNER_TOKEN:-}" ]; then
  echo "Set PREVIEW_RUNNER_TOKEN before exposing the preview runner." >&2
  exit 1
fi

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "cloudflared is required for this helper." >&2
  exit 1
fi

export PREVIEW_RUNNER_HOST="${PREVIEW_RUNNER_HOST:-localhost}"
export PREVIEW_RUNNER_PORT="${PREVIEW_RUNNER_PORT:-5173}"

scripts/preview/upaway-runner-host.sh &
runner_pid=$!

cleanup() {
  kill "$runner_pid" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

until curl -fsS "http://${PREVIEW_RUNNER_HOST}:${PREVIEW_RUNNER_PORT}/preview" >/dev/null 2>&1; do
  sleep 0.5
done

echo "Runner host is ready on http://${PREVIEW_RUNNER_HOST}:${PREVIEW_RUNNER_PORT}" >&2
echo "Use the cloudflared URL as PREVIEW_REMOTE_RUNNER_URL on the public UpAway deployment." >&2

cloudflared tunnel --url "http://${PREVIEW_RUNNER_HOST}:${PREVIEW_RUNNER_PORT}"
