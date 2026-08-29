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
```

O Meridian Core continua dono de usuários, organizações, projetos, permissões, assinaturas e billing.

O Meridian Intelligence é dono de navios, viagens, voyage legs, port calls, observações AIS, fontes regulatórias, evidências, assessments EU ETS/FuelEU e inteligência de corredores.

## Regra estrutural
Não compartilhar banco de dados. Usar IDs externos estáveis e contratos autenticados.
