export interface CountryPPP {
    name: string;
    code: string;
    currency: string;
    currencySymbol: string;
    pppFactor: number; // LCU per International Dollar (World Bank 2023 Est)
}

export const PPP_DATA: CountryPPP[] = [
    { name: 'United States', code: 'USA', currency: 'USD', currencySymbol: '$', pppFactor: 1.0 },
    { name: 'India', code: 'IND', currency: 'INR', currencySymbol: '₹', pppFactor: 23.14 },
    { name: 'United Kingdom', code: 'GBR', currency: 'GBP', currencySymbol: '£', pppFactor: 0.72 },
    { name: 'Canada', code: 'CAN', currency: 'CAD', currencySymbol: 'C$', pppFactor: 1.28 },
    { name: 'Germany', code: 'DEU', currency: 'EUR', currencySymbol: '€', pppFactor: 0.78 },
    { name: 'France', code: 'FRA', currency: 'EUR', currencySymbol: '€', pppFactor: 0.76 },
    { name: 'Australia', code: 'AUS', currency: 'AUD', currencySymbol: 'A$', pppFactor: 1.45 },
    { name: 'Japan', code: 'JPN', currency: 'JPY', currencySymbol: '¥', pppFactor: 104.2 },
    { name: 'China', code: 'CHN', currency: 'CNY', currencySymbol: '¥', pppFactor: 4.18 },
    { name: 'United Arab Emirates', code: 'ARE', currency: 'AED', currencySymbol: 'AED', pppFactor: 2.15 },
    { name: 'Singapore', code: 'SGP', currency: 'SGD', currencySymbol: 'S$', pppFactor: 0.86 },
    { name: 'Switzerland', code: 'CHE', currency: 'CHF', currencySymbol: 'Fr', pppFactor: 1.12 }
].sort((a, b) => a.name.localeCompare(b.name));
