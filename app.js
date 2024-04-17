import express from 'express'
import connectDB from './db/index.js'
import router from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

connectDB()

app.get("/", (req, res) => {
    res.send("working fine")
})

app.use("/api/v1/users", router)

export default app