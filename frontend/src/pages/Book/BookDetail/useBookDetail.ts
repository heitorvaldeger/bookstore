import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { fetchBook } from "@/api/fetch-book";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { convertPriceBook } from "@/utils";
import { toast } from "sonner";
import { Messages } from "@/constans/messages";
import { deleteBook } from "@/api/delete-book";

export const useBookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addBookToCart, hasBook, incrementQtyBookToTotalInCart } = useCart();

  const [color, setColor] = useState("Azul");
  const [qty, setQty] = useState(1);

  const {
    data: book,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["books", id],
    queryFn: () => fetchBook({ idBook: id ?? "" }),
    enabled: !!id,
    retry: false,
  });

  const { mutateAsync: deleteBookFn } = useMutation({
    mutationFn: deleteBook,
    onSuccess() {
      navigate("/");
    },
  });

  const valueBrazilianFormatted = convertPriceBook(book?.preco ?? 0);
  const valueInstallmentBrazilianFormatted = convertPriceBook(
    (book?.preco ?? 0) / 2
  );

  const handleAddBookToCartClick = () => {
    if (qty > 0 && book) {
      if (hasBook(book)) {
        incrementQtyBookToTotalInCart(book.id, qty);
        toast.success(Messages.CART_UPDATED);
      } else {
        addBookToCart(book, qty);
        toast.success(Messages.CART_ADDED);
      }
    }
  };

  const handleUpdateColorRadio = (color: string) => {
    setColor(color);
  };

  const handleQtyChange = (qty: number) => {
    setQty(qty);
  };

  const handleDeleteBookClick = async () => {
    if (book) await deleteBookFn({ idBook: book.id });
    toast.success(Messages.BOOK_DELETED);
  };

  return {
    book,
    error,
    isLoading,
    color,
    qty,
    valueBrazilianFormatted,
    valueInstallmentBrazilianFormatted,
    handleAddBookToCartClick,
    handleUpdateColorRadio,
    handleQtyChange,
    handleDeleteBookClick,
  };
};
