import { Messages } from "@/constans/messages";
import { test, expect } from "@playwright/test";

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
