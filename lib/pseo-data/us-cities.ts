import { SolarData } from '@/lib/solar-data';

export const US_CITIES: SolarData[] = [
    {
        city_name: "Los Angeles",
        country: "USA",
        avg_daily_sunlight_hours: 5.6,
        avg_electricity_cost_per_kwh: 0.28,
        grid_inflation_rate: 0.04,
        solar_installation_cost_per_kw: 2800,
        slug: "los-angeles",
        state: "California"
    },
    {
        city_name: "Phoenix",
        country: "USA",
        avg_daily_sunlight_hours: 6.5,
        avg_electricity_cost_per_kwh: 0.14,
        grid_inflation_rate: 0.03,
        solar_installation_cost_per_kw: 2400,
        slug: "phoenix",
        state: "Arizona"
    },
    {
        city_name: "Dallas",
        country: "USA",
        avg_daily_sunlight_hours: 5.2,
        avg_electricity_cost_per_kwh: 0.15,
        grid_inflation_rate: 0.03,
        solar_installation_cost_per_kw: 2600,
        slug: "dallas",
        state: "Texas"
    },
    {
        city_name: "Miami",
        country: "USA",
        avg_daily_sunlight_hours: 5.4,
        avg_electricity_cost_per_kwh: 0.13,
        grid_inflation_rate: 0.03,
        solar_installation_cost_per_kw: 2500,
        slug: "miami",
        state: "Florida"
    },
    {
        city_name: "Las Vegas",
        country: "USA",
        avg_daily_sunlight_hours: 6.4,
        avg_electricity_cost_per_kwh: 0.16,
        grid_inflation_rate: 0.04,
        solar_installation_cost_per_kw: 2450,
        slug: "las-vegas",
        state: "Nevada"
    },
    {
        city_name: "New York",
        country: "USA",
        avg_daily_sunlight_hours: 4.5,
        avg_electricity_cost_per_kwh: 0.26,
        grid_inflation_rate: 0.04,
        solar_installation_cost_per_kw: 3100,
        slug: "new-york",
        state: "New York"
    }
];
