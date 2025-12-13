import Link from 'next/link';
import { ArrowRight, Sun, Globe, ShieldCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Ad Banner Placeholder */}
      <div className="w-full bg-slate-200 h-12 flex items-center justify-center text-xs text-slate-400">
        AdSpace: Top Banner (Responsive)
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
              <TrendingUp size={20} />
            </div>
            CostSmart
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#calculators" className="hover:text-emerald-600 transition-colors">Tools</Link>
            <Link href="#about" className="hover:text-emerald-600 transition-colors">About</Link>
          </div>
          <Button variant="outline" className="border-slate-200 text-slate-900 hover:bg-slate-50">
            Log In
          </Button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 relative overflow-hidden">
          <div className="container mx-auto text-center max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-8">
              <ShieldCheck size={16} />
              <span>Trusted by 50,000+ Smart Homeowners</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Make Smarter <span className="text-emerald-600">Financial Decisions</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Calculate your true costs instantly. Whether you're going green or going global,
              get accurate estimates without the hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-12 px-8 shadow-lg shadow-emerald-200">
                <Link href="#calculators">Start Calculating</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 border-slate-300 text-slate-700 bg-white">
                How It Works
              </Button>
            </div>
          </div>

          {/* Decorative Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100/30 rounded-full blur-3xl -z-10" />
        </section>

        {/* Tools Section */}
        <section id="calculators" className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Premium Tools</h2>
              <p className="text-slate-600">Choose a calculator to get started with your detailed estimate.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Solar ROI Card */}
              <Link href="/solar-roi" className="group">
                <Card className="h-full border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sun size={24} />
                    </div>
                    <CardTitle className="text-xl">Solar ROI Estimator</CardTitle>
                    <CardDescription>
                      Calculate payback periods, tax credits, and 20-year savings for your home solar installation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">
                      Calculate Savings <ArrowRight size={16} className="ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Import Duty Card */}
              <Link href="/import-duty" className="group">
                <Card className="h-full border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Globe size={24} />
                    </div>
                    <CardTitle className="text-xl">Import Duty Calculator</CardTitle>
                    <CardDescription>
                      Estimate landed costs, tariffs, and taxes for international shipments and cross-border trade.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                      Estimate Cost <ArrowRight size={16} className="ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights (Trust) */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Algorithm Accuracy</h3>
              <p className="text-slate-500">Updated daily with the latest tax rates and energy tariffs.</p>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Privacy First</h3>
              <p className="text-slate-500">No email required. We don't store your financial data.</p>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Mobile Optimized</h3>
              <p className="text-slate-500">Designed for easy use on your phone or tablet.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to save money?</h2>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">Join thousands of smart spenders who use CostSmart to plan their next big financial move.</p>
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
