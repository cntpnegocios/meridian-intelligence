import psycopg2
DB = "postgresql://postgres:postgres@localhost:5432/meridian_intelligence"
try:
    conn = psycopg2.connect(DB)
    cur = conn.cursor()
    cur.execute("SELECT version()")
    print("DB OK:", cur.fetchone()[0][:50])
    cur.execute("SELECT COUNT(*) FROM ports")
    print("existing ports rows:", cur.fetchone()[0])
    conn.close()
    print("STATUS: connected")
except Exception as e:
    print("DB ERROR:", e)
