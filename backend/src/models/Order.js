import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  amount: Number,
  status: { type: String, default: "Pending" },
  paymentId: String,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
