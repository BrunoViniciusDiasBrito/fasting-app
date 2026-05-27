# FastFlow Monorepo (Base Structure)

## Status de progresso
- **20% concluído**
- **80% restante**
- Detalhe em `docs/progress.md`.

## Visão geral
Este repositório inicializa a base de um produto **production-ready** para o app FastFlow, com:
- `apps/mobile`: Expo + React Native + TypeScript + Expo Router (Feature-Sliced Design).
- `apps/backend`: NestJS + Prisma + PostgreSQL (Feature Driven Design).
- Padrões de segurança, LGPD, monetização e observabilidade definidos desde o início.

## Decisões técnicas principais

1. **Monorepo com workspaces (`pnpm`)**.
2. **Mobile em Expo + TypeScript + Expo Router**.
3. **Feature-Sliced Design no mobile**.
4. **Backend NestJS modular + Prisma/PostgreSQL**.
5. **Segurança por padrão**.
6. **LGPD desde o MVP**.
7. **Monetização com RevenueCat + AdMob**.
8. **Observabilidade e confiabilidade**.

## Estrutura

```text
apps/
  mobile/
  backend/
```

## Como começar

```bash
pnpm install
pnpm setup
pnpm dev
```
