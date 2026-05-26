import { Metadata } from 'next';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import AdContainer from '@/components/ads/AdContainer';
import NeighborhoodExplorer from '@/components/features/NeighborhoodExplorer';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Neighborhood Explorer | Area Analysis Tool | CostSmart',
  description: 'Explore any neighborhood before buying or renting. Check nearby schools, hospitals, parks, transit, and shopping. Get a neighborhood score for any location.',
  keywords: ['neighborhood analysis', 'area explorer', 'locality check', 'neighborhood score', 'nearby amenities', 'places near me'],
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/neighborhood-explorer',
  },
  openGraph: {
    title: 'Neighborhood Explorer | Area Analysis Tool | CostSmart',
    description: 'Explore any neighborhood before buying or renting. Check nearby schools, hospitals, parks, transit, and shopping. Get a neighborhood score for any location.',
    url: `${CANONICAL_DOMAIN}/neighborhood-explorer`,
    type: 'website',
  },
};

export default function NeighborhoodExplorerPage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-slate-50 min-h-screen">
      <BreadcrumbSchema items={[{ label: 'Tools', href: '/tools' }, { label: 'Neighborhood Explorer' }]} />
      <AdContainer className="mb-8" slotId="1475703853" />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Neighborhood Explorer
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore any area before you buy or rent. Check nearby schools, hospitals, parks, transit options, and shopping to make an informed decision.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <NeighborhoodExplorer />
      </div>

      <AdContainer className="mt-8" slotId="1706594832" size="inline" />

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto mt-16 prose prose-slate">
        <h2 className="text-2xl font-bold text-slate-900">Why Neighborhood Analysis Matters</h2>
        <p className="text-slate-600">
          Choosing the right neighborhood is just as important as choosing the right home. The quality of nearby schools, 
          access to healthcare, availability of parks, public transit connectivity, and proximity to grocery stores all 
          significantly impact your daily quality of life and long-term property value. A thorough neighborhood analysis 
          helps you avoid costly surprises after moving in.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">How Our Neighborhood Score Works</h2>
        <p className="text-slate-600">
          Our Neighborhood Score evaluates five key categories of amenities: education, healthcare, recreation, 
          transportation, and shopping. Each category is scored based on both the number of nearby options and how 
          close they are to your location. Areas with more amenities within walking or short driving distance receive 
          higher scores, giving you a quick snapshot of overall livability.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">Make Smarter Real Estate Decisions</h2>
        <p className="text-slate-600">
          Whether you are buying your first home, relocating for work, or evaluating a rental property, understanding 
          the surrounding area is essential. Combine this tool with our other financial calculators to get a complete 
          picture of what a move will cost you and whether the location truly fits your lifestyle.
        </p>
      </section>

      {/* Related Tools */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Related Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/rent-vs-buy-calculator" className="block">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Rent vs Buy Calculator</h3>
              <p className="text-sm text-slate-500">Compare the long-term costs of renting versus buying a home.</p>
            </div>
          </Link>
          <Link href="/home-loan-calculator" className="block">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Home Loan Calculator</h3>
              <p className="text-sm text-slate-500">Calculate your monthly EMI and total interest for home loans.</p>
            </div>
          </Link>
          <Link href="/moving-cost-calculator" className="block">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Moving Cost Calculator</h3>
              <p className="text-sm text-slate-500">Estimate the total cost of moving to a new location.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
