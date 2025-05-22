import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchBook } from "@/api/fetch-book";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { convertPriceBook } from "@/utils";
import { toast } from "sonner";
import { Messages } from "@/constans/messages";

export const useBookDetail = () => {
  const { id } = useParams();
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
  const { addBookToCart, hasBook, incrementQtyBookToTotalInCart } = useCart();

  const [color, setColor] = useState("Azul");
  const [qty, setQty] = useState(1);

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
  };
};
