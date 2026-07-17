import express from 'express'
import cors from 'cors'
import publicationsRoutes from './routes/publication.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://ulima-market.vercel.app',
  'https://pw-frontend.vercel.app',
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('CORS policy: Origin not allowed'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

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
