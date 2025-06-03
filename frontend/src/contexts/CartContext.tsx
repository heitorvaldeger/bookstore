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
import { Messages } from "@/constans/messages";

interface Cart {
  books: BookOrder[];
}
interface CartContextProps {
  cart: Cart;
  isModalCartOpen: boolean;
  handleCreateOrder: () => Promise<void>;
  deleteBookFromCart: (idBook: number) => void;
  addBookToCart: (book: Book, qty: number) => void;
  updateBookTotalInCart: (idBook: number, qty: number) => void;
  incrementQtyBookToTotalInCart: (idBook: number, qty: number) => void;
  getQtyBookCart: () => number;
  getTotalCart: () => string;
  hasBook: (book: Book) => boolean;
  toggleModalCartOpen: (open: boolean) => void;
}
const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<Cart>({
    books: [],
  });
  const [isModalCartOpen, setIsModalCartOpen] = useState(false);

  const { mutateAsync: createOrderFn } = useMutation({
    mutationFn: createOrder,
  });

  const handleCreateOrder = async () => {
    try {
      if (cart.books.length === 0) {
        toast.error(Messages.CART_EMPTY);
        return;
      }

      await createOrderFn({
        cliente: "José da Silva",
        books: cart.books.map((book) => ({
          id: book.id,
          quantidade: book.quantidade,
        })),
      });

      toast.success(Messages.ORDER_CREATED);
      setIsModalCartOpen(false);
      setCart({
        books: [],
      });
    } catch (error) {
      toast.error(Messages.ORDER_FAILED);
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
          return {
            ...item,
            quantidade: qty,
          };
        }
        return item;
      }),
    }));
  };

  const deleteBookFromCart = (idBook: number) => {
    setCart((prev) => ({
      ...prev,
      books: [...prev.books].filter((item) => item.id !== idBook),
    }));
    toast.success(Messages.BOOK_DELETED_CART);
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
    return cart.books.reduce((acc, book) => {
      return (acc += book.quantidade);
    }, 0);
  };

  const getTotalCart = () => {
    return convertPriceBook(
      cart.books.reduce((acc, book) => {
        return (acc += book.preco * book.quantidade);
      }, 0)
    );
  };

  const toggleModalCartOpen = (open: boolean) => {
    setIsModalCartOpen(open);
  };

  return (
    <CartContext
      value={{
        cart,
        isModalCartOpen,
        handleCreateOrder,
        addBookToCart,
        updateBookTotalInCart,
        deleteBookFromCart,
        incrementQtyBookToTotalInCart,
        getQtyBookCart,
        getTotalCart,
        hasBook,
        toggleModalCartOpen,
      }}
    >
      {children}
    </CartContext>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
