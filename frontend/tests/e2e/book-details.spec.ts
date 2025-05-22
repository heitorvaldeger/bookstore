import { Messages } from "@/constans/messages";
import { BookCategoryEnum } from "@/models/book";
import { test, expect } from "@playwright/test";

test.beforeAll(async ({ request }) => {
  await request.post(`${process.env.VITE_API_URL}/books`, {
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
});

test("book details cart actions", async ({ page }) => {
  await page.goto("/books/1", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Adicionar à sacola" }).click();

  const toastAdded = page.getByText(Messages.CART_ADDED);
  await expect(toastAdded).toBeVisible();

  await page.getByRole("button", { name: "Adicionar à sacola" }).click();

  const toastUpdated = page.getByText(Messages.CART_UPDATED);
  await expect(toastUpdated).toBeVisible();

  await expect(page.getByTestId("cart-quantity")).toContainText("1");
});

test("show book details with correct values", async ({ page }) => {
  await page.goto("/books/1", { waitUntil: "networkidle" });

  await expect(page.getByText("A Brief History of Time")).toBeVisible();
  await expect(page.getByText("R$ 45,90")).toBeVisible();
});

test("navigate to book detail page", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page
    .getByRole("link", { name: "A Brief History of Time," })
    .first()
    .click();

  expect(page.url()).toContain("/books/1");
});
