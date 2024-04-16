import express from 'express'
import { LoginController, LogoutController, RegisterController, getUserDetailsController } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/user.middleware.js'


const router = express.Router()

router.post("/register", RegisterController)
router.post("/login", LoginController)
router.post("/logout", isAuthenticated, LogoutController)
router.get("/userdetails", isAuthenticated, getUserDetailsController)

export default router