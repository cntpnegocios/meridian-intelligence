import os
import psycopg2

db_url = os.getenv("DATABASE_URL")
if not db_url:
    # Use the one from the context if not in env
    db_url = "postgresql://postgres.nrvinsjtkmqkcqztkfam:WpGwXYcK2qtfa31H@aws-0-us-east-2.pooler.supabase.com:6543/postgres"

try:
    conn = psycopg2.connect(db_url)
    conn.autocommit = True
    cursor = conn.cursor()
    
    with open("database/023_multimodal_provenance.sql", "r") as f:
        sql = f.read()
        
    cursor.execute(sql)
    print("Migration 023 successfully applied!")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    if 'conn' in locals():
        conn.close()
