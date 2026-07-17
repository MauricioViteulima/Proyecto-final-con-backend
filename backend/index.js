import 'dotenv/config'
import app from './src/app.js'
import sequelize from './src/config/database.js'

const startup = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Conectado a la base de datos y sincronizado con Sequelize')
  } catch (error) {
    console.error('No se pudo inicializar la base de datos:', error)
    process.exit(1)
  }
}

await startup()

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

export default app
