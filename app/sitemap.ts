import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

interface SolarData {
    city_name: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://costsmart.app'; // Production URL

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
        const filePath = path.join(process.cwd(), 'code_block.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const data: SolarData[] = JSON.parse(fileContents);

        cityRoutes = data.map((city) => ({
            url: `${baseUrl}/solar-roi/${city.city_name.replace(/ /g, '-')}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9, // High priority for landing pages
        }));
    } catch (error) {
        console.error('Error generating sitemap for cities:', error);
    }

    return [...routes, ...cityRoutes];
}
