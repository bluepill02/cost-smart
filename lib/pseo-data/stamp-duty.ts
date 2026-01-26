export interface StateStampData {
    state: string;
    slug: string;
    stampDutyRate: number; // Percentage
    registrationRate: number; // Percentage (often capped, but keeping % for sim)
    femaleConcession: number; // Percentage reduction for women
    description: string;
}

export const INDIAN_STATES_STAMP_DUTY: StateStampData[] = [
    { state: 'Maharashtra', slug: 'maharashtra', stampDutyRate: 5, registrationRate: 1, femaleConcession: 1, description: 'One of the highest property markets in India. Women buyers get a 1% concession.' },
    { state: 'Karnataka', slug: 'karnataka', stampDutyRate: 5, registrationRate: 1, femaleConcession: 0, description: 'Bangalore is a key IT hub driving real estate.' },
    { state: 'Tamil Nadu', slug: 'tamil-nadu', stampDutyRate: 7, registrationRate: 4, femaleConcession: 0, description: 'Historically high registration charges compared to other states.' },
    { state: 'Uttar Pradesh', slug: 'uttar-pradesh', stampDutyRate: 7, registrationRate: 1, femaleConcession: 1, description: 'Offers ₹10,000 discount or 1% lower rate for women owners.' },
    { state: 'Gujarat', slug: 'gujarat', stampDutyRate: 4.9, registrationRate: 1, femaleConcession: 0, description: 'Competitive rates to boost industrial and residential growth.' },
    { state: 'West Bengal', slug: 'west-bengal', stampDutyRate: 5, registrationRate: 1, femaleConcession: 0, description: 'Offers rebates for properties below certain valuation thresholds.' },
    { state: 'Telangana', slug: 'telangana', stampDutyRate: 4, registrationRate: 0.5, femaleConcession: 0, description: 'Hyderabad offers relatively lower transaction costs.' },
    { state: 'Rajasthan', slug: 'rajasthan', stampDutyRate: 5, registrationRate: 1, femaleConcession: 1, description: 'Significant concessions for women and senior citizens.' },
    { state: 'Haryana', slug: 'haryana', stampDutyRate: 7, registrationRate: 0, femaleConcession: 2, description: 'Very high concession (2%) for women buyers in urban areas.' },
    { state: 'Delhi', slug: 'delhi', stampDutyRate: 6, registrationRate: 1, femaleConcession: 2, description: 'Men pay 6%, Women pay 4% stamp duty.' },
    { state: 'Madhya Pradesh', slug: 'madhya-pradesh', stampDutyRate: 7.5, registrationRate: 3, femaleConcession: 0, description: 'Charges are on the higher side including cess.' },
    { state: 'Kerala', slug: 'kerala', stampDutyRate: 8, registrationRate: 2, femaleConcession: 0, description: 'High effective rates combining stamp duty and registration.' },
    { state: 'Punjab', slug: 'punjab', stampDutyRate: 7, registrationRate: 1, femaleConcession: 1, description: '1% rebate for women buyers.' },
    { state: 'Bihar', slug: 'bihar', stampDutyRate: 6, registrationRate: 2, femaleConcession: 0.4, description: 'Slight rebate for female owners.' },
    { state: 'Andhra Pradesh', slug: 'andhra-pradesh', stampDutyRate: 5, registrationRate: 1, femaleConcession: 0, description: 'Standardized rates across the new capital region.' }
];
