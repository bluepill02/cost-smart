import { Metadata } from 'next';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import AIFinancialAdvisorChat from '@/components/features/AIFinancialAdvisorChat';
import AdContainer from '@/components/ads/AdContainer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Free AI Financial Advisor | CostSmart',
  description: 'Get free AI-powered financial advice on investments, loans, taxes, retirement planning, and budgeting. Context-aware recommendations with voice input support.',
  openGraph: {
    title: 'AI Financial Advisor - Free Financial Guidance',
    description: 'Chat with our AI financial advisor for personalized advice on investments, loans, taxes, and budget planning.',
    url: `${CANONICAL_DOMAIN}/tools/ai-advisor`,
    type: 'website',
  },
  alternates: {
    canonical: `${CANONICAL_DOMAIN}/tools/ai-advisor`,
  },
};

export default function AIAdvisorPage() {
  return (
    <div>
      <BreadcrumbSchema items={[{ label: 'Tools', href: '/tools' }, { label: 'AI Financial Advisor' }]} />
      <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mb-8 mt-4" />
      <AIFinancialAdvisorChat />
      <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mt-8" />
    </div>
  );
}
