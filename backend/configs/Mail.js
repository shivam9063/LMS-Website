import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const senderEmail = process.env.EMAIL?.trim()
const senderPassword = process.env.EMAIL_PASS?.replace(/\s+/g, "")?.trim()

const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: senderEmail,
        pass: senderPassword,
    },
})

const sendMail = async (to, otp) => {
    try {
        console.log("Attempting to send email to:", to);
        console.log("Using email:", senderEmail);
        console.log("Email password configured:", senderPassword ? "Yes" : "No");

        const result = await transporter.sendMail({
            from: `LMS Website <${senderEmail}>`,
            to: to,
            subject: "Reset Your Password",
            html: `<p>Your OTP for Password Reset is <b>${otp}</b>.
            It expires in 5 minutes.</p>`
        });

        console.log("Email sent successfully:", result.messageId);
        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}


export default sendMail
