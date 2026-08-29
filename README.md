# MERIDIAN INTELLIGENCE

Módulo conectado e tecnicamente independente do MeridianMRV.

## Escopo inicial
- Voyage Intelligence
- Maritime Intelligence
- European Regulatory Radar
- EU ETS
- FuelEU Maritime
- Green Corridors
- Evidence Vault
- Source Registry
- Futuro: CBAM Intelligence

## Arquitetura
- Frontend: React + TypeScript + Vite
- Backend: FastAPI
- Collectors: Python / Scrapling
- AIS/S-AIS: adapter de provedor licenciado
- Banco: PostgreSQL
- Evidências: S3-compatible
- Frontend: Vercel
- Backend/workers: AWS Europa

Este repositório permanece separado do MeridianMRV Core e integra-se apenas por API, SSO e webhooks autenticados.
