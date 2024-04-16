import mongoose from "mongoose";
import { config } from "dotenv";

config({
    path: './.env'
})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected");
    } catch (error) {
        console.log("Databse connection failed");
        console.log(error);
    }
}

export default connectDB