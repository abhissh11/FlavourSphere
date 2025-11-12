import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  paymentGateway: String,
  paymentId: String,
  status: String,
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
