import 'dotenv/config'

import { z } from 'zod'

const env = z.object({
  SECRET_KEY_BASE: z.string(),
  DB_URL: z.string(),
  REDIS_URL: z.string(),
})

/**
 * We could export the env.parse result and use it instead of process.env,
 * but declaration merging makes it easier to plug into existing projects.
 */

env.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
