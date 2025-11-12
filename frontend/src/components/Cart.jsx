import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

export default function CartModal() {
  const { isOpen, setIsOpen, items, updateQty, removeFromCart, total } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

  const goCheckout = () => {
    setIsOpen(false);
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { redirectTo: "/checkout", from: location.pathname } });
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start md:items-center justify-center bg-black/40 p-2">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 cursor-pointer bg-gray-200 rounded p-1">✕</button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-auto">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : items.map(item => (
            <div key={item._id} className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 border rounded cursor-pointer bg-green-500 text-white hover:bg-green-600" onClick={() => updateQty(item._id, item.quantity - 1)}>-</button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button className="px-2 border rounded cursor-pointer bg-green-500 text-white hover:bg-green-600" onClick={() => updateQty(item._id, item.quantity + 1)}>+</button>
                <button className="ml-3 text-red-600 text-sm cursor-pointer hover:underline" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="font-semibold">Total: ₹{total}</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100" onClick={() => setIsOpen(false)}>Continue shopping</button>
            <button onClick={goCheckout} className="px-4 py-2 rounded bg-green-600 text-white cursor-pointer hover:bg-green-700">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
