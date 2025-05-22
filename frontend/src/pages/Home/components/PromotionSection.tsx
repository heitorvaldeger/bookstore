import { BookCard } from "@/components/Cards/BookCard";
import type { Book } from "@/models/book";
import { CaretRightIcon } from "@radix-ui/react-icons";

interface PromotionSectionProps {
  books: Book[];
}

export const PromotionSection = ({ books }: PromotionSectionProps) => {
  return (
    <section className="space-y-4">
      <img src="/images/promotion-display.png" className="object-fill w-full" />

      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">Promoções</p>
          <button className="flex items-center font-inter text-xs px-2 py-1 border-[1px] rounded-full">
            Ver mais <CaretRightIcon />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {books?.map((book) => (
            <BookCard
              key={book.id}
              idBook={book.id}
              preco={book.preco}
              titulo={book.titulo}
              autor={book.autor}
              imagem={book.imagem}
            />
          ))}
        </div>
      </section>
    </section>
  );
};
