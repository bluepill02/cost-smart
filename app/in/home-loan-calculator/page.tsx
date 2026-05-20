import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator India | CostSmart',
  description: 'Calculate home loan EMI for Indian banks. Get amortization schedule, total interest, and city-wise rates for Mumbai, Delhi, Bangalore and more.',
  alternates: { canonical: 'https://cost-smart-five.vercel.app/home-loan-calculator' },
};

export default function InHomeLoanRedirect() {
  redirect('/home-loan-calculator');
}
