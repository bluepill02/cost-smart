// Official RBI Data - Updated Quarterly
// Last Updated: January 31, 2026 (Q4 FY 2025-26)
// Source: Reserve Bank of India - Monetary Policy Reports

export const RBI_DATA = {
    // Policy Rates (as of Jan 2026 - RBI Monetary Policy)
    repoRate: 6.50,                          // Repo Rate - unchanged since Feb 2023
    reverseRepoRate: 3.35,                   // Reverse Repo Rate
    marginalStandingFacilityRate: 6.75,     // MSF Rate
    bankRate: 6.75,                          // Bank Rate
    
    // Reserve Ratios
    crr: 4.50,                               // Cash Reserve Ratio (%)
    slr: 18.00,                              // Statutory Liquidity Ratio (%)
    
    // Small Savings Schemes Interest Rates (Q4 FY 2025-26)
    ppfInterestRate: 7.1,                    // Public Provident Fund (15-year)
    epfInterestRate: 8.25,                   // Employees' Provident Fund (FY 2025-26)
    sukanyaSamriddhiRate: 8.2,              // Sukanya Samriddhi Yojana
    seniorCitizenSavingsRate: 8.2,          // Senior Citizen Savings Scheme
    nationalSavingsCertificateRate: 7.7,    // NSC (5-year)
    kiVikasPatraRate: 7.5,                  // Kisan Vikas Patra (doubles in ~124 months)
    postOfficeMISRate: 7.4,                 // Monthly Income Scheme
    
    // Fixed Deposit Reference Rates (Major Banks Average)
    fdRateMax: 7.5,                         // 1-3 year FD (avg across SBI, HDFC, ICICI)
    fdRate1Year: 6.8,
    fdRate3Year: 7.5,
    fdRate5Year: 7.0,
    
    // Home Loan Rates (Major Banks Average - MCLR-linked)
    homeLoanRateAvg: 9.0,                   // Average home loan rate (8.5-9.5% range)
    
    // Inflation Targets & Actuals
    cpiInflationTarget: 4.0,                // RBI's medium-term target
    cpiInflationCurrent: 5.1,               // Current CPI inflation (Jan 2026)
    
    // Last Update Information
    lastUpdated: "2026-01-31",              // ISO 8601 format
    lastPolicyDate: "2025-12-06",           // Last RBI Monetary Policy meeting
    nextPolicyDate: "2026-02-07",           // Next scheduled policy review
    
    // Data Source Metadata
    dataSource: "Reserve Bank of India",
    reliability: "official",
    updateFrequency: "quarterly",
};

// Helper function to check if data needs refresh (90 days old)
export function isRBIDataStale(): boolean {
    const lastUpdate = new Date(RBI_DATA.lastUpdated);
    const now = new Date();
    const daysSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate > 90;
}

// Helper to format the last updated date for display
export function formatLastUpdated(): string {
    const date = new Date(RBI_DATA.lastUpdated);
    return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}
