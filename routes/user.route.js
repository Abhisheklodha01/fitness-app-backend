import express from 'express'
import { GetMyProfile, LoginUser, Logout, RegisterUser } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/user.middleware.js'


const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.post("/logout", isAuthenticated, Logout)
router.get("/userdetails", isAuthenticated ,GetMyProfile)

export default router