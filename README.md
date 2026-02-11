# Jreq — Anforderungstool (MVP)

Monorepo-Struktur für ein leichtgewichtiges Requirements-/Issue-Tracking-Tool.

## Ziele (MVP)
- Projekt → Epic → User Story → Task (Hierarchie, Verknüpfungen)
- Custom-Attribute pro Typ (Text, Zahl, Datum, Auswahl, Multi-Select, Checkbox)
- Workflows (Status, Übergaben, Pflichtfelder)
- Views: Backlog (Liste), Kanban, Hierarchie
- Zusammenarbeit: Kommentare, Anhänge, Mentions, Verlauf
- CSV-Import/Export, REST API, Webhooks

## Tech-Vorschlag
- Backend: TypeScript (NestJS) + PostgreSQL (Prisma)
- Frontend: React + Vite
- Infra: docker-compose (db, app), GitHub Actions CI

## Ordner
- `backend/` — API + Datenmodell
- `frontend/` — Web-UI
- `infra/` — Docker, CI, Skripte

## Setup (dev, Platzhalter)
```
# Postgres starten
docker compose -f infra/docker-compose.yml up -d db

### Full‑Stack (alles als Container)
```
docker compose -f infra/docker-compose.full.yml up -d
# Frontend: http://localhost:8080  |  Backend: http://localhost:3000
```
```

## Lizenz
MIT (vorschlag; änderbar)

