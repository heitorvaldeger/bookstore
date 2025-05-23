import { BookCategoryEnum, type Book } from "@/models/book";
import { test as base } from "@playwright/test";

const baseURL = `${process.env.VITE_API_URL}/api/books`;

type CustomFixture = {
  book: Book;
};

export const test = base.extend<CustomFixture>({
  book: async ({ request }, use) => {
    const response = await request.post(baseURL, {
      data: {
        titulo: "Livro de Teste",
        autor: "Autor de Teste",
        descricao: "Descricao de Teste",
        categoria: BookCategoryEnum.SCIENCE,
        estoque: 100,
        imagem: "",
        preco: 9999,
      },
    });

    const data = await response.json();
    await use(data); // <- passa o dado pro teste

    await request.delete(`${baseURL}/${data.id}`);
  },
});

export { expect } from "@playwright/test";
