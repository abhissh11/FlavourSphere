import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import { sendOrderConfirmationEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: orderId,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating payment order:", error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Save payment
    await Payment.create({
      orderId,
      paymentGateway: "Razorpay",
      paymentId: razorpay_payment_id,
      status: "Success",
    });

    // Update order
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "Paid", paymentId: razorpay_payment_id },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const user = await User.findById(order.userId).select("email name");

    // ✅ Make email non-blocking
    if (user?.email) {
      sendOrderConfirmationEmail(user.email, order)
        .then(() => console.log(`✅ Confirmation email sent to ${user.email}`))
        .catch((err) => console.error("❌ Email send failed:", err.message));
    }

    // ✅ Respond immediately
    res.json({ success: true });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: error.message });
  }
};
