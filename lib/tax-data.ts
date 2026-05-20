// Official Tax Constants for FY 2025-26 (AY 2026-27)
// Source: CBDT / Union Budget 2025 (presented 1 Feb 2025)
// CRITICAL UPDATE: Budget 2025 revised new-regime slabs & raised 87A rebate limit to ₹12L
// Last Updated: May 2026

export const TAX_CONSTANTS_FY25_26 = {
    NEW_REGIME: {
        // Budget 2025: basicExemptionLimit raised from ₹3L → ₹4L
        basicExemptionLimit: 400000,        // 0-4L: Nil
        standardDeduction: 75000,           // Maintained from FY24-25
        // Budget 2025: 87A rebate limit raised from ₹7L → ₹12L (max rebate ₹60,000)
        rebate87ALimit: 1200000,            // Tax-free for taxable income ≤ ₹12L
        rebate87AMaxAmount: 60000,          // Max rebate under 87A (capped at ₹60k)
        slabs: [
            { limit: 400000,   rate: 0    }, // 0–4L: Nil
            { limit: 800000,   rate: 0.05 }, // 4–8L: 5%
            { limit: 1200000,  rate: 0.10 }, // 8–12L: 10%
            { limit: 1600000,  rate: 0.15 }, // 12–16L: 15%
            { limit: 2000000,  rate: 0.20 }, // 16–20L: 20%
            { limit: 2400000,  rate: 0.25 }, // 20–24L: 25%
            { limit: Infinity, rate: 0.30 }, // >24L: 30%
        ],
        description: "Default regime — Budget 2025 revised slabs (effective FY 2025-26)"
    },
    OLD_REGIME: {
        basicExemptionLimit: 250000,        // For <60 years (unchanged)
        seniorCitizenLimit: 300000,         // For 60-80 years
        superSeniorCitizenLimit: 500000,    // For >80 years
        standardDeduction: 50000,           // For salaried / pensioners
        // 87A rebate: max ₹12,500 — tax fully waived if income ≤ ₹5L
        rebate87ALimit: 500000,
        rebate87AMaxAmount: 12500,
        slabs: [
            { limit: 250000,   rate: 0    }, // 0–2.5L: Nil
            { limit: 500000,   rate: 0.05 }, // 2.5–5L: 5%
            { limit: 1000000,  rate: 0.20 }, // 5–10L: 20%
            { limit: Infinity, rate: 0.30 }, // >10L: 30%
        ],
        description: "Optional regime — allows deductions (80C, 80D, HRA, LTA, etc.)"
    },
    CESS: 0.04,           // 4% Health & Education Cess on tax after rebate
    SURCHARGE: {
        // New Regime surcharge (Budget 2023 capped surcharge at 25% for new regime)
        newRegime: {
            fiftyLakhTo1Crore:    0.10,     // 10% for ₹50L–₹1Cr
            oneCroreTo2Crore:     0.15,     // 15% for ₹1Cr–₹2Cr
            twoCroreTo5Crore:     0.25,     // 25% for ₹2Cr–₹5Cr (capped)
            above5Crore:          0.25,     // 25% for >₹5Cr (new regime cap)
        },
        // Old Regime surcharge
        oldRegime: {
            fiftyLakhTo1Crore:    0.10,
            oneCroreTo2Crore:     0.15,
            twoCroreTo5Crore:     0.25,
            fiveCroreTo2Crore:    0.37,
            above5Crore:          0.37,
        }
    }
};

// Backward compatibility alias (both point to same FY25-26 constants)
export const TAX_CONSTANTS_FY24_25 = TAX_CONSTANTS_FY25_26;

// GST Rate Slabs (unchanged since 2017)
export const GST_RATES = [0, 5, 12, 18, 28];

