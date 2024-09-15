import express from 'express'
import * as orders from '../controllers/order.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.get('/', jwt.verify, orders.getAllOrders)
router.get('/:orderId', jwt.verify, orders.getOrderById)
router.post('/', jwt.verify, orders.createOrder)
router.put('/:orderId', jwt.verify, orders.updateOrder)
router.delete('/:orderId', jwt.verify, orders.removeOrder)

export default router