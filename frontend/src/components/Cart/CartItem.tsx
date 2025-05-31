import { useCart } from "@/contexts/CartContext";
import type { BookOrder } from "@/models/book-order";
import { convertPriceBook } from "@/utils";
import { InputNumberIncremental } from "@/components/Forms/InputNumberIncremental";
import { Trash } from "react-feather";

interface CartItemProps {
  bookOrder: BookOrder;
}

export const CartItem = ({ bookOrder }: CartItemProps) => {
  const { updateBookTotalInCart, deleteBookFromCart } = useCart();
  const itemTotal = convertPriceBook(bookOrder.preco);

  return (
    <div className="flex gap-6" key={bookOrder.id}>
      <div className="flex-1 lg:max-w-44">
        <img
          src={bookOrder.imagem ?? "/images/books/book-1.png"}
          alt=""
          className="rounded-lg object-fill"
        />
      </div>
      <div className="flex-1 lg:w-fit space-y-2">
        <p className="font-bold leading-[100%]">
          {bookOrder.titulo}, {bookOrder.autor}
        </p>
        <div className="flex gap-2 items-center">
          <p className="text-teal-700 font-bold ">{itemTotal}</p>
          <button onClick={() => deleteBookFromCart(bookOrder.id)}>
            <Trash size={17} className="text-red-500" />
          </button>
        </div>
        <InputNumberIncremental
          value={bookOrder.quantidade}
          onValueChange={(value) => {
            updateBookTotalInCart(bookOrder.id, value);
          }}
          containerClassName="w-3/4 lg:w-4/8"
        />
      </div>
    </div>
  );
};
