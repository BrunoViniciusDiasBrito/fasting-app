# FastFlow — Status de Progresso

> Atualizado em: 2026-05-27

## Progresso geral
- **30% concluído**.
- **70% restante** para chegar ao escopo completo solicitado.

## Concluído
- Monorepo com apps mobile/backend, CI inicial e setup local.
- Estrutura FSD (mobile) e FDD (backend) criada.
- Schema Prisma expandido com entidades de auth, jejum, lembretes, gamificação, planos, assinaturas, compras e LGPD.
- Base de autenticação backend com DTOs, controller, service, repository, hash de senha (Argon2), emissão de JWT e persistência de sessão.
- Base de auth mobile (API + store + schema de login).

## Em andamento (próximo passo)
1. Implementar refresh token rotativo real e logout revogando sessão.
2. Adicionar `/auth/forgot-password` e `/auth/reset-password`.
3. Implementar `GET/PATCH/DELETE /me` e exportação de dados LGPD.

## Próximos marcos
- M2 (45%): Auth completo + Me + consentimento básico.
- M3 (65%): Fluxo de jejum completo + pontuação + lembretes horários.
- M4 (85%): Paywall RevenueCat + sincronização assinatura + ads gating.
- M5 (100%): Testes, hardening de segurança, observabilidade e documentação final.
