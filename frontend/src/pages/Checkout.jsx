import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import API from "../services/api";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      // Optional: handle empty cart
    }
  }, [items.length]);

  const payNow = async () => {
    // 1️⃣ Create order in backend
    const { data: order } = await API.post("/orders", {
      items: items.map((i) => ({
        productId: i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      amount: total,
    });

    // 2️⃣ Create payment order with Razorpay
    const { data: paymentOrder } = await API.post("/payment/checkout", {
      amount: total,
      orderId: order._id,
    });

    // 3️⃣ Configure Razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: paymentOrder.amount,
      currency: "INR",
      name: "Fruit Powders",
      description: `Order #${order._id}`,
      order_id: paymentOrder.id,
      handler: async function (response) {
        await API.post("/payment/verify", {
          ...response,
          orderId: order._id,
        });
        clearCart();
        navigate("/confirmation");
      },
      theme: { color: "#16a34a" },
    };

    if (!window.Razorpay) {
      alert("Razorpay script not loaded");
      return;
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow mt-10 rounded space-y-6">


      {/* ✅ Checkout Section */}
      <div className="bg-white rounded p-4 shadow-inner">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h2>

        <div className="space-y-2 mb-4">
          {items.map((i) => (
            <div
              key={i._id}
              className="flex justify-between text-sm border-b py-1"
            >
              <span>
                {i.name} x {i.quantity}
              </span>
              <span>₹{i.price * i.quantity}</span>
            </div>
          ))}
        </div>

        <p className="font-semibold text-lg">
          Total: <span className="text-green-600">₹{total}</span>
        </p>

        <button
          onClick={payNow}
          className="bg-green-600 text-white w-full mt-4 py-2 rounded hover:bg-green-700 transition"
        >
          Pay Now
        </button>
      </div>
      {/* ✅ Test Card Info Section */}
      <div className="border border-green-200 rounded-lg p-4 bg-green-50">
        <h3 className="text-xl font-bold text-green-700 mb-3 text-center">
          💳 Test Card Details (For Payment Demo)
        </h3>
        <p className="text-gray-700 text-sm mb-3 text-center">
          Use these cards in Razorpay <strong>Test Mode</strong> to simulate payments.
          <br /> You can enter any future expiry date and random 3-digit CVV.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300 rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="px-4 py-2 border">Card Network</th>
                <th className="px-4 py-2 border">Card Number</th>
                <th className="px-4 py-2 border">CVV</th>
                <th className="px-4 py-2 border">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center">
              <tr>
                <td className="border px-4 py-2">Mastercard</td>
                <td className="border px-4 py-2 font-mono">
                  2305 3242 5784 8228
                </td>
                <td className="border px-4 py-2">Any 3 digits</td>
                <td className="border px-4 py-2">Any future date</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Visa</td>
                <td className="border px-4 py-2 font-mono">
                  4386 2894 0766 0153
                </td>
                <td className="border px-4 py-2">Any 3 digits</td>
                <td className="border px-4 py-2">Any future date</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
