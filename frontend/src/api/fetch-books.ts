import { api } from "../lib/axios";
import type { Book } from "../models/book";

export const fetchBooks = async () => {
  const response = await api.get<Book[]>("/books");
  return response.data;
};
