import type { Metadata } from 'next';
import FinancialTranslator from '@/components/features/FinancialTranslator';
import AdContainer from '@/components/ads/AdContainer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  alternates: { canonical: `${CANONICAL_DOMAIN}/tools/translator` },
  title: 'Financial Calculator in Hindi, Tamil & 10+ Indian Languages | CostSmart Translator',
  description: 'Translate EMI calculator results, SIP returns, tax summaries, and financial advice into Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and Odia. Break the English barrier in financial literacy.',
  keywords: 'financial calculator in Hindi, EMI calculator Tamil, SIP calculator Telugu, tax calculator Bengali, financial translator, Indian language finance, Hindi finance tools, Tamil finance calculator, multilingual calculator India',
  openGraph: {
    title: 'Financial Calculator in Hindi, Tamil & 10+ Indian Languages | CostSmart',
    description: 'Translate financial calculations and advice into 10+ Indian languages. EMI, SIP, tax results in your language.',
    url: `${CANONICAL_DOMAIN}/tools/translator`,
    type: 'website',
  },
};

export default function TranslatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <BreadcrumbSchema items={[{ label: 'Tools', href: '/tools' }, { label: 'Financial Translator' }]} currentPath="/tools/translator" />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multilingual Financial Translator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Translate financial calculations, advice, and documents into 10+ Indian languages.
            Understanding money matters should never be blocked by language.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              🌐 10+ Indian Languages
            </span>
            <span className="flex items-center gap-1">
              💰 Financial Terminology
            </span>
            <span className="flex items-center gap-1">
              🤖 Azure AI Powered
            </span>
          </div>
        </div>

        {/* Top Ad */}
        <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mb-8" />

        {/* Financial Translator Component */}
        <div className="max-w-3xl mx-auto">
          <FinancialTranslator />
        </div>

        {/* Why Regional Language Financial Literacy Matters */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Financial Literacy in Regional Languages Matters</h2>
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
            <p>
              Over 80% of Indians prefer consuming content in their regional language. Yet most financial tools,
              calculators, and advice are available only in English. This creates a massive gap where people
              who need financial guidance the most are locked out by a language barrier.
            </p>
            <p>
              When someone calculates their EMI or plans their SIP investments, they should understand
              the results in the language they think in. A farmer in Tamil Nadu reading tax-saving advice
              in Tamil, a small business owner in Gujarat understanding GST calculations in Gujarati,
              or a homemaker in Bengal tracking household budgets in Bengali - this is what inclusive
              financial literacy looks like.
            </p>
            <p>
              Our translator is trained on financial terminology, ensuring that terms like EMI, SIP, TDS,
              and GST are translated with proper context rather than literal word-by-word conversion.
            </p>
          </div>
        </div>

        {/* Supported Languages */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Supported Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: 'Hindi', native: 'हिन्दी', speakers: '600M+' },
              { name: 'Tamil', native: 'தமிழ்', speakers: '80M+' },
              { name: 'Telugu', native: 'తెలుగు', speakers: '83M+' },
              { name: 'Bengali', native: 'বাংলা', speakers: '100M+' },
              { name: 'Marathi', native: 'मराठी', speakers: '83M+' },
              { name: 'Gujarati', native: 'ગુજરાતી', speakers: '55M+' },
              { name: 'Kannada', native: 'ಕನ್ನಡ', speakers: '44M+' },
              { name: 'Malayalam', native: 'മലയാളം', speakers: '38M+' },
              { name: 'Punjabi', native: 'ਪੰਜਾਬੀ', speakers: '113M+' },
              { name: 'Odia', native: 'ଓଡ଼ିଆ', speakers: '35M+' },
            ].map((lang) => (
              <div key={lang.name} className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-medium">{lang.native}</div>
                <div className="text-xs text-gray-600">{lang.name}</div>
                <div className="text-xs text-gray-400">{lang.speakers} speakers</div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">What You Can Translate</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '📊', title: 'Calculator Results', desc: 'EMI, SIP, FD, RD, and loan calculator outputs in your language' },
              { icon: '💡', title: 'Financial Advice', desc: 'Investment tips, tax-saving suggestions, and budgeting recommendations' },
              { icon: '📋', title: 'Tax Summaries', desc: 'ITR details, TDS information, and tax planning strategies' },
              { icon: '📈', title: 'Investment Reports', desc: 'Mutual fund reports, stock analysis, and portfolio summaries' },
              { icon: '🏦', title: 'Banking Terms', desc: 'Account details, loan terms, and banking correspondence' },
              { icon: '📑', title: 'Insurance Policies', desc: 'Policy documents, claim details, and coverage explanations' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Ad */}
        <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mt-8" />
      </div>
    </div>
  );
}
