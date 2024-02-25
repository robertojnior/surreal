import { randomUUID } from 'node:crypto'

import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const surveys = sqliteTable('surveys', {
  id: text('id').primaryKey().$defaultFn(randomUUID),
  title: text('title').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})
