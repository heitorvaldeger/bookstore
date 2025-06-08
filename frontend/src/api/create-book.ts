import { api } from "@/lib/axios";
import type { Book } from "@/models/book";

interface CreateBookParams {
  book: Omit<Book, "id">;
}
export const createBook = async ({ book }: CreateBookParams) => {
  return api.post(`/books/`, book);
};
