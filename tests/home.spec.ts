import { test, expect } from '@playwright/test';

test('homepage has title and links to calculators', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/CostSmart/);

  // Check for presence of navigation or main headings
  await expect(page.locator('h1')).toBeVisible();

  // Check if there is a link to Solar ROI calculator
  // Depending on the actual content, this selector might need adjustment
  // Based on "Financial Calculators for the Modern Economy", there should be links.

  // Let's verify the "Solar ROI" link exists in the navbar or body
  const solarLink = page.getByRole('link', { name: /Solar/i }).first();
  await expect(solarLink).toBeVisible();
});
