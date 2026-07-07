#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC1091
. "$(dirname "$0")/truespace-env.sh"

docker start truespace-pgsql 2>/dev/null || docker run -d \
  --name truespace-pgsql \
  -p 5432:5432 \
  -e POSTGRES_DB=truespace \
  -e POSTGRES_PASSWORD=thelocalpostgresqlpassword \
  -v truespace-pgsql-data:/var/lib/postgresql \
  postgres:18.3-bookworm

until docker exec truespace-pgsql pg_isready -U postgres -d truespace >/dev/null 2>&1; do
  sleep 0.3
done

docker exec truespace-pgsql psql -U postgres -tAc \
  "SELECT 1 FROM pg_database WHERE datname='${TS_DB_NAME}'" | grep -q 1 || \
  docker exec truespace-pgsql createdb -U postgres "${TS_DB_NAME}"
