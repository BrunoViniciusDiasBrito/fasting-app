# Endpoints Planejados (MVP)

## Auth
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout
- POST /auth/forgot-password
- POST /auth/reset-password

## Users
- GET /me
- PATCH /me
- DELETE /me
- GET /me/export-data

## Fasting Protocols
- POST /fasting-protocols
- GET /fasting-protocols
- GET /fasting-protocols/:id
- PATCH /fasting-protocols/:id
- DELETE /fasting-protocols/:id

## Fasting Sessions
- POST /fasting-sessions/start
- POST /fasting-sessions/:id/finish
- GET /fasting-sessions/current
- GET /fasting-sessions/history
- GET /fasting-sessions/:id

## Gamification
- GET /gamification/profile
- GET /gamification/progress
- POST /gamification/recalculate

## Instructions
- GET /instructions
- GET /instructions/:slug

## Reminders
- POST /reminders
- GET /reminders
- PATCH /reminders/:id
- DELETE /reminders/:id

## Subscriptions / Paywall
- GET /subscriptions/status
- POST /subscriptions/sync
- POST /subscriptions/revenuecat/webhook
- GET /subscriptions/entitlements
- POST /purchases/restore

## Consent / Privacy
- GET /privacy/consents
- POST /privacy/consents
- PATCH /privacy/consents/:id/revoke
- POST /privacy/requests/export
- POST /privacy/requests/delete-account

## Health
- GET /health
- GET /health/db
