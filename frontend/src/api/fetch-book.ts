import { api } from "../lib/axios";
import type { Book } from "../models/book";

interface FetchBookParams {
  idBook: string;
}
export const fetchBook = async ({ idBook }: FetchBookParams) => {
  const response = await api.get<Book>(`/books/search/${idBook}`);
  return response.data;
};
