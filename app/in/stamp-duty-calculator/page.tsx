import { Metadata } from 'next';
import StampDutyCalculator from '@/components/calculators/real-estate/StampDutyCalculator';

export const metadata: Metadata = {
  title: 'Stamp Duty & Registration Charges Calculator | CostSmart',
  description: 'Calculate Stamp Duty and Registration charges for property in India. Estimate the total government fees for your property purchase.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/stamp-duty-calculator',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Stamp Duty & Registration Charges Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate Stamp Duty and Registration charges for property in India. Estimate the total government fees for your property purchase.</p>
      </div>

      <StampDutyCalculator />

      <article className="prose prose-slate lg:prose-lg mx-auto mt-16">
        <h2>About this calculator</h2>
        <p>
            This tool helps you estimate essential costs related to property and utilities.
            Simply enter your consumption or property details to get an instant estimate.
        </p>
        <h3>Disclaimer</h3>
        <p>
            Rates for utilities and taxes vary significantly by state and municipality.
            Please verify the exact rates with your local service provider or government body.
        </p>
      </article>
    </div>
  );
}
