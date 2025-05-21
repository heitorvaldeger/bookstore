import { createContext, useState, type PropsWithChildren } from "react";
import type { Book } from "../models/book";

interface CartContextProps {
  cart: Book[];
  addBookToCart: (book: Book) => void;
}
const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Book[]>([]);

  const addBookToCart = (book: Book) => {
    setCart((prev) => [...prev, book]);
  };

  return (
    <CartContext
      value={{
        cart,
        addBookToCart,
      }}
    >
      {children}
    </CartContext>
  );
};
