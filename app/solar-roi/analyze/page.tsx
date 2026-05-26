import { Metadata } from 'next';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import AdContainer from '@/components/ads/AdContainer';
import SolarAnalyzer from '@/components/calculators/SolarAnalyzer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Analyze Your Rooftop Solar Potential | CostSmart',
  description: 'Get a detailed analysis of your rooftop solar potential using Google Solar API data. See panel count, capacity, annual production, savings, and financial breakdown.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/solar-roi/analyze',
  },
  openGraph: {
    title: 'Analyze Your Rooftop Solar Potential | CostSmart',
    description: 'Get a detailed analysis of your rooftop solar potential using Google Solar API data. See panel count, capacity, annual production, savings, and financial breakdown.',
    url: `${CANONICAL_DOMAIN}/solar-roi/analyze`,
    type: 'website',
  },
};

export default function SolarAnalyzePage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-slate-50 min-h-screen">
      <BreadcrumbSchema items={[{ label: 'Solar ROI', href: '/solar-roi' }, { label: 'Rooftop Analysis' }]} currentPath="/solar-roi/analyze" />
      <AdContainer className="mb-8" slotId="1475703853" />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Analyze Your Rooftop Solar Potential
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Enter your address or use your current location to get a detailed solar analysis powered by Google Solar API.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <SolarAnalyzer />
      </div>
    </div>
  );
}
