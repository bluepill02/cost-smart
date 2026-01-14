import { test, expect } from '@playwright/test';

test('solar roi calculator flow', async ({ page }) => {
  // Navigate to Solar ROI landing page
  await page.goto('/solar-roi');

  // Expect title
  await expect(page).toHaveTitle(/Solar ROI/);

  // Check if City Search input is visible
  // Based on app/solar-roi/page.tsx, it uses <CitySearch>
  const searchInput = page.getByPlaceholder('Search for your city...');
  await expect(searchInput).toBeVisible();

  // Type a city name
  await searchInput.fill('Denver');

  // Verify that the link for Denver appears
  const cityLink = page.getByRole('link', { name: 'Denver USA' });
  await expect(cityLink).toBeVisible();

  // Navigate
  await Promise.all([
    page.waitForURL(/\/solar-roi\/Denver/),
    cityLink.click()
  ]);

  // Verify city page content
  await expect(page.locator('h1')).toContainText('Denver');

  // Verify that at least one "View Example" link exists (if featured city is present)
  // The code in app/solar-roi/page.tsx shows a link to a featured city
  const exampleLink = page.getByRole('link', { name: /View Example/i });
  if (await exampleLink.isVisible()) {
      await exampleLink.click();
      // Should navigate to a city page
      await expect(page).toHaveURL(/\/solar-roi\/.+/);
  }
});
