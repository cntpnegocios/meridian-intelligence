# Data Governance

Todo datapoint material deve ser classificado como:

- MEASURED
- REPORTED
- VERIFIED
- ESTIMATED
- INFERRED
- STALE
- UNAVAILABLE

Toda evidência deve suportar:
- evidence_id
- authority
- source_url
- captured_at_utc
- raw_object_key
- sha256
- parser_name
- parser_version
- extraction_method
- confidence
- human_validation_status

Nunca substituir indisponibilidade por valores simulados em produção.
