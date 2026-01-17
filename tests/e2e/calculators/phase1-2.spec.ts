import { test, expect } from '@playwright/test';

test.describe('Phase 1.2 Calculators', () => {

  test('Fixed Deposit Calculator (Quarterly Compounding)', async ({ page }) => {
    await page.goto('/in/fd-calculator');

    // Input: ₹1,00,000, 7.5%, 5 Years
    await page.locator('input#principal').fill('100000');
    await page.locator('input#rate').fill('7.5');
    await page.locator('input#years').fill('5');

    // Formula: A = P(1 + r/4)^(4n)
    // A = 100000 * (1 + 0.075/4)^(20)
    // A ≈ 1,44,995

    // Check Result using more robust selector (by text content proximity)
    // Look for "Maturity Amount" text, then find the value in the next element or container
    const maturityCard = page.locator('.text-slate-400', { hasText: 'Maturity Amount' }).locator('..');

    // Allow slight rounding/formatting differences
    await expect(maturityCard).toContainText('₹1,44,995');
  });

  test('Emergency Fund Calculator', async ({ page }) => {
    await page.goto('/emergency-fund-calculator');

    // Input: $5,000 Monthly Expense, 6 Months, $10,000 Current
    // Using IDs for robustness
    const monthlyExpense = page.locator('#monthlyExpense');
    await monthlyExpense.waitFor({ state: 'visible' });
    await monthlyExpense.fill('5000');

    // Default months is 6.

    await page.locator('#currentSavings').fill('10000');

    // Required: 5000 * 6 = 30000
    // Gap: 30000 - 10000 = 20000

    await expect(page.locator('.text-slate-400', { hasText: 'Target Emergency Fund' }).locator('..')).toContainText('$30,000');
    await expect(page.locator('text=Gap to Goal').locator('..')).toContainText('$20,000');
  });

});
