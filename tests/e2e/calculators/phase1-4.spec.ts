import { test, expect } from '@playwright/test';

test.describe('Phase 1.4 Calculators', () => {

  test('GST Calculator (India)', async ({ page }) => {
    await page.goto('/in/gst-calculator');

    const amountInput = page.getByLabel('Amount (₹)');
    // const rateInput = page.getByLabel('GST Rate (%)'); // Not used directly, relying on buttons/default

    // 1. Exclusive Check
    // Default Exclusive. Amount 10000. Rate 18.
    // Total should be 11800.
    // Target the dark result card
    const resultCard = page.locator('.bg-slate-900').filter({ hasText: 'Result Breakdown' });
    await expect(resultCard).toContainText('₹11,800');

    // Check Breakdown
    await expect(resultCard).toContainText('CGST (9%)');
    await expect(resultCard).toContainText('SGST (9%)');

    // 2. Inclusive Check
    await page.getByLabel('GST Inclusive').click();
    // Amount 10000 is now Total.
    // Net should be 10000 / 1.18 = 8474.57
    // Wait for update
    await expect(resultCard).toContainText('₹10,000');
    // Pre-Tax check
    await expect(resultCard).toContainText('Net Amount (Pre-Tax)');
    // Just verify the value is roughly correct
    await expect(resultCard).toContainText('₹8,475'); // rounded
  });

  test('Home Loan Calculator (With Prepayment)', async ({ page }) => {
    await page.goto('/home-loan-calculator');

    // Default: 50L, 8.5%, 20Y.
    // EMI check: ~43,391
    const resultCard = page.locator('.bg-slate-900').filter({ hasText: 'Loan Summary' });
    await expect(resultCard).toContainText('₹43,391');

    // Enable Prepayment
    await page.getByLabel('Enable Prepayment').click();

    // Default Prepayment: 10,000/mo after 12 months.
    // This should save interest.
    // Check "Prepayment Savings" section appears
    const savingsSection = page.locator('text=Prepayment Savings');
    await expect(savingsSection).toBeVisible();

    // Check Saved Interest is present and non-zero
    // It should be roughly 10-20 Lakhs for this config.
    const savedInterest = page.locator('.text-white.text-lg').first();
    const savedText = await savedInterest.textContent();
    expect(savedText).not.toBe('₹0');
    expect(savedText).toContain('₹');
  });

  test('Rent vs Buy Calculator', async ({ page }) => {
    await page.goto('/rent-vs-buy-calculator');

    // Check Tabs exist
    await expect(page.getByRole('tab', { name: 'Buying Details' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Renting & Market' })).toBeVisible();

    // Default Scenario: 50L House vs 15k Rent.
    // Usually Buying wins or is close.
    // Let's bias it towards Renting to check logic.
    // Increase Interest Rate to 12%
    // Note: Use getByLabel now that IDs are fixed
    await page.getByLabel('Interest Rate (%)').fill('12');
    // Increase Maintenance to 2%
    await page.getByLabel('Maintenance Cost (%/yr)').fill('2');

    // Check Verdict
    const verdict = page.locator('.text-4xl.font-bold').first(); // Ensure we get the main verdict
    // Renting should likely win with high interest and maintenance costs vs low rent
    await expect(verdict).toContainText('RENT', { ignoreCase: true });

    // Now bias towards Buying
    // Low interest 6%
    await page.getByLabel('Interest Rate (%)').fill('6');
    // Low Maintenance 0.1%
    await page.getByLabel('Maintenance Cost (%/yr)').fill('0.1');

    // Go to Rent Tab to change inflation parameters
    await page.getByRole('tab', { name: 'Renting & Market' }).click();
    await page.getByLabel('Rent Inflation (%/yr)').fill('10');

    // Wait for recalc
    // Buying should win
    await expect(verdict).toContainText('BUY', { ignoreCase: true });
  });

});
