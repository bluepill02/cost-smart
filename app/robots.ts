import { MetadataRoute } from 'next';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/_next/static/', '/private/'],
        },
        sitemap: `${CANONICAL_DOMAIN}/sitemap.xml`,
    };
}
