import express from 'express'
import 'express-async-errors'
import errorHandler from '../helpers/error_handler.js'

/**
 * Express configuration
 */

export async function configure (app) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use(errorHandler)
    console.log('Express configured.')
}