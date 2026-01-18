import { test, expect } from '@playwright/test';

test.describe('EMI Calculator (Global & India)', () => {

  test('Global Loan Calculator ($) calculates correctly', async ({ page }) => {
    await page.goto('/loan-calculator');

    // Check Title
    await expect(page.locator('h1')).toContainText('True Cost Loan Calculator');

    // Input Values: $100,000, 5%, 20 Years
    const principalInput = page.locator('input#principal');
    await principalInput.fill('100000');

    const rateInput = page.locator('input#rate');
    await rateInput.fill('5');

    const yearsInput = page.locator('input#years');
    await yearsInput.fill('20');

    // Expected EMI Calculation:
    // P = 100000, r = 5/12/100 = 0.0041666, n = 240
    // EMI = 100000 * 0.0041666 * (1.0041666)^240 / ((1.0041666)^240 - 1)
    // EMI ≈ 659.96 -> 660

    // Wait for result to update (React state)
    // We look for the "Monthly Payment" card value
    const monthlyPayment = page.locator('.text-3xl.font-bold').first();
    await expect(monthlyPayment).toContainText('$660');
  });

  test('India EMI Calculator (₹) uses correct formatting and defaults', async ({ page }) => {
    await page.goto('/in/emi-calculator');

    // Check Title
    await expect(page.locator('h1')).toContainText('Smart EMI Calculator');

    // Verify Indian Currency Symbol
    const principalLabel = page.locator('label[for="principal"]');
    await expect(principalLabel).toContainText('(₹)');

    // Input: ₹50,00,000 (50 Lakhs), 8.5%, 20 Years
    await page.locator('input#principal').fill('5000000');
    await page.locator('input#rate').fill('8.5');
    await page.locator('input#years').fill('20');

    // Expected EMI:
    // P=50L, r=8.5/1200, n=240
    // EMI ≈ 43,391

    const monthlyPayment = page.locator('.text-3xl.font-bold').first();
    // Check for "₹" and formatted number "43,391"
    await expect(monthlyPayment).toContainText('₹43,391');
  });

});
