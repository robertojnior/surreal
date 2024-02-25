import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { db, connection } from '.'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const migrationsFolder = join(__dirname, 'migrations')

// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder })

// Closing the connection, otherwise the script will hang
connection.close()
