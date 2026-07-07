#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC1091
. "$(dirname "$0")/truespace-env.sh"

cd "$TRUESPACE_REPO/ts"
[ -d node_modules ] || pnpm install

exec pnpm --filter truespace storybook
