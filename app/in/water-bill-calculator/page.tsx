import { Metadata } from 'next';
import WaterBillCalculator from '@/components/calculators/real-estate/WaterBillCalculator';

export const metadata: Metadata = {
  title: 'Water Bill Calculator | CostSmart',
  description: 'Calculate your water bill based on consumption volume (kL) and local tariff rates. Includes sewerage charge estimation.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/water-bill-calculator',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Water Bill Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate your water bill based on consumption volume (kL) and local tariff rates. Includes sewerage charge estimation.</p>
      </div>

      <WaterBillCalculator />

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
