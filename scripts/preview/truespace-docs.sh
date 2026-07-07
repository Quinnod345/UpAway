#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC1091
. "$(dirname "$0")/truespace-env.sh"

cd "$TRUESPACE_REPO/docs"
[ -d .venv ] || uv sync

.venv/bin/zensical build
exec .venv/bin/zensical serve --dev-addr "127.0.0.1:${DOCS_PORT}"
