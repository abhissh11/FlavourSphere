import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart_items")) || [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => localStorage.setItem("cart_items", JSON.stringify(items)), [items]);

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p._id === product._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((p) => p._id !== id));
  const updateQty = (id, qty) => setItems((prev) => prev.map(p => p._id === id ? { ...p, quantity: Math.max(1, qty) } : p));
  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);

  const value = useMemo(() => ({
    items, addToCart, removeFromCart, updateQty, clearCart,
    total, isOpen, setIsOpen
  }), [items, total, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
