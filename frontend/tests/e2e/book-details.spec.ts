import { Messages } from "@/constans/messages";
import { test, expect } from "./_custom.fixture";

test("book details cart actions", async ({ page, book }) => {
  await page.goto(`/books/${book?.id}`, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Adicionar à sacola" }).click();

  const toastAdded = page.getByText(Messages.CART_ADDED);
  await expect(toastAdded).toBeVisible();

  await page.getByRole("button", { name: "Adicionar à sacola" }).click();

  const toastUpdated = page.getByText(Messages.CART_UPDATED);
  await expect(toastUpdated).toBeVisible();

  await expect(page.getByTestId("cart-quantity")).toContainText("1");
});

test("show book details with correct values", async ({ page, book }) => {
  await page.goto(`/books/${book?.id}`, { waitUntil: "networkidle" });

  await expect(page.getByTestId("book.title-author")).toBeVisible();
  await expect(page.getByTestId("book.price")).toBeVisible();
});
