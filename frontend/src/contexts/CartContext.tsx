import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { Book } from "../models/book";

interface Cart {
  books: {
    id: number;
    titulo: string;
    autor: string;
    quantidade: number;
  }[];
}
interface CartContextProps {
  cart: Cart;
  addBookToCart: (book: Book, qty: number) => void;
  getQtyBookCart: () => number;
}
const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>({
    books: [],
  });

  const addBookToCart = (book: Book, qty: number) => {
    setCart((prev) => ({
      ...prev,
      books: [
        ...prev.books,
        {
          id: book.id,
          titulo: book.titulo,
          autor: book.autor,
          quantidade: qty,
        },
      ],
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
