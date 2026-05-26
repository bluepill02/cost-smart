import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://cost-smart-five.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/_next/static/', '/private/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
