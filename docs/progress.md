# FastFlow — Status de Progresso

> Atualizado em: 2026-05-27

## Progresso geral
- **60% concluído**.
- **40% restante** para chegar ao escopo completo solicitado.

## Concluído
- Monorepo com apps mobile/backend, CI inicial e setup local.
- Estrutura FSD (mobile) e FDD (backend) criada.
- Schema Prisma expandido com entidades de auth, jejum, lembretes, gamificação, planos, assinaturas, compras e LGPD.
- Auth backend com register/login/refresh/logout/forgot/reset (base funcional).
- Refresh token rotativo com hash em sessão e revogação no logout.
- Endpoints de usuário protegidos por JWT: `GET/PATCH/DELETE /me` e `GET /me/export-data`.
- Endpoints de consentimento e privacidade: `GET/POST /privacy/consents`, `PATCH /privacy/consents/:id/revoke`, `POST /privacy/requests/export`, `POST /privacy/requests/delete-account`.
- Base de auth mobile (API + store + schema de login).

## Em andamento (próximo passo)
1. Fluxo completo de jejum (start/finish/current/history) + pontuação.
2. Reminders por hora + mensagens de segurança.
3. Interceptors de erro e refresh token no mobile com TanStack Query retry strategy.

## Próximos marcos
- M4 (80%): Paywall RevenueCat + sincronização assinatura + ads gating.
- M5 (100%): Testes, hardening de segurança, observabilidade e documentação final.
