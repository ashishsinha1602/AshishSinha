"""
webdemo.py — a tiny web server that makes db-detective's investigation run
*for real* in the browser. Zero dependencies beyond what server.py needs.

It serves index.html and exposes /api/tool/<name>, which calls the actual
MCP tools against a live database and returns the real output as JSON. So the
demo page is not a replay — every number on screen comes from a real query.

    python webdemo.py
    # then open http://localhost:8000

Set DATABASE_URL (or the ORACLE_* vars) to point at any database. If unset it
falls back to the local analytics_demo created by setup_demo_db.py.
"""
import json
import os
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:  # noqa: BLE001
    pass

os.environ.setdefault(
    "DATABASE_URL", "postgresql://postgres@127.0.0.1:5439/analytics_demo"
)

import server  # noqa: E402  (imported after env is set)

PORT = int(os.environ.get("PORT", "8000"))
HERE = os.path.dirname(os.path.abspath(__file__))


def _one(q, key, default):
    return q.get(key, [default])[0]


# Maps an API name to the real tool call. This is the whole "backend".
TOOLS = {
    "db_overview":       lambda q: server.db_overview(),
    "list_tables":       lambda q: server.list_tables(_one(q, "schema", "public")),
    "check_freshness":   lambda q: server.check_freshness(
                             _one(q, "table", "fct_revenue_daily")),
    "profile_table":     lambda q: server.profile_table(
                             _one(q, "table", "dim_customer")),
    "trace_lineage":     lambda q: server.trace_lineage(_one(q, "table", "orders")),
    "find_waste":        lambda q: server.find_waste(),
    "find_slow_queries": lambda q: server.find_slow_queries(
                             int(_one(q, "limit", "5"))),
}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):  # quiet console
        pass

    def _send(self, code, body, ctype):
        data = body if isinstance(body, bytes) else body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        url = urlparse(self.path)

        if url.path in ("/", "/index.html"):
            with open(os.path.join(HERE, "index.html"), "rb") as f:
                return self._send(200, f.read(), "text/html; charset=utf-8")

        if url.path == "/api/health":
            return self._send(200, json.dumps({"ok": True}), "application/json")

        if url.path.startswith("/api/tool/"):
            name = url.path[len("/api/tool/"):]
            tool = TOOLS.get(name)
            if not tool:
                return self._send(404, json.dumps({"error": f"unknown tool {name}"}),
                                  "application/json")
            try:
                out = tool(parse_qs(url.query))
            except Exception as e:  # noqa: BLE001
                out = f"⚠️ {name} failed: {e}"
            return self._send(200, json.dumps({"tool": name, "output": out}),
                              "application/json")

        return self._send(404, "not found", "text/plain")


def maybe_seed():
    """On a fresh hosted Postgres, auto-create + seed the demo schema so the
    deployed demo works with zero manual steps. No-op if data already exists
    or if an Oracle database is configured."""
    if os.environ.get("ORACLE_USER"):
        return
    try:
        import psycopg

        with psycopg.connect(os.environ["DATABASE_URL"], autocommit=True) as c:
            if c.execute("SELECT to_regclass('public.events_raw')").fetchone()[0]:
                print("demo schema already present — skipping seed")
                return
            print("fresh database — seeding demo schema…")
            c.execute(open(os.path.join(HERE, "demo_seed.sql"),
                           encoding="utf-8").read())
            try:
                c.execute("CREATE EXTENSION IF NOT EXISTS pg_stat_statements")
                c.execute("SELECT pg_stat_statements_reset()")
            except Exception as e:  # noqa: BLE001
                print("note: pg_stat_statements unavailable:", e)
            for i in range(120):  # generate the headline slow-query traffic
                c.execute("SELECT count(*) FROM events_raw WHERE user_id = %s", (i,))
            c.execute("ANALYZE")
            print("demo schema seeded")
    except Exception as e:  # noqa: BLE001 - never block server startup
        print("auto-seed skipped:", e)


if __name__ == "__main__":
    print(f"db-detective web demo  →  http://localhost:{PORT}")
    print(f"using DATABASE_URL = {os.environ.get('DATABASE_URL', '(oracle)')}")
    maybe_seed()
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
