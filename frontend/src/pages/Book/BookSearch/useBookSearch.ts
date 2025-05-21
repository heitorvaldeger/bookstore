import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { fetchBookByQuery } from "@/api/fetch-book-by-query";
import { fetchBooks } from "@/api/fetch-books";

export const useBookSearch = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const { data: books } = useQuery({
    queryKey: q ? ["books", "q", q] : ["books"],
    queryFn: q ? () => fetchBookByQuery({ q }) : fetchBooks,
    enabled: true,
  });

  return {
    books,
  };
};
