import { useCart } from "../../contexts/CartContext";
import type { BookOrder } from "../../models/book-order";
import { convertPriceBook } from "../../utils";
import { InputNumberIncremental } from "../Forms/InputNumberIncremental";

interface CartItemProps {
  bookOrder: BookOrder;
}

export const CartItem = ({ bookOrder }: CartItemProps) => {
  const { updateBookTotalInCart } = useCart();
  const itemTotal = convertPriceBook(bookOrder.preco * bookOrder.quantidade);

  return (
    <div className="flex gap-6" key={bookOrder.id}>
      <div className="max-w-44">
        <img
          src={bookOrder.imagem ?? "/images/books/book-1.png"}
          alt=""
          className="rounded-lg"
        />
      </div>
      <div className="w-fit space-y-2">
        <p className="font-bold leading-[100%]">
          {bookOrder.titulo}, {bookOrder.autor}
        </p>
        <p className="text-teal-700 font-bold ">{itemTotal}</p>
        <InputNumberIncremental
          value={bookOrder.quantidade}
          onValueChange={(value) => {
            updateBookTotalInCart(bookOrder.id, value);
          }}
          containerClassName="w-4/8"
        />
      </div>
    </div>
  );
};
