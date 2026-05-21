# Demo output

Real `python demo.py` run against the seeded `analytics_demo` database.

```
======================================================================
  db-detective — autonomous investigation of  analytics_demo
======================================================================

⚙  db_overview()
----------------------------------------------------------------------
**Engine detected:** postgres
**Version:** PostgreSQL 17.1 on x86_64-windows, compiled by msvc-19.41.34123, 64-bit
**Database size:** 47 MB
**Tables:** 6
**Largest tables:**
| table | size | approx_rows |
| --- | --- | --- |
| public.events_raw | 37 MB | 80000 |
| public.orders | 1512 kB | 20000 |
| public.dim_customer | 488 kB | 5000 |
| public.fct_revenue_daily | 8192 bytes | 61 |

⚙  list_tables("public")
----------------------------------------------------------------------
| table | approx_rows | size | last_analyzed |
| --- | --- | --- | --- |
| events_raw | 80000 | 37 MB | 2026-05-21 11:14:11.984188-06 |
| orders | 20000 | 1512 kB | 2026-05-21 11:14:11.892308-06 |
| dim_customer | 5000 | 488 kB | 2026-05-21 11:14:11.852965-06 |
| fct_revenue_daily | 61 | 8192 bytes | 2026-05-21 11:14:11.894724-06 |

⚙  check_freshness("fct_revenue_daily")
----------------------------------------------------------------------
### Freshness: `public.fct_revenue_daily`
- **load_date**: latest = 2026-05-07 00:00:00+00:00  (lag 14d) 🔴 STALE

⚙  profile_table("dim_customer")
----------------------------------------------------------------------
### Profile: `public.dim_customer`
**Rows:** 5,000

| column | type | null % | distinct≈ | min | max |
| --- | --- | --- | --- | --- | --- |
| customer_id | integer | 0.0 | 5000 | 1 | 5000 |
| name | text | 0.0 | 5000 | Customer 1 | Customer 999 |
| email | text | 25.0 | 3750 | user1@acme.io | user999@acme.io |
| signup_date | date | 0.0 | 900 | 2023-12-04 | 2026-05-21 |

**Sample rows:**
| customer_id | name | email | signup_date |
| --- | --- | --- | --- |
| 1 | Customer 1 | user1@acme.io | 2026-05-20 |
| 2 | Customer 2 | user2@acme.io | 2026-05-19 |
| 3 | Customer 3 | user3@acme.io | 2026-05-18 |
| 4 | Customer 4 | ∅ | 2026-05-17 |
| 5 | Customer 5 | user5@acme.io | 2026-05-16 |

⚙  trace_lineage("orders")
----------------------------------------------------------------------
### Lineage: `public.orders`
**Declared foreign keys:**
| from_table | column | to_table |
| --- | --- | --- |
| orders | customer_id | dim_customer |

**Name-based guesses (likely joins, not enforced):**
- `order_id` → likely `order` or `orders`
- `customer_id` → likely `customer` or `customers`

⚙  find_waste()
----------------------------------------------------------------------
**🩸 Bloated tables (dead tuples — candidates for VACUUM):**
_(0 rows)_

**👻 Never-read tables (no scans since stats reset):**
_(0 rows)_

**🗑️ Unused indexes (never scanned — pure write overhead):**
| index | size |
| --- | --- |
| public.events_raw_pkey | 3528 kB |
| public.ix_events_payload_unused | 1288 kB |
| public.orders_pkey | 456 kB |

⚙  find_slow_queries(5)
----------------------------------------------------------------------
### Slowest queries (by total time)
| total_ms | calls | mean_ms | query |
| --- | --- | --- | --- |
| 2765 | 120 | 23.0 | SELECT count(*) FROM events_raw WHERE user_id = $1 |
| 1385 | 8 | 173.1 | SELECT o.customer_id, count(*) FROM orders o JOIN events_raw e ON e.user_id=o… |
| 303 | 2 | 151.4 | SELECT pg_size_pretty(pg_database_size(current_database())) |
| 80 | 2 | 40.1 | SELECT count(CASE WHEN "name" IS NULL THEN $1 END), count(DISTINCT "name"), m… |
| 61 | 2 | 30.7 | SELECT count(CASE WHEN "email" IS NULL THEN $1 END), count(DISTINCT "email"),… |

======================================================================
  investigation complete — 7 tool calls, 0 writes
======================================================================
```
