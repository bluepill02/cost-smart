import fs from 'fs';
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

// --- Data Fetching Helper ---
// In a real app, this might be a DB call. Here we read the JSON file.
export function getCityData(cityParam: string): SolarData | undefined {
    try {
        if (!cachedData) {
            const filePath = path.join(process.cwd(), 'code_block.json');
            const fileContents = fs.readFileSync(filePath, 'utf8');
            cachedData = JSON.parse(fileContents);
        }

        // Normalize comparison (e.g. "new-york" -> "New York")
        // Simple lookup for now matching the exact name or simple slug
        const normalizedParam = cityParam.replace(/-/g, ' ').toLowerCase();

        return cachedData!.find(c => c.city_name.toLowerCase() === normalizedParam);
    } catch (error) {
        console.error("Error reading solar data", error);
        return undefined;
    }
}
