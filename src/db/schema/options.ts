import { randomUUID } from 'node:crypto'

import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, index } from 'drizzle-orm/sqlite-core'

import { surveys } from './surveys'

export const options = sqliteTable(
  'options',
  {
    id: text('id').primaryKey().$defaultFn(randomUUID),
    surveyId: text('survey_id')
      .notNull()
      .references(() => surveys.id),
    title: text('title').notNull(),
    createdAt: text('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      surveyIdx: index('surve_idx').on(table.surveyId),
    }
  }
)

export const optionsRelations = relations(options, ({ one }) => ({
  survey: one(surveys, {
    fields: [options.surveyId],
    references: [surveys.id],
  }),
}))
