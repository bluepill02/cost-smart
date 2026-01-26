import { promises as fs } from 'fs';
import path from 'path';
import { INDIAN_CITIES } from './pseo-data/cities';
import { US_CITIES } from './pseo-data/us-cities';

/**
 * Solar Data Interface
 * Represents the solar potential and economic factors for a specific city.
 *
 * Data Sources:
 * - Sunlight Hours: Derived from NREL PVWatts API averages for the region.
 * - Electricity Cost: Based on EIA (Energy Information Administration) state averages.
 * - Installation Cost: Industry standard estimates (NREL Q1 Benchmarks).
 */
export interface SolarData {
    city_name: string;
    country: string;
    state?: string; // Optional because legacy data might not have it
    slug?: string; // Optional, added for US cities
    avg_daily_sunlight_hours: number;
    avg_electricity_cost_per_kwh: number;
    grid_inflation_rate: number;
    solar_installation_cost_per_kw: number;
}

let cachedData: SolarData[] | null = null;

async function loadDataIfNeeded() {
    if (!cachedData) {
        // Load legacy data
        const filePath = path.join(process.cwd(), 'code_block.json');
        let fileContents = '[]';
        try {
            fileContents = await fs.readFile(filePath, 'utf8');
        } catch (e) {
            console.warn('code_block.json not found, using pSEO data only');
        }
        const legacyData: SolarData[] = JSON.parse(fileContents);

        // Merge/Augment with pSEO data (INDIAN_CITIES)
        // We prioritize INDIAN_CITIES for accuracy in India context
        const pseoData: SolarData[] = INDIAN_CITIES.map(c => ({
            city_name: c.name,
            country: 'India',
            state: c.state,
            avg_daily_sunlight_hours: c.solarIrradiance,
            avg_electricity_cost_per_kwh: c.electricityRate, // Keeping currency distinct is UI responsibility
            grid_inflation_rate: 5.0, // Avg inflation
            solar_installation_cost_per_kw: 60000 // Avg INR cost/kW
        }));

        // Combine: US Cities + Indian Cities + Legacy
        const combined = [...US_CITIES, ...pseoData];
        legacyData.forEach(l => {
            if (!combined.find(c => c.city_name.toLowerCase() === l.city_name.toLowerCase())) {
                combined.push(l);
            }
        });

        cachedData = combined;
    }
}

// --- Data Fetching Helper ---
export async function getCityData(cityParam: string): Promise<SolarData | undefined> {
    try {
        // Defensive check: ensure cityParam is provided
        if (!cityParam) {
             return undefined;
        }

        await loadDataIfNeeded();

        // Normalize comparison (e.g. "new-york" -> "New York")
        // Simple lookup for now matching the exact name or simple slug
        // pSEO slugs are lowercase, legacy names might have spaces
        const normalizedParam = cityParam.replace(/-/g, ' ').toLowerCase();

        // Note: The dataset may contain duplicate cities.
        // We strictly use the first occurrence to ensure deterministic behavior.
        // Check exact slug match first (from pSEO data)
        const indianCity = INDIAN_CITIES.find(c => c.slug === cityParam);
        if (indianCity) {
            return cachedData!.find(c => c.city_name === indianCity.name);
        }

        // Check US Cities slug match
        const usCity = US_CITIES.find(c => c.slug === cityParam);
        if (usCity) {
             return cachedData!.find(c => c.city_name === usCity.city_name);
        }

        return cachedData!.find(c => c.city_name.toLowerCase() === normalizedParam);
    } catch (error) {
        console.error("Error reading solar data", error);
        return undefined;
    }
}

export async function getAllCities(): Promise<SolarData[]> {
    try {
        await loadDataIfNeeded();
        return cachedData || [];
    } catch (error) {
        console.error("Error reading all cities data", error);
        return [];
    }
}
