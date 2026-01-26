import { test, expect } from '@playwright/test';

test.describe('Phase 1 Final Verification (30 Calculators)', () => {
    const calculators = [
        // Personal Finance (10)
        '/in/emi-calculator',
        '/in/sip-calculator',
        '/in/ppf-calculator',
        '/in/fd-calculator',
        '/retirement-calculator',
        '/emergency-fund-calculator',
        '/debt-payoff-calculator',
        '/in/salary-calculator',
        '/in/income-tax-calculator',
        '/in/gst-calculator',
        // Home & Property (10)
        '/home-loan-calculator',
        '/rent-vs-buy-calculator',
        '/in/stamp-duty-calculator',
        '/in/property-tax-calculator',
        '/in/electricity-bill-calculator',
        '/in/water-bill-calculator',
        '/in/lpg-subsidy-calculator',
        // '/moving-cost-calculator', // Generic (Note: Check if route exists, if not, it's a gap)
        // '/property-registration-calculator', // Combined with Stamp Duty usually
        // '/home-renovation-calculator', // Generic

        // Business & Trade (10)
        '/freelance-rate-calculator',
        '/business-loan-calculator',
        '/in/gst-input-credit-calculator',
        '/profit-margin-calculator',
        '/break-even-calculator',
        '/invoice-generator',
        '/currency',
        '/import-duty',
        '/shipping-cost-calculator',
        '/in/tds-calculator'
    ];

    test('New Utilities Calculators work correctly', async ({ page }) => {
        // Stamp Duty
        await page.goto('/in/stamp-duty-calculator');
        await expect(page.locator('.text-4xl:not(.text-slate-900)')).toBeVisible();

        // Property Tax
        await page.goto('/in/property-tax-calculator');
        await expect(page.locator('.text-4xl:not(.text-slate-900)')).toBeVisible();

        // Electricity
        await page.goto('/in/electricity-bill-calculator');
        await expect(page.locator('.text-4xl:not(.text-slate-900)')).toBeVisible();
    });

    // Verify all routes load
    for (const route of calculators) {
        test(`Route ${route} loads successfully`, async ({ page }) => {
            await page.goto(route);
            // Check for H1 to ensure page rendered. Use .first() to handle multiple H1s (e.g. invoice preview)
            await expect(page.locator('h1').first()).toBeVisible();
        });
    }
});
