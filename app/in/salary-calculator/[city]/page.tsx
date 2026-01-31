import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDIAN_CITIES, CityData } from '@/lib/pseo-data/cities';
import SalaryCalculator from '@/components/calculators/income/SalaryCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { MapPin, Briefcase, TrendingUp, Home } from 'lucide-react';

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

  const title = `${cityData.name} Salary Calculator - CTC to In-Hand Calculator for ${cityData.state}`;
  const description = `Calculate your in-hand salary from CTC in ${cityData.name}, ${cityData.state}. Includes cost of living data, average rent, and city-specific insights for accurate budgeting.`;

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
      canonical: `/in/salary-calculator/${citySlug}`,
    },
  };
}

export default async function CitySalaryPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const cityData = getCityData(citySlug);

  if (!cityData) {
    notFound();
  }

  // Tier-based cost of living data
  const getCostOfLiving = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return {
          avgRent1BHK: '₹15,000-40,000',
          avgRent2BHK: '₹25,000-70,000',
          monthlyExpenses: '₹25,000-50,000',
          transportation: '₹3,000-8,000',
          dining: '₹8,000-15,000',
        };
      case 2:
        return {
          avgRent1BHK: '₹8,000-20,000',
          avgRent2BHK: '₹12,000-35,000',
          monthlyExpenses: '₹15,000-30,000',
          transportation: '₹2,000-5,000',
          dining: '₹5,000-10,000',
        };
      case 3:
        return {
          avgRent1BHK: '₹5,000-12,000',
          avgRent2BHK: '₹8,000-20,000',
          monthlyExpenses: '₹12,000-20,000',
          transportation: '₹1,500-3,000',
          dining: '₹3,000-6,000',
        };
    }
  };

  // Typical CTC by tier
  const getTypicalCTC = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1: return 1200000; // ₹12 LPA for Tier 1
      case 2: return 800000;  // ₹8 LPA for Tier 2
      case 3: return 500000;  // ₹5 LPA for Tier 3
    }
  };

  const costData = getCostOfLiving(cityData.tier);
  const typicalCTC = getTypicalCTC(cityData.tier);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm mb-4 text-emerald-100">
              <ol className="flex items-center space-x-2">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li>›</li>
                <li><a href="/salary-calculator" className="hover:text-white">Salary Calculator</a></li>
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
                  {cityData.name} Salary Calculator
                </h1>
                <p className="text-lg text-emerald-100">
                  Calculate your in-hand salary from CTC with {cityData.name}-specific cost of living data
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
              {/* Cost of Living Overview */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-xl font-bold">{cityData.name} Cost of Living</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">1 BHK Rent</div>
                    <div className="text-lg font-bold text-emerald-900">{costData.avgRent1BHK}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">2 BHK Rent</div>
                    <div className="text-lg font-bold text-blue-900">{costData.avgRent2BHK}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Monthly Expenses</div>
                    <div className="text-sm font-medium text-purple-900">{costData.monthlyExpenses}</div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Transportation</div>
                    <div className="text-sm font-medium text-amber-900">{costData.transportation}/month</div>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Dining Out</div>
                    <div className="text-sm font-medium text-rose-900">{costData.dining}/month</div>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">City Tier</div>
                    <div className="text-sm font-medium text-cyan-900">Tier {cityData.tier}</div>
                  </div>
                </div>
                
                {cityData.tier === 1 && (
                  <div className="mt-4 p-3 bg-emerald-100 border-l-4 border-emerald-600 text-sm text-emerald-900">
                    <strong>Tier 1 City:</strong> Higher salaries in {cityData.name} offset the higher cost of living. Excellent career opportunities and infrastructure.
                  </div>
                )}
                {cityData.tier === 2 && (
                  <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-600 text-sm text-green-900">
                    <strong>Tier 2 City:</strong> {cityData.name} offers balanced living costs with good employment opportunities. Growing IT and service sectors.
                  </div>
                )}
              </div>

              {/* Calculator */}
              <SalaryCalculator 
                currency="INR"
                locale="en-IN"
                mode="India"
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
                    <span className="text-gray-600">Typical CTC</span>
                    <span className="font-medium">₹{(typicalCTC / 100000).toFixed(0)}L - ₹{(typicalCTC / 100000 * 2).toFixed(0)}L</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">PF Contribution</span>
                    <span className="font-medium">12% of Basic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* City-Specific Content */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Salary Guide for {cityData.name}</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-emerald-900">Understanding CTC</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>CTC (Cost to Company) includes all components: basic, HRA, allowances, PF, gratuity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>In-hand salary is typically 70-80% of CTC for most roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Basic salary usually forms 40-50% of CTC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>HRA ranges from 40-50% of basic salary</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-emerald-900">Deductions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>EPF (Employee Provident Fund): 12% of basic salary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Professional Tax: ₹200/month (varies by state)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Income Tax: Based on tax slab and deductions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>ESI (if applicable): For salaries &lt; ₹21,000/month</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-emerald-900">Budgeting for {cityData.name}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Allocate 30-40% of salary for rent in {cityData.name}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Keep emergency fund of 3-6 months expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Save 20-30% of in-hand salary for investments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Account for annual expenses (renewals, festivals, travel)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-emerald-900">Tax Savings</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Section 80C: Up to ₹1.5L (EPF, ELSS, life insurance)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>HRA exemption: Based on rent paid in {cityData.name}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Section 80D: Health insurance premiums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>NPS contribution: Additional ₹50K under 80CCD(1B)</span>
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
                <h3 className="text-lg font-bold mb-2 text-emerald-900">
                  What is the average salary in {cityData.name}?
                </h3>
                <p className="text-gray-700">
                  The average salary in {cityData.name} varies by industry and experience. For fresh graduates, entry-level salaries typically range from {cityData.tier === 1 ? '₹3-6 LPA' : cityData.tier === 2 ? '₹2.5-4.5 LPA' : '₹2-3.5 LPA'}. Mid-level professionals (3-7 years) earn {cityData.tier === 1 ? '₹8-20 LPA' : cityData.tier === 2 ? '₹6-12 LPA' : '₹4-8 LPA'}, while senior roles (8+ years) command {cityData.tier === 1 ? '₹20-50+ LPA' : cityData.tier === 2 ? '₹12-30 LPA' : '₹8-20 LPA'} depending on the sector.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-emerald-900">
                  How much is in-hand salary from CTC in {cityData.name}?
                </h3>
                <p className="text-gray-700">
                  In-hand salary (take-home) is typically 70-80% of your CTC. For example, a CTC of ₹10 LPA would give you approximately ₹58,000-65,000 per month in hand after EPF (12% of basic), professional tax (₹200/month), and income tax deductions. The exact amount depends on your salary structure, tax regime chosen (old vs new), and Section 80C investments.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-emerald-900">
                  Is {cityData.name} expensive to live in?
                </h3>
                <p className="text-gray-700">
                  {cityData.tier === 1 
                    ? `${cityData.name} is a Tier 1 metro city with higher living costs. Rent for a 1BHK ranges from ${costData.avgRent1BHK}, and monthly expenses (food, transport, utilities) can be ${costData.monthlyExpenses}. However, salaries are proportionally higher to offset these costs. The city offers excellent infrastructure, healthcare, and career opportunities.`
                    : cityData.tier === 2
                    ? `${cityData.name} is a Tier 2 city offering balanced living costs. Rent for a 1BHK ranges from ${costData.avgRent1BHK}, significantly lower than metros. Monthly expenses are ${costData.monthlyExpenses}, making it affordable for young professionals. The city provides good quality of life with growing job opportunities.`
                    : `${cityData.name} is a Tier 3 city with affordable living costs. Rent for a 1BHK ranges from ${costData.avgRent1BHK}, and monthly expenses are ${costData.monthlyExpenses}. It's ideal for those seeking lower expenses while building their career.`
                  }
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-emerald-900">
                  What is HRA exemption and how is it calculated?
                </h3>
                <p className="text-gray-700">
                  HRA (House Rent Allowance) exemption allows you to reduce taxable income based on rent paid. The exemption is the minimum of: (a) Actual HRA received, (b) 50% of basic salary if living in metro cities like {cityData.tier === 1 ? cityData.name : 'Mumbai/Delhi'}, or 40% for non-metros, (c) Rent paid minus 10% of basic salary. For {cityData.name}, which is a Tier {cityData.tier} city, consult a tax advisor for accurate calculations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-emerald-900">
                  Should I choose the old or new tax regime?
                </h3>
                <p className="text-gray-700">
                  Choose the old tax regime if you claim many deductions (80C, HRA, home loan interest). It benefits those with annual deductions exceeding ₹2.5 lakhs. Choose the new tax regime (lower rates, no deductions) if your deductions are minimal and you prefer simpler filing. For salaries above ₹15 LPA with limited deductions, the new regime often saves more tax. Use online tax calculators to compare both options for your {cityData.name} salary.
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
                name: `What is the average salary in ${cityData.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `The average salary in ${cityData.name} varies by industry and experience. Entry-level salaries typically range from ${cityData.tier === 1 ? '₹3-6 LPA' : cityData.tier === 2 ? '₹2.5-4.5 LPA' : '₹2-3.5 LPA'}.`,
                },
              },
              {
                '@type': 'Question',
                name: `How much is in-hand salary from CTC in ${cityData.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'In-hand salary is typically 70-80% of your CTC after EPF, professional tax, and income tax deductions.',
                },
              },
              {
                '@type': 'Question',
                name: `Is ${cityData.name} expensive to live in?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `${cityData.name} is a Tier ${cityData.tier} city with ${cityData.tier === 1 ? 'higher' : cityData.tier === 2 ? 'balanced' : 'affordable'} living costs.`,
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
                name: 'Salary Calculator',
                item: 'https://costsmart.in/salary-calculator',
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
                item: `https://costsmart.in/in/salary-calculator/${cityData.slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
