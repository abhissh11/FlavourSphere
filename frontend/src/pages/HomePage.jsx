import { useEffect, useState } from "react";
import API from "../services/api";
import { useCart } from "../hooks/useCart";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const categories = [
    "All",
    "Fruit Powders",
    "Spices",
    "Dry Fruits",
    "Herbal Extracts",
    "Dehydrated Vegetables",
    "Others",
  ];

  // Fetch products
  const fetchProducts = async (selectedCategory) => {
    setLoading(true);
    try {
      const endpoint =
        selectedCategory && selectedCategory !== "All"
          ? `/products?category=${encodeURIComponent(selectedCategory)}`
          : "/products";
      const { data } = await API.get(endpoint);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        🍋 Explore Products by Category
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 cursor-pointer rounded-full border transition ${category === cat
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700 hover:bg-green-50 border-gray-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading products...</div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No products found for “{category}”.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded bg-gray-50 shadow-sm"
                />
              )}
              <h3 className="font-bold mt-2 text-lg">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.category}</p>
              <p className="font-semibold mt-1">₹{p.price}</p>
              <button
                onClick={() => addToCart(p)}
                className="bg-green-600 text-white w-full mt-2 py-1 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
