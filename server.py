"""
db-detective — an autonomous Data Health Agent, exposed over MCP.

This server does NOT diagnose anything itself. It hands an AI agent a set of
investigation *primitives* (look at tables, profile columns, check freshness,
hunt waste, trace lineage, run read-only SQL). The agent decides what to look
at next — that is what makes it agentic rather than a fixed report script.

Works against PostgreSQL or Oracle (including Autonomous DB wallet connections);
the engine is auto-detected from environment variables — see .env.example.

Run:  python server.py
"""

from __future__ import annotations

import re
from datetime import date, datetime, timezone

from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP

from engines import current_engine, cursor, quote_ident

load_dotenv()
mcp = FastMCP("db-detective")


# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------


def _cell(v) -> str:
    """Stringify one DB value, reading Oracle LOB locators if needed."""
    if v is None:
        return "∅"
    if hasattr(v, "read"):  # Oracle CLOB/BLOB locator
        try:
            v = v.read()
        except Exception:  # noqa: BLE001
            return "<lob>"
    s = str(v)
    return s if len(s) <= 80 else s[:77] + "…"


def rows_to_md(cur, limit: int = 50) -> str:
    """Render a cursor's result set as a compact markdown table."""
    cols = [d[0] for d in cur.description] if cur.description else []
    if not cols:
        return "_(no result set)_"
    data = cur.fetchmany(limit)
    if not data:
        return "_(0 rows)_"
    head = "| " + " | ".join(cols) + " |"
    sep = "| " + " | ".join("---" for _ in cols) + " |"
    body = ["| " + " | ".join(_cell(v) for v in r) + " |" for r in data]
    more = "\n_…more rows truncated_" if len(data) == limit else ""
    return "\n".join([head, sep, *body]) + more


def _split(table: str) -> tuple[str, str]:
    """Split 'schema.name' or 'name' into (schema, name)."""
    if "." in table:
        s, n = table.split(".", 1)
        return s.strip(), n.strip()
    return ("public", table.strip())


def soft(fn):
    """Turn an exception into a friendly message instead of a stack trace —
    important because optional features (pg_stat_statements, v$sql) may be
    unavailable on a given database."""

    def wrapped(*a, **kw):
        try:
            return fn(*a, **kw)
        except Exception as e:  # noqa: BLE001
            return f"⚠️ {fn.__name__} failed: {e}"

    wrapped.__name__ = fn.__name__
    wrapped.__doc__ = fn.__doc__
    return wrapped


# ---------------------------------------------------------------------------
# tools — the agent's investigation toolkit
# ---------------------------------------------------------------------------


@mcp.tool()
@soft
def db_overview() -> str:
    """Get the lay of the land: engine + version, total size, table count, and
    the 10 largest tables. Always call this first."""
    eng = current_engine()
    out = [f"**Engine detected:** {eng}"]
    with cursor() as cur:
        if eng == "oracle":
            cur.execute("SELECT version FROM product_component_version "
                        "WHERE ROWNUM = 1")
            out.append(f"**Version:** {cur.fetchone()[0]}")
            cur.execute("SELECT ROUND(SUM(bytes)/1024/1024, 1) FROM user_segments")
            out.append(f"**Schema size:** {cur.fetchone()[0]} MB")
            cur.execute("SELECT count(*) FROM user_tables")
            out.append(f"**Tables:** {cur.fetchone()[0]}\n**Largest tables:**")
            cur.execute(
                "SELECT s.segment_name AS table, "
                "ROUND(s.bytes/1024/1024, 2) AS size_mb, t.num_rows AS approx_rows "
                "FROM user_segments s "
                "LEFT JOIN user_tables t ON t.table_name = s.segment_name "
                "WHERE s.segment_type = 'TABLE' "
                "ORDER BY s.bytes DESC FETCH FIRST 10 ROWS ONLY"
            )
        else:
            cur.execute("SELECT version()")
            out.append(f"**Version:** {cur.fetchone()[0]}")
            cur.execute("SELECT pg_size_pretty(pg_database_size(current_database()))")
            out.append(f"**Database size:** {cur.fetchone()[0]}")
            cur.execute("SELECT count(*) FROM information_schema.tables "
                        "WHERE table_schema NOT IN "
                        "('pg_catalog','information_schema')")
            out.append(f"**Tables:** {cur.fetchone()[0]}\n**Largest tables:**")
            cur.execute(
                "SELECT schemaname || '.' || relname AS table, "
                "pg_size_pretty(pg_total_relation_size(relid)) AS size, "
                "n_live_tup AS approx_rows FROM pg_stat_user_tables "
                "ORDER BY pg_total_relation_size(relid) DESC LIMIT 10"
            )
        out.append(rows_to_md(cur))
    return "\n".join(out)


