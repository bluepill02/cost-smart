// Official Tax Constants for FY 2024-25 (AY 2025-26)
// Source: CBDT / Budget 2024

export const TAX_CONSTANTS_FY24_25 = {
    NEW_REGIME: {
        basicExemptionLimit: 300000,
        standardDeduction: 75000, // Increased from 50k to 75k in July 2024 Budget
        rebate87ALimit: 700000, // Tax free up to 7L taxable income
        slabs: [
            { limit: 300000, rate: 0 },
            { limit: 700000, rate: 0.05 }, // 3L-7L
            { limit: 1000000, rate: 0.10 }, // 7L-10L
            { limit: 1200000, rate: 0.15 }, // 10L-12L
            { limit: 1500000, rate: 0.20 }, // 12L-15L
            { limit: Infinity, rate: 0.30 } // >15L
        ]
    },
    OLD_REGIME: {
        basicExemptionLimit: 250000, // For <60 years
        standardDeduction: 50000,
        rebate87ALimit: 500000,
        slabs: [
            { limit: 250000, rate: 0 },
            { limit: 500000, rate: 0.05 },
            { limit: 1000000, rate: 0.20 },
            { limit: Infinity, rate: 0.30 }
        ]
    },
    CESS: 0.04
};

export const GST_RATES = [5, 12, 18, 28];
