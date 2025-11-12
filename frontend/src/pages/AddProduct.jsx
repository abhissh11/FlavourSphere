import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Predefined category options
  const categories = [
    "Fruit Powders",
    "Spices",
    "Dry Fruits",
    "Herbal Extracts",
    "Dehydrated Vegetables",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await API.post("/products", {
        name: form.name,
        category: form.category,
        description: form.description,
        price: Number(form.price),
        imageUrl: form.imageUrl,
      });
      setMessage("✅ Product added successfully!");
      setForm({
        name: "",
        category: "",
        description: "",
        price: "",
        imageUrl: "",
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(error?.response?.data?.message || "❌ Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
        Add a New Product
      </h2>

      {message && (
        <div
          className={`text-center mb-4 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded bg-white"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="1"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Image Preview */}
        {form.imageUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              src={form.imageUrl}
              alt="Preview"
              className="w-full h-40 object-cover rounded border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full cursor-pointer mt-4 py-2 text-white rounded ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
