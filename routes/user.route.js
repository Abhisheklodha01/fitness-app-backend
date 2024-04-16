import express from 'express'
import { LoginController, RegisterController } from '../controllers/user.controller.js'

const router = express.Router()

router.post("/register", RegisterController)
router.post("/login", LoginController)

export default router