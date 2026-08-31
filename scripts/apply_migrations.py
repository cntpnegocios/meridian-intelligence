import os
import psycopg2

DB_URL = os.getenv("DATABASE_URL")

conn = psycopg2.connect(DB_URL)
conn.autocommit = True
cur = conn.cursor()

with open('database/010_route_calculations.sql', 'r') as f:
    sql_010 = f.read()
try:
    cur.execute(sql_010)
    print('OK 010_route_calculations applied')
except Exception as e:
    print('FAIL 010:', e)

with open('database/012_evidence_v2.sql', 'r') as f:
    sql_012 = f.read()
try:
    cur.execute(sql_012)
    print('OK 012_evidence_v2 applied')
except Exception as e:
    print('FAIL 012:', e)

cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('route_calculations','evidence_proofs') ORDER BY table_name")
tables = [r[0] for r in cur.fetchall()]
print('Tables in DB:', tables)

cur.close()
conn.close()

