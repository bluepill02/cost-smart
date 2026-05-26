import JsonLd from '@/components/seo/JsonLd';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  currentPath?: string;
}

export default function BreadcrumbSchema({ items, currentPath }: BreadcrumbSchemaProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  if (currentPath && allItems.length > 0) {
    allItems[allItems.length - 1] = { ...allItems[allItems.length - 1], href: currentPath };
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${CANONICAL_DOMAIN}${item.href}` } : {}),
    })),
  };

  return <JsonLd data={schema} />;
}
