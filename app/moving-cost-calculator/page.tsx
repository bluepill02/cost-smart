import { Metadata } from 'next';
import MovingCostCalculator from '@/components/calculators/real-estate/MovingCostCalculator';
import JsonLd from '@/components/seo/JsonLd';
import { CANONICAL_DOMAIN, getFAQSchema } from '@/lib/seo-utils';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import FAQSection from '@/components/ui/FAQSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import RelatedTools from '@/components/layouts/RelatedTools';
import NeighborhoodCTA from '@/components/features/NeighborhoodCTA';

export const metadata: Metadata = {
  title: 'Moving Cost Calculator | Packers & Movers Cost | CostSmart',
  description: 'Calculate home or office moving costs — packers & movers, transport, packing, and insurance. Instant estimates for local and interstate moves in India.',
  keywords: ['moving cost calculator', 'packers movers cost', 'relocation estimate', 'shifting cost calculator', 'home shifting charges', 'moving expenses India'],
  alternates: {
    canonical: '/moving-cost-calculator',
  },
  openGraph: {
    title: 'Moving Cost Calculator | Packers & Movers Cost | CostSmart',
    description: 'Calculate home or office moving costs — packers & movers, transport, packing, and insurance. Instant estimates for local and interstate moves in India.',
    url: `${CANONICAL_DOMAIN}/moving-cost-calculator`,
    type: 'website',
  },
};

const movingFAQs = [
  {
    question: 'How is moving cost calculated?',
    answer: 'Moving cost depends on distance, load size (BHK/vehicle type), city tier, labor hours, and additional services like packing, insurance, and storage. Base rates vary for local, intercity, and interstate moves.',
  },
  {
    question: 'What is the average cost of packers and movers in India?',
    answer: 'For a 2 BHK home, local moves typically cost ₹5,000-15,000, intercity moves (500km) cost ₹15,000-35,000, and interstate moves can range from ₹25,000-60,000 depending on distance and services.',
  },
  {
    question: 'What services are included in professional moving?',
    answer: 'Professional moving services include packing materials, loading/unloading labor, transportation, unpacking, furniture assembly, transit insurance, and sometimes temporary storage.',
  },
  {
    question: 'How can I reduce my moving costs?',
    answer: 'Book mid-month instead of month-end, declutter before moving, get multiple quotes, avoid peak seasons (festivals, year-end), do some packing yourself, and choose shared transportation for long distances.',
  },
];

export default function Page() {
  const faqSchema = getFAQSchema(movingFAQs);

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Calculators', url: '/' },
    { name: 'Moving Cost Calculator', url: '/moving-cost-calculator' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <CalculatorSchemaInjector calculatorName="Moving Cost Calculator" calculatorDescription="Calculate home or office relocation costs including packers and movers charges, transportation, packing materials, labor, and transit insurance for local, intercity, and interstate moves in India." urlPath="/moving-cost-calculator" calculatorType="general" />
      <JsonLd data={faqSchema} />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          Real Estate Tool
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Moving Cost Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Estimate your relocation expenses for packers & movers, transportation, and additional services.
        </p>
      </div>

      <MovingCostCalculator />

      <article className="prose prose-slate lg:prose-lg mx-auto mt-16">
        <h2>How to Use This Moving Cost Calculator</h2>
        <p>
          Planning a relocation can be stressful, especially when budgeting for packers and movers.
          This calculator helps you estimate your total moving costs based on:
        </p>
        <ul>
          <li><strong>Move Type:</strong> Local (within city), Intercity, or Interstate moves have different rate structures</li>
          <li><strong>Distance:</strong> Transportation costs are calculated per kilometer based on your route</li>
          <li><strong>Load Size:</strong> Choose from Mini (1 BHK) to Container (full house/office) based on your belongings</li>
          <li><strong>Additional Services:</strong> Professional packing, unpacking, furniture assembly, insurance, and storage</li>
        </ul>

        <h3>What Affects Moving Costs?</h3>
        <p>
          Several factors influence your final relocation bill: the volume of goods (measured in cubic feet or BHK equivalent),
          distance traveled, accessibility of both locations (floor level, elevator availability), fragile items requiring
          special handling, and the time of month/year. Month-end moves and festival seasons typically cost 20-30% more.
        </p>

        <h3>Should You Get Transit Insurance?</h3>
        <p>
          We recommend transit insurance for moves involving expensive electronics, antiques, or valuable furniture.
          The typical rate is 1% of declared goods value and covers damage or loss during transportation.
        </p>
      </article>

      <FAQSection faqs={movingFAQs} title="Frequently Asked Questions About Moving Costs" />

      <div className="mt-12">
        <NeighborhoodCTA />
      </div>

      <RelatedTools currentTool="loan" />
    </div>
  );
}
