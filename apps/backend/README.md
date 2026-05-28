# FastFlow Backend (NestJS)

Base modular com foco em segurança, LGPD, monetização e observabilidade.

## Itens já estruturados
- Estrutura Feature Driven por módulos.
- Prisma inicial com entidades core de auth/usuário/protocolos/sessões.
- Bootstrap Nest com ValidationPipe global.

## Próximas implementações
- Auth JWT + refresh rotativo hashado.
- Endpoints especificados (auth, me, fasting, reminders, subscriptions, privacy).
- Swagger/OpenAPI, logger Pino, OTel, rate limit, helmet e CORS.
