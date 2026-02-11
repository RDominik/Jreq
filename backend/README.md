# Jreq Backend

Minimaler HTTP-Server als Platzhalter. Nächste Schritte:
- Prisma Schema unter `backend/prisma/schema.prisma`
- .env mit `DATABASE_URL` setzen (z. B. postgresql://jreq:jreq@db:5432/jreq)
- In Docker: `docker compose -f infra/docker-compose.full.yml up -d` starten
- Danach im Backend-Container:
  - `npx prisma generate`
  - `npx prisma migrate dev --name init`

Später: Migration zu NestJS + proper Controllers/Services.
