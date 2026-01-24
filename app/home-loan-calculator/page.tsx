import { Metadata } from 'next';
import HomeLoanCalculator from '@/components/calculators/loan/HomeLoanCalculator';
import AdContainer from '@/components/ads/AdContainer';
import JsonLd from '@/components/seo/JsonLd';
import { getCalculatorSchema } from '@/lib/seo-utils';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { INDIAN_CITIES } from '@/lib/pseo-data/cities';

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator | CostSmart',
  description: 'Calculate your Home Loan EMI, total interest payable, and amortization schedule with our advanced calculator.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/home-loan-calculator',
  },
};

export default function Page() {
  const jsonLd = getCalculatorSchema(
    'Home Loan EMI Calculator',
    'Calculate your Home Loan EMI, total interest payable, and amortization schedule.',
    '/home-loan-calculator'
  );

  // Sort cities for the list
  const cities = [...INDIAN_CITIES].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <JsonLd data={jsonLd} />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Home Loan EMI Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Plan your dream home with our precise EMI planner. Supports pre-payment and tenure adjustment.</p>
      </div>

      <HomeLoanCalculator />

      <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
        <div className="prose prose-slate lg:prose-lg">
            <h2>How to calculate Home Loan EMI?</h2>
            <p>
                Equated Monthly Installment (EMI) is the fixed amount you pay to the bank every month.
                It consists of principal repayment and interest payment.
            </p>
            <h3>Formula Used</h3>
            <p>
                <strong>EMI = [P x R x (1+R)^N]/[(1+R)^N-1]</strong>
            </p>
            <ul>
                <li><strong>P</strong> = Principal Loan Amount</li>
                <li><strong>R</strong> = Monthly Interest Rate (Annual Rate/12/100)</li>
                <li><strong>N</strong> = Loan Tenure in Months</li>
            </ul>
        </div>
        <div className="space-y-6">
             <AdContainer size="rectangle" />
        </div>
      </div>

      {/* Internal Linking for pSEO Pages */}
      <section className="mt-16 pt-12 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin className="text-emerald-500" />
            Calculate EMI by City
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map(city => (
                <Link
                    key={city.slug}
                    href={`/home-loan-calculator/${city.slug}`}
                    className="text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded transition-colors truncate border border-transparent hover:border-emerald-100"
                    title={`Home Loan in ${city.name}`}
                >
                    {city.name}
                </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
