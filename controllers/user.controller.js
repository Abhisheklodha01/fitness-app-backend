import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { config } from 'dotenv'
import { User } from '../models/user.model.js'

config({
    path: './.env'
})

export const RegisterController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }
        const ExistedUser = await User.findOne({ email })

        if (ExistedUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists please login"
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "Registered Successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }

}


export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exists please register"
            })
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incoreect Password"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY

        })

        return res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true
        }).status(201).json({
            success: true,
            message: `welcome back ${user.username}`,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

export const LogoutController = async (req, res) => {
    try {
        return res.status(200).clearCookie("accessToken", {
            httpOnly: true,
            secure: true
        }).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to logout please try again"
        })

    }
}

export const getUserDetailsController = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
      console.log("something went wrong");
    }
}

