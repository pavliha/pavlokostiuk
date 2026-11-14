import { mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { DatabaseSync } from "node:sqlite"

import { internalEnv } from "@/lib/internal/env"

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT NOT NULL,
    url TEXT NOT NULL,
    score REAL,
    has_cv INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'applied', 'skipped')),
    added_on TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS events (
    kind TEXT NOT NULL CHECK (kind IN ('applied', 'contacted', 'replied', 'interested', 'network')),
    ref TEXT NOT NULL,
    day TEXT NOT NULL,
    PRIMARY KEY (kind, ref)
  );
`

const connections = new Map<string, DatabaseSync>()

const open = (path: string): DatabaseSync => {
  mkdirSync(dirname(path), { recursive: true })
  const db = new DatabaseSync(path)
  db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;")
  db.exec(SCHEMA)
  connections.set(path, db)
  return db
}

export const database = (): DatabaseSync => {
  const path = internalEnv().INTERNAL_DB_PATH
  return connections.get(path) ?? open(path)
}

export const transaction = (work: (db: DatabaseSync) => void): void => {
  const db = database()
  db.exec("BEGIN")
  try {
    work(db)
    db.exec("COMMIT")
  } catch (error) {
    db.exec("ROLLBACK")
    throw error
  }
}
