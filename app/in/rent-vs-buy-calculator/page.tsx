import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator India | CostSmart',
  description: 'Calculate whether renting or buying a home is better for you. Compare 20-year NPV, opportunity cost, and break-even point for Indian property markets.',
  alternates: { canonical: 'https://cost-smart-five.vercel.app/rent-vs-buy-calculator' },
};

export default function InRentVsBuyRedirect() {
  redirect('/rent-vs-buy-calculator');
}
