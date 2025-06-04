  import React, { createContext, useContext, useState, useEffect } from "react";

  const CartContext = createContext();

  export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
      console.log("Adding to cart:", product);
      setCartItems((prevItems) => {
        const existing = prevItems.find((item) => item.id === product.id);
        if (existing) {
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    };

    const removeFromCart = (productId) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
      setCartItems([]);
    };

    return (
      <CartContext.Provider
        value={{ cartItems, addToCart, removeFromCart, clearCart }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  // Custom hook for easier usage
  export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  }
