import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'


config({
    path: './.env'
})

export const isAuthenticated = async (req, res, next) => {
    console.log(req);
    try {
        const { accessToken } = req.cookies
        if (!accessToken) {
            res.status(400).json({
                success: false,
                message: "Please login or register"
            })
        }

        const decodedToken = jwt.verify(accessToken, process.env.JWT_KEY)
        const user = await User.findById(decodedToken?._id).select("-password")
        console.log(user);
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid access token"
            })
        }
        req.user = user
        next()

    } catch (error) {
        console.log(error);
    }
}
