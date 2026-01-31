import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDIAN_CITIES, CityData } from '@/lib/pseo-data/cities';
import HomeLoanCalculator from '@/components/calculators/loan/HomeLoanCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Building2, TrendingUp, MapPin } from 'lucide-react';

interface PageProps {
  params: Promise<{ city: string }>;
}

// Generate static paths for all cities
export async function generateStaticParams() {
  return INDIAN_CITIES.map((city) => ({
    city: city.slug,
  }));
}

// Helper to get city data
function getCityData(slug: string): CityData | undefined {
  return INDIAN_CITIES.find((city) => city.slug === slug);
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const cityData = getCityData(citySlug);

  if (!cityData) {
    return {
      title: 'City Not Found',
    };
  }

  const title = `${cityData.name} Home Loan EMI Calculator - Calculate EMI, Interest, Affordability`;
  const description = `Free ${cityData.name} home loan EMI calculator with city-specific property prices and loan rates. Calculate monthly EMI, total interest, and check property affordability for ${cityData.state}. Get detailed amortization schedule and prepayment analysis.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/in/home-loan-calculator/${citySlug}`,
    },
  };
}

export default async function CityHomeLoanPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const cityData = getCityData(citySlug);

  if (!cityData) {
    notFound();
  }

  // Tier-based defaults
  const getDefaultLoanAmount = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1: return '8000000'; // ₹80 lakhs for Tier 1 cities
      case 2: return '5000000'; // ₹50 lakhs for Tier 2 cities
      case 3: return '3000000'; // ₹30 lakhs for Tier 3 cities
    }
  };

  const getDefaultInterestRate = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1: return '9.0';
      case 2: return '9.25';
      case 3: return '9.5';
    }
  };

  // City-specific market insights
  const getMarketInsights = (tier: 1 | 2 | 3, cityName: string, state: string) => {
    const insights = {
      1: {
        avgPrice: '₹8-15 crores',
        pricePerSqFt: '₹12,000-25,000/sq.ft',
        popularAreas: 'Central business districts, premium localities',
        marketTrend: 'High appreciation potential, robust rental yields',
      },
      2: {
        avgPrice: '₹50 lakhs - 2 crores',
        pricePerSqFt: '₹5,000-12,000/sq.ft',
        popularAreas: 'Developing suburbs, IT corridors',
        marketTrend: 'Steady growth with infrastructure development',
      },
      3: {
        avgPrice: '₹30-80 lakhs',
        pricePerSqFt: '₹3,000-6,000/sq.ft',
        popularAreas: 'Residential colonies, new developments',
        marketTrend: 'Emerging markets with affordable housing',
      },
    };
    return insights[tier];
  };

  const marketData = getMarketInsights(cityData.tier, cityData.name, cityData.state);
  const defaultLoanAmount = getDefaultLoanAmount(cityData.tier);
  const defaultInterestRate = getDefaultInterestRate(cityData.tier);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm mb-4 text-blue-100">
              <ol className="flex items-center space-x-2">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li>›</li>
                <li><a href="/home-loan-calculator" className="hover:text-white">Home Loan Calculator</a></li>
                <li>›</li>
                <li><a href="/in" className="hover:text-white">India</a></li>
                <li>›</li>
                <li className="text-white font-medium">{cityData.name}</li>
              </ol>
            </nav>

            <div className="flex items-start gap-4">
              <MapPin className="w-12 h-12 flex-shrink-0 mt-1" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {cityData.name} Home Loan EMI Calculator
                </h1>
                <p className="text-lg text-blue-100">
                  Calculate home loan EMI with {cityData.name}-specific property prices and interest rates for {cityData.state}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <AdContainer size="leaderboard" className="mb-8" />

        <div className="max-w-6xl mx-auto mt-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-2">
              {/* Market Insights */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold">{cityData.name} Property Market Overview</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Average Property Price</div>
                    <div className="text-lg font-bold text-blue-900">{marketData.avgPrice}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Price per sq.ft</div>
                    <div className="text-lg font-bold text-green-900">{marketData.pricePerSqFt}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Popular Areas</div>
                    <div className="text-sm font-medium text-purple-900">{marketData.popularAreas}</div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Market Trend</div>
                    <div className="text-sm font-medium text-amber-900">{marketData.marketTrend}</div>
                  </div>
                </div>
                
                {cityData.tier === 1 && (
                  <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-600 text-sm text-blue-900">
                    <strong>Tier 1 City:</strong> {cityData.name} is a major metropolitan city with high property values, excellent infrastructure, and strong rental demand.
                  </div>
                )}
                {cityData.tier === 2 && (
                  <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-600 text-sm text-green-900">
                    <strong>Tier 2 City:</strong> {cityData.name} offers balanced property prices with growing infrastructure and good appreciation potential.
                  </div>
                )}
              </div>

              {/* Calculator */}
              <HomeLoanCalculator 
                defaultAmount={Number(defaultLoanAmount)}
                defaultRate={Number(defaultInterestRate)}
                defaultTenure={20}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdContainer size="rectangle" className="mb-6" />

              {/* Quick Facts */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold">Quick Facts</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">City</span>
                    <span className="font-medium">{cityData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">State</span>
                    <span className="font-medium">{cityData.state}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">City Tier</span>
                    <span className="font-medium">Tier {cityData.tier}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Typical Interest Rate</span>
                    <span className="font-medium">{defaultInterestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Typical Loan Tenure</span>
                    <span className="font-medium">15-30 years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* City-Specific Content */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Home Loan Guide for {cityData.name}</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-blue-900">Eligibility Criteria</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Age: 21-65 years (salaried), 21-70 years (self-employed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Minimum income: ₹25,000/month (varies by lender)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Credit score: 750+ preferred for best rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Loan-to-Value: Up to 90% for properties up to ₹30L</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-blue-900">Documentation Required</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Identity proof (Aadhaar, PAN, Passport)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Address proof (utility bills, rent agreement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Income proof (salary slips, ITR, bank statements)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Property documents (sale deed, NOC, title deed)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-blue-900">Additional Costs in {cityData.name}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Stamp duty: 5-7% (varies by state)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Registration charges: 1-2% of property value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Processing fee: 0.5-1% of loan amount</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Legal verification: ₹5,000-15,000</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-blue-900">Tax Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Principal repayment: Up to ₹1.5L (Section 80C)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Interest payment: Up to ₹2L (Section 24b)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>First-time buyer: Additional ₹1.5L (Section 80EEA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Affordable housing: Extra ₹1.5L interest (Section 80EEB)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2 text-blue-900">
                  What is the typical home loan interest rate in {cityData.name}?
                </h3>
                <p className="text-gray-700">
                  Home loan interest rates in {cityData.name} typically range from {parseFloat(defaultInterestRate) - 0.5}% to {parseFloat(defaultInterestRate) + 1}% p.a., depending on your credit score, income, loan amount, and the lender. Tier {cityData.tier} cities like {cityData.name} generally have competitive rates. A good credit score (750+) can help you secure rates at the lower end of this range.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-blue-900">
                  How much down payment is required to buy a house in {cityData.name}?
                </h3>
                <p className="text-gray-700">
                  Banks typically finance 75-90% of the property value, meaning you need a down payment of 10-25%. For properties in {cityData.name} priced at {marketData.avgPrice}, you should plan for a down payment of 15-20% (approximately {cityData.tier === 1 ? '₹1.2-3 crores' : cityData.tier === 2 ? '₹7.5-40 lakhs' : '₹4.5-16 lakhs'}). A higher down payment reduces your EMI burden and total interest paid.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-blue-900">
                  What are the stamp duty and registration charges in {cityData.state}?
                </h3>
                <p className="text-gray-700">
                  Stamp duty in {cityData.state} is typically 5-7% of the property value, with some relief for women buyers in certain states (usually 1-2% lower). Registration charges are around 1% of the property value. For a property worth {cityData.tier === 1 ? '₹1 crore' : '₹50 lakhs'}, expect to pay approximately {cityData.tier === 1 ? '₹6-8 lakhs' : '₹3-4 lakhs'} in stamp duty and registration combined. These are one-time costs paid during property purchase.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-blue-900">
                  Can I prepay my home loan early?
                </h3>
                <p className="text-gray-700">
                  Yes, you can prepay your home loan partially or fully at any time. For floating rate home loans, banks cannot charge prepayment penalties. For fixed rate loans, some banks may charge 2-3% prepayment penalty if you close within the first 3-5 years. Prepayment significantly reduces your total interest burden - even small regular prepayments can save lakhs over the loan tenure.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-blue-900">
                  Should I choose floating or fixed interest rate for my home loan in {cityData.name}?
                </h3>
                <p className="text-gray-700">
                  Most borrowers in {cityData.name} choose floating rates as they are typically 1-2.5% lower than fixed rates and benefit from rate cuts by RBI. Choose floating rate if you can handle EMI fluctuations and expect rates to remain stable or decrease. Choose fixed rate only if you prefer predictable EMIs and expect interest rates to rise significantly. Many banks now offer hybrid options where rates are fixed for initial 2-3 years.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <AdContainer size="leaderboard" />
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What is the typical home loan interest rate in ${cityData.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Home loan interest rates in ${cityData.name} typically range from ${parseFloat(defaultInterestRate) - 0.5}% to ${parseFloat(defaultInterestRate) + 1}% p.a., depending on your credit score, income, loan amount, and the lender.`,
                },
              },
              {
                '@type': 'Question',
                name: `How much down payment is required to buy a house in ${cityData.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Banks typically finance 75-90% of the property value, meaning you need a down payment of 10-25%. A higher down payment reduces your EMI burden and total interest paid.',
                },
              },
              {
                '@type': 'Question',
                name: `What are the stamp duty and registration charges in ${cityData.state}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Stamp duty in ${cityData.state} is typically 5-7% of the property value, with registration charges around 1% of the property value.`,
                },
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://costsmart.in/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Home Loan Calculator',
                item: 'https://costsmart.in/home-loan-calculator',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'India',
                item: 'https://costsmart.in/in',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: cityData.name,
                item: `https://costsmart.in/in/home-loan-calculator/${cityData.slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
