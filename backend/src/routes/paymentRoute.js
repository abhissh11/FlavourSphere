import express from "express";
import { createPaymentOrder, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/checkout", protect, createPaymentOrder);
router.post("/verify", protect, verifyPayment);

export default router;
