import { test, expect } from '@playwright/test';

test.describe('PPF Calculator (India)', () => {

  test('Calculates PPF Maturity Correctly (15 Years)', async ({ page }) => {
    await page.goto('/in/ppf-calculator');

    // Input: ₹1,50,000 (Max Limit)
    await page.locator('input#investment').fill('150000');

    // Rate is fixed at 7.1% in the code currently
    // Years fixed at 15

    // Expected Calculation:
    // A = P * [ ( (1+i)^n - 1 ) / i ]
    // (Assuming annual compounding at start of year for simplicity in current implementation)
    // Code implementation: Annual compounding loop.
    // Let's verify what the code produces matches its own logic.
    // Logic in code:
    // for i=1 to 15:
    //   totalInvested += 150000
    //   interest = (balance + 150000) * 0.071
    //   balance += 150000 + interest

    // Year 1: 150000 + 10650 = 160650
    // ...
    // Final Value approx ₹40,68,209 (Standard PPF calculator value usually around this)

    const maturityValue = page.locator('.text-2xl.font-bold.text-emerald-700').first();
    await expect(maturityValue).toContainText('₹40,68,209');
  });

});
