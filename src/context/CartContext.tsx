import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // 🔥 persistência
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [total, setTotal] = useState(0);

  // 🔄 SALVA NO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotal(newTotal);
  }, [cart]);

  // ➕ AUMENTAR
  const increaseItem = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ DIMINUIR (SE FOR 1, REMOVE)
  const decreaseItem = (id) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            if (item.quantity <= 1) return null;
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(Boolean) // remove null
    );
  };

  // 🗑️ REMOVER
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🛒 ADICIONAR
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      const quantityToAdd = product.quantity || 1; // 🔥 garante quantidade

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantityToAdd,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: quantityToAdd,
        },
      ];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        increaseItem,
        decreaseItem,
        removeItem,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🔒 PROTEÇÃO CONTRA USO FORA DO PROVIDER
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart precisa estar dentro de um CartProvider");
  }

  return context;
};