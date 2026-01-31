// Official Tax Constants for FY 2025-26 (AY 2026-27)
// Source: CBDT / Union Budget 2025
// Last Updated: January 31, 2026

export const TAX_CONSTANTS_FY25_26 = {
    NEW_REGIME: {
        basicExemptionLimit: 300000,         // No change
        standardDeduction: 75000,            // Maintained from FY24-25
        rebate87ALimit: 700000,              // Tax free up to ₹7L taxable income (maintained)
        slabs: [
            { limit: 300000, rate: 0 },      // 0-3L: Nil
            { limit: 700000, rate: 0.05 },   // 3L-7L: 5%
            { limit: 1000000, rate: 0.10 },  // 7L-10L: 10%
            { limit: 1200000, rate: 0.15 },  // 10L-12L: 15%
            { limit: 1500000, rate: 0.20 },  // 12L-15L: 20%
            { limit: Infinity, rate: 0.30 }  // >15L: 30%
        ],
        description: "Default regime (no deductions except standard deduction)"
    },
    OLD_REGIME: {
        basicExemptionLimit: 250000,         // For <60 years
        seniorCitizenLimit: 300000,          // For 60-80 years
        superSeniorCitizenLimit: 500000,     // For >80 years
        standardDeduction: 50000,            // Available with salary income
        rebate87ALimit: 500000,              // Tax free up to ₹5L (with deductions)
        slabs: [
            { limit: 250000, rate: 0 },      // 0-2.5L: Nil
            { limit: 500000, rate: 0.05 },   // 2.5L-5L: 5%
            { limit: 1000000, rate: 0.20 },  // 5L-10L: 20%
            { limit: Infinity, rate: 0.30 }  // >10L: 30%
        ],
        description: "Optional regime (allows Section 80C, 80D, HRA, etc.)"
    },
    CESS: 0.04,                              // 4% Health & Education Cess on tax
    SURCHARGE: {
        fiftyLakhTo1Crore: 0.10,            // 10% for ₹50L-1Cr
        oneCroreTo2Crore: 0.15,             // 15% for ₹1Cr-2Cr
        twoCroreTo5Crore: 0.25,             // 25% for ₹2Cr-5Cr
        above5Crore: 0.37                    // 37% for >₹5Cr (new regime)
    }
};

// Backward compatibility alias
export const TAX_CONSTANTS_FY24_25 = TAX_CONSTANTS_FY25_26;

// GST Rate Slabs (unchanged)
export const GST_RATES = [0, 5, 12, 18, 28];

// TDS Rates (FY 2025-26)
export const TDS_RATES = {
    salary: "As per slab",
    interest: 0.10,                          // 10% on bank interest >₹40,000
    professionalFees: 0.10,                  // 10% on fees >₹30,000
    rentResidential: 0.10,                   // 10% on rent >₹2.4L/year
    rentPlant: 0.02,                         // 2% on plant/machinery rent
    commission: 0.05,                        // 5% on commission/brokerage
    contractorIndividual: 0.01,              // 1% for individuals/HUF
    contractorCompany: 0.02,                 // 2% for companies
    winnings: 0.30,                          // 30% on lottery/game winnings >₹10,000
};

// Professional Tax (State-wise - Maharashtra example)
export const PROFESSIONAL_TAX = {
    maharashtra: [
        { monthlyIncome: 10000, tax: 175 },
        { monthlyIncome: Infinity, tax: 200 }
    ],
    karnataka: [
        { monthlyIncome: 15000, tax: 200 },
        { monthlyIncome: Infinity, tax: 200 }
    ],
    westBengal: [
        { monthlyIncome: 10000, tax: 110 },
        { monthlyIncome: 15000, tax: 130 },
        { monthlyIncome: 25000, tax: 150 },
        { monthlyIncome: 40000, tax: 160 },
        { monthlyIncome: Infinity, tax: 200 }
    ],
    tamilNadu: [
        { monthlyIncome: 21000, tax: 0 },
        { monthlyIncome: Infinity, tax: 208.33 } // ₹2500/year
    ]
};

// Section 80C Deductions Limit (FY 2025-26)
export const DEDUCTION_LIMITS = {
    section80C: 150000,                      // PPF, ELSS, Life Insurance, etc.
    section80D: {
        self: 25000,                         // Health insurance (self/family)
        parents: 25000,                      // Health insurance (parents)
        seniorCitizen: 50000                 // If senior citizen
    },
    section80CCD1B: 50000,                   // Additional NPS contribution
    section80G: "50% or 100%",              // Donations (varies by donee)
    section80E: "Full interest",            // Education loan interest
    section80TTA: 10000,                    // Savings account interest
    section80TTB: 50000,                    // Interest for senior citizens
    standardDeduction: 75000                // New regime only (maintained)
};

// HRA Exemption Calculation Parameters
export const HRA_PARAMETERS = {
    metroPercentage: 0.50,                  // 50% of basic for metro cities
    nonMetroPercentage: 0.40,               // 40% of basic for non-metro
    metroCities: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai']
};

// Fiscal Year Information
export const FISCAL_YEAR_INFO = {
    currentFY: "FY 2025-26",
    assessmentYear: "AY 2026-27",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    budgetDate: "2025-02-01",
    itrFilingDeadline: "2026-07-31",
    lastUpdated: "2026-01-31"
};

// Helper function to check if tax data is current
export function isTaxDataCurrent(): boolean {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-indexed (0 = Jan)
    const currentYear = now.getFullYear();
    
    // Tax data is current if we're in FY 2025-26 (Apr 2025 - Mar 2026)
    if (currentYear === 2025 && currentMonth >= 3) return true;  // Apr-Dec 2025
    if (currentYear === 2026 && currentMonth < 3) return true;   // Jan-Mar 2026
    
    return false;
}
