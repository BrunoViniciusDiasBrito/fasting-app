# FastFlow Monorepo (Base Structure)

## Visão geral
Este repositório inicializa a base de um produto **production-ready** para o app FastFlow, com:
- `apps/mobile`: Expo + React Native + TypeScript + Expo Router (Feature-Sliced Design).
- `apps/backend`: NestJS + Prisma + PostgreSQL (Feature Driven Design).
- Padrões de segurança, LGPD, monetização e observabilidade definidos desde o início.

## Decisões técnicas principais (antes da geração dos arquivos)

1. **Monorepo com workspaces (`pnpm`)**
   - Facilita versionamento conjunto de mobile/backend.
   - Permite compartilhar tipagens, contratos e utilitários no futuro.

2. **Mobile em Expo + TypeScript + Expo Router**
   - Acelera build distribuível para iOS/Android com EAS.
   - Compatibilidade controlada via `expo install` reduz risco de conflitos de SDK.

3. **Feature-Sliced Design no mobile**
   - Separa responsabilidades por domínio (entities/features/widgets/screens/shared).
   - Melhora escalabilidade do time e testabilidade.

4. **Backend NestJS modular + Prisma/PostgreSQL**
   - Estrutura orientada a domínio/módulos, com DTO, service, repository, mapper e testes.
   - PostgreSQL priorizado por integridade transacional, auditoria e LGPD.

5. **Segurança por padrão**
   - JWT access curto + refresh rotativo hashado.
   - Helmet, rate-limit, validation pipe, CORS restrito e logs sem dados sensíveis.

6. **LGPD desde o MVP**
   - Registro/versionamento de consentimento, revogação, exportação e exclusão de conta.
   - Política/termos versionados e segregação de consentimentos obrigatórios/opcionais.

7. **Monetização com RevenueCat + AdMob**
   - Entitlements centralizados e sincronização de plano no app/backend.
   - Compra única para remover ads separada de assinatura premium.

8. **Observabilidade e confiabilidade**
   - OpenTelemetry + logs estruturados + health checks no backend.
   - Error boundary + analytics consentido + estados offline/retry no mobile.

## Estrutura

```text
apps/
  mobile/
  backend/
```

Detalhes completos nos READMEs internos.

## Como começar

```bash
pnpm install
pnpm setup
pnpm dev
```

## Ambientes
- development
- staging
- production

## Próximos passos
- Implementar fluxos de auth, fasting sessions, reminders, gamification e subscriptions.
- Integrar RevenueCat (mobile+backend webhook) e AdMob com feature flags.
- Completar suíte de testes unit/integration/e2e e CI.
