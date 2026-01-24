import { Metadata } from 'next';
import ElectricityBillCalculator from '@/components/calculators/real-estate/ElectricityBillCalculator';

export const metadata: Metadata = {
  title: 'Electricity Bill Calculator | CostSmart',
  description: 'Estimate your monthly electricity bill based on unit consumption (kWh) and slab rates. Includes fixed charges.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/electricity-bill-calculator',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Electricity Bill Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Estimate your monthly electricity bill based on unit consumption (kWh) and slab rates. Includes fixed charges.</p>
      </div>

      <ElectricityBillCalculator />

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
