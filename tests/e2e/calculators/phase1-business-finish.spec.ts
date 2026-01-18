import { test, expect } from '@playwright/test';

test.describe('Phase 1.6 Business Calculators', () => {

  test('Business Loan Calculator works correctly', async ({ page }) => {
    await page.goto('/business-loan-calculator');
    await expect(page).toHaveTitle(/Business Loan EMI Calculator/);

    // Default Inputs: 25L, 12%, 5 Years, 1Cr Turnover, 3 Years Vintage
    // EMI should be present.
    await expect(page.getByText('Estimated EMI')).toBeVisible();

    // Check Eligibility Badge (Should be High Approval Chance by default)
    await expect(page.getByText('High Approval Chance')).toBeVisible();

    // Change Turnover to low (1L) -> EMI > 15% -> High Risk
    await page.getByLabel('Annual Turnover').fill('100000');
    await expect(page.getByText('Approval Risk')).toBeVisible();
  });

  test('GST Input Credit Calculator works correctly', async ({ page }) => {
    await page.goto('/in/gst-input-credit-calculator');

    // Case 1: Payable
    await page.getByLabel('Output Tax Liability').fill('50000');
    await page.getByLabel('Input Tax Credit').fill('35000');

    // Net Payable = 15000
    await expect(page.getByText('Net Payable in Cash')).toBeVisible();
    await expect(page.locator('.text-4xl:not(.text-slate-900)')).toContainText('15,000');

    // Case 2: Credit
    await page.getByLabel('Input Tax Credit').fill('60000');
    await expect(page.getByText('Credit Carried Forward')).toBeVisible();
    await expect(page.locator('.text-4xl:not(.text-slate-900)')).toContainText('10,000');
  });

  test('TDS Calculator works correctly', async ({ page }) => {
    await page.goto('/in/tds-calculator');

    await page.getByLabel('Payment Amount').fill('100000');

    // Default might be 194J (10%) -> 10,000
    await expect(page.getByText('TDS to Deduct')).toBeVisible();
    await expect(page.locator('.text-4xl:not(.text-slate-900)')).toContainText('10,000');

    // Switch to No PAN
    await page.getByText('No', { exact: true }).click({ force: true });
    // Should be 20% -> 20,000
    await expect(page.locator('.text-4xl:not(.text-slate-900)')).toContainText('20,000');
    await expect(page.getByText('High TDS Alert')).toBeVisible();
  });

  test('Shipping Calculator works correctly', async ({ page }) => {
    await page.goto('/shipping-cost-calculator');

    // 30x20x15 = 9000 cm3. /5000 = 1.8kg Volumetric.
    // Actual = 2kg. Chargeable = 2kg. Rate = 50. Total = 100.

    await page.getByLabel('Length').fill('30');
    await page.getByLabel('Width').fill('20');
    await page.getByLabel('Height').fill('15');
    await page.getByLabel('Actual Weight').fill('2');
    await page.getByLabel('Estimated Rate per kg').fill('50');

    // Check Cost
    await expect(page.locator('.text-4xl:not(.text-slate-900)')).toContainText('100');

    // Make it Volumetric: 50x50x50 = 125000 / 5000 = 25kg.
    await page.getByLabel('Length').fill('50');
    await page.getByLabel('Width').fill('50');
    await page.getByLabel('Height').fill('50');

    // Update weight to low so volumetric triggers
    await page.getByLabel('Actual Weight').fill('1');

    // Chargeable = 25kg. Cost = 25 * 50 = 1250.
    await expect(page.locator('.text-4xl:not(.text-slate-900)')).toContainText('1,250');
  });

  test('Invoice Generator renders correctly', async ({ page }) => {
    await page.goto('/invoice-generator', { waitUntil: 'networkidle' });

    // Verify Page Title in Preview
    await expect(page.locator('#invoice-preview h1')).toContainText('INVOICE');

    // Check Inputs (use ByLabel since placeholder might be flaky if value exists)
    // Actually the inputs have labels in a div above them.
    // Use locator with value attribute
    await expect(page.locator('input[value="Your Business Name"]')).toBeVisible();

    await page.locator('input[value="Your Business Name"]').fill('Acme Corp');
    await page.locator('input[value="Client Name"]').fill('Beta Ltd');

    // Check Preview Update
    await expect(page.locator('#invoice-preview')).toContainText('Acme Corp');
    await expect(page.locator('#invoice-preview')).toContainText('Beta Ltd');

    // Add Item
    await page.getByRole('button', { name: 'Add Item' }).click();
    await expect(page.locator('#invoice-preview tbody tr')).toHaveCount(2); // Initial 1 + Added 1

    // Check Total
    // 1 item default: 500 * 1 = 500. Tax 10% = 50. Total 550.
    // The second item is empty (0).
    // Let's verify the first total.
    await expect(page.locator('#invoice-preview')).toContainText('550');
  });

});
