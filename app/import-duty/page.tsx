import { Metadata } from 'next';
import ImportForm from '@/components/calculators/ImportForm';

export const metadata: Metadata = {
    title: 'Import Duty & Landed Cost Calculator | CostSmart',
    description: 'Estimate import duties, VAT, and total landed cost for shipments to USA, India, UK, and Canada. Avoid customs surprises.',
    alternates: {
        canonical: 'https://costsmart.app/import-duty',
    }
};

export default function ImportDutyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Import Duty <span className="text-emerald-600">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Instantly estimate customs duties, taxes, and landed costs for international shipments.
                    Stop guessing your margins.
                </p>
            </div>

            {/* Calculator */}
            <ImportForm />

            {/* SEO Content / FAQ Section */}
            <div className="mt-20 prose max-w-none text-slate-600 bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900">How to use this Import Duty Estimator</h2>
                <p>
                    International trade can be complex. Ours tool simplifies the math by providing estimated <strong>Landed Costs</strong>—the total price of a product once it arrives at your door, including the original price, transportation fees (customs duties), taxes, and insurance.
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-6">Why do I need to pay Import Duty?</h3>
                <p>
                    Customs Duty is a tax imposed on imports and exports of goods. The rates depend on where you are importing from and where you are shipping to, typically controlled by the Harmonized System (HS) codes.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-8 not-prose">
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Key Factors:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Origin Country:</strong> Where the goods are made.</li>
                            <li><strong>Destination:</strong> Where the goods are consumed.</li>
                            <li><strong>Category:</strong> Electronics often have different rates than textiles.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Common VAT/GST Rates:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>India (IGST):</strong> Typically 18% or 28%</li>
                            <li><strong>UK (VAT):</strong> Standard rate is 20%</li>
                            <li><strong>USA:</strong> Sales tax varies by state (0-10%)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
