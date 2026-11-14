import { mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { DatabaseSync } from "node:sqlite"
import { z } from "zod"

import { internalEnv } from "@/lib/internal/env"

const MIGRATIONS = [
  `CREATE TABLE IF NOT EXISTS jobs (
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
   );`,
  `CREATE TABLE jobs_next (
     id TEXT PRIMARY KEY,
     company TEXT NOT NULL,
     role TEXT NOT NULL,
     location TEXT,
     url TEXT NOT NULL,
     score REAL,
     has_cv INTEGER NOT NULL,
     status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'applied', 'skipped')),
     added_on TEXT NOT NULL
   );
   INSERT INTO jobs_next SELECT id, company, role, NULLIF(location, ''), url, score, has_cv, status, added_on FROM jobs;
   DROP TABLE jobs;
   ALTER TABLE jobs_next RENAME TO jobs;`,
  `CREATE TABLE jobs_next (
     id TEXT PRIMARY KEY,
     company TEXT NOT NULL,
     role TEXT NOT NULL,
     location TEXT,
     url TEXT NOT NULL,
     score REAL,
     report INTEGER,
     has_cv INTEGER NOT NULL DEFAULT 0,
     prep TEXT,
     status TEXT NOT NULL DEFAULT 'todo'
       CHECK (status IN ('todo', 'applied', 'replied', 'interview', 'offer', 'rejected', 'skipped')),
     prior_status TEXT,
     status_on TEXT,
     added_on TEXT NOT NULL
   );
   INSERT INTO jobs_next (id, company, role, location, url, score, report, has_cv, prep, status, prior_status, status_on, added_on)
     SELECT id, company, role, location, url, score, NULL, 0, NULL, status, NULL, NULL, added_on FROM jobs;
   DROP TABLE jobs;
   ALTER TABLE jobs_next RENAME TO jobs;`,
  `CREATE TABLE events_next (
     kind TEXT NOT NULL CHECK (kind IN ('applied', 'network')),
     ref TEXT NOT NULL,
     day TEXT NOT NULL,
     PRIMARY KEY (kind, ref)
   );
   INSERT INTO events_next SELECT kind, ref, day FROM events WHERE kind IN ('applied', 'network');
   DROP TABLE events;
   ALTER TABLE events_next RENAME TO events;`,
] as const

const inTransaction = (db: DatabaseSync, work: (db: DatabaseSync) => void): void => {
  db.exec("BEGIN")
  try {
    work(db)
    db.exec("COMMIT")
  } catch (error) {
    db.exec("ROLLBACK")
    throw error
  }
}

const migrate = (db: DatabaseSync): void => {
  const { user_version: applied } = z.object({ user_version: z.number() }).parse(db.prepare("PRAGMA user_version").get())
  MIGRATIONS.slice(applied).forEach((sql, index) =>
    inTransaction(db, (tx) => {
      tx.exec(sql)
      tx.exec(`PRAGMA user_version = ${applied + index + 1}`)
    }),
  )
}

const connections = new Map<string, DatabaseSync>()

const open = (path: string): DatabaseSync => {
  mkdirSync(dirname(path), { recursive: true })
  const db = new DatabaseSync(path)
  db.exec("PRAGMA journal_mode = WAL")
  migrate(db)
  connections.set(path, db)
  return db
}

export const database = (): DatabaseSync => {
  const path = internalEnv().INTERNAL_DB_PATH
  return connections.get(path) ?? open(path)
}

export const transaction = (work: (db: DatabaseSync) => void): void => inTransaction(database(), work)
