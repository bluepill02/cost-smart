import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About CostSmart | Smart Financial Tools for 2025',
    description: 'CostSmart builds free, high-precision financial calculators to help you make smarter money decisions in the viral economy.',
    alternates: {
        canonical: 'https://costsmart.app/about',
    }
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                    Making Complex Costs <span className="text-emerald-600">Transparent</span>.
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    We believe financial clarity shouldn't cost a fortune. CostSmart provides free, professional-grade tools to help you navigate the hidden costs of the modern economy—from solar investments to international trade.
                </p>
            </div>

            {/* Mission Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Speed & Accuracy</h3>
                    <p className="text-slate-600">
                        No fluff. Just instant, data-backed estimates using the latest market rates and localized data.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Global Context</h3>
                    <p className="text-slate-600">
                        Whether you are in Mumbai or Miami, our tools adapt to your local currency, laws, and market conditions.
                    </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Unbiased Data</h3>
                    <p className="text-slate-600">
                        We don't sell solar panels or shipping services. Our calculations are 100% objective and user-first.
                    </p>
                </div>
            </div>

            {/* Team / Story (Simplified) */}
            <div className="bg-slate-50 rounded-3xl p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for the future.</h2>
                <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                    CostSmart was founded to answer the simple question: "Is it actually worth it?"
                    In a world of inflation and hidden fees, we help you do the math before you spend the money.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                        <Link href="/solar-roi/New-York">
                            Try Solar Tool <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-slate-300">
                        <Link href="/import-duty">
                            Calculate Duties
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
