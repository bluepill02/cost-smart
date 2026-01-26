import { test, expect } from '@playwright/test';

test('Currency Converter Client-Side Caching', async ({ page }) => {
  const requests: string[] = [];

  // Monitor network requests
  page.on('request', request => {
    if (request.url().includes('api.frankfurter.app/latest')) {
      requests.push(request.url());
    }
  });

  await page.goto('/currency');

  // Verify initial load doesn't trigger client-side fetch (should be SSR'd)
  // We wait for the component to be visible to ensure effects have run
  await expect(page.locator('text=Live Converter')).toBeVisible();
  // Wait a small amount to ensure no immediate effects fired
  await page.waitForTimeout(1000);
  expect(requests.length, 'Initial load should not trigger client fetch').toBe(0);

  // Switch to EUR
  await page.locator('#from').click();
  const eurResponsePromise = page.waitForResponse(resp => resp.url().includes('from=EUR'));
  await page.getByRole('option', { name: 'EUR', exact: true }).click();
  await eurResponsePromise;

  // Switch back to USD
  await page.locator('#from').click();
  await page.getByRole('option', { name: 'USD', exact: true }).click();

  // Wait to see if a request is made
  await page.waitForTimeout(2000);

  console.log(`Total API requests captured: ${requests.length}`);
  requests.forEach(r => console.log(`- ${r}`));

  // This assertion is expected to fail on unoptimized code (Expect 2, want 1)
  expect(requests.length, 'Should cache previously fetched rates').toBe(1);
});
