import express from 'express'
import * as products from '../controllers/product.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.get('/', jwt.verify, products.getAllProducts)
router.get('/:productId', jwt.verify, products.getProductById)
router.post('/', jwt.verify, products.createProduct)
router.put('/:productId', jwt.verify, products.updateProduct)
router.delete('/:productId', jwt.verify, products.removeProduct)

export default router