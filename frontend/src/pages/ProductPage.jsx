import { useEffect, useState } from "react";
import API from "../services/api";
import { useCart } from "../hooks/useCart"


export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data)).catch(() => setProducts([]));
  }, []);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((p) => (
        <div key={p._id} className="bg-white p-4 shadow rounded">
          {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded" />}
          <h3 className="font-bold mt-2">{p.name}</h3>
          <p className="text-gray-600">{p.category}</p>
          <p className="font-semibold mt-1">₹{p.price}</p>
          <button
            onClick={() => addToCart(p)}
            className="bg-green-600 text-white w-full mt-2 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
      {products.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No products yet. Add some via backend.
        </p>
      )}
    </div>
  );
}
