import { test, expect } from "./_custom.fixture";

test("navigate to book when input search is filled", async ({ page, book }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Pesquisar e filtrar" })
    .fill(book.titulo);
  await page
    .getByRole("textbox", { name: "Pesquisar e filtrar" })
    .press("Enter");

  expect(page.url()).toContain(
    `/books?${new URLSearchParams({
      q: book.titulo,
    }).toString()}`
  );
});

test("show book card with correct information", async ({ page, book }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Pesquisar e filtrar" })
    .fill(book.titulo);
  await page
    .getByRole("textbox", { name: "Pesquisar e filtrar" })
    .press("Enter");

  await page.waitForLoadState("networkidle");

  expect(page.getByTestId(`book-card-${book.id}`)).toBeVisible();
});
