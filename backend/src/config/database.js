import { Sequelize } from 'sequelize'
import pg from 'pg'

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_zd1jpOo8ZcaC@ep-rapid-shape-ack0qh2c-pooler.sa-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require'

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === 'production' || !!process.env.DATABASE_URL
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
})

export default sequelize