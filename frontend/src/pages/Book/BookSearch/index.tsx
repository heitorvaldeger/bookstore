import { BookCard } from "@/components/Cards/BookCard";
import { useBookSearch } from "./useBookSearch";

export const BookSearch = () => {
  const { books } = useBookSearch();

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
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
  );
};
