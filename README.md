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

# Full‑Stack (alles als Container)
docker compose -f infra/docker-compose.full.yml up -d
# Frontend: http://localhost:8080  |  Backend: http://localhost:3000
```

---

## Docker (Production‑like) – Schnellstart

Services und Ports:
- DB: Postgres 16 (5432)
- Backend: Node/Express (3000)
- Frontend: Static HTML via Node (8082; 8080 ist ggf. belegt)

Bauen & Starten:
```
# aus dem Repo‑Root
docker compose -f Jreq/docker-compose.prod.yml up -d --build
```

Gesundheitschecks (manuell):
```
curl -fsS http://localhost:3000/health   # → {"status":"ok","service":"jreq-backend"}
curl -fsS http://localhost:8082/health   # → {"ok":true}
```

Logs & Status:
```
# Status
docker compose -f Jreq/docker-compose.prod.yml ps

# Logs (follow)
docker compose -f Jreq/docker-compose.prod.yml logs -f backend
docker compose -f Jreq/docker-compose.prod.yml logs -f frontend

docker compose -f Jreq/docker-compose.prod.yml logs -f db
```

Neu bauen nach Code‑Änderungen:
```
docker compose -f Jreq/docker-compose.prod.yml build
docker compose -f Jreq/docker-compose.prod.yml up -d
```

Stoppen/Entfernen:
```
docker compose -f Jreq/docker-compose.prod.yml down
```

Hinweise:
- Ports können angepasst werden (z. B. Frontend 8082→8080), sofern nicht durch andere Dienste belegt.
- Eine echte DB‑Anbindung (DATABASE_URL) ist vorbereitet; aktuell arbeitet das Backend (MVP) mit In‑Memory‑Daten.

## Lizenz
MIT (vorschlag; änderbar)

## Aktueller Status
- Backend: /health, /api/hello, /api/schema erreichbar
- Frontend: UI‑Shell als Placeholder
- Nächster Schritt: NestJS/Prisma + React/Vite Scaffold
