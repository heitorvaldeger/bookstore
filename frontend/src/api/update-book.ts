import { api } from "@/lib/axios";
import type { Book } from "@/models/book";

interface UpdateBookParams {
  book: Book;
}
export const updateBook = async ({
  book: { id, ...restBook },
}: UpdateBookParams) => {
  return api.put(`/books/${id}`, restBook);
};
