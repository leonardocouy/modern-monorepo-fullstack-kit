import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const databaseUrl = process.env.DATABASE_URL || './dev.db';

const sqlite = new Database(databaseUrl);

// Enable WAL mode for better concurrency
sqlite.pragma('journal_mode = WAL');

export const db = drizzle({ client: sqlite });

export type DB = typeof db;
