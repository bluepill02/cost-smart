import { MetadataRoute } from 'next';
import { getAllCities } from '@/lib/solar-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://cost-smart-five.vercel.app'; // Production URL

    // Static Routes
    const routes = [
        '',
        '/import-duty',
        '/about',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Solar Routes
    let cityRoutes: MetadataRoute.Sitemap = [];
    try {
        const data = await getAllCities();

        cityRoutes = data.map((city) => ({
            url: `${baseUrl}/solar-roi/${city.city_name.replace(/ /g, '-')}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9, // High priority for landing pages
        }));
    } catch (error) {
        console.error('Error generating sitemap for cities:', error);
    }

    return [...routes, ...cityRoutes];
}
