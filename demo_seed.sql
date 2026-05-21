-- demo_seed.sql — a small, deliberately *unhealthy* Postgres schema so you can
-- reproduce the db-detective demo and capture your own screenshot/recording.
--
--   createdb analytics_demo
--   psql analytics_demo -f demo_seed.sql
--   psql analytics_demo -c "ANALYZE;"
--   set DATABASE_URL=postgresql://localhost:5432/analytics_demo

DROP TABLE IF EXISTS orders, dim_customer, fct_revenue_daily, events_raw CASCADE;

CREATE TABLE dim_customer (
  customer_id   serial PRIMARY KEY,
  name          text,
  email         text,            -- intentionally messy: some NULLs below
  signup_date   date
);

CREATE TABLE orders (
  order_id      serial PRIMARY KEY,
  customer_id   int REFERENCES dim_customer(customer_id),
  amount        numeric(10,2),
  last_updated  timestamptz DEFAULT now()
);

-- A revenue model that "stopped loading" 14 days ago — the headline incident.
CREATE TABLE fct_revenue_daily (
  load_date     date,
  revenue       numeric(12,2)
);

-- A big-ish raw table that will accumulate bloat.
CREATE TABLE events_raw (
  event_id      bigserial PRIMARY KEY,
  user_id       int,             -- no index on purpose -> slow-query demo
  payload       text,
  created_at    timestamptz DEFAULT now()
);

INSERT INTO dim_customer (name, email, signup_date)
SELECT 'Customer ' || g,
       CASE WHEN g % 4 = 0 THEN NULL ELSE 'user' || g || '@acme.io' END,
       current_date - (g % 900)
FROM generate_series(1, 5000) g;

INSERT INTO orders (customer_id, amount, last_updated)
SELECT (g % 5000) + 1, round((random()*500)::numeric, 2), now() - (g||' min')::interval
FROM generate_series(1, 20000) g;

-- Note the latest load_date is 14 days old: this is what check_freshness flags.
INSERT INTO fct_revenue_daily (load_date, revenue)
SELECT current_date - 14 - g, round((random()*9000)::numeric, 2)
FROM generate_series(0, 60) g;

INSERT INTO events_raw (user_id, payload, created_at)
SELECT (random()*5000)::int, repeat('x', 200), now() - (g||' sec')::interval
FROM generate_series(1, 80000) g;

-- Manufacture dead-tuple bloat for find_waste() to catch.
UPDATE events_raw SET payload = repeat('y', 200) WHERE event_id % 3 = 0;
UPDATE events_raw SET payload = repeat('z', 200) WHERE event_id % 3 = 0;

-- An unused index (never scanned) for the waste report.
CREATE INDEX ix_events_payload_unused ON events_raw (payload);
