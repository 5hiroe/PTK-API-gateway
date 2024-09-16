import express from 'express'
import * as auth from '../controllers/auth.js'

const router = express.Router()

router.post('/login', auth.login)
router.post('/logout', auth.logout)
router.post('/signup', auth.signup)
router.post('/update-password', auth.updatePassword)

export default router
