
import fs from 'fs';
import path from 'path';

function generateSitemap() {
  const blogDir = path.join(process.cwd(), 'app/blog');
  const blogFiles = fs.readdirSync(blogDir).filter(f => fs.statSync(path.join(blogDir, f)).isDirectory());

  const calculators = [
    'solar-roi', 'import-duty', 'currency', 'inflation', 'loan-calculator',
    'in/emi-calculator', 'in/sip-calculator', 'in/ppf-calculator', 'in/fd-calculator',
    'retirement-calculator', 'emergency-fund-calculator', 'debt-payoff-calculator',
    'in/salary-calculator', 'in/income-tax-calculator', 'in/gst-calculator',
    'home-loan-calculator', 'in/stamp-duty-calculator', 'in/property-tax-calculator',
    'rent-vs-buy-calculator', 'in/water-bill-calculator', 'in/electricity-bill-calculator',
    'in/lpg-subsidy-calculator', 'freelance-rate-calculator', 'business-loan-calculator',
    'in/gst-input-credit-calculator', 'profit-margin-calculator', 'break-even-calculator',
    'invoice-generator', 'shipping-cost-calculator', 'in/tds-calculator'
  ];

  const blogEntries = blogFiles.map(slug => `    {
      url: \`\${baseUrl}/blog/${slug}\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },`).join('\n');

  const calcEntries = calculators.map(slug => `    {
      url: \`\${baseUrl}/${slug}\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },`).join('\n');

  const content = `import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cost-smart-five.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: \`\${baseUrl}/about\`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: \`\${baseUrl}/privacy\`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: \`\${baseUrl}/terms\`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
${calcEntries}
${blogEntries}
  ];
}
`;

  fs.writeFileSync('app/sitemap.ts', content);
  console.log('Sitemap regenerated with dynamic entries.');
}

generateSitemap();
