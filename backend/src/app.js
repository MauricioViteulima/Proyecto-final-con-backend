import express from 'express'
import cors from 'cors'
import publicationsRoutes from './routes/publication.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/publications', publicationsRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
})

export default app
