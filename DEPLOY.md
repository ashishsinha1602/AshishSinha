# Deploying the live demo (free)

This hosts the **fully working** demo — `webdemo.py` + a real PostgreSQL
database — so anyone with the link can run a live investigation. Cost: $0.

Everything is driven by [`render.yaml`](render.yaml): one file that tells
[Render](https://render.com) to create a free web service **and** a free
Postgres database, and wire them together. `webdemo.py` seeds the database
itself on first boot — no manual SQL.

## Steps

1. **Create a Render account** — go to <https://render.com> and
   **Sign up with GitHub** (authorize the `ashishsinha1602` account).

2. **New Blueprint** — in the Render dashboard click **New +** → **Blueprint**.

3. **Pick the repo** — select `ashishsinha1602/AshishSinha`, branch
   **`db-detective`**. Render finds `render.yaml` automatically.

4. **Apply** — Render shows it will create `db-detective-demo` (web) and
   `db-detective-pg` (database). Click **Apply / Create**.

5. **Wait ~3–5 min** — Render builds, deploys, and `webdemo.py` auto-seeds the
   database. When the web service shows **Live**, open its URL:
   `https://db-detective-demo.onrender.com` (Render shows the exact URL).

That URL runs real investigations. Put it on LinkedIn.

## Things to know about the free tier

- The web service **sleeps after 15 min idle** — the first visit after that
  takes ~50 seconds to wake up. Fine for a demo; mention it or keep the tab
  warm before posting.
- Render's free Postgres is removed after 90 days — just re-apply the blueprint
  to recreate it (the demo data re-seeds automatically).
- `pg_stat_statements` may not be enabled on free Postgres; if so the
  `find_slow_queries` step shows a graceful notice instead of numbers.

## Updating the demo later

Push to the `db-detective` branch → Render auto-redeploys. Nothing else to do.
