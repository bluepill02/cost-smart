
export interface SubsidyResult {
    subsidyAmount: number;
    schemeName: string;
    description: string;
}

/**
 * Calculates the Central Government Subsidy for Solar Rooftop systems in India.
 * Based on "PM Surya Ghar: Muft Bijli Yojana" (2024-2025).
 *
 * Rules:
 * - Up to 2 kW: ₹30,000 per kW
 * - Additional capacity (2-3 kW): ₹18,000 per kW
 * - Total capacity > 3 kW: Fixed at ₹78,000
 */
export function calculateSolarSubsidy(systemSizeKw: number, country: string): SubsidyResult {
    // US Federal Tax Credit (ITC) - 30% of system cost
    // Assuming standard cost per kW for estimation if gross cost not passed,
    // but better to keep it simple here.
    // Ideally, this function should take Cost, but for now we'll estimate based on average US cost/kW ($2.8k)
    // to give a "subsidy amount" equivalent.
    if (country === 'USA') {
        // Average install cost ~ $2800/kW
        const estimatedCost = systemSizeKw * 2800;
        const credit = estimatedCost * 0.30;
        return {
            subsidyAmount: Math.round(credit),
            schemeName: 'Federal Solar Tax Credit (ITC)',
            description: '30% tax credit on installation costs (Inflation Reduction Act).'
        };
    }

    if (country !== 'India') {
        return {
            subsidyAmount: 0,
            schemeName: 'N/A',
            description: 'No central subsidy data available for this region.'
        };
    }

    let subsidy = 0;

    if (systemSizeKw <= 2) {
        subsidy = systemSizeKw * 30000;
    } else if (systemSizeKw <= 3) {
        // First 2kW * 30000 + Remaining * 18000
        subsidy = (2 * 30000) + ((systemSizeKw - 2) * 18000);
    } else {
        // Capped at 3kW equivalent
        subsidy = 78000;
    }

    return {
        subsidyAmount: Math.round(subsidy),
        schemeName: 'PM Surya Ghar Muft Bijli Yojana',
        description: systemSizeKw <= 3
            ? `₹30k/kW for first 2kW + ₹18k/kW for remaining.`
            : `Max subsidy capped at ₹78,000 for >3kW systems.`
    };
}
