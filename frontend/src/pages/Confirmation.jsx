import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order || {}; // passed from navigate

  useEffect(() => {
    if (!order?._id) {
      // if no order details found, redirect home
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [order, navigate]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <CheckCircle className="text-green-600 w-20 h-20 mb-4" />
      <h2 className="text-3xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h2>
      <p className="text-gray-600 mb-6">
        Your order has been placed successfully. 🎉
      </p>

      {order && (
        <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-md text-left mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Order Summary
          </h3>
          <div className="text-sm space-y-2">
            <p><span className="font-semibold">Order ID:</span> {order._id}</p>
            <p><span className="font-semibold">Payment ID:</span> {order.paymentId || "N/A"}</p>
            <p><span className="font-semibold">Status:</span> ✅ Paid</p>
            <p><span className="font-semibold">Amount:</span> ₹{order.amount}</p>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
      >
        Continue Shopping
      </button>
    </div>
  );
}
