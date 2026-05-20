// Official RBI Data — Updated May 2026
// Source: Reserve Bank of India — Monetary Policy Reports
// RBI cut repo rate 25bps to 6.25% in February 2026 MPC meeting.
// Further cut to 6.00% expected at June 2026 MPC (markets pricing in).

export const RBI_DATA = {
    // Policy Rates (as of Feb 2026 — post rate cut)
    repoRate: 6.25,                          // Repo Rate — cut from 6.5% in Feb 2026
    reverseRepoRate: 3.35,                   // Reverse Repo Rate (corridor)
    marginalStandingFacilityRate: 6.50,     // MSF Rate (= Repo + 25bps)
    bankRate: 6.50,                          // Bank Rate

    // Reserve Ratios (unchanged)
    crr: 4.00,                               // CRR — cut from 4.5% in Dec 2024
    slr: 18.00,                              // Statutory Liquidity Ratio (%)

    // Small Savings Schemes Interest Rates (Q1 FY 2025-26 — announced Apr 2025)
    // Government reviews quarterly; rates unchanged since Q2 FY2024-25
    ppfInterestRate: 7.1,                    // Public Provident Fund (15-year)
    epfInterestRate: 8.25,                   // EPF — declared for FY 2025-26
    sukanyaSamriddhiRate: 8.2,              // Sukanya Samriddhi Yojana
    seniorCitizenSavingsRate: 8.2,          // SCSS (5-year deposits)
    nationalSavingsCertificateRate: 7.7,    // NSC (5-year)
    kiVikasPatraRate: 7.5,                  // KVP (doubles in ~115 months)
    postOfficeMISRate: 7.4,                 // Post Office MIS

    // Fixed Deposit Reference Rates (Major Banks — May 2026 averages)
    // Post repo cut, FD rates have softened slightly
    fdRateMax: 7.25,                        // 1-3 year FD (HDFC/ICICI/SBI avg)
    fdRate1Year: 6.75,                      // SBI/HDFC 1-year FD
    fdRate3Year: 7.25,                      // SBI/HDFC 3-year FD
    fdRate5Year: 6.8,                       // SBI/HDFC 5-year FD (tax-saving)

    // Home Loan Rates (Major Banks Average — post Feb 2026 rate cut)
    // Linked to RLLR/EBLR; typically Repo + spread (1.5-3.5%)
    homeLoanRateMin: 8.25,                  // Best rate (750+ CIBIL, salaried)
    homeLoanRateAvg: 8.75,                  // Average home loan rate
    homeLoanRateMax: 9.50,                  // Higher risk/NBFC rates

    // Inflation
    cpiInflationTarget: 4.0,                // RBI's medium-term target
    cpiInflationCurrent: 4.6,               // CPI inflation estimate — May 2026

    // Update Information
    lastUpdated: "2026-05-20",
    lastPolicyDate: "2026-04-09",           // April 2026 MPC meeting
    nextPolicyDate: "2026-06-06",           // June 2026 MPC meeting
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
