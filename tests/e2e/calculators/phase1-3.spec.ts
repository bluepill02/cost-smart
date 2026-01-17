import { test, expect } from '@playwright/test';

test.describe('Phase 1.3 Calculators', () => {

  test('India Income Tax Calculator (FY 2024-25)', async ({ page }) => {
    await page.goto('/in/income-tax-calculator');

    // Input: Gross Income ₹12,00,000 (12 Lakhs)
    const incomeInput = page.locator('input').first();
    await incomeInput.fill('1200000');

    // New Regime Calculation (Default):
    // Std Ded: 75,000. Taxable: 11,25,000
    // 0-3L: 0
    // 3-7L: 4L * 5% = 20,000
    // 7-10L: 3L * 10% = 30,000
    // 10-11.25L: 1.25L * 15% = 18,750
    // Total Tax: 20000 + 30000 + 18750 = 68,750
    // Cess 4%: 68750 * 0.04 = 2,750
    // Final Tax: 71,500

    // Look for New Regime Card Value
    const newRegimeCard = page.locator('.border-emerald-500').first();
    await expect(newRegimeCard).toContainText('₹71,500');
  });

  test('Salary Calculator (India Mode)', async ({ page }) => {
    await page.goto('/in/salary-calculator');

    // Input: 12 LPA CTC
    // Basic: 50% (6L) -> PF 12% of Basic = 72,000
    // PT: 2400 (200*12)
    // TDS: Approx 71,500 (from previous test) / 12 = ~5958/mo

    // In Hand = (12L / 12) - PF - PT - TDS
    // But wait, my calculator logic subtracts Employer PF from CTC first to get Gross?
    // Let's check logic:
    // monthlyCTC = 100,000
    // employerPF = 50,000 * 12% = 6,000
    // Gross = 100,000 - 6,000 = 94,000
    // Employee PF = 6,000
    // PT = 200
    // TDS = 5,958
    // Net = 94,000 - 6,000 - 200 - 5,958 = 81,842

    // Check Result
    // Allow range because TDS might vary slightly due to rounding in annual tax logic
    // Expect ~₹81,800
    const netPay = page.locator('.text-4xl.font-bold.text-emerald-400');
    await expect(netPay).toContainText(/₹81,8/);
  });

  test('Debt Payoff Calculator', async ({ page }) => {
    await page.goto('/debt-payoff-calculator');

    // 1. Verify Default Debts exist
    // Row 1
    await expect(page.getByLabel('Name').nth(0)).toHaveValue('Credit Card');
    await expect(page.getByLabel('Balance').nth(0)).toHaveValue('5000');

    // Row 2
    await expect(page.getByLabel('Name').nth(1)).toHaveValue('Car Loan');
    await expect(page.getByLabel('Balance').nth(1)).toHaveValue('12000');

    // 2. Add a new debt: Personal Loan, 3000, 12%, 100
    await page.getByRole('button', { name: 'Add Debt' }).click();

    // Fill the 3rd row (index 2)
    await page.getByLabel('Name').nth(2).fill('Personal Loan');
    await page.getByLabel('Balance').nth(2).fill('3000');
    await page.getByLabel('Rate (%)').nth(2).fill('12');
    await page.getByLabel('Min Pay').nth(2).fill('100');

    // 3. Set Budget to 1000
    await page.getByLabel('Total Monthly Payment Budget').fill('1000');

    // 4. Verify Result
    // Budget 1000. Total Min = 150+300+100 = 550. Extra = 450.
    // Avalanche: Pay 18% (CC) first.
    // CC Balance 5000. Pay 150+450=600/mo. Clear in ~9 months.
    // Then tackle 12% (Personal).
    // Then 6% (Car).

    const resultHeader = page.locator('.text-4xl.font-bold.text-emerald-400');
    await expect(resultHeader).toBeVisible();

    // Check for "Avalanche" being the suggested method
    // The result card is the dark one: bg-slate-900.
    const resultCard = page.locator('.bg-slate-900').filter({ hasText: 'Debt Free In' });
    await expect(resultCard).toContainText('avalanche', { ignoreCase: true });

    // Also check the Expert Tip
    const expertTip = page.locator('.bg-blue-50'); // Expert tip container
    await expect(expertTip).toContainText('Avalanche is mathematically superior');
  });

});
