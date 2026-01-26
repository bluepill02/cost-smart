import Link from 'next/link';
import { ArrowRight, Sun, Globe, ShieldCheck, Zap, ArrowRightLeft, Calculator, Home as HomeIcon, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdContainer from '@/components/ads/AdContainer';
import { AIAssistant } from '@/components/features/AIAssistant';
import { Metadata } from 'next';
import { getLatestRates } from '@/lib/currency-api';
import RateTracker from '@/components/features/RateTracker';
import Dashboard from '@/components/features/Dashboard';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'CostSmart - Financial Calculators for the Modern Economy',
  description: 'Calculate Solar ROI, Import Duties, and more with our precise, data-driven tools.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app',
  },
};

export default async function Home() {
  const rates = await getLatestRates('USD');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CostSmart",
    "url": "https://costsmart.app",
    "description": "Financial calculators for Solar ROI, Import Duty, Currency, and Loans.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://costsmart.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const categories = [
    {
      title: "Personal Finance",
      icon: <Calculator className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
      items: [
        { name: "Currency Converter", href: "/currency", desc: "Live exchange rates" },
        { name: "Income Tax (India)", href: "/in/income-tax-calculator", desc: "New vs Old Regime" },
        { name: "Salary Calculator", href: "/in/salary-calculator", desc: "In-hand vs CTC" },
        { name: "SIP Calculator", href: "/in/sip-calculator", desc: "Mutual fund returns" },
        { name: "PPF Calculator", href: "/in/ppf-calculator", desc: "Tax-free savings" },
        { name: "FD Calculator", href: "/in/fd-calculator", desc: "Fixed deposit interest" },
        { name: "Retirement Planner", href: "/retirement-calculator", desc: "Corpus required" },
        { name: "Emergency Fund", href: "/emergency-fund-calculator", desc: "Safety net sizing" },
        { name: "Debt Payoff", href: "/debt-payoff-calculator", desc: "Snowball vs Avalanche" },
        { name: "Inflation Tool", href: "/inflation", desc: "Future value of money" },
      ]
    },
    {
      title: "Home & Property",
      icon: <HomeIcon className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-200",
      items: [
        { name: "Global Salary (PPP)", href: "/global-salary-converter", desc: "True salary worth" },
        { name: "Solar ROI", href: "/solar-roi", desc: "Solar savings & payback" },
        { name: "Home Loan EMI", href: "/home-loan-calculator", desc: "Mortgage planning" },
        { name: "Rent vs Buy", href: "/rent-vs-buy-calculator", desc: "Ownership decision" },
        { name: "Stamp Duty", href: "/in/stamp-duty-calculator", desc: "Stamp duty charges" },
        { name: "Property Registration", href: "/in/property-registration-cost-calculator", desc: "Registration fees" },
        { name: "Renovation Cost", href: "/home-renovation-cost-estimator", desc: "Painting & interiors" },
        { name: "Property Tax", href: "/in/property-tax-calculator", desc: "Annual liability" },
        { name: "Electricity Bill", href: "/in/electricity-bill-calculator", desc: "Usage estimation" },
        { name: "Water Bill", href: "/in/water-bill-calculator", desc: "Monthly charges" },
        { name: "LPG Subsidy", href: "/in/lpg-subsidy-calculator", desc: "Cylinder savings" },
        { name: "Moving Cost", href: "/shipping-cost-calculator", desc: "Relocation estimate" }, // Reusing shipping
      ]
    },
    {
      title: "Business & Trade",
      icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
      color: "bg-indigo-50 border-indigo-200",
      items: [
        { name: "Import Duty", href: "/import-duty", desc: "Customs & tariffs" },
        { name: "GST Calculator", href: "/in/gst-calculator", desc: "Inclusive/Exclusive" },
        { name: "GST Input Credit", href: "/in/gst-input-credit-calculator", desc: "ITC eligibility" },
        { name: "TDS Calculator", href: "/in/tds-calculator", desc: "Tax deduction" },
        { name: "Business Loan", href: "/business-loan-calculator", desc: "EMI & Eligibility" },
        { name: "Freelance Rate", href: "/freelance-rate-calculator", desc: "Hourly pricing" },
        { name: "Profit Margin", href: "/profit-margin-calculator", desc: "Markup analysis" },
        { name: "Break-Even", href: "/break-even-calculator", desc: "Zero-loss point" },
        { name: "Invoice Generator", href: "/invoice-generator", desc: "Create PDF invoices" },
        { name: "Shipping Cost", href: "/shipping-cost-calculator", desc: "Volumetric weight" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <JsonLd data={jsonLd} />

      {/* Top Ad Banner */}
      <div className="container mx-auto px-4 mt-4">
         <AdContainer className="h-[90px] md:h-[120px]" slotId="1475703853" />
      </div>

      <main>
        {/* Hero Section */}
        <section className="pt-16 md:pt-24 pb-12 px-4 relative overflow-hidden">
          <div className="container mx-auto text-center max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/50 text-emerald-800 text-sm font-medium mb-8 border border-emerald-200">
              <ShieldCheck size={16} />
              <span>Trusted by 50,000+ Smart Users</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Make Smarter <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Financial Decisions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Calculate your true costs instantly with AI-powered precision. Access 30+ verified tools for every financial moment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 px-8 rounded-full shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 transition-all">
                <Link href="#all-calculators">Explore Tools</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-300 text-slate-700 bg-white/80 backdrop-blur hover:bg-white">
                <Link href="/about">How It Works</Link>
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-100/40 to-blue-100/40 rounded-full blur-[100px] -z-10" />
        </section>

        <div className="container mx-auto px-4 mb-8">
             <Dashboard hideIfEmpty={true} />
        </div>

        {/* Market Rates Ticker */}
        <RateTracker rates={rates} />

        {/* AI Assistant Section */}
        <section className="container mx-auto px-4 my-20">
           <div className="max-w-2xl mx-auto">
             <AIAssistant />
           </div>
        </section>

        {/* Featured Tools Section */}
        <section id="featured" className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Calculators</h2>
              <p className="text-slate-600 max-w-xl mx-auto">Our most popular tools, updated daily with the latest rates.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Solar ROI Card */}
              <Link href="/solar-roi" className="group">
                <Card className="h-full border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Sun size={120} className="text-emerald-500" />
                  </div>
                  <CardHeader className="pb-4 relative z-10">
                    <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                      <Sun size={24} />
                    </div>
                    <CardTitle className="text-2xl">Solar ROI Estimator</CardTitle>
                    <CardDescription className="text-base">
                      Calculate payback periods, tax credits, and 20-year savings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-center text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">
                      Calculate Savings <ArrowRight size={18} className="ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Import Duty Card */}
              <Link href="/import-duty" className="group">
                <Card className="h-full border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Globe size={120} className="text-blue-500" />
                  </div>
                  <CardHeader className="pb-4 relative z-10">
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                      <Globe size={24} />
                    </div>
                    <CardTitle className="text-2xl">Import Duty Calculator</CardTitle>
                    <CardDescription className="text-base">
                      Estimate landed costs, tariffs, and taxes for trade.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-center text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                      Estimate Cost <ArrowRight size={18} className="ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Global Salary Card */}
              <Link href="/global-salary-converter" className="group">
                <Card className="h-full border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <ArrowRightLeft size={120} className="text-indigo-500" />
                  </div>
                  <CardHeader className="pb-4 relative z-10">
                    <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                      <ArrowRightLeft size={24} />
                    </div>
                    <CardTitle className="text-2xl">True Salary (PPP)</CardTitle>
                    <CardDescription className="text-base">
                       Compare your real purchasing power across countries.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">
                      Check Worth <ArrowRight size={18} className="ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* All Calculators Grid (Phase 1 Complete) */}
        <section id="all-calculators" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete Tool Catalog</h2>
              <p className="text-slate-600 max-w-xl mx-auto">30 verified financial tools organized for your needs.</p>
            </div>

            <div className="space-y-12 max-w-7xl mx-auto">
              {categories.map((cat, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-2xl ${cat.color}`}>
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{cat.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.items.map((tool, i) => (
                      <Link key={i} href={tool.href} className="group block p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              {tool.name}
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                              {tool.desc}
                            </div>
                          </div>
                          <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-500 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6">Ready to save money?</h2>
            <p className="text-slate-300 mb-10 max-w-lg mx-auto text-lg">Join thousands of smart spenders who use CostSmart to plan their next big financial move.</p>
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white h-14 px-10 rounded-full text-lg font-bold shadow-lg shadow-emerald-900/50" asChild>
              <Link href="#all-calculators">Start Calculating Now</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
