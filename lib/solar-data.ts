import { promises as fs } from 'fs';
import path from 'path';

export interface SolarData {
    city_name: string;
    country: string;
    avg_daily_sunlight_hours: number;
    avg_electricity_cost_per_kwh: number;
    grid_inflation_rate: number;
    solar_installation_cost_per_kw: number;
}

let cachedData: SolarData[] | null = null;

async function loadDataIfNeeded() {
    if (!cachedData) {
        const filePath = path.join(process.cwd(), 'code_block.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        cachedData = JSON.parse(fileContents);
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
        const normalizedParam = cityParam.replace(/-/g, ' ').toLowerCase();

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
