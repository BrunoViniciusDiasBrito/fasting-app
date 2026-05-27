# FastFlow — Status de Progresso

> Atualizado em: 2026-05-27

## Progresso geral
- **40% concluído**.
- **60% restante** para chegar ao escopo completo solicitado.

## Concluído
- Monorepo com apps mobile/backend, CI inicial e setup local.
- Estrutura FSD (mobile) e FDD (backend) criada.
- Schema Prisma expandido com entidades de auth, jejum, lembretes, gamificação, planos, assinaturas, compras e LGPD.
- Auth backend com register/login/refresh/logout/forgot/reset (base funcional).
- Refresh token rotativo com hash em sessão e revogação no logout.
- Base de auth mobile (API + store + schema de login).

## Em andamento (próximo passo)
1. Implementar `/me` (GET/PATCH/DELETE) com guard JWT.
2. Implementar consentimentos e requests de privacidade (export/delete-account).
3. Fluxo completo de jejum (start/finish/current/history) + pontuação.

## Próximos marcos
- M3 (60%): Fluxo de jejum + gamificação + lembretes horários.
- M4 (80%): Paywall RevenueCat + sincronização assinatura + ads gating.
- M5 (100%): Testes, hardening de segurança, observabilidade e documentação final.
