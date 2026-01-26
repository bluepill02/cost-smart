import { WithContext, SoftwareApplication } from 'schema-dts';

export function getCalculatorSchema(
  name: string,
  description: string,
  urlPath: string,
  category: string = 'FinanceApplication'
): WithContext<SoftwareApplication> {
  const baseUrl = 'https://cost-smart-five.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    applicationCategory: category,
    operatingSystem: 'Web',
    url: `${baseUrl}${urlPath}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'CostSmart',
      url: baseUrl,
    },
  };
}
