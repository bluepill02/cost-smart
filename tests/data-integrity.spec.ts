import { test, expect } from '@playwright/test';
import { getCityData, getAllCities } from '../lib/solar-data';

// Since lib/solar-data.ts reads a file, this test runs in the Node.js environment
// provided by Playwright runner.

test.describe('Solar Data Integrity', () => {

    test('getAllCities returns data', async () => {
        const cities = await getAllCities();
        expect(cities.length).toBeGreaterThan(0);

        // Check first city structure
        const firstCity = cities[0];
        expect(firstCity).toHaveProperty('city_name');
        expect(firstCity).toHaveProperty('country');
        expect(firstCity).toHaveProperty('avg_daily_sunlight_hours');
    });

    test('getCityData finds specific city', async () => {
        // Use "Denver" as we know it exists from previous E2E test attempts
        const city = await getCityData('Denver');
        expect(city).toBeDefined();
        expect(city?.city_name).toBe('Denver');
        expect(city?.country).toBe('USA');
    });

    test('getCityData is case insensitive and handles hyphens', async () => {
        // "new-york" -> "New York" (if it existed)
        // Let's use "west-palm-beach" or similar if simpler ones exist.
        // Checking code_block.json from memory: "West Palm Beach" exists.

        const city = await getCityData('west-palm-beach');
        expect(city).toBeDefined();
        expect(city?.city_name).toBe('West Palm Beach');
    });

    test('data sanity check', async () => {
        const cities = await getAllCities();
        for (const city of cities) {
            expect(city.avg_daily_sunlight_hours).toBeGreaterThan(0);
            expect(city.avg_electricity_cost_per_kwh).toBeGreaterThan(0);
            expect(typeof city.city_name).toBe('string');
        }
    });
});
