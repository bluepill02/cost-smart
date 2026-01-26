import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, Home, Zap, DollarSign, TrendingUp, Truck, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface RelatedToolsProps {
  currentTool: 'solar' | 'import' | 'loan' | 'tax' | 'business';
}

export default function RelatedTools({ currentTool }: RelatedToolsProps) {
  const tools = {
    solar: [
      { name: "Home Loan Calculator", href: "/home-loan-calculator", icon: <Home className="w-4 h-4" /> },
      { name: "Electricity Bill", href: "/in/electricity-bill-calculator", icon: <Zap className="w-4 h-4" /> },
      { name: "Inflation Calculator", href: "/inflation", icon: <TrendingUp className="w-4 h-4" /> }
    ],
    import: [
      { name: "Currency Converter", href: "/currency", icon: <DollarSign className="w-4 h-4" /> },
      { name: "GST Calculator", href: "/in/gst-calculator", icon: <Calculator className="w-4 h-4" /> },
      { name: "Shipping Cost", href: "/shipping-cost-calculator", icon: <Truck className="w-4 h-4" /> }
    ],
    loan: [
      { name: "EMI Calculator", href: "/loan-calculator", icon: <Calculator className="w-4 h-4" /> },
      { name: "Rent vs Buy", href: "/rent-vs-buy-calculator", icon: <Home className="w-4 h-4" /> },
      { name: "Registration Cost", href: "/in/property-registration-cost-calculator", icon: <FileText className="w-4 h-4" /> },
      { name: "Renovation Cost", href: "/home-renovation-cost-estimator", icon: <Home className="w-4 h-4" /> }
    ],
    tax: [
      { name: "Income Tax", href: "/in/income-tax-calculator", icon: <Calculator className="w-4 h-4" /> },
      { name: "GST Calculator", href: "/in/gst-calculator", icon: <Calculator className="w-4 h-4" /> },
      { name: "TDS Calculator", href: "/in/tds-calculator", icon: <FileText className="w-4 h-4" /> }
    ],
    business: [
      { name: "Business Loan", href: "/business-loan-calculator", icon: <Calculator className="w-4 h-4" /> },
      { name: "Invoice Generator", href: "/invoice-generator", icon: <FileText className="w-4 h-4" /> },
      { name: "GST Input Credit", href: "/in/gst-input-credit-calculator", icon: <Calculator className="w-4 h-4" /> }
    ]
  };

  const currentRelated = tools[currentTool] || [];

  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-600" />
          Related Calculators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {currentRelated.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.href}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-full text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                  {tool.icon}
                </div>
                <span className="font-medium text-slate-700 group-hover:text-emerald-700">{tool.name}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
