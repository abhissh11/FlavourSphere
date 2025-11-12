import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import CartModal from "./components/Cart"

import HomePage from "./pages/HomePage";
import Checkout from "./pages/Checkout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AddProduct from "./pages/AddProduct";
import Confirmation from "./pages/Confirmation";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CartModal />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<HomePage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-products"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/confirmation" element={<Confirmation />} />

        </Routes>
      </div>
    </div>
  );
}
