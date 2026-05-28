# FastFlow — Status de Progresso

> Atualizado em: 2026-05-27

## Progresso geral
- **75% concluído**.
- **25% restante** para chegar ao escopo completo solicitado.

## Concluído
- Monorepo com apps mobile/backend, CI inicial e setup local.
- Estrutura FSD (mobile) e FDD (backend) criada.
- Schema Prisma expandido com entidades de auth, jejum, lembretes, gamificação, planos, assinaturas, compras e LGPD.
- Auth backend com register/login/refresh/logout/forgot/reset (base funcional).
- Refresh token rotativo com hash em sessão e revogação no logout.
- Endpoints de usuário protegidos por JWT: `GET/PATCH/DELETE /me` e `GET /me/export-data`.
- Endpoints de consentimento e privacidade.
- Fluxo principal de jejum implementado: protocolos (create/list), sessão de jejum (start/finish/current/history) e cálculo de pontos por hora com limite diário.

## Em andamento (próximo passo)
1. Reminders por hora + mensagens de segurança + notificações.
2. Paywall RevenueCat + sincronização de assinatura + ads gating.
3. Interceptors de erro/refresh no mobile + testes unit/e2e.

## Próximos marcos
- M4 (90%): Paywall + ads + reminders.
- M5 (100%): Testes, hardening segurança, observabilidade, documentação final.
