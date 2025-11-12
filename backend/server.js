import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js';
import authRoutes from "./src/routes/authRoute.js";
import productRoutes from "./src/routes/productRoute.js";
import orderRoutes from "./src/routes/orderRoute.js";
import paymentRoutes from "./src/routes/paymentRoute.js";

dotenv.config();
const app = express();


app.use(cors())
app.use(express.json())

//routes
connectDB()

app.get("/", (req, res) => {
  res.send("Hello from the Your-food server");
})

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))

