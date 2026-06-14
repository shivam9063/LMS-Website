import express from "express"
import { createOrder, verifyPayment, directEnroll } from "../controllers/orderController.js";


let paymentRouter = express.Router()

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify-payment", verifyPayment);
paymentRouter.post("/direct-enroll", directEnroll);


export default paymentRouter