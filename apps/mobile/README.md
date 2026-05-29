# FastFlow Mobile (Expo)

## Stack
- Expo + React Native + TypeScript
- Expo Router
- React Hook Form + Zod
- Axios + TanStack Query
- Zustand
- SecureStore/MMKV
- Expo Notifications
- RevenueCat

## Arquitetura
Feature-Sliced Design em `src/`.

## Observação de compatibilidade
Instalar dependências sempre via `npx expo install <pkg>` para respeitar versões do SDK.

## Rotas com Expo Router

A entrada do app é `index.js`, que registra explicitamente o `ExpoRoot` com `require.context('./app')`. Isso garante que o Expo Router escaneie somente a pasta `app/` como árvore de rotas, mantendo `src/` exclusivo para providers, features, serviços e componentes compartilhados.

Se o Metro continuar exibindo uma rota antiga em cache, reinicie o bundler com:

```bash
pnpm --filter @fastflow/mobile dev:clear
```
