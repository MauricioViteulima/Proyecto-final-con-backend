import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as repository from '../repositories/user.repository.js'

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret'
const JWT_EXPIRES_IN = '7d'

const validateRegister = ({ username, email, password }) => {
  if (!username || typeof username !== 'string' || !username.trim()) return 'El nombre de usuario es obligatorio.'
  if (!email || typeof email !== 'string' || !email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Email invalido.'
  if (!password || typeof password !== 'string' || password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.'
  return null
}

const validateLogin = ({ email, password }) => {
  if (!email || typeof email !== 'string' || !email.trim()) return 'El email es obligatorio.'
  if (!password || typeof password !== 'string' || password.length < 4) return 'La contraseña es obligatoria.'
  return null
}

export async function register(req, res) {
  try {
    const validationError = validateRegister(req.body)
    if (validationError) return res.status(400).json({ error: validationError })

    const existingEmail = await repository.findByEmail(req.body.email)
    if (existingEmail) return res.status(409).json({ error: 'El correo ya se encuentra registrado.' })

    const existingUsername = await repository.findByUsername(req.body.username)
    if (existingUsername) return res.status(409).json({ error: 'El nombre de usuario ya esta en uso.' })

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await repository.create({
      username: req.body.username.trim(),
      email: req.body.email.trim().toLowerCase(),
      password: hashedPassword,
    })

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno al registrar el usuario.' })
  }
}

export async function login(req, res) {
  try {
    const validationError = validateLogin(req.body)
    if (validationError) return res.status(400).json({ error: validationError })

    const user = await repository.findByEmail(req.body.email.trim().toLowerCase())
    if (!user) return res.status(401).json({ error: 'Correo o contraseña incorrectos.' })

    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'Correo o contraseña incorrectos.' })

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno al autenticar el usuario.' })
  }
}

export async function getProfile(req, res) {
  try {
    if (!req.user?.id) return res.status(401).json({ error: 'No autorizado.' })

    const user = await repository.findById(req.user.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' })

    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno al obtener el perfil.' })
  }
}
