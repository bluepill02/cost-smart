export interface CityData {
    name: string;
    slug: string;
    state: string;
    tier: 1 | 2 | 3;
    solarIrradiance: number; // kWh/m2/day
    electricityRate: number; // Avg cost per kWh (₹)
    sunshineDays: number; // Days per year
}

export const INDIAN_CITIES: CityData[] = [
    { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra', tier: 1, solarIrradiance: 5.2, electricityRate: 12.5, sunshineDays: 280 },
    { name: 'Delhi', slug: 'delhi', state: 'Delhi', tier: 1, solarIrradiance: 5.1, electricityRate: 8.5, sunshineDays: 300 },
    { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka', tier: 1, solarIrradiance: 5.4, electricityRate: 8.2, sunshineDays: 300 },
    { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana', tier: 1, solarIrradiance: 5.6, electricityRate: 9.0, sunshineDays: 310 },
    { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu', tier: 1, solarIrradiance: 5.5, electricityRate: 7.5, sunshineDays: 320 },
    { name: 'Kolkata', slug: 'kolkata', state: 'West Bengal', tier: 1, solarIrradiance: 4.8, electricityRate: 8.9, sunshineDays: 260 },
    { name: 'Pune', slug: 'pune', state: 'Maharashtra', tier: 1, solarIrradiance: 5.3, electricityRate: 11.5, sunshineDays: 290 },
    { name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat', tier: 1, solarIrradiance: 5.8, electricityRate: 6.5, sunshineDays: 330 },
    { name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan', tier: 2, solarIrradiance: 6.0, electricityRate: 7.8, sunshineDays: 340 },
    { name: 'Surat', slug: 'surat', state: 'Gujarat', tier: 2, solarIrradiance: 5.7, electricityRate: 6.8, sunshineDays: 325 },
    { name: 'Lucknow', slug: 'lucknow', state: 'Uttar Pradesh', tier: 2, solarIrradiance: 5.0, electricityRate: 7.0, sunshineDays: 290 },
    { name: 'Kanpur', slug: 'kanpur', state: 'Uttar Pradesh', tier: 2, solarIrradiance: 5.0, electricityRate: 7.2, sunshineDays: 290 },
    { name: 'Nagpur', slug: 'nagpur', state: 'Maharashtra', tier: 2, solarIrradiance: 5.5, electricityRate: 10.5, sunshineDays: 310 },
    { name: 'Indore', slug: 'indore', state: 'Madhya Pradesh', tier: 2, solarIrradiance: 5.6, electricityRate: 7.5, sunshineDays: 315 },
    { name: 'Thane', slug: 'thane', state: 'Maharashtra', tier: 2, solarIrradiance: 5.1, electricityRate: 12.0, sunshineDays: 275 },
    { name: 'Bhopal', slug: 'bhopal', state: 'Madhya Pradesh', tier: 2, solarIrradiance: 5.5, electricityRate: 7.4, sunshineDays: 310 },
    { name: 'Visakhapatnam', slug: 'visakhapatnam', state: 'Andhra Pradesh', tier: 2, solarIrradiance: 5.4, electricityRate: 7.8, sunshineDays: 300 },
    { name: 'Patna', slug: 'patna', state: 'Bihar', tier: 2, solarIrradiance: 4.9, electricityRate: 7.5, sunshineDays: 280 },
    { name: 'Vadodara', slug: 'vadodara', state: 'Gujarat', tier: 2, solarIrradiance: 5.8, electricityRate: 6.7, sunshineDays: 330 },
    { name: 'Ghaziabad', slug: 'ghaziabad', state: 'Uttar Pradesh', tier: 2, solarIrradiance: 5.1, electricityRate: 7.5, sunshineDays: 300 },
    { name: 'Ludhiana', slug: 'ludhiana', state: 'Punjab', tier: 2, solarIrradiance: 5.2, electricityRate: 8.0, sunshineDays: 290 },
    { name: 'Agra', slug: 'agra', state: 'Uttar Pradesh', tier: 2, solarIrradiance: 5.3, electricityRate: 7.2, sunshineDays: 300 },
    { name: 'Nashik', slug: 'nashik', state: 'Maharashtra', tier: 2, solarIrradiance: 5.4, electricityRate: 11.0, sunshineDays: 300 },
    { name: 'Ranchi', slug: 'ranchi', state: 'Jharkhand', tier: 2, solarIrradiance: 5.0, electricityRate: 6.5, sunshineDays: 290 },
    { name: 'Faridabad', slug: 'faridabad', state: 'Haryana', tier: 2, solarIrradiance: 5.2, electricityRate: 7.0, sunshineDays: 300 },
    { name: 'Meerut', slug: 'meerut', state: 'Uttar Pradesh', tier: 2, solarIrradiance: 5.1, electricityRate: 7.5, sunshineDays: 295 },
    { name: 'Rajkot', slug: 'rajkot', state: 'Gujarat', tier: 2, solarIrradiance: 5.9, electricityRate: 6.6, sunshineDays: 335 },
    { name: 'Kalyan-Dombivli', slug: 'kalyan', state: 'Maharashtra', tier: 2, solarIrradiance: 5.1, electricityRate: 12.0, sunshineDays: 275 },
    { name: 'Vasai-Virar', slug: 'vasai', state: 'Maharashtra', tier: 2, solarIrradiance: 5.2, electricityRate: 12.0, sunshineDays: 280 },
    { name: 'Varanasi', slug: 'varanasi', state: 'Uttar Pradesh', tier: 2, solarIrradiance: 5.0, electricityRate: 7.3, sunshineDays: 290 },
    { name: 'Srinagar', slug: 'srinagar', state: 'Jammu & Kashmir', tier: 2, solarIrradiance: 4.5, electricityRate: 3.5, sunshineDays: 220 },
    { name: 'Aurangabad', slug: 'aurangabad', state: 'Maharashtra', tier: 2, solarIrradiance: 5.6, electricityRate: 10.8, sunshineDays: 310 },
    { name: 'Dhanbad', slug: 'dhanbad', state: 'Jharkhand', tier: 2, solarIrradiance: 4.9, electricityRate: 6.2, sunshineDays: 285 },
    { name: 'Amritsar', slug: 'amritsar', state: 'Punjab', tier: 2, solarIrradiance: 5.1, electricityRate: 7.8, sunshineDays: 290 },
    { name: 'Navi Mumbai', slug: 'navi-mumbai', state: 'Maharashtra', tier: 1, solarIrradiance: 5.2, electricityRate: 11.5, sunshineDays: 280 },
    { name: 'Allahabad', slug: 'allahabad', state: 'Uttar Pradesh', tier: 2, solarIrradiance: 5.2, electricityRate: 7.4, sunshineDays: 295 },
    { name: 'Howrah', slug: 'howrah', state: 'West Bengal', tier: 2, solarIrradiance: 4.8, electricityRate: 8.8, sunshineDays: 260 },
    { name: 'Gwalior', slug: 'gwalior', state: 'Madhya Pradesh', tier: 2, solarIrradiance: 5.4, electricityRate: 7.6, sunshineDays: 305 },
    { name: 'Jabalpur', slug: 'jabalpur', state: 'Madhya Pradesh', tier: 2, solarIrradiance: 5.3, electricityRate: 7.5, sunshineDays: 300 },
    { name: 'Coimbatore', slug: 'coimbatore', state: 'Tamil Nadu', tier: 2, solarIrradiance: 5.6, electricityRate: 7.2, sunshineDays: 310 },
    { name: 'Vijayawada', slug: 'vijayawada', state: 'Andhra Pradesh', tier: 2, solarIrradiance: 5.5, electricityRate: 7.9, sunshineDays: 305 },
    { name: 'Jodhpur', slug: 'jodhpur', state: 'Rajasthan', tier: 2, solarIrradiance: 6.2, electricityRate: 7.9, sunshineDays: 350 },
    { name: 'Madurai', slug: 'madurai', state: 'Tamil Nadu', tier: 2, solarIrradiance: 5.8, electricityRate: 7.4, sunshineDays: 320 },
    { name: 'Raipur', slug: 'raipur', state: 'Chhattisgarh', tier: 2, solarIrradiance: 5.2, electricityRate: 6.8, sunshineDays: 300 },
    { name: 'Kota', slug: 'kota', state: 'Rajasthan', tier: 2, solarIrradiance: 5.9, electricityRate: 7.7, sunshineDays: 330 },
    { name: 'Chandigarh', slug: 'chandigarh', state: 'Chandigarh', tier: 2, solarIrradiance: 5.1, electricityRate: 5.5, sunshineDays: 295 },
    { name: 'Guwahati', slug: 'guwahati', state: 'Assam', tier: 2, solarIrradiance: 4.2, electricityRate: 7.1, sunshineDays: 240 },
    { name: 'Solapur', slug: 'solapur', state: 'Maharashtra', tier: 2, solarIrradiance: 5.7, electricityRate: 10.5, sunshineDays: 315 },
    { name: 'Hubli-Dharwad', slug: 'hubli', state: 'Karnataka', tier: 2, solarIrradiance: 5.3, electricityRate: 8.0, sunshineDays: 300 },
    { name: 'Mysore', slug: 'mysore', state: 'Karnataka', tier: 2, solarIrradiance: 5.2, electricityRate: 7.8, sunshineDays: 290 }
];
