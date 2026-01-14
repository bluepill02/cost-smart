import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', title: 'CostSmart', h1: 'Financial Calculators' }, // h1 content might vary, we'll check presence
  { path: '/solar-roi', title: 'Solar ROI', h1: 'Select Your City' },
  { path: '/import-duty', title: 'Import Duty', h1: 'Import Duty Calculator' },
  { path: '/about', title: 'About', h1: 'About CostSmart' }, // Assuming content
  { path: '/privacy', title: 'Privacy', h1: 'Privacy Policy' }, // Assuming content
  { path: '/terms', title: 'Terms', h1: 'Terms of Service' }, // Assuming content
];

test.describe('SEO & Structural Audit', () => {

  for (const { path, title } of pages) {
    test(`Check SEO metadata for ${path}`, async ({ page }) => {
      // 404 handling check - if page doesn't exist, this test will likely fail on title check or timeout
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      // Title Check
      await expect(page).toHaveTitle(new RegExp(title, 'i'));

      // Meta Description Check
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveCount(1);
      const descText = await description.getAttribute('content');
      expect(descText).toBeTruthy();
      expect(descText?.length).toBeGreaterThan(10); // Ensure it's not empty or trivial

      // Canonical URL Check
      const canonical = page.locator('link[rel="canonical"]');
      // Some pages might not have canonical set explicitly yet, but they SHOULD.
      // We will check if it exists.
      // Note: app/layout.tsx sets metadataBase, so next.js might auto-generate it if configured,
      // or we manually set it in page.tsx.
      // Let's verify if it's there.
      await expect(canonical).toHaveCount(1);
      const href = await canonical.getAttribute('href');
      expect(href).toContain(path === '/' ? 'cost-smart-five.vercel.app' : path.substring(1));
    });

    test(`Check H1 structure for ${path}`, async ({ page }) => {
      await page.goto(path);
      const h1s = page.locator('h1');
      await expect(h1s).toHaveCount(1);
    });
  }

  // Specific check for Solar City Page to ensure dynamic SEO works
  test('Check SEO for dynamic Solar City page', async ({ page }) => {
      await page.goto('/solar-roi/Denver');
      await expect(page).toHaveTitle(/Denver/i);

      const h1 = page.locator('h1');
      await expect(h1).toContainText('Denver');

      const description = page.locator('meta[name="description"]');
      const descText = await description.getAttribute('content');
      expect(descText).toContain('Denver');
  });

});
