import { Sequelize } from 'sequelize'

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pw'

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === 'production' || !!process.env.DATABASE_URL
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
})

export default sequelize