// TDS Rates (FY 2025-26) — Source: Income Tax Act Sections
export const TDS_RATES = {
    salary:               "As per slab",
    interestBank:         0.10,             // Sec 194A: Bank interest > ₹40,000 (₹50k seniors)
    professionalFees:     0.10,             // Sec 194J: Professional fees > ₹30,000
    technicalFees:        0.02,             // Sec 194J: Technical services / call centre
    rentLandBuilding:     0.10,             // Sec 194I: Rent on land/building > ₹2.4L/yr
    rentPlantMachinery:   0.02,             // Sec 194I: Rent on plant/machinery
    commission:           0.05,             // Sec 194H: Commission/brokerage > ₹15,000
    contractorIndividual: 0.01,             // Sec 194C: Individual/HUF contractors
    contractorCompany:    0.02,             // Sec 194C: Company contractors
    winnings:             0.30,             // Sec 194B: Lottery/game winnings > ₹10,000
    noPan:                0.20,             // Sec 206AA: Penal rate when PAN not provided
};

// Professional Tax (State-wise, monthly) — FY 2025-26
// Source: Respective State Finance Acts
export const PROFESSIONAL_TAX: Record<string, { monthlyIncome: number; tax: number }[]> = {
    maharashtra: [
        { monthlyIncome: 10000,    tax: 0   }, // Up to ₹10,000: Nil (revised 2023)
        { monthlyIncome: Infinity, tax: 200 }, // Above ₹10,000: ₹200/mo (₹2,400/yr)
    ],
    karnataka: [
        { monthlyIncome: 25000,    tax: 0   },
        { monthlyIncome: Infinity, tax: 200 }, // ₹25,001+: ₹200/mo
    ],
    westBengal: [
        { monthlyIncome: 10000,    tax: 110 },
        { monthlyIncome: 15000,    tax: 130 },
        { monthlyIncome: 25000,    tax: 150 },
        { monthlyIncome: 40000,    tax: 160 },
        { monthlyIncome: Infinity, tax: 200 },
    ],
    tamilNadu: [
        { monthlyIncome: 21000,    tax: 0   },
        { monthlyIncome: Infinity, tax: 208 }, // ₹2,500/yr
    ],
    telangana: [
        { monthlyIncome: 15000,    tax: 0   },
        { monthlyIncome: 20000,    tax: 150 },
        { monthlyIncome: Infinity, tax: 200 },
    ],
    gujarat: [
        { monthlyIncome: Infinity, tax: 200 }, // Flat ₹200/mo for salaried
    ],
};

// Section 80C and Deduction Limits (FY 2025-26) — unchanged from FY24-25
export const DEDUCTION_LIMITS = {
    section80C:     150000,          // PPF, ELSS, Life Insurance, EPF, NSC, etc.
    section80D: {
        self:           25000,       // Health insurance (self + family)
        parents:        25000,       // Health insurance (parents)
        seniorCitizen:  50000,       // If insured person is senior citizen
    },
    section80CCD1B: 50000,           // Additional NPS contribution
    section80G:     "50% or 100%",  // Donations (varies by donee)
    section80E:     "Full interest", // Education loan interest (no upper limit)
    section80TTA:   10000,           // Savings bank account interest (non-seniors)
    section80TTB:   50000,           // Interest income for senior citizens
    standardDeductionOldRegime: 50000,
    standardDeductionNewRegime: 75000,  // Budget 2024 increase — maintained in FY25-26
};

// HRA Exemption Calculation Parameters
export const HRA_PARAMETERS = {
    metroPercentage:    0.50,        // 50% of Basic for metro cities
    nonMetroPercentage: 0.40,        // 40% of Basic for non-metro
    // Metro cities for HRA: As per Income Tax Act
    metroCities: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'],
};

// Fiscal Year Information
export const FISCAL_YEAR_INFO = {
    currentFY:          "FY 2025-26",
    assessmentYear:     "AY 2026-27",
    startDate:          "2025-04-01",
    endDate:            "2026-03-31",
    budgetDate:         "2025-02-01",
    itrFilingDeadline:  "2026-07-31",
    lastUpdated:        "2026-05-20",
    changesSummary:     "Budget 2025: New regime slabs revised (4/8/12/16/20/24L), 87A rebate limit raised to ₹12L",
};

// Helper: check if we are in the current fiscal year
export function isTaxDataCurrent(): boolean {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth(); // 0-indexed
    // FY 2025-26: Apr 2025 – Mar 2026
    if (y === 2025 && m >= 3) return true;
    if (y === 2026 && m <  3) return true;
    return false;
}
