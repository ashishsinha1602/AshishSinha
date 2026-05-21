"""
Connection + dialect layer for db-detective.

Supports two engines, auto-detected from environment variables:
  • PostgreSQL  — via DATABASE_URL
  • Oracle      — via ORACLE_* vars, including Autonomous DB wallet connections

Each tool in server.py asks `current_engine()` which one is active and picks
the matching SQL. This file owns *all* the connection plumbing so the tools
stay readable.
"""

from __future__ import annotations

import os
from contextlib import contextmanager


def current_engine() -> str:
    """Return 'oracle' or 'postgres' based on which env vars are set."""
    if os.environ.get("ORACLE_USER") and os.environ.get("ORACLE_DSN"):
        return "oracle"
    if os.environ.get("DATABASE_URL"):
        return "postgres"
    raise RuntimeError(
        "No database configured. Copy .env.example to .env and set either "
        "DATABASE_URL (Postgres) or the ORACLE_* variables (Oracle)."
    )


@contextmanager
def _postgres_cursor():
    import psycopg

    url = os.environ["DATABASE_URL"]
    with psycopg.connect(url, connect_timeout=10) as conn:
        conn.read_only = True  # block writes at the driver level
        with conn.cursor() as cur:
            yield cur


@contextmanager
def _oracle_cursor():
    import oracledb

    wallet = os.environ.get("ORACLE_WALLET_DIR")
    kwargs = dict(
        user=os.environ["ORACLE_USER"],
        password=os.environ["ORACLE_PASSWORD"],
        dsn=os.environ["ORACLE_DSN"],
    )
    if wallet:
        # Autonomous DB wallet: thin-mode mTLS connection. config_dir locates
        # tnsnames.ora; wallet_location locates the cwallet.sso / ewallet.pem.
        kwargs.update(
            config_dir=wallet,
            wallet_location=wallet,
            wallet_password=os.environ.get("ORACLE_WALLET_PASSWORD") or None,
        )
    with oracledb.connect(**kwargs) as conn:
        with conn.cursor() as cur:
            yield cur


@contextmanager
def cursor():
    """Yield a cursor for whichever engine is configured. Connection is opened
    per call so the server is stateless and survives DB restarts."""
    if current_engine() == "oracle":
        with _oracle_cursor() as cur:
            yield cur
    else:
        with _postgres_cursor() as cur:
            yield cur


def quote_ident(name: str) -> str:
    """Quote an identifier for the active engine. Oracle stores unquoted names
    upper-cased, so we upper-case before quoting to keep matches working."""
    if current_engine() == "oracle":
        return '"' + name.replace('"', "").upper() + '"'
    return '"' + name.replace('"', "") + '"'
