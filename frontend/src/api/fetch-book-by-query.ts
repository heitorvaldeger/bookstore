import { api } from "@/lib/axios";
import type { Book } from "@/models/book";

interface FetchBookByQueryParams {
  q: string;
}
export const fetchBookByQuery = async ({ q }: FetchBookByQueryParams) => {
  const response = await api.get<Book[]>("/books/search", {
    params: {
      q,
    },
  });
  return response.data;
};
