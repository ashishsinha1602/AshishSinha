"""Demo driver: runs db-detective's tools against analytics_demo and prints
the investigation, exactly as the AI agent would drive them over MCP."""
"""
demo.py — drives the full db-detective investigation and prints it.

Uses DATABASE_URL from the environment if set; otherwise falls back to the
local analytics_demo database created by setup_demo_db.py.
"""
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")
os.environ.setdefault(
    "DATABASE_URL", "postgresql://postgres@127.0.0.1:5439/analytics_demo"
)

import server  # noqa: E402

STEPS = [
    ("db_overview()", lambda: server.db_overview()),
    ('list_tables("public")', lambda: server.list_tables("public")),
    ('check_freshness("fct_revenue_daily")', lambda: server.check_freshness("fct_revenue_daily")),
    ('profile_table("dim_customer")', lambda: server.profile_table("dim_customer")),
    ('trace_lineage("orders")', lambda: server.trace_lineage("orders")),
    ("find_waste()", lambda: server.find_waste()),
    ("find_slow_queries(5)", lambda: server.find_slow_queries(5)),
]

print("=" * 70)
print("  db-detective — autonomous investigation of  analytics_demo")
print("=" * 70)
for label, fn in STEPS:
    print(f"\n⚙  {label}\n" + "-" * 70)
    print(fn())
print("\n" + "=" * 70)
print("  investigation complete — 7 tool calls, 0 writes")
print("=" * 70)
