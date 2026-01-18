// Source: U.S. Bureau of Labor Statistics, CPI-U Annual Averages
// https://www.bls.gov/cpi/tables/supplemental-files/historical-cpi-u-202401.pdf

export const CPI_DATA: Record<number, number> = {
    2024: 314.1, // Est/Jan
    2023: 304.7,
    2022: 292.6,
    2021: 270.9,
    2020: 258.8,
    2019: 255.6,
    2018: 251.1,
    2017: 245.1,
    2016: 240.0,
    2015: 237.0,
    2014: 236.7,
    2013: 232.9,
    2012: 229.5,
    2011: 224.9,
    2010: 218.0,
    2009: 214.5,
    2008: 215.3,
    2007: 207.3,
    2006: 201.6,
    2005: 195.3,
    2004: 188.9,
    2003: 184.0,
    2002: 179.9,
    2001: 177.1,
    2000: 172.2,
    1995: 152.4,
    1990: 130.7,
    1985: 107.6,
    1980: 82.4,
    1975: 53.8,
    1970: 38.8,
    1965: 31.5,
    1960: 29.6,
    1955: 26.8,
    1950: 24.1,
    1945: 18.0,
    1940: 14.0,
    1935: 13.7,
    1930: 16.7,
    1925: 17.5,
    1920: 20.0,
    1915: 10.1,
    1913: 9.9
};

// Helper to get closest CPI if exact year missing (simple interpolation or nearest)
export function getCPI(year: number): number {
    if (CPI_DATA[year]) return CPI_DATA[year];

    // Find closest years
    const years = Object.keys(CPI_DATA).map(Number).sort((a, b) => a - b);

    if (year < years[0]) return CPI_DATA[years[0]];
    if (year > years[years.length - 1]) return CPI_DATA[years[years.length - 1]];

    // Linear Interpolation
    let lower = years[0];
    let upper = years[years.length - 1];

    for (let i = 0; i < years.length - 1; i++) {
        if (years[i] <= year && years[i + 1] >= year) {
            lower = years[i];
            upper = years[i + 1];
            break;
        }
    }

    const range = upper - lower;
    const progress = (year - lower) / range;
    const cpiRange = CPI_DATA[upper] - CPI_DATA[lower];

    return CPI_DATA[lower] + (progress * cpiRange);
}
