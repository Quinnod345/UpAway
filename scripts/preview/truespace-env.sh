#!/usr/bin/env bash
set -euo pipefail

export TRUESPACE_REPO="${TRUESPACE_REPO:-/Users/quinnodonnell/truespace-v2}"

cd "$TRUESPACE_REPO"

if [ -f dev.env ]; then
  set -a
  # shellcheck disable=SC1091
  . ./dev.env
  set +a
fi

export WT_OFFSET="${WT_OFFSET:-0}"
export API_PORT="${API_PORT:-$((7777 + WT_OFFSET))}"
export WEB_PORT="${WEB_PORT:-$((3000 + WT_OFFSET))}"
export DOCS_PORT="${DOCS_PORT:-$((8888 + WT_OFFSET))}"

if [ "$WT_OFFSET" -eq 0 ]; then
  export TS_DB_NAME="${TS_DB_NAME:-truespace}"
else
  export TS_DB_NAME="${TS_DB_NAME:-truespace_w${WT_OFFSET}}"
fi

export pgsql_database_uri="${pgsql_database_uri:-postgresql+asyncpg://postgres:thelocalpostgresqlpassword@localhost:5432/${TS_DB_NAME}}"
export DATABASE_URL="${DATABASE_URL:-$pgsql_database_uri}"
export API_URL="${API_URL:-http://localhost:${API_PORT}}"
export VITE_API_BASE_URL="${VITE_API_BASE_URL:-${API_URL}/v1}"
export APP_URL="${APP_URL:-http://localhost:${WEB_PORT}}"
export VITE_APP_URL="${VITE_APP_URL:-$APP_URL}"
export BETTER_AUTH_URL="${BETTER_AUTH_URL:-$APP_URL}"

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
fi
