import psycopg2
import os

def apply_migration():
    print("Applying Migration 016: Green Corridors Registry...")
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    cur = conn.cursor()
    
    with open("database/016_green_corridors_registry.sql", "r") as f:
        sql = f.read()
        
    cur.execute(sql)
    conn.commit()
    conn.close()
    print("Migration 016 Applied successfully. Credits and Partnerships seeded.")

if __name__ == "__main__":
    apply_migration()

