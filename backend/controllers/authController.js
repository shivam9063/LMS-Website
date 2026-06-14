import { genToken } from "../configs/token.js"
import validator from "validator"

import bcrypt from "bcryptjs"
import User from "../models/userModel.js"

import sendMail from "../configs/Mail.js"


export const signUp = async (req, res) => {

    try {
        console.log("SignUp request received:", req.body)
        let { name, email, password, role } = req.body

        // Trim whitespace from inputs
        name = name?.trim()
        email = email?.trim()
        password = password?.trim()
        role = role?.trim()

        // Validate required fields
        if (!name || !email || !password || !role) {
            console.log("Missing required fields:", { name: !!name, email: !!email, password: !!password, role: !!role })
            return res.status(400).json({ message: "All fields are required" })
        }

        let existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "email already exist" })
        }
        console.log("Email validation - input:", email, "type:", typeof email, "length:", email?.length)
        if (!validator.isEmail(email)) {
            console.log("Email validation failed for:", email)
            return res.status(400).json({ message: "Please enter valid Email" })
        }
        console.log("Email validation passed for:", email)
        if (password.length < 8) {
            return res.status(400).json({ message: "Please enter a Strong Password" })
        }

        let hashPassword = await bcrypt.hash(password, 10)
        let user = await User.create({
            name,
            email,
            password: hashPassword,
            role,

        })
        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax", // Changed from "Strict" to "lax" for cross-port development
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        console.log("SignUp: Token cookie set successfully for user:", user.email)
        return res.status(201).json(user)

    } catch (error) {
        console.log("signUp error")
        return res.status(500).json({ message: `signUp Error ${error}` })
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user does not exist" })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect Password" })
        }
        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax", // Changed from "Strict" to "lax" for cross-port development
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        console.log("Login: Token cookie set successfully for user:", user.email)
        return res.status(200).json(user)

    } catch (error) {
        console.log("login error")
        return res.status(500).json({ message: `login Error ${error}` })
    }
}




export const logOut = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({ message: "logOut Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `logout Error ${error}` })
    }
}


export const googleSignup = async (req, res) => {
    try {
        const { name, email, role } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                name, email, role
            })
        }
        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax", // Changed from "Strict" to "lax" for cross-port development
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        console.log("GoogleSignup: Token cookie set successfully for user:", user.email)
        return res.status(200).json(user)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `googleSignup  ${error}` })
    }

}

export const sendOtp = async (req, res) => {
    try {
        console.log("SendOTP request received for:", req.body.email);
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        console.log("Generated OTP:", otp, "for email:", email);

        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerifed = false;

        await user.save()
        console.log("User updated with OTP details");

        // Try to send email. If Gmail rejects auth, fail fast so the UI does not show a false success.
        try {
            await sendMail(email, otp)
            console.log("OTP email sent successfully");
        } catch (emailError) {
            console.log("Email sending failed:", emailError.message);
            user.resetOtp = undefined;
            user.otpExpires = undefined;
            user.isOtpVerifed = false;
            await user.save();
            return res.status(502).json({
                message: "OTP email send failed. Gmail rejected the login, so check EMAIL/EMAIL_PASS or use a Gmail App Password.",
            })
        }

        return res.status(200).json({ message: "OTP sent to your email successfully" })
    } catch (error) {
        console.error("SendOTP error:", error);
        return res.status(500).json({ message: `Failed to send OTP: ${error.message}` })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" })
        }
        user.isOtpVerifed = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({ message: "OTP varified " })


    } catch (error) {
        return res.status(500).json({ message: `Varify otp error ${error}` })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.isOtpVerifed) {
            return res.status(404).json({ message: "OTP verfication required" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        user.password = hashPassword
        user.isOtpVerifed = false
        await user.save()
        return res.status(200).json({ message: "Password Reset Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Reset Password error ${error}` })
    }
}