import { router } from "expo-router";
import { ReactNode, createContext, useContext, useState } from "react";
type Produit = {
  id: number;
  nom: string;
  prix: number;
  image: any;
  enStock?: boolean;
};

type CartType = {
  items: CartItem[];
  addToCart: (product: Produit, quantity: number) => void;
  total: number;
};

type CartItem = {
  produit: Produit;
  quantity: number;
};

const CartContext = createContext<CartType>({
  items: [],
  addToCart: () => {},
  // changeQuantity: (id: string, quantity: number) => {},
  // removeFromCart: (id: string) => {},
  // clearCart: () => {},
  total: 0,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      produit: {
        id: 1,
        nom: "Lait",
        image: require("@assets/images/produits/lait.jpg"),
        prix: 1.5,
      },
      quantity: 2,
    },
  ]);

  const addToCart = (produit: Produit, quantity: number) => {
    console.log("Add to cart", produit, quantity);

    setItems([...items, { produit, quantity }]);
    router.push("/panier");
  };

  // const changeQuantity = (id, quantity) => {
  //   setItems(
  //     items.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, quantity };
  //       }
  //       return item;
  //     })
  //   );
  // };

  // const removeFromCart = (id) => {
  //   setItems(items.filter((item) => item.id !== id));
  // };

  // const clearCart = () => {
  //   setItems([]);
  // };

  const total = items.reduce(
    (acc, item) => acc + item.produit.prix * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        // removeFromCart,
        // clearCart
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
