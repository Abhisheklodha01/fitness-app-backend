import express from 'express'
import { GetMyProfile, LoginUser, RegisterUser } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/user.middleware.js'
import { FitnessController, GetFitnessSuggetion, getUserFitnessDetails } from '../controllers/fitness.controller.js'


const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.get("/userdetails", isAuthenticated, GetMyProfile)
router.post("/fitnessdetails", isAuthenticated, FitnessController)
router.get("/getfitnessdetails", isAuthenticated, getUserFitnessDetails)
router.get("/getfitnesssuggetion", isAuthenticated, GetFitnessSuggetion)

export default router