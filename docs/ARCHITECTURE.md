# Arquitetura

```text
MERIDIANMRV CORE
    |
    | SSO / API / WEBHOOK
    v
MERIDIAN INTELLIGENCE
    |
    +-- Web
    +-- API
    +-- Collector Workers
    +-- Evidence Vault
    +-- Voyage Intelligence
    +-- Maritime Intelligence
    +-- Regulatory Radar
    +-- EU ETS
    +-- FuelEU
    +-- Green Corridors
    +-- Legal & API Portals
    +-- A11y System (SVG Filters & CSS)
    +-- EU MRV Official Reporting

O Meridian Core continua dono de usuários, organizações, projetos, permissões, assinaturas e billing.

O Meridian Intelligence é dono de navios, viagens, voyage legs, port calls (com Port Autocomplete in-memory), observações AIS, fontes regulatórias, evidências, assessments EU ETS/FuelEU e inteligência de corredores. O ecossistema legal e portais de API replicam o framework regulatório (GDPR, Security) globalmente e documentam os end-points de integração.

## Regra estrutural
Não compartilhar banco de dados. Usar IDs externos estáveis e contratos autenticados.
A11y (Acessibilidade) é implementada nativamente via SVG filters injetados em `document.documentElement` no nível raiz, evitando complexidades na árvore React.

## Estratégia de Integração Greensee AI
O Meridian delega a inteligência preditiva de física e clima (tempo, ondas, consumo futuro) para a **Greensee AI**. O Meridian assume as responsabilidades de Geofencing, Conformidade MRV oficial e operações financeiras (FinOps de emissões). O módulo Pace-X consolida essa telemetria.