@mcp.tool()
@soft
def list_tables(schema: str = "public") -> str:
    """List every table with approximate row count, on-disk size, and when it
    was last analyzed (a proxy for activity). On Oracle the `schema` argument
    is ignored — it always lists the connected user's schema."""
    with cursor() as cur:
        if current_engine() == "oracle":
            cur.execute(
                "SELECT t.table_name AS table, t.num_rows AS approx_rows, "
                "ROUND(NVL(s.bytes,0)/1024/1024, 2) AS size_mb, "
                "TO_CHAR(t.last_analyzed) AS last_analyzed "
                "FROM user_tables t "
                "LEFT JOIN user_segments s ON s.segment_name = t.table_name "
                "AND s.segment_type = 'TABLE' "
                "ORDER BY t.num_rows DESC NULLS LAST"
            )
        else:
            cur.execute(
                "SELECT relname AS table, n_live_tup AS approx_rows, "
                "pg_size_pretty(pg_total_relation_size(relid)) AS size, "
                "coalesce(last_analyze, last_autoanalyze)::text AS last_analyzed "
                "FROM pg_stat_user_tables WHERE schemaname = %s "
                "ORDER BY n_live_tup DESC",
                (schema,),
            )
        return rows_to_md(cur, limit=200)


def _columns(cur, schema: str, name: str) -> list[tuple[str, str, str]]:
    """Return [(column, data_type, is_nullable)] for a table, per engine."""
    if current_engine() == "oracle":
        cur.execute(
            "SELECT column_name, data_type, nullable FROM user_tab_columns "
            "WHERE table_name = :1 ORDER BY column_id",
            [name.upper()],
        )
        return [(c, t, "YES" if n == "Y" else "NO") for c, t, n in cur.fetchall()]
    cur.execute(
        "SELECT column_name, data_type, is_nullable FROM information_schema.columns "
        "WHERE table_schema = %s AND table_name = %s ORDER BY ordinal_position",
        (schema, name),
    )
    return list(cur.fetchall())


@mcp.tool()
@soft
def profile_table(table: str, sample_rows: int = 5) -> str:
    """Deep-profile one table: for every column report data type, null %,
    distinct-value estimate, and min/max. Also returns a few sample rows.
    `table` may be 'name' or 'schema.name'."""
    schema, name = _split(table)
    out = [f"### Profile: `{schema}.{name}`"]
    with cursor() as cur:
        cols = _columns(cur, schema, name)
        if not cols:
            return f"No such table: {table}"
        tbl = quote_ident(name)
        cur.execute(f"SELECT count(*) FROM {tbl}")
        total = cur.fetchone()[0] or 0
        out.append(f"**Rows:** {total:,}\n")
        out.append("| column | type | null % | distinct≈ | min | max |")
        out.append("| --- | --- | --- | --- | --- | --- |")
        for col, dtype, _ in cols:
            q = quote_ident(col)
            try:
                cur.execute(
                    f"SELECT count(CASE WHEN {q} IS NULL THEN 1 END), "
                    f"count(DISTINCT {q}), min({q}), max({q}) "
                    f"FROM (SELECT {q} FROM {tbl} FETCH FIRST 100000 ROWS ONLY) s"
                )
                nulls, distinct, mn, mx = cur.fetchone()
                pct = f"{(nulls / total * 100):.1f}" if total else "—"
                out.append(f"| {col} | {dtype} | {pct} | {distinct} "
                           f"| {_cell(mn)} | {_cell(mx)} |")
            except Exception as e:  # noqa: BLE001 - e.g. CLOB columns
                out.append(f"| {col} | {dtype} | _(not profilable: "
                           f"{str(e)[:40]})_ | | | |")
        cur.execute(f"SELECT * FROM {tbl} FETCH FIRST {int(sample_rows)} ROWS ONLY")
        out.append(f"\n**Sample rows:**\n{rows_to_md(cur)}")
    return "\n".join(out)


