# PHASE 0 — REPOSITORY BASELINE

## Repository Identity
- **Git Branch:** `master`
- **Commit Hash:** `f2c57d6` (Sprint 4: Spire API Adapter Skeleton & Dependencies)
- **Working Tree Status:** 1 modification (`services/api/app/api/endpoints/evidence.py`), 1 untracked (`services/api/app/adapters/copernicus_provider.py`).

## Environment
- **OS:** Windows
- **Node.js:** v25.9.0
- **npm:** 11.12.1
- **Python:** 3.14.4

## Tech Stack
- **Frontend Framework:** React + TypeScript + Vite (App Shell + Tailwind CSS v4)
- **Backend Framework:** FastAPI (Python)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy (with Pydantic for validation)
- **Mapping Engine:** MapLibre-GL + Deck.gl (@deck.gl/react)

## Quality Checks
- `npm run lint` / `typecheck`: Scripts not configured in `apps/web/package.json` yet. Build passes implicitly during dev.
- Backend Syntax: Validated successfully via `py_compile`.

## Current Scope
The repository `MERIDIANMRV-meridian-intelligence-starter` is an independent module intended strictly for **Meridian Intelligence**. It isolates analytical capabilities from the authoritative **MeridianMRV Core**.
