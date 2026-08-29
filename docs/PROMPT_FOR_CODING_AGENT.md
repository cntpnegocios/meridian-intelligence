# PROMPT MESTRE — CODEX / ANTIGRAVITY

Você está desenvolvendo `MERIDIAN-INTELLIGENCE`, um módulo conectado, porém tecnicamente independente, do MeridianMRV.

## Objetivo
Construir um produto institucional de inteligência marítima e regulatória com rastreamento de viagens porto a porto, evidência auditável, EU ETS, FuelEU e Green Corridors.

## Regras obrigatórias
- Não fundir este repositório com MeridianMRV Core.
- Não acessar o banco do Core diretamente.
- Não fabricar dados live.
- Dados demo devem ter badge DEMO.
- Todo dado externo material deve registrar provenance.
- Collectors long-running ficam fora do processo HTTP da API.
- AIS/S-AIS entra por interface de provider.
- Expor timestamp e confiança da última posição.
- Evidência deve preservar source URL, captured_at, SHA-256 e parser version.
- LLM interpreta dados estruturados e nunca substitui a fonte oficial.

## Frontend
React + TypeScript + Vite.

Menu:
- Overview
- Voyage Intelligence
- Maritime Intelligence
- Regulatory Radar
- EU ETS
- FuelEU
- Green Corridors
- Evidence Vault
- Source Registry

## Primeira sprint
1. Criar design system Meridian.
2. Criar app shell e navegação.
3. Criar dashboard institucional.
4. Criar tela Voyage Intelligence.
5. Criar cenário DEMO Santos → Rotterdam.
6. Mostrar last AIS fix, speed, course, ETA, confidence e status como DEMO/UNAVAILABLE.
7. Não conectar provedores reais ainda.
8. Criar cliente `/health` da API.
9. Finalizar com typecheck e build aprovados.

## Segunda sprint
1. FastAPI.
2. PostgreSQL.
3. Modelos Vessel, Voyage, VoyageLeg, AISObservation, PortCall e Evidence.
4. Adapter abstrato `AISProvider`.
5. Source Registry.
6. Evidence Vault.
