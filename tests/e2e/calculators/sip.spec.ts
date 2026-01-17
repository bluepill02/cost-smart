import { test, expect } from '@playwright/test';

test.describe('SIP Calculator (India)', () => {

  test('Calculates SIP Returns Correctly', async ({ page }) => {
    await page.goto('/in/sip-calculator');

    // Input: ₹10,000 monthly, 12% return, 10 years
    await page.locator('input#monthly').fill('10000');
    await page.locator('input#initial').fill('0');
    await page.locator('input#rate').fill('12');
    await page.locator('input#years').fill('10');

    // Expected Calculation:
    // Future Value of SIP = P * [ (1+i)^n - 1 ] / i * (1+i)
    // P = 10000, n = 120, i = 0.01
    // FV = 10000 * [ (1.01)^120 - 1 ] / 0.01 * 1.01
    // FV ≈ 10000 * 230.038 * 1.01 ≈ 23,23,390
    // Total Invested = 12,00,000

    const maturityValue = page.locator('.text-2xl.font-bold.text-emerald-400').first();
    const wealthGained = page.locator('.text-2xl.font-bold.text-emerald-600').first();

    // Allow slight rounding differences
    await expect(maturityValue).toContainText('₹23,23,391');
    await expect(wealthGained).toContainText('+₹11,23,391');
  });

});
