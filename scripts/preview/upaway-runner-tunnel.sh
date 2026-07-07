#!/usr/bin/env bash
set -euo pipefail

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "cloudflared is required for this helper." >&2
  exit 1
fi

if ! command -v openssl >/dev/null 2>&1; then
  echo "openssl is required to generate preview secrets." >&2
  exit 1
fi

export PREVIEW_RUNNER_HOST="${PREVIEW_RUNNER_HOST:-localhost}"
export PREVIEW_RUNNER_PORT="${PREVIEW_RUNNER_PORT:-5173}"
export PREVIEW_TARGET_HOST="${PREVIEW_TARGET_HOST:-localhost}"
export PREVIEW_TARGET_PORT="${PREVIEW_TARGET_PORT:-3000}"
export PREVIEW_PROJECT_SLUG="${PREVIEW_PROJECT_SLUG:-truespace-v2}"
export PREVIEW_RUNNER_TOKEN="${PREVIEW_RUNNER_TOKEN:-$(openssl rand -hex 24)}"
export PREVIEW_ACCESS_CODE="${PREVIEW_ACCESS_CODE:-$(openssl rand -hex 8)}"

runner_pid=""
runner_tunnel_pid=""
target_tunnel_pid=""
runner_tunnel_log="$(mktemp)"
target_tunnel_log="$(mktemp)"

cleanup() {
  if [ -n "$runner_pid" ]; then
    kill "$runner_pid" >/dev/null 2>&1 || true
  fi
  if [ -n "$runner_tunnel_pid" ]; then
    kill "$runner_tunnel_pid" >/dev/null 2>&1 || true
  fi
  if [ -n "$target_tunnel_pid" ]; then
    kill "$target_tunnel_pid" >/dev/null 2>&1 || true
  fi
  rm -f "$runner_tunnel_log" "$target_tunnel_log"
}
trap cleanup EXIT INT TERM

wait_for_tunnel_url() {
  local log_path="$1"
  local label="$2"
  local url=""

  for _ in $(seq 1 120); do
    url="$(grep -Eo 'https://[-a-zA-Z0-9]+\.trycloudflare\.com' "$log_path" | head -n 1 || true)"

    if [ -n "$url" ]; then
      printf '%s' "$url"
      return 0
    fi

    sleep 0.5
  done

  echo "Timed out waiting for ${label} tunnel URL." >&2
  echo "--- ${label} tunnel log ---" >&2
  cat "$log_path" >&2
  return 1
}

cloudflared tunnel --url "http://${PREVIEW_TARGET_HOST}:${PREVIEW_TARGET_PORT}" >"$target_tunnel_log" 2>&1 &
target_tunnel_pid=$!
target_url="$(wait_for_tunnel_url "$target_tunnel_log" "target")"
target_hostname="$(TARGET_URL="$target_url" node -e 'console.log(new URL(process.env.TARGET_URL).hostname)')"

export TRUESPACE_VITE_ALLOWED_HOSTS="${TRUESPACE_VITE_ALLOWED_HOSTS:-$target_hostname}"
export VITE_PREVIEW_TRUESPACE_LOCAL_URL="${VITE_PREVIEW_TRUESPACE_LOCAL_URL:-$target_url}"

scripts/preview/upaway-runner-host.sh &
runner_pid=$!

until curl -fsS "http://${PREVIEW_RUNNER_HOST}:${PREVIEW_RUNNER_PORT}/preview" >/dev/null 2>&1; do
  sleep 0.5
done

echo "Runner host is ready on http://${PREVIEW_RUNNER_HOST}:${PREVIEW_RUNNER_PORT}" >&2

cloudflared tunnel --url "http://${PREVIEW_RUNNER_HOST}:${PREVIEW_RUNNER_PORT}" >"$runner_tunnel_log" 2>&1 &
runner_tunnel_pid=$!
runner_url="$(wait_for_tunnel_url "$runner_tunnel_log" "runner")"
preview_url="$(
  RUNNER_URL="$runner_url" SLUG="$PREVIEW_PROJECT_SLUG" node -e '
    const params = new URLSearchParams({
      runner: process.env.RUNNER_URL
    });
    console.log(`https://www.upaway.dev/preview/${process.env.SLUG}?${params}`);
  '
)"

cat <<EOF

Runner API tunnel:
${runner_url}

Preview link:
${preview_url}

Access code:
${PREVIEW_ACCESS_CODE}

The target tunnel is intentionally kept out of the preview link.
Keep this process running while you use the preview link.
EOF

wait "$runner_tunnel_pid" "$target_tunnel_pid"
