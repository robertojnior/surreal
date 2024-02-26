import './src/utils/env'

import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema/*.ts',
  out: './src/db/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.DB_URL,
  },
} satisfies Config
