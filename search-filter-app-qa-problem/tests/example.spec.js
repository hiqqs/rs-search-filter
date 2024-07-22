// @ts-check
import { test, expect } from "@playwright/test";

test("page has title", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Search and Filter Example/);
});
