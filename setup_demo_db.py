"""
setup_demo_db.py — create + seed the `analytics_demo` Postgres database used
by demo.py, so anyone can reproduce the investigation.

Set DEMO_ADMIN_URL to a Postgres superuser connection (default points at a
local server on port 5439). The script creates the database if needed, runs
demo_seed.sql, enables pg_stat_statements if possible, and ANALYZEs.

    python setup_demo_db.py
"""
import os

import psycopg

ADMIN = os.environ.get("DEMO_ADMIN_URL",
                       "postgresql://postgres@127.0.0.1:5439/postgres")
DEMO = ADMIN.rsplit("/", 1)[0] + "/analytics_demo"

with psycopg.connect(ADMIN, autocommit=True) as c:
    if not c.execute("SELECT 1 FROM pg_database WHERE datname='analytics_demo'"
                      ).fetchone():
        c.execute("CREATE DATABASE analytics_demo")
        print("created database analytics_demo")
    else:
        print("database analytics_demo already exists")

seed = open("demo_seed.sql", encoding="utf-8").read()
with psycopg.connect(DEMO, autocommit=True) as c:
    c.execute(seed)
    try:
        c.execute("CREATE EXTENSION IF NOT EXISTS pg_stat_statements")
    except Exception as e:  # noqa: BLE001
        print("note: pg_stat_statements unavailable (slow-query tool will skip):", e)
    c.execute("ANALYZE")
    n = c.execute("SELECT count(*) FROM information_schema.tables "
                  "WHERE table_schema='public'").fetchone()[0]
    print(f"seeded analytics_demo — {n} tables ready")
print(f"\nNow set:  DATABASE_URL={DEMO}\nThen run:  python demo.py")
