import express from 'express'
import connectDB from './db/index.js'
import router from './routes/user.route.js'
import cookieParser from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(express.urlencoded())

connectDB()

app.get("/", (req, res) => {
    res.send("working fine")
})

app.use("/api/v1/users", router)

export default app