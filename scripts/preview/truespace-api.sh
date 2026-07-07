#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC1091
. "$(dirname "$0")/truespace-env.sh"

cd "$TRUESPACE_REPO/py/api"

[ -d .venv ] || uv venv
uv pip install -q -e ".[dev]"
.venv/bin/alembic -c local.ini upgrade head

exec .venv/bin/uvicorn app.main:app --reload --host 127.0.0.1 --port "$API_PORT"
