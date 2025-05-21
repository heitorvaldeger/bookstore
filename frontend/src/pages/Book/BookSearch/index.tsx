import { useSearchParams } from "react-router";
import { BookCard } from "../../../components/Cards/BookCard";
import { useQuery } from "@tanstack/react-query";
import { fetchBookByQuery } from "../../../api/fetch-book-by-query";
import { fetchBooks } from "../../../api/fetch-books";

export const BookSearch = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const { data: books } = useQuery({
    queryKey: q ? ["books", "q", q] : ["books"],
    queryFn: q ? () => fetchBookByQuery({ q }) : fetchBooks,
    enabled: true,
  });

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
