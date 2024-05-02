import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import ErrorHandler from '../utils/apiError.js'


config({
   path: './.env'
})


export const isAuthenticated = async (req, res, next) => {
   try {
      const { token } = req.cookies;
      console.log(token);
      console.log(req.user);
      if (!token) {
         return next(new ErrorHandler((400, "invalid access token")))
      }

      const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedtoken?._id).select("-password");
      req.user = user
      next()

   } catch (error) {
      return next(new ErrorHandler(401, "something went wrong"))
   }
}