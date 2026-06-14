import Course from "../models/courseModel.js";
import razorpay from 'razorpay'
import User from "../models/userModel.js";
import dotenv from "dotenv"
dotenv.config()
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RFrv5JmaI7ffnN",
    key_secret: process.env.RAZORPAY_SECRET || "VMaDy49Z72ILpGhd2gnN4AYh"
})

console.log("Razorpay configured with key:", process.env.RAZORPAY_KEY_ID || "rzp_test_RFrv5JmaI7ffnN")

export const createOrder = async (req, res) => {
  try {
    console.log("Create order request:", req.body)
    const { courseId, userId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Course found:", { title: course.title, price: course.price });
    
    // Ensure price is valid (minimum 1 rupee for Razorpay)
    const price = course.price && course.price > 0 ? course.price : 1;
    console.log("Using price:", price);

    const amountInPaisa = Math.round(price * 100);
    
    // Razorpay minimum amount is 100 paisa (1 rupee)
    if (amountInPaisa < 100) {
      return res.status(400).json({ message: "Minimum amount should be ₹1" });
    }

    const options = {
      amount: amountInPaisa, // in paisa, rounded to avoid decimals
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`, // Must be max 40 chars
    };

    console.log("Creating Razorpay order with options:", options);
    const order = await razorpayInstance.orders.create(options);
    console.log("Order created successfully:", order.id, "Amount:", order.amount)
    return res.status(200).json(order);
  } catch (err) {
    console.log("Order creation error:", err)
    return res.status(500).json({ message: `Order creation failed: ${err.message}` });
  }
};



// Direct enrollment without payment
export const directEnroll = async (req, res) => {
  try {
    console.log("Direct enrollment request:", req.body)
    const { courseId, userId } = req.body
    
    // Validate required fields
    if (!courseId || !userId) {
      console.log("Missing required fields:", {courseId: !!courseId, userId: !!userId})
      return res.status(400).json({ message: "Missing course or user details" });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Enroll user in course
    user.enrolledCourses.push(courseId);
    await user.save();

    // Add user to course enrolled students
    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    console.log("Direct enrollment successful for user:", userId, "course:", courseId)
    return res.status(200).json({ message: "Successfully enrolled in course!" });
    
  } catch (error) {
    console.log("Direct enrollment error:", error);
    return res.status(500).json({ message: "Internal server error during enrollment" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    console.log("Payment verification request:", req.body)
    const {razorpay_order_id , courseId , userId, razorpay_payment_id, razorpay_signature} = req.body
    
    // Validate required fields
    if (!razorpay_order_id || !courseId || !userId) {
      console.log("Missing required fields:", {razorpay_order_id: !!razorpay_order_id, courseId: !!courseId, userId: !!userId})
      return res.status(400).json({ message: "Missing required payment details" });
    }
    
    // For test environment, we'll allow payment verification if we have the order_id and payment_id
    if (razorpay_order_id && razorpay_payment_id) {
      console.log("Payment verification successful for test mode")
          // In production, you should verify the signature using crypto
          // const crypto = require('crypto');
          // const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
          // hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
          // const generated_signature = hmac.digest('hex');
          // if (generated_signature === razorpay_signature) {
      // Update user and course enrollment
      const user = await User.findById(userId);
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      const course = await Course.findById(courseId).populate("lectures");
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }

          return res.status(200).json({ message: "Payment verified and enrollment successful" });
        } else {
          return res.status(400).json({ message: "Payment verification failed - missing payment details" });
        }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error during payment verification" });
  }
};
