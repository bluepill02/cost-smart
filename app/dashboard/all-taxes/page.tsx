import { Metadata } from 'next';
import IndiaTaxCalculator from '@/components/calculators/tax/IndiaTaxCalculator';
import GSTCalculator from '@/components/calculators/tax/GSTCalculator';
import TDSCalculator from '@/components/calculators/business/TDSCalculator';
import AdContainer from '@/components/ads/AdContainer';
import JsonLd from '@/components/seo/JsonLd';
import { getCalculatorSchema } from '@/lib/seo-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Percent, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Taxes Dashboard | Income Tax, GST, TDS Calculator India',
  description: 'Complete India Tax Dashboard. Calculate Income Tax (New vs Old), GST, and TDS in one place. Updated for FY 2024-25.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/dashboard/all-taxes',
  },
};

export default function Page() {
  const jsonLd = getCalculatorSchema(
    'All Taxes Dashboard',
    'Comprehensive dashboard for Indian Tax calculations including Income Tax, GST, and TDS.',
    '/dashboard/all-taxes'
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <JsonLd data={jsonLd} />
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Unified Dashboard
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">India Tax Hub</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Manage your personal and business tax liability in one powerful interface.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
        <Tabs defaultValue="income-tax" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="income-tax" className="flex gap-2">
                    <Calculator className="w-4 h-4" /> Income Tax
                </TabsTrigger>
                <TabsTrigger value="gst" className="flex gap-2">
                    <Percent className="w-4 h-4" /> GST
                </TabsTrigger>
                <TabsTrigger value="tds" className="flex gap-2">
                    <FileText className="w-4 h-4" /> TDS
                </TabsTrigger>
            </TabsList>

            <TabsContent value="income-tax">
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-slate-800">Personal Income Tax (FY 24-25)</h2>
                    </div>
                    <IndiaTaxCalculator />
                </div>
            </TabsContent>

            <TabsContent value="gst">
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-slate-800">Goods & Services Tax</h2>
                    </div>
                    <GSTCalculator />
                </div>
            </TabsContent>

            <TabsContent value="tds">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-slate-800">Tax Deducted at Source</h2>
                    </div>
                    <TDSCalculator />
                </div>
            </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
              * Calculations are based on FY 2024-25 Budget updates. Consult a CA for official filing.
          </p>
      </div>

      <div className="my-12">
        <AdContainer size="leaderboard" slotId="1475703853" />
      </div>
    </div>
  );
}
