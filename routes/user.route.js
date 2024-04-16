import express from 'express'
import { LoginController, LogoutController, RegisterController } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/user.middleware.js'


const router = express.Router()

router.post("/register", RegisterController)
router.post("/login", LoginController)
router.post("/logout", isAuthenticated, LogoutController)

export default router