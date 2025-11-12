import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { ShoppingCart } from "lucide-react"

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { items, setIsOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    logout();
    if (location.pathname.startsWith("/checkout")) navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className=" mx-auto  px-4 md:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-600 flex items-center">🍋 <span className="hidden sm:block">Flovours</span></Link>
        <nav className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="relative px-3 py-2 rounded bg-gray-200 flex gap-1 cursor-pointer items-center">
            <ShoppingCart />
            <span className="ml-2 text-xs bg-green-600 text-white p-1 rounded font-semibold">{items.length}</span>
          </button>
          {isAuthenticated &&
            <Link to="/add-products" className="bg-green-600 px-4 py-2 rounded-lg text-center text-white">Add Products</Link>
          }
          {isAuthenticated ? (
            <button onClick={onLogout} className="text-red-600">Logout</button>
          ) : (
            <Link to="/signin" className="text-blue-600">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
