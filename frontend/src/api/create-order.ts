import { api } from "@/lib/axios";

interface CreateOrderParams {
  cliente: string;
  books: {
    id: number;
    quantidade: number;
  }[];
}
export const createOrder = async ({ cliente, books }: CreateOrderParams) => {
  return api.post(`/orders`, {
    cliente,
    books,
  });
};
