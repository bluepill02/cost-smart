import { MetadataRoute } from 'next';
import { INDIAN_CITIES } from '@/lib/pseo-data/cities';
import { INDIAN_STATES_STAMP_DUTY } from '@/lib/pseo-data/stamp-duty';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cost-smart-five.vercel.app';
  const now = new Date();
  
  const urls: MetadataRoute.Sitemap = [];

  // Static pages
  urls.push(
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  );

  // Base calculator pages (31 calculators)
  const calculators = [
    'solar-roi',
    'import-duty',
    'currency',
    'inflation',
    'loan-calculator',
    'retirement-calculator',
    'emergency-fund-calculator',
    'debt-payoff-calculator',
    'home-loan-calculator',
    'rent-vs-buy-calculator',
    'home-renovation-cost-estimator',
    'freelance-rate-calculator',
    'business-loan-calculator',
    'profit-margin-calculator',
    'break-even-calculator',
    'invoice-generator',
    'shipping-cost-calculator',
    'in/emi-calculator',
    'in/sip-calculator',
    'in/ppf-calculator',
    'in/fd-calculator',
    'in/salary-calculator',
    'in/income-tax-calculator',
    'in/gst-calculator',
    'in/gst-input-credit-calculator',
    'in/tds-calculator',
    'in/stamp-duty-calculator',
    'in/property-registration-cost-calculator',
    'in/property-tax-calculator',
    'in/water-bill-calculator',
    'in/electricity-bill-calculator',
    'in/lpg-subsidy-calculator',
  ];

  calculators.forEach((calc) => {
    urls.push({
      url: `${baseUrl}/${calc}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // Solar ROI - City-specific pages (63 pages)
  INDIAN_CITIES.forEach((city) => {
    urls.push({
      url: `${baseUrl}/solar-roi/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Solar ROI - Budget-specific pages (5 pages)
  const budgets = ['100000', '200000', '300000', '500000', '1000000'];
  budgets.forEach((budget) => {
    urls.push({
      url: `${baseUrl}/solar-roi/budget/${budget}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Solar ROI - Roof size pages (6 pages)
  const roofSizes = ['500', '1000', '1500', '2000', '3000', '5000'];
  roofSizes.forEach((size) => {
    urls.push({
      url: `${baseUrl}/solar-roi/roof/${size}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Solar ROI - VS alternative energy comparisons (5 pages)
  const alternatives = ['grid', 'diesel-generator', 'coal', 'wind', 'hydro'];
  alternatives.forEach((alt) => {
    urls.push({
      url: `${baseUrl}/solar-roi/vs/${alt}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Solar ROI - City + Roof size combinations (63 × 6 = 378 pages)
  INDIAN_CITIES.forEach((city) => {
    roofSizes.forEach((size) => {
      urls.push({
        url: `${baseUrl}/solar-roi/${city.slug}/${size}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // Home Loan Calculator - City-specific pages (63 pages)
  INDIAN_CITIES.forEach((city) => {
    urls.push({
      url: `${baseUrl}/home-loan-calculator/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Stamp Duty Calculator - State-specific pages (15 pages)
  INDIAN_STATES_STAMP_DUTY.forEach((state) => {
    urls.push({
      url: `${baseUrl}/in/stamp-duty-calculator/${state.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Blog posts (68 articles)
  const blogPosts = [
    'ctc-vs-in-hand',
    'emergency-fund-importance',
    'fd-vs-mutual-funds',
    'gst-inclusive-vs-exclusive',
    'home-loan-prepayment-benefits',
    'how-to-use-break-even-calculator',
    'how-to-use-business-loan-calculator',
    'how-to-use-currency-converter',
    'how-to-use-debt-payoff-calculator',
    'how-to-use-electricity-bill-calculator',
    'how-to-use-emergency-fund-calculator',
    'how-to-use-emi-calculator',
    'how-to-use-fd-calculator',
    'how-to-use-freelance-rate-calculator',
    'how-to-use-gst-calculator',
    'how-to-use-gst-input-credit-calculator',
    'how-to-use-home-loan-calculator',
    'how-to-use-home-renovation-cost-estimator',
    'how-to-use-import-duty-calculator',
    'how-to-use-income-tax-calculator',
    'how-to-use-invoice-generator',
    'how-to-use-lpg-subsidy-calculator',
    'how-to-use-ppf-calculator',
    'how-to-use-profit-margin-calculator',
    'how-to-use-property-registration-cost-calculator',
    'how-to-use-property-tax-calculator',
    'how-to-use-rent-vs-buy-calculator',
    'how-to-use-retirement-calculator',
    'how-to-use-salary-calculator',
    'how-to-use-shipping-cost-calculator',
    'how-to-use-sip-calculator',
    'how-to-use-solar-roi-calculator',
    'how-to-use-stamp-duty-calculator',
    'how-to-use-tds-calculator',
    'how-to-use-water-bill-calculator',
    'new-vs-old-tax-regime',
    'ppf-guide',
    'rent-vs-buy-math',
    'retirement-corpus-guide',
    'sip-vs-lumpsum',
    'snowball-vs-avalanche',
    'ultimate-guide-break-even-point',
    'ultimate-guide-business-loan-emi',
    'ultimate-guide-currency-exchange',
    'ultimate-guide-debt-free-date',
    'ultimate-guide-electricity-bill',
    'ultimate-guide-emergency-fund',
    'ultimate-guide-fixed-deposit-interest',
    'ultimate-guide-freelance-hourly-rate',
    'ultimate-guide-gst-amount',
    'ultimate-guide-home-loan-emi',
    'ultimate-guide-home-renovation-cost',
    'ultimate-guide-import-duty',
    'ultimate-guide-in-hand-salary',
    'ultimate-guide-income-tax-liability',
    'ultimate-guide-loan-emi',
    'ultimate-guide-lpg-subsidy',
    'ultimate-guide-net-gst-payable',
    'ultimate-guide-ppf-maturity',
    'ultimate-guide-professional-invoice',
    'ultimate-guide-profit-margin',
    'ultimate-guide-property-registration-charges',
    'ultimate-guide-property-registration-cost',
    'ultimate-guide-property-tax',
    'ultimate-guide-rent-vs-buy-decision',
    'ultimate-guide-retirement-corpus',
    'ultimate-guide-sip-returns',
    'ultimate-guide-solar-savings',
    'ultimate-guide-tds-deduction',
    'ultimate-guide-volumetric-weight',
    'ultimate-guide-water-bill',
  ];

  blogPosts.forEach((post) => {
    urls.push({
      url: `${baseUrl}/blog/${post}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Comparison pages (1 currently)
  const comparisons = ['emi-vs-sip'];
  comparisons.forEach((comp) => {
    urls.push({
      url: `${baseUrl}/compare/${comp}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return urls;
}
