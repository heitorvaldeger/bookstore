import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { Book } from "@/models/book";
import type { BookOrder } from "@/models/book-order";
import { convertPriceBook } from "@/utils";
import { createOrder } from "@/api/create-order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Cart {
  books: BookOrder[];
}
interface CartContextProps {
  cart: Cart;
  handleCreateOrder: () => Promise<void>;
  addBookToCart: (book: Book, qty: number) => void;
  updateBookTotalInCart: (idBook: number, qty: number) => void;
  incrementQtyBookToTotalInCart: (idBook: number, qty: number) => void;
  getQtyBookCart: () => number;
  getTotalCart: () => string;
  hasBook: (book: Book) => boolean;
}
const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>({
    books: [],
  });

  const { mutateAsync: createOrderFn } = useMutation({
    mutationFn: createOrder,
  });

  const handleCreateOrder = async () => {
    try {
      const response = await createOrderFn({
        cliente: "José da Silva",
        books: cart.books.map((book) => ({
          id: book.id,
          quantidade: book.quantidade,
        })),
      });

      if (response.status === 400) {
        toast.error("Falha ao criar um pedido");
        return;
      }

      toast.success("Pedido criado com sucesso!");
    } catch (error) {
      toast.error("Falha ao criar um pedido");
      console.log(error);
    }
  };

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

  const incrementQtyBookToTotalInCart = (idBook: number, qty: number) => {
    setCart((prev) => {
      return {
        ...prev,
        books: prev.books.map((item) => {
          if (item.id === idBook) {
            return {
              ...item,
              quantidade: item.quantidade + qty,
            };
          }
          return item;
        }),
      };
    });
  };

  const hasBook = (book: Book) => {
    return !!cart.books.find((item) => item.id === book.id);
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
        handleCreateOrder,
        addBookToCart,
        updateBookTotalInCart,
        incrementQtyBookToTotalInCart,
        getQtyBookCart,
        getTotalCart,
        hasBook,
      }}
    >
      {children}
    </CartContext>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
