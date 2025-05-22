import { test, expect } from "@playwright/test";

test("navigate to book when input search is filled", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Pesquisar e filtrar" })
    .fill("cosmos");
  await page
    .getByRole("textbox", { name: "Pesquisar e filtrar" })
    .press("Enter");

  expect(page.url()).toContain("/books?q=cosmos");
});

test("show book card with correct information", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Pesquisar e filtrar" })
    .fill("cosmos");
  await page
    .getByRole("textbox", { name: "Pesquisar e filtrar" })
    .press("Enter");

  await page.waitForLoadState("networkidle");

  expect(page.getByTestId("book-card-4")).toBeVisible();
});
