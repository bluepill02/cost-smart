import { Metadata } from 'next';
import AIFinancialAdvisorChat from '@/components/features/AIFinancialAdvisorChat';
import AdContainer from '@/components/ads/AdContainer';

export const metadata: Metadata = {
  title: 'AI Financial Advisor - Free Personalized Financial Guidance | CostSmart',
  description: 'Get free AI-powered financial advice on investments, loans, taxes, retirement planning, and budgeting. Context-aware recommendations with voice input support.',
  openGraph: {
    title: 'AI Financial Advisor - Free Financial Guidance',
    description: 'Chat with our AI financial advisor for personalized advice on investments, loans, taxes, and budget planning.',
    type: 'website',
  },
  alternates: {
    canonical: '/tools/ai-advisor',
  },
};

export default function AIAdvisorPage() {
  return (
    <div>
      <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mb-8 mt-4" />
      <AIFinancialAdvisorChat />
      <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mt-8" />
    </div>
  );
}
