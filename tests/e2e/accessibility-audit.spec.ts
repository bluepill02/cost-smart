import { test, expect } from '@playwright/test';

const calculators = [
  '/solar-roi',
  '/in/ppf-calculator',
  '/in/gst-calculator',
  '/home-loan-calculator',
  '/in/salary-calculator'
];

test.describe('Phase 1 Accessibility & UX Audit', () => {
  for (const url of calculators) {
    test(`Check accessibility for ${url}`, async ({ page }) => {
      await page.goto(url);

      // 1. Check for critical accessibility attributes
      // Inputs should have associated labels
      const inputs = await page.locator('input').all();
      for (const input of inputs) {
        const id = await input.getAttribute('id');
        if (id) {
          const label = await page.locator(`label[for="${id}"]`).count();
          expect(label, `Input with id "${id}" in ${url} missing associated label`).toBeGreaterThan(0);
        } else {
           // If no ID, check if it has aria-label or is wrapped in label
           const ariaLabel = await input.getAttribute('aria-label');
           if (!ariaLabel) {
               // warning: might be wrapped
           }
        }
      }

      // 2. Check for navigation landmarks
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();

      // 3. UI/UX: Check responsiveness (no horizontal scroll on mobile)
      await page.setViewportSize({ width: 375, height: 667 });
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
    });
  }

  test('Homepage Navigation Links work', async ({ page }) => {
    await page.goto('/');

    // Check if "Personal Finance" category exists
    await expect(page.getByText('Personal Finance')).toBeVisible();

    // Check if a specific new tool link exists and works
    const invoiceLink = page.getByRole('link', { name: 'Invoice Generator' });
    await expect(invoiceLink).toBeVisible();
    await expect(invoiceLink).toHaveAttribute('href', '/invoice-generator');
  });
});
