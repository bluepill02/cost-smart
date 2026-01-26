import { Metadata } from 'next';
import StampDutyCalculator from '@/components/calculators/real-estate/StampDutyCalculator';
import AdContainer from '@/components/ads/AdContainer';
import JsonLd from '@/components/seo/JsonLd';
import { getCalculatorSchema } from '@/lib/seo-utils';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { INDIAN_STATES_STAMP_DUTY } from '@/lib/pseo-data/stamp-duty';

export const metadata: Metadata = {
  title: 'Stamp Duty Calculator India | Property Registration Charges',
  description: 'Calculate Stamp Duty and Registration Charges for property in India. Updated rates for Maharashtra, Karnataka, Tamil Nadu, and more.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/stamp-duty-calculator',
  },
};

export default function Page() {
  const jsonLd = getCalculatorSchema(
    'Stamp Duty Calculator',
    'Calculate Stamp Duty and Registration Charges for property registration in India.',
    '/in/stamp-duty-calculator'
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <JsonLd data={jsonLd} />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Stamp Duty Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate the government fees for buying a property. Accurate rates for all major Indian states.</p>
      </div>

      <StampDutyCalculator />

      <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
        <div className="prose prose-slate lg:prose-lg">
            <h2>What is Stamp Duty?</h2>
            <p>
                Stamp Duty is a tax levied by the State Government on the purchase of property. It acts as legal evidence of ownership.
                Registration Charges are paid over and above Stamp Duty for the registration of the sale deed.
            </p>
            <h3>Factors affecting Stamp Duty</h3>
            <ul>
                <li><strong>State:</strong> Each state decides its own rates.</li>
                <li><strong>Gender:</strong> Many states offer discounts to female buyers.</li>
                <li><strong>Location:</strong> Municipal limits usually attract higher rates than Gram Panchayats.</li>
            </ul>
        </div>
        <div className="space-y-6">
             <AdContainer size="rectangle" />
        </div>
      </div>

      {/* Internal Linking for pSEO State Pages */}
      <section className="mt-16 pt-12 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin className="text-emerald-500" />
            Check Rates by State
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {INDIAN_STATES_STAMP_DUTY.map(state => (
                <Link
                    key={state.slug}
                    href={`/in/stamp-duty-calculator/${state.slug}`}
                    className="text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded transition-colors truncate border border-transparent hover:border-emerald-100"
                    title={`Stamp Duty in ${state.state}`}
                >
                    {state.state}
                </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
