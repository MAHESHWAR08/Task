"use client";

import { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// ── Create Context ────────────────────
const CartContext = createContext(null);

// ── Provider Component ────────────────
export function CartProvider({ children }) {
  const [cart, setCart, isHydrated] = useLocalStorage("bookstore-cart", []);

  /**
   * Add a book to cart
   * If already in cart, increment quantity
   */
  const addToCart = useCallback(
    (book) => {
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex(
          (item) => item.id === book.id
        );

        if (existingIndex > -1) {
          // Book exists → increment quantity
          const updated = [...prevCart];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          return updated;
        }

        // New book → add with quantity 1
        return [...prevCart, { ...book, quantity: 1 }];
      });
    },
    [setCart]
  );

  /**
   * Remove a book from cart entirely
   */
  const removeFromCart = useCallback(
    (id) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    },
    [setCart]
  );

  /**
   * Increase quantity by 1
   */
  const increaseQuantity = useCallback(
    (id) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    },
    [setCart]
  );

  /**
   * Decrease quantity by 1
   * Removes item if quantity reaches 0
   */
  const decreaseQuantity = useCallback(
    (id) => {
      setCart((prevCart) => {
        const item = prevCart.find((item) => item.id === id);

        if (item?.quantity === 1) {
          return prevCart.filter((item) => item.id !== id);
        }

        return prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      });
    },
    [setCart]
  );

  /**
   * Clear all items from cart
   */
  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  /**
   * Check if a book is in the cart
   */
  const isInCart = useCallback(
    (id) => cart.some((item) => item.id === id),
    [cart]
  );

  /**
   * Get quantity for a specific book
   */
  const getItemQuantity = useCallback(
    (id) => cart.find((item) => item.id === id)?.quantity || 0,
    [cart]
  );

  // ── Derived State (Memoized) ────────
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // ── Context Value (Memoized) ────────
  const contextValue = useMemo(
    () => ({
      cart,
      isHydrated,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
      totalItems,
      totalPrice,
    }),
    [
      cart,
      isHydrated,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
      totalItems,
      totalPrice,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// ── Custom Hook ───────────────────────
export function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}