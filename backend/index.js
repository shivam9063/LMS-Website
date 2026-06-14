import express from "express"
import dotenv from "dotenv"
import connectDb from "./configs/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import courseRouter from "./routes/courseRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import aiRouter from "./routes/aiRoute.js"
import reviewRouter from "./routes/reviewRoute.js"
import completionRouter from "./routes/completionRoute.js"
dotenv.config()

let port = process.env.PORT || 8000
let app = express()
console.log("Port from env:", process.env.PORT)
console.log("Using port:", port)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/review", reviewRouter)
app.use("/api/completion", completionRouter)


app.get("/", (req, res) => {
    res.send("Hello From Server")
})

const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server Started on port ${port}`)
    })

    try {
        await connectDb()
    } catch (error) {
        console.error("Continuing without a database connection")
    }
}

startServer()

