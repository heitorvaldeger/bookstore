import { Messages } from "@/constans/messages";
import { test, expect } from "@playwright/test";

test("navigate to sign-in page", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Acessar sistema" }).click();

  expect(page.url()).toContain("/login");
});

test("sign-in with incorrect credentials", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });

  await page.locator('input[name="email"]').fill("incorrect@mail.com");
  await page.locator('input[name="password"]').fill("incorrect-password");

  await page.getByRole("button", { name: "Entrar" }).click();

  const toastUpdated = page.getByText(Messages.INVALID_CREDENTIALS);
  await expect(toastUpdated).toBeVisible();
});

test("sign-in with correct credentials", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });

  await page.locator('input[name="email"]').fill("mail@mail.com");
  await page.locator('input[name="password"]').fill("1234");

  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page.getByText("Área administrativa")).toBeVisible();
});
