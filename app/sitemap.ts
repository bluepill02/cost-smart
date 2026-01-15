import { MetadataRoute } from 'next';
import { getAllCities } from '@/lib/solar-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cost-smart-five.vercel.app'; // Production URL

  // Static Routes
  const routes = [
    '',
    '/solar-roi',
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

  // Dynamic Solar Routes with timeout protection
  let cityRoutes: MetadataRoute.Sitemap = [];
  try {
    // Add a 5-second timeout to prevent hanging
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Sitemap cities fetch timeout')), 5000)
    );
    
    const data = await Promise.race([getAllCities(), timeoutPromise]);
    
    cityRoutes = data.map((city) => ({
      url: `${baseUrl}/solar-roi/${city.city_name.replace(/ /g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9, // High priority for landing pages
    }));
  } catch (error) {
    console.error('Error generating sitemap for cities:', error);
    // Continue without city routes if there's an error
  }

  return [...routes, ...cityRoutes];
}
