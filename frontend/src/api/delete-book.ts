import { api } from "@/lib/axios";

interface DeleteBookParams {
  idBook: number;
}
export const deleteBook = async ({ idBook }: DeleteBookParams) => {
  return api.delete(`/books/${idBook}`);
};
