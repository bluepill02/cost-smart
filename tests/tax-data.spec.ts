import { test, expect } from '@playwright/test';
import { isTaxDataCurrent } from '../lib/tax-data';

test.describe('isTaxDataCurrent', () => {
    let originalDate: typeof Date;

    test.beforeAll(() => {
        originalDate = global.Date;
    });

    test.afterEach(() => {
        global.Date = originalDate;
    });

    function setMockDate(year: number, month: number, date: number = 1) {
        // month is 0-indexed
        const mockDate = new originalDate(year, month, date);
        global.Date = class extends originalDate {
            constructor(...args: any[]) {
                if (args.length === 0) {
                    super(mockDate.getTime());
                } else {
                    // @ts-ignore
                    super(...args);
                }
            }
            static now() {
                return mockDate.getTime();
            }
        } as DateConstructor;
    }

    test('returns false for dates before FY 2025-26', () => {
        setMockDate(2025, 2, 31); // March 31, 2025
        expect(isTaxDataCurrent()).toBe(false);

        setMockDate(2024, 11, 31); // Dec 31, 2024
        expect(isTaxDataCurrent()).toBe(false);
    });

    test('returns true for dates during FY 2025-26', () => {
        setMockDate(2025, 3, 1); // April 1, 2025
        expect(isTaxDataCurrent()).toBe(true);

        setMockDate(2025, 8, 15); // Sep 15, 2025
        expect(isTaxDataCurrent()).toBe(true);

        setMockDate(2026, 0, 1); // Jan 1, 2026
        expect(isTaxDataCurrent()).toBe(true);

        setMockDate(2026, 2, 31); // March 31, 2026
        expect(isTaxDataCurrent()).toBe(true);
    });

    test('returns false for dates after FY 2025-26', () => {
        setMockDate(2026, 3, 1); // April 1, 2026
        expect(isTaxDataCurrent()).toBe(false);

        setMockDate(2027, 0, 1); // Jan 1, 2027
        expect(isTaxDataCurrent()).toBe(false);
    });
});
