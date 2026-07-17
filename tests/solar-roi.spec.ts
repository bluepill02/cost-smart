import { test, expect } from '@playwright/test';

test('solar roi calculator flow', async ({ page }) => {
  // Navigate to Solar ROI landing page
  await page.goto('/solar-roi');

  // Expect title
  await expect(page).toHaveTitle(/Solar ROI/);

  // The app/solar-roi/page.tsx no longer uses <CitySearch>, but lists cities directly
  // Find Los Angeles in the US cities list
  const cityLink = page.getByRole('link', { name: 'Los Angeles California' });
  await expect(cityLink).toBeVisible();

  // Navigate
  await Promise.all([
    page.waitForURL(/\/solar-roi\/los-angeles/i),
    cityLink.click()
  ]);

  // Verify city page content
  const heading = page.locator('h1').first();
  await expect(heading).toContainText(/Los Angeles/i);
});
