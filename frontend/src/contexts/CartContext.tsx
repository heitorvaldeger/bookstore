import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { Book } from "../models/book";
import type { BookOrder } from "../models/book-order";
import { convertPriceBook } from "../utils";

interface Cart {
  books: BookOrder[];
}
interface CartContextProps {
  cart: Cart;
  addBookToCart: (book: Book, qty: number) => void;
  updateBookTotalInCart: (idBook: number, qty: number) => void;
  getQtyBookCart: () => number;
  getTotalCart: () => string;
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
          imagem: book.imagem,
          preco: book.preco,
          quantidade: qty,
        },
      ],
    }));
  };

  const updateBookTotalInCart = (idBook: number, qty: number) => {
    setCart((prev) => ({
      ...prev,
      books: [...prev.books].map((item) => {
        if (item.id === idBook) {
          item.quantidade = qty;
        }
        return item;
      }),
    }));
  };

  const getQtyBookCart = () => {
    return cart.books.length;
  };

  const getTotalCart = () => {
    return convertPriceBook(
      cart.books.reduce((acc, book) => {
        return (acc += book.preco * book.quantidade);
      }, 0)
    );
  };

  return (
    <CartContext
      value={{
        cart,
        addBookToCart,
        updateBookTotalInCart,
        getQtyBookCart,
        getTotalCart,
      }}
    >
      {children}
    </CartContext>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
