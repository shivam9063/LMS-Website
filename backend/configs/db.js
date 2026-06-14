import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL?.trim()

        if (!mongoUrl) {
            throw new Error("MONGODB_URL is not set")
        }

        if (mongoUrl.includes("<") || mongoUrl.includes(">")) {
            throw new Error("MONGODB_URL still contains placeholder values")
        }

        await mongoose.connect(mongoUrl)
        console.log("DB connected")
    } catch (error) {
        console.error("DB error:", error.message)
        throw error
    }
}
export default connectDb