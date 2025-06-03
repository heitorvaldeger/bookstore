import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const ssl =
  env.get('DB_SSL') !== null && env.get('DB_SSL') !== undefined
    ? {
        rejectUnauthorized: env.get('DB_SSL'),
      }
    : undefined

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
        ssl,
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
