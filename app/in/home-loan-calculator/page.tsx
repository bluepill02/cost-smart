import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator India | CostSmart',
  description: 'Calculate home loan EMI for Indian banks. Get amortization schedule, total interest, and city-wise rates for Mumbai, Delhi, Bangalore and more.',
  alternates: { canonical: '/home-loan-calculator' },
  openGraph: {
    title: 'Home Loan EMI Calculator India | CostSmart',
    description: 'Calculate home loan EMI for Indian banks. Get amortization schedule, total interest, and city-wise rates for Mumbai, Delhi, Bangalore and more.',
    url: `${CANONICAL_DOMAIN}/home-loan-calculator`,
    type: 'website',
  },
};

export default function InHomeLoanRedirect() {
  redirect('/home-loan-calculator');
}
