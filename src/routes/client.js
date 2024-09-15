import express from 'express'
import * as clients from '../controllers/client.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.get('/', jwt.verify, clients.getAllClients)
router.get('/:clientId', jwt.verify, clients.getClientById)
router.post('/', jwt.verify, clients.createClient)
router.put('/:clientId', jwt.verify, clients.updateClient)
router.delete('/:clientId', jwt.verify, clients.removeClient)

export default router