import express from 'express'
import * as clients from '../controllers/client.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.get('/', jwt.verify, clients.getAllClients)

export default router