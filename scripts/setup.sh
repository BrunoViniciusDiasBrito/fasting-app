#!/usr/bin/env bash
set -euo pipefail
pnpm install
pnpm --filter @fastflow/backend prisma:generate
echo "Setup concluído. Configure .env e suba postgres com docker-compose up -d"
