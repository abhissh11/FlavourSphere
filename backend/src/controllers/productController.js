import Product from "../models/Product.js";

// Add product
export const addProduct = async (req, res) => {
  try {
    const { name, category, description, price, imageUrl } = req.body;
    const product = await Product.create({ name, category, description, price, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products or by category
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category && category !== "All") {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") }; // case-insensitive
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
