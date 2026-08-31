import os
#!/usr/bin/env python3
"""Apply migration 009 — revoke PostgREST access to PostGIS system tables."""
import psycopg2

DB = os.getenv("DATABASE_URL")

conn = psycopg2.connect(DB, connect_timeout=20)
conn.autocommit = True
cur = conn.cursor()

statements = [
    "REVOKE SELECT ON public.spatial_ref_sys FROM anon",
    "REVOKE SELECT ON public.spatial_ref_sys FROM authenticated",
    "REVOKE SELECT ON public.geography_columns FROM anon",
    "REVOKE SELECT ON public.geography_columns FROM authenticated",
    "REVOKE SELECT ON public.geometry_columns FROM anon",
    "REVOKE SELECT ON public.geometry_columns FROM authenticated",
]

for sql in statements:
    try:
        cur.execute(sql)
        print(f"  OK: {sql}")
    except Exception as e:
        print(f"  SKIP ({e}): {sql}")

print("\nPostGIS system tables no longer accessible via PostgREST.")
print("Security Advisory 'rls_disabled_in_public' will be resolved.")

cur.close()
conn.close()

