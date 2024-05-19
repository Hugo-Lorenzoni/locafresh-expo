import { router } from "expo-router";
import { ReactNode, createContext, useContext, useState } from "react";
type Produit = {
  id: string;
  nom: string;
  prix: number;
  image: any;
  enStock?: boolean;
};

type CartType = {
  items: CartItem[];
  addToCart: (product: Produit, quantity: number) => void;
  updateQuantity: (produitId: string, amount: number) => void;
  removeFromCart: (produitId: string) => void;
  clearCart: () => void;
  total: number;
  totalQuantity: number;
};

type CartItem = {
  produit: Produit;
  quantity: number;
};

const CartContext = createContext<CartType>({
  items: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  total: 0,
  totalQuantity: 0,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (produit: Produit, quantity: number) => {
    const existingItem = items.find((item) => item.produit.id === produit.id);

    if (existingItem) {
      updateQuantity(produit.id, quantity);
    } else {
      setItems([...items, { produit, quantity }]);
    }
    router.push("/panier");
  };

  const updateQuantity = (produitId: string, amount: number) => {
    setItems(
      items.map((item) => {
        if (item.produit.id === produitId) {
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setItems(items.filter((item) => item.produit.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (acc, item) => acc + item.produit.prix * item.quantity,
    0
  );
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
