# FastFlow Backend (NestJS)

Base modular com foco em segurança, LGPD, monetização e observabilidade.

## Stack
- NestJS + TypeScript
- Prisma 7 + PostgreSQL
- JWT access token + refresh token hashado
- Argon2 para senha

## Setup local

1. Configure `.env` na raiz do repositório ou em `apps/backend/.env`.
2. Suba o banco local:

```bash
docker compose up -d postgres
```

3. Gere client, crie/sincronize tabelas e rode o seed completo:

```bash
pnpm --filter @fastflow/backend db:setup
```

> Observação: o seed popula dados iniciais. Quem cria as tabelas é `prisma db push` (ou migrations em produção).

## Dados criados pelo seed
- Planos: `FREE`, `REMOVE_ADS`, `PROFICIENT`, `PERFORMANCE`.
- Conteúdos educativos básicos e premium.
- Usuário demo com protocolo, sessão finalizada, lembrete, consentimentos, assinatura, compra, request de privacidade e audit log.

Credenciais demo:
- E-mail: `demo@fastflow.app`
- Senha: `FastFlow@123`

## Itens implementados
- Estrutura Feature Driven por módulos.
- Prisma com entidades core de auth/usuário/protocolos/sessões/monetização/LGPD.
- Bootstrap Nest com ValidationPipe global.
