import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/api/fetch-books";

export const useHome = () => {
  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const booksSliced = books?.slice(0, 5);

  return {
    booksSliced,
  };
};
