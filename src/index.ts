import './utils/env'

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import Fastify from 'fastify'
import websocket from '@fastify/websocket'
import cookie from '@fastify/cookie'
import Autoload from '@fastify/autoload'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const routesDir = join(__dirname, 'routes')

const server = Fastify({
  logger: true,
})

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(websocket)

server.register(cookie, {
  secret: process.env.SECRET_KEY_BASE,
  hook: 'onRequest',
  parseOptions: {
    httpOnly: true,
    maxAge: 3_600,
    path: '/',
    sameSite: 'strict',
    secure: true,
    signed: true,
  },
})

server.register(Autoload, {
  dir: routesDir,
})

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)

    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
