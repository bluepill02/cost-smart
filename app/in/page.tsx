import { Metadata } from 'next';
import { INDIAN_CITIES } from '@/lib/pseo-data/cities';
import { MapPin, Building2, Calculator, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import AdContainer from '@/components/ads/AdContainer';

export const metadata: Metadata = {
  title: 'India City-Specific Financial Calculators - Home Loan, Salary, Tax Calculators',
  description: 'Access city-specific financial calculators for 50+ Indian cities. Calculate home loan EMI, salary, taxes with localized data for Mumbai, Delhi, Bangalore, and more.',
  openGraph: {
    title: 'India City-Specific Financial Calculators',
    description: 'City-wise home loan EMI calculators with localized property prices and interest rates for all major Indian cities.',
    type: 'website',
  },
  alternates: {
    canonical: '/in',
  },
};

export default function IndiaCalculatorsPage() {
  // Group cities by tier
  const tier1Cities = INDIAN_CITIES.filter(city => city.tier === 1);
  const tier2Cities = INDIAN_CITIES.filter(city => city.tier === 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              City-Specific Financial Calculators
            </h1>
            <p className="text-xl text-blue-100">
              Get localized property prices, interest rates, and cost of living data for {INDIAN_CITIES.length} major Indian cities
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <AdContainer size="leaderboard" className="mb-8" />

        <div className="max-w-6xl mx-auto mt-8">
          {/* Available Calculators */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Available City-Specific Calculators
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <Building2 className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">Home Loan EMI Calculator</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Calculate EMI with city-specific property prices and interest rates
                </p>
                <Link 
                  href="#cities" 
                  className="text-blue-600 font-medium text-sm hover:text-blue-800"
                >
                  Select Your City →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <TrendingUp className="w-10 h-10 text-emerald-600 mb-3" />
                <h3 className="text-lg font-bold mb-2">Salary Calculator</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Calculate in-hand salary with city-specific cost of living data
                </p>
                <Link 
                  href="#cities" 
                  className="text-emerald-600 font-medium text-sm hover:text-emerald-800"
                >
                  Select Your City →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 opacity-50">
                <Calculator className="w-10 h-10 text-gray-400 mb-3" />
                <h3 className="text-lg font-bold mb-2 text-gray-600">More Calculators</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Future additions: Rent calculator, property tax, and more
                </p>
                <span className="text-gray-400 text-sm">Planned</span>
              </div>
            </div>
          </div>

          {/* Tier 1 Cities */}
          <div id="cities" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Tier 1 Cities (Metro Cities)
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {tier1Cities.map(city => (
                <div
                  key={city.slug}
                  className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-5 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{city.name}</h3>
                      <p className="text-blue-100 text-sm">{city.state}</p>
                    </div>
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-500">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/in/home-loan-calculator/${city.slug}`}
                        className="text-sm bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded transition-colors"
                      >
                        Home Loan EMI
                      </Link>
                      <Link
                        href={`/in/salary-calculator/${city.slug}`}
                        className="text-sm bg-emerald-500 hover:bg-emerald-400 px-3 py-2 rounded transition-colors"
                      >
                        Salary Calculator
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2 Cities */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Tier 2 Cities
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {tier2Cities.map(city => (
                <div
                  key={city.slug}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{city.name}</h3>
                      <p className="text-gray-500 text-xs">{city.state}</p>
                    </div>
                    <MapPin className="w-4 h-4 flex-shrink-0 text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/in/home-loan-calculator/${city.slug}`}
                      className="text-xs text-center bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1.5 rounded transition-colors"
                    >
                      EMI Calculator
                    </Link>
                    <Link
                      href={`/in/salary-calculator/${city.slug}`}
                      className="text-xs text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2 py-1.5 rounded transition-colors"
                    >
                      Salary Calculator
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Use City-Specific Calculators */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Why Use City-Specific Calculators?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-blue-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Accurate Local Data
                </h3>
                <p className="text-gray-700">
                  Property prices vary significantly across Indian cities. Mumbai properties cost 3-4x more than Tier 2 cities. Our calculators use real market data specific to each city, giving you accurate EMI estimates for your location.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-blue-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Localized Interest Rates
                </h3>
                <p className="text-gray-700">
                  Banks may offer different interest rates based on property location, city tier, and local competition. We provide typical rate ranges for each city to help you plan better.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-blue-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Market Insights
                </h3>
                <p className="text-gray-700">
                  Get detailed information about property markets in your city including average prices per sq.ft, popular localities, market trends, and appreciation potential.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-blue-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Smart Defaults
                </h3>
                <p className="text-gray-700">
                  Save time with pre-filled values based on typical property transactions in your city. Instantly see realistic EMI amounts without manual research.
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
            '@type': 'CollectionPage',
            name: 'India City-Specific Financial Calculators',
            description: 'Access city-specific financial calculators for 50+ Indian cities including home loan EMI calculators with localized property prices.',
            url: 'https://costsmart.in/in',
            hasPart: INDIAN_CITIES.slice(0, 10).map(city => ({
              '@type': 'WebPage',
              name: `${city.name} Home Loan Calculator`,
              url: `https://costsmart.in/in/home-loan-calculator/${city.slug}`,
              description: `Calculate home loan EMI for ${city.name}, ${city.state}`,
            })),
          }),
        }}
      />
    </div>
  );
}
