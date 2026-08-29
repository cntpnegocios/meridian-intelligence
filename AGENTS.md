# Meridian Intelligence - Agent Rules

1. Este repositório é separado do MeridianMRV Core.
2. Nunca acessar diretamente o banco do MeridianMRV Core.
3. Integração apenas por APIs autenticadas, SSO e webhooks.
4. Nunca fabricar dados live AIS, emissões, EUA, FuelEU ou dados regulatórios.
5. Fixtures de demonstração devem estar marcadas como DEMO.
6. Preservar source URL, timestamp UTC, hash SHA-256, parser version e confidence.
7. LLM interpreta evidência; LLM não é a fonte da evidência.
8. Browser automation e collectors devem rodar em workers isolados.
9. AIS/S-AIS entra por adapter de provedor licenciado.
10. Distinguir LIVE, DEMO, STALE e UNAVAILABLE.