@mcp.tool()
@soft
def check_freshness(table: str) -> str:
    """Pipeline-doctor move: find timestamp/date columns, report the most
    recent value in each, and how stale that is vs. now. This is how the agent
    answers 'why is my data old?'."""
    schema, name = _split(table)
    with cursor() as cur:
        cols = _columns(cur, schema, name)
        ts = [c for c, t, _ in cols
              if t.upper().startswith("TIMESTAMP") or t.upper() == "DATE"]
        if not ts:
            return f"`{table}` has no timestamp/date columns to judge freshness by."
        tbl = quote_ident(name)
        now = datetime.now(timezone.utc)
        out = [f"### Freshness: `{schema}.{name}`"]
        for col in ts:
            cur.execute(f"SELECT max({quote_ident(col)}) FROM {tbl}")
            latest = cur.fetchone()[0]
            if latest is None:
                out.append(f"- **{col}**: all NULL ⚠️")
                continue
            # normalise a bare date to a tz-aware datetime so lag math works
            if isinstance(latest, datetime):
                if latest.tzinfo is None:
                    latest = latest.replace(tzinfo=timezone.utc)
            elif isinstance(latest, date):
                latest = datetime(latest.year, latest.month, latest.day,
                                  tzinfo=timezone.utc)
            try:
                lag = now - latest
                flag = " 🔴 STALE" if lag.total_seconds() > 86400 else " ✅"
                out.append(f"- **{col}**: latest = {latest}  "
                           f"(lag {lag.days}d){flag}")
            except TypeError:
                out.append(f"- **{col}**: latest = {latest}")
        return "\n".join(out)


@mcp.tool()
@soft
def find_slow_queries(limit: int = 10) -> str:
    """Cost-hunter move: the slowest queries by cumulative execution time.
    Postgres reads pg_stat_statements (needs that extension); Oracle reads
    V$SQL. The agent uses this to find rewrite candidates."""
    with cursor() as cur:
        if current_engine() == "oracle":
            cur.execute(
                "SELECT ROUND(elapsed_time/1000) AS total_ms, executions AS calls, "
                "ROUND(elapsed_time/1000/GREATEST(executions,1), 1) AS mean_ms, "
                "SUBSTR(sql_text, 1, 120) AS query "
                "FROM v$sql ORDER BY elapsed_time DESC "
                "FETCH FIRST :1 ROWS ONLY",
                [int(limit)],
            )
        else:
            cur.execute(
                "SELECT round(total_exec_time::numeric, 0) AS total_ms, calls, "
                "round(mean_exec_time::numeric, 1) AS mean_ms, "
                "left(regexp_replace(query, '\\s+', ' ', 'g'), 120) AS query "
                "FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT %s",
                (int(limit),),
            )
        return "### Slowest queries (by total time)\n" + rows_to_md(cur)


@mcp.tool()
@soft
def find_waste() -> str:
    """Cost-hunter move: surface things quietly costing money. Postgres: dead-
    tuple bloat, never-read tables, unused indexes. Oracle: tables with stale
    or missing optimizer statistics, plus the largest indexes."""
    out = []
    with cursor() as cur:
        if current_engine() == "oracle":
            cur.execute(
                "SELECT table_name, num_rows, TO_CHAR(last_analyzed) AS last_analyzed, "
                "stale_stats FROM user_tab_statistics "
                "WHERE (stale_stats = 'YES' OR last_analyzed IS NULL) "
                "AND object_type = 'TABLE' "
                "ORDER BY num_rows DESC NULLS LAST FETCH FIRST 10 ROWS ONLY"
            )
            out.append("**📉 Tables with stale/missing optimizer stats "
                       "(bad plans, slow queries):**")
            out.append(rows_to_md(cur))
            cur.execute(
                "SELECT s.segment_name AS index, "
                "ROUND(s.bytes/1024/1024, 2) AS size_mb "
                "FROM user_segments s WHERE s.segment_type = 'INDEX' "
                "ORDER BY s.bytes DESC FETCH FIRST 10 ROWS ONLY"
            )
            out.append("\n**🗂️ Largest indexes (review for redundancy / write "
                       "overhead):**")
            out.append(rows_to_md(cur))
            return "\n".join(out)

        cur.execute(
            "SELECT schemaname || '.' || relname AS table, n_dead_tup AS dead_rows, "
            "n_live_tup AS live_rows, round(100.0 * n_dead_tup / "
            "nullif(n_live_tup + n_dead_tup, 0), 1) AS dead_pct "
            "FROM pg_stat_user_tables WHERE n_dead_tup > 1000 "
            "ORDER BY n_dead_tup DESC LIMIT 10"
        )
        out.append("**🩸 Bloated tables (dead tuples — candidates for VACUUM):**")
        out.append(rows_to_md(cur))
        cur.execute(
            "SELECT schemaname || '.' || relname AS table, "
            "pg_size_pretty(pg_total_relation_size(relid)) AS size "
            "FROM pg_stat_user_tables WHERE seq_scan = 0 "
            "AND coalesce(idx_scan, 0) = 0 AND n_live_tup > 0 "
            "ORDER BY pg_total_relation_size(relid) DESC LIMIT 10"
        )
        out.append("\n**👻 Never-read tables (no scans since stats reset):**")
        out.append(rows_to_md(cur))
        cur.execute(
            "SELECT schemaname || '.' || indexrelname AS index, "
            "pg_size_pretty(pg_relation_size(indexrelid)) AS size "
            "FROM pg_stat_user_indexes WHERE idx_scan = 0 "
            "ORDER BY pg_relation_size(indexrelid) DESC LIMIT 10"
        )
        out.append("\n**🗑️ Unused indexes (never scanned — pure write overhead):**")
        out.append(rows_to_md(cur))
    return "\n".join(out)


