import { BookCard } from "@/components/Cards/BookCard";
import type { Book } from "@/models/book";

interface NewBooksSectionProps {
  books: Book[];
}

export const NewBooksSection = ({ books }: NewBooksSectionProps) => {
  return (
    <section className="flex flex-col gap-2">
      <p className="font-bold text-lg">Novidades</p>

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
  );
};
