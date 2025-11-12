import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addProduct);
router.get("/", getProducts);

export default router;