@mcp.tool()
@soft
def trace_lineage(table: str) -> str:
    """Archaeologist move: trace how a table connects to others — declared
    foreign keys in both directions, plus name-based guesses (a `customer_id`
    column hints at a `customers` table)."""
    schema, name = _split(table)
    with cursor() as cur:
        if current_engine() == "oracle":
            cur.execute(
                "SELECT c.table_name AS from_table, cc.column_name AS column, "
                "rc.table_name AS to_table FROM user_constraints c "
                "JOIN user_cons_columns cc ON c.constraint_name = cc.constraint_name "
                "JOIN user_constraints rc ON c.r_constraint_name = rc.constraint_name "
                "WHERE c.constraint_type = 'R' "
                "AND (c.table_name = :1 OR rc.table_name = :1)",
                [name.upper()],
            )
        else:
            cur.execute(
                "SELECT tc.table_name AS from_table, kcu.column_name AS column, "
                "ccu.table_name AS to_table FROM information_schema.table_constraints tc "
                "JOIN information_schema.key_column_usage kcu "
                "ON tc.constraint_name = kcu.constraint_name "
                "JOIN information_schema.constraint_column_usage ccu "
                "ON tc.constraint_name = ccu.constraint_name "
                "WHERE tc.constraint_type = 'FOREIGN KEY' "
                "AND (tc.table_name = %s OR ccu.table_name = %s)",
                (name, name),
            )
        out = [f"### Lineage: `{schema}.{name}`", "**Declared foreign keys:**",
               rows_to_md(cur)]
        guesses = [c for c, _, _ in _columns(cur, schema, name)
                   if c.lower().endswith("_id")]
        if guesses:
            out.append("\n**Name-based guesses (likely joins, not enforced):**")
            for g in guesses:
                base = g[:-3]
                out.append(f"- `{g}` → likely `{base}` or `{base}s`")
        return "\n".join(out)


@mcp.tool()
@soft
def run_sql(query: str) -> str:
    """Run an ad-hoc READ-ONLY SQL query (SELECT / WITH / EXPLAIN / SHOW only).
    The agent uses this to test a hypothesis the other tools can't answer.
    Write/DDL keywords are rejected."""
    q = query.strip().rstrip(";")
    if not re.match(r"(?is)^\s*(select|with|explain|show|table)\b", q):
        return "❌ Only SELECT/WITH/EXPLAIN/SHOW/TABLE queries are allowed."
    if re.search(r"(?is)\b(insert|update|delete|drop|alter|truncate|create|"
                 r"grant|merge)\b", q):
        return "❌ Query contains a write/DDL keyword and was blocked."
    with cursor() as cur:
        cur.execute(q)
        return rows_to_md(cur, limit=100)


# ---------------------------------------------------------------------------
# prompt — primes the agent to run a full autonomous investigation
# ---------------------------------------------------------------------------


@mcp.prompt()
def investigate(focus: str = "the whole database") -> str:
    """Kick off an autonomous data-health investigation."""
    return f"""You are a senior data engineer doing an incident-grade health
review of a database. Focus: {focus}.

Work autonomously using the db-detective tools. Suggested flow — adapt as
findings lead you:
1. db_overview — get oriented.
2. list_tables — spot anything suspiciously large, tiny, or empty.
3. For important tables: profile_table + check_freshness.
4. find_slow_queries + find_waste — hunt cost and rot.
5. trace_lineage on key tables to understand blast radius.
6. Use run_sql to confirm any hypothesis.

Then deliver a crisp **Data Health Report**:
- 🔴 Critical issues (stale data, broken freshness)
- 💸 Cost / waste (bloat, unused indexes, slow queries) — quantify if you can
- 🧹 Hygiene (high-null columns, undocumented tables)
- ✅ A prioritized, copy-pasteable action list

Be specific. Cite real numbers from the tools. Make it screenshot-worthy."""


if __name__ == "__main__":
    mcp.run()
