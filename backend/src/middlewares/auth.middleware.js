import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret'

export default function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization || req.headers.Authorization
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  const token = authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    return next()
  } catch (error) {
    console.error('JWT verification failed:', error)
    return res.status(401).json({ error: 'Token invalido' })
  }
}
