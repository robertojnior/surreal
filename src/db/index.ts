import '../utils/env'

import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

export const connection = new Database(process.env.DB_URL)

export const db = drizzle(connection, {
  logger: true,
})
