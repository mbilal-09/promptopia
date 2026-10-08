import { expect, test } from "@playwright/test";

test("homepage shows the brand, headline, and search box", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Promptopia").first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Discover & Share/i })
  ).toBeVisible();
  await expect(page.getByPlaceholder("Search a Prompt")).toBeVisible();
});
