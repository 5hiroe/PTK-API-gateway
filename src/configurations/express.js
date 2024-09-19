import express from 'express'
import 'express-async-errors'
import errorHandler from '../helpers/error_handler.js'
import authRoutes from '../routes/auth.js'
import clientRoutes from '../routes/client.js'
import orderRoutes from '../routes/order.js'
import productRoutes from '../routes/product.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'

/**
 * Express configuration
 */

export async function configure (app) {
    const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/', authRoutes)
    app.use('/client', clientRoutes)
    app.use('/order', orderRoutes)
    app.use('/product', productRoutes)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use(errorHandler)
    console.log('Express configured.')
}