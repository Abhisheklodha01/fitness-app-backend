import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import ErrorHandler from "../utils/apiError.js";
import jwt from 'jsonwebtoken'


export const RegisterUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler(400, "user already exists"))
    } else {
      const hashPassword = await bcryptjs.hash(password, 10);
      user = await User.create({
        username,
        email,
        password: hashPassword,
      });

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
      return res.status(200).cookie("token", token, {
        expiresIn: "1d"
      }).json({
        success: true,
        message: "Registerd successfully",
        user
      })
    }
  } catch (error) {
    next(error)
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
      return next(new ErrorHandler(400, "user does not exists"))
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler(400, "Invalid password"))
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    return res.status(200).cookie("token", token, {
      expiresIn: "1d"
    }).json({
      success: true,
      message: "Registerd successfully",
      user
    })
  } catch (error) {
    next(error)
  }
};

export const GetMyProfile = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  })
};


export const Logout = (req, res, next) => {
  return res.clearCookie("token").json({
    success: true,
    message: "Loggedout Successfully"
  })
}