# 🕵️ db-detective

**The AI that audits your database.**

`db-detective` is an [MCP](https://modelcontextprotocol.io) server. Point it at a
**PostgreSQL** or **Oracle** database and any MCP-capable AI (Claude Desktop,
Claude Code, …) can *autonomously* investigate it — finding stale data, wasted
spend, and silent schema rot, then writing the incident report.

The server is not a script. It hands the agent a toolkit of investigation
**primitives** and lets it decide what to look at next. That is what makes it
genuinely agentic.

🔗 **Live demo (no install):** open [`index.html`](index.html) — a replay of a
real investigation. Host it on GitHub Pages for a shareable link.

---

## The toolkit the agent gets

| Tool | What the agent uses it for |
|---|---|
| `db_overview` | Engine, version, size, biggest tables — get oriented |
| `list_tables` | Row counts, sizes, last-analyzed — spot anomalies |
| `profile_table` | Per-column types, null %, distinct, min/max + samples |
| `check_freshness` | 🔴 *Pipeline doctor* — proves which tables went stale |
| `find_slow_queries` | 💸 *Cost hunter* — slowest queries (pg_stat_statements / V$SQL) |
| `find_waste` | 💸 Bloat, unused indexes, stale stats — quiet money leaks |
| `trace_lineage` | 🗺️ FK lineage + name-based join guesses |
| `run_sql` | Read-only escape hatch to test any hypothesis |
| `investigate` *(prompt)* | One command kicks off the full autonomous audit |

`run_sql` rejects every write/DDL keyword and Postgres connections are opened
read-only at the driver level.

---

## Install (≈60 seconds)

```bash
git clone <your-repo> && cd db-detective
pip install -r requirements.txt
cp .env.example .env        # then edit it — see below
```

### Configure a database — pick one

**PostgreSQL** — set in `.env`:
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

**Oracle (incl. Autonomous DB wallet)** — unzip your OCI wallet, then in `.env`:
```
ORACLE_USER=ADMIN
ORACLE_PASSWORD=your-password
ORACLE_DSN=mydb_high                 # a TNS alias from the wallet's tnsnames.ora
ORACLE_WALLET_DIR=C:\path\to\wallet  # folder with tnsnames.ora + cwallet.sso
ORACLE_WALLET_PASSWORD=              # only if the wallet is password-protected
```
The engine is auto-detected from whichever variables are present.

### Register with your MCP client

Add to `claude_desktop_config.json` (or your Claude Code MCP config):
```json
{
  "mcpServers": {
    "db-detective": {
      "command": "python",
      "args": ["c:/full/path/to/server.py"]
    }
  }
}
```
Restart the client, then say: **“/investigate the database”**.

---

## Reproduce the demo screenshot

`demo_seed.sql` builds a deliberately *unhealthy* Postgres schema (a stale
revenue table, query-killing missing index, table bloat, an unused index):

```bash
createdb analytics_demo
psql analytics_demo -f demo_seed.sql
psql analytics_demo -c "ANALYZE;"
```
Point `DATABASE_URL` at it and run `/investigate` — you'll get the exact report
shown in the demo page. Record a 30-second screen capture → that's your post.

---

## Share it

1. Push this repo to GitHub.
2. Settings → Pages → deploy from branch → `/ (root)`. Your `index.html` is now
   live at `https://<user>.github.io/db-detective/`.
3. Edit the `REPO` constant at the bottom of `index.html` to your repo URL.
4. Post the Pages link on LinkedIn — see suggested copy in
   [`LINKEDIN.md`](LINKEDIN.md).

MIT licensed. Built on the Model Context Protocol.
