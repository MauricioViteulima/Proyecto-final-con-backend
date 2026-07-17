import 'dotenv/config'
import app from './src/app.js'
import sequelize from './src/config/database.js' 

const startup = async () => {
  await sequelize.authenticate()
  await sequelize.sync()
}

if (process.env.VERCEL) {
  await startup()
} else {
  startup()
    .then(() => {
      const PORT = process.env.PORT || 3001
      app.listen(PORT, () => {
        console.log(`Conectado a la base de datos y sincronizado con Sequelize`)
        console.log(`Server running on http://localhost:${PORT}`)
      })
    })
    .catch((error) => {
      console.error('No se pudo inicializar la base de datos en local:', error)
    })
}

export default app