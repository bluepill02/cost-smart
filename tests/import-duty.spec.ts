import { test, expect } from '@playwright/test';

test.describe('Import Duty Calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/import-duty');
    });

    test('calculates duty and landed cost correctly', async ({ page }) => {
        // 1. Check title
        await expect(page).toHaveTitle(/Import Duty/);

        // 2. Fill out form
        // Origin: China
        // We need to interact with Select components.
        // Radix UI Select usually exposes a button with role 'combobox'.
        // We need to be specific about WHICH combobox.

        // Origin
        await page.getByLabel('Origin Country').click();
        await page.getByRole('option', { name: 'China' }).click();

        // Destination
        await page.getByLabel('Destination Country').click();
        await page.getByRole('option', { name: 'USA' }).click();

        // Category
        await page.getByLabel('Product Category').click();
        await page.getByRole('option', { name: 'Electronics' }).click();

        // Value
        await page.getByLabel('Product Value ($)').fill('1000');

        // 3. Verify Results
        // Based on DUTY_MATRIX['USA']['China']['Electronics'] = 0.25 (25%)
        // VAT/Sales Tax for USA in code is set to 0.005 (0.5%)
        // Duty = 1000 * 0.25 = 250
        // VAT = (1000 + 250) * 0.005 = 6.25
        // Total = 1000 + 250 + 6.25 = 1256.25

        // Wait for result to appear
        await expect(page.getByText('Estimated Total')).toBeVisible();

        // Check values
        // Scope to the result card which contains the breakdown
        const resultCard = page.locator('.text-4xl.font-extrabold').filter({ hasText: '$' }).last();
        await expect(resultCard).toContainText('$1256.25');
    });

    test('manual duty rate override works', async ({ page }) => {
        // Destination: UK (Currency £)
        await page.getByLabel('Destination Country').click();
        await page.getByRole('option', { name: 'UK' }).click();

        // Origin needed for calculation trigger
        await page.getByLabel('Origin Country').click();
        await page.getByRole('option', { name: 'USA' }).click();

        // Select 'Custom' category
        await page.getByLabel('Product Category').click();
        await page.getByRole('option', { name: 'Custom / Other' }).click();

        // Enter manual rate: 50%
        await page.getByLabel('Duty Rate (%)').fill('50');

        // Enter Value: 100
        await page.getByLabel('Product Value (£)').fill('100');

        // Calculation:
        // Duty = 100 * 0.50 = 50
        // VAT UK = 20% (0.20)
        // VAT = (100 + 50) * 0.20 = 30
        // Total = 100 + 50 + 30 = 180

        const resultCard = page.locator('.text-4xl.font-extrabold').filter({ hasText: '£' }).last();
        await expect(resultCard).toContainText('£180.00');
    });
});
