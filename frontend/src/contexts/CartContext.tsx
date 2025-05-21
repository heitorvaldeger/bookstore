import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { Book } from "../models/book";

interface Cart {
  books: Book[];
}
interface CartContextProps {
  cart: Cart;
  addBookToCart: (book: Book) => void;
  getQtyBookCart: () => number;
}
const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>({
    books: [],
  });

  const addBookToCart = (book: Book) => {
    setCart((prev) => ({
      ...prev,
      books: [...prev.books, book],
    }));
  };

  const getQtyBookCart = () => {
    return cart.books.length;
  };

  return (
    <CartContext
      value={{
        cart,
        addBookToCart,
        getQtyBookCart,
      }}
    >
      {children}
    </CartContext>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
