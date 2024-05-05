import express from 'express'
import { GetMyProfile, LoginUser, RegisterUser } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/user.middleware.js'


const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.get("/userdetails", isAuthenticated ,GetMyProfile)

export default router