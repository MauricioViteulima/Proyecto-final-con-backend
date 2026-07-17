import express from 'express'
import * as controller from '../controllers/publication.controller.js'

const router = express.Router()

router.options('/', (req, res) => res.sendStatus(204))
router.options('/:id', (req, res) => res.sendStatus(204))
router.get('/', controller.list)
router.get('/:id', controller.get)
router.post('/', controller.createItem)
router.put('/:id', controller.updateItem)
router.delete('/:id', controller.removeItem)

export default router
