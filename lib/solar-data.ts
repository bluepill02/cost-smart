import { promises as fs } from 'fs';
import path from 'path';
import { INDIAN_CITIES } from './pseo-data/cities';
import { US_CITIES } from './pseo-data/us-cities';

export interface SolarData {
    city_name: string;
    country: string;
    state?: string;
    slug?: string;
    avg_daily_sunlight_hours: number;
    avg_electricity_cost_per_kwh: number;
    grid_inflation_rate: number;
    solar_installation_cost_per_kw: number;
}

let cachedData: SolarData[] | null = null;
const cityByNameMap = new Map<string, SolarData>();
const cityBySlugMap = new Map<string, SolarData>();

let initPromise: Promise<void> | null = null;

async function loadDataIfNeeded() {
    if (cachedData) return;
    if (!initPromise) {
        initPromise = (async () => {
            // Load legacy data
            const filePath = path.join(process.cwd(), 'code_block.json');
            let fileContents = '[]';
            try {
                fileContents = await fs.readFile(filePath, 'utf8');
            } catch {
                console.warn('code_block.json not found, using pSEO data only');
            }
            const legacyData: SolarData[] = JSON.parse(fileContents);

            // Merge/Augment with pSEO data (INDIAN_CITIES)
            const pseoData: SolarData[] = INDIAN_CITIES.map(c => ({
                city_name: c.name,
                country: 'India',
                state: c.state,
                avg_daily_sunlight_hours: c.solarIrradiance,
                avg_electricity_cost_per_kwh: c.electricityRate,
                grid_inflation_rate: 5.0,
                solar_installation_cost_per_kw: 60000
            }));

            // Combine: US Cities + Indian Cities + Legacy
            const combined = [...US_CITIES, ...pseoData];
            const combinedNames = new Set(combined.map(c => c.city_name.toLowerCase()));

            for (const l of legacyData) {
                const nameLower = l.city_name.toLowerCase();
                if (!combinedNames.has(nameLower)) {
                    combined.push(l);
                    combinedNames.add(nameLower);
                }
            }

            // Build lookup maps
            for (const city of combined) {
                const nameLower = city.city_name.toLowerCase();
                if (!cityByNameMap.has(nameLower)) {
                    cityByNameMap.set(nameLower, city);
                }
            }

            for (const indianCity of INDIAN_CITIES) {
                if (indianCity.slug) {
                    const city = cityByNameMap.get(indianCity.name.toLowerCase());
                    if (city && !cityBySlugMap.has(indianCity.slug)) {
                        cityBySlugMap.set(indianCity.slug, city);
                    }
                }
            }

            for (const usCity of US_CITIES) {
                if (usCity.slug) {
                    const city = cityByNameMap.get(usCity.city_name.toLowerCase());
                    if (city && !cityBySlugMap.has(usCity.slug)) {
                        cityBySlugMap.set(usCity.slug, city);
                    }
                }
            }

            cachedData = combined;
        })();
    }
    await initPromise;
}

export async function getCityData(cityParam: string): Promise<SolarData | undefined> {
    try {
        if (!cityParam) {
             return undefined;
        }

        await loadDataIfNeeded();

        const city = cityBySlugMap.get(cityParam);
        if (city) return city;

        const normalizedParam = cityParam.replace(/-/g, ' ').toLowerCase();
        return cityByNameMap.get(normalizedParam);
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
