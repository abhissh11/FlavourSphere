import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Fruit Powders",
        "Spices",
        "Dry Fruits",
        "Herbal Extracts",
        "Dehydrated Vegetables",
        "Others",
      ],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description should be at least 10 characters long"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least ₹1"],
      max: [100000, "Price too high"],
    },

    imageUrl: {
      type: String,
      required: [true, "Product image URL is required"],
      trim: true,

    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

//image validator later update
// validate: {
//         validator: function (v) {
//           return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)?$/.test(v);
//         },
//         message: "Please provide a valid image URL",
//       },