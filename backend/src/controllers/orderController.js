import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, amount } = req.body;
    const order = await Order.create({
      userId: req.user._id,
      items,
      amount,
      status: "Pending",
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
