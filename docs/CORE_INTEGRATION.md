# Meridian Core Integration

Endpoints propostos no Core:

- `POST /api/integrations/intelligence/launch`
- `GET /api/integrations/intelligence/summary/:projectId`
- `POST /api/integrations/intelligence/webhook`

## SSO
MVP: token assinado de uso único emitido pelo Meridian Core e trocado server-to-server.

O Meridian Intelligence mantém sessão própria e não recebe `service_role` do Core.
