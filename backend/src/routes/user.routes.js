import express from 'express'
import * as controller from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/profile', authMiddleware, controller.getProfile)

export default router
