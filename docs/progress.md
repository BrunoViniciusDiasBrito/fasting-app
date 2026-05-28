# FastFlow — Status de Progresso

> Atualizado em: 2026-05-28

## Progresso geral
- **85% concluído**.
- **15% restante** para chegar ao escopo completo solicitado.

## Concluído
- Monorepo com apps mobile/backend, CI inicial e setup local.
- Estrutura FSD (mobile) e FDD (backend) criada.
- Schema Prisma expandido com entidades de auth, jejum, lembretes, gamificação, planos, assinaturas, compras e LGPD.
- Auth backend com register/login/refresh/logout/forgot/reset (base funcional).
- Refresh token rotativo com hash em sessão e revogação no logout.
- Endpoints de usuário protegidos por JWT: `GET/PATCH/DELETE /me` e `GET /me/export-data`.
- Endpoints de consentimento e privacidade.
- Fluxo principal de jejum implementado: protocolos e sessões.
- Endpoints de reminders (`POST/GET/PATCH/DELETE /reminders`).
- Interceptors mobile com attach de bearer token + refresh automático em 401.

## Em andamento (próximo passo)
1. Paywall RevenueCat + sincronização de assinatura + ads gating.
2. Testes unit/e2e backend e testes mobile (hooks/componentes).
3. Hardening final (rate limit por rota crítica, logs/auditoria ampliados, observabilidade).
