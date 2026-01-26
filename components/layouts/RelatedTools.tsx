import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Sun, Ship, ArrowRight, Calculator, Landmark } from 'lucide-react';

interface RelatedToolsProps {
    currentTool: 'solar' | 'import' | 'loan' | 'tax' | 'business';
}

export default function RelatedTools({ currentTool }: RelatedToolsProps) {
    return (
        <section className="py-12 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-5xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                    More Financial Tools
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Solar Card - Show if current is NOT solar */}
                    {currentTool !== 'solar' && (
                        <Link href="/solar-roi" className="group">
                            <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 group-hover:border-emerald-500">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="bg-amber-100 p-3 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                        <Sun className="w-6 h-6 text-amber-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700">Solar ROI Estimator</h4>
                                        <p className="text-slate-500 text-sm mt-1">
                                            Calculate exact savings from solar panels based on local irradiance.
                                        </p>
                                        <div className="mt-4 flex items-center text-sm font-medium text-emerald-600">
                                            Check Solar Savings <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )}

                    {/* Import Duty Card - Show if current is NOT import */}
                    {currentTool !== 'import' && (
                        <Link href="/import-duty" className="group">
                            <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 group-hover:border-blue-500">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Ship className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-700">Import Duty Calculator</h4>
                                        <p className="text-slate-500 text-sm mt-1">
                                            Estimate landed costs, duties, and taxes for international shipments.
                                        </p>
                                        <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                                            Calculate Duties <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )}

                    {/* Home Loan Card - Show if current is NOT loan */}
                    {currentTool !== 'loan' && (
                        <Link href="/home-loan-calculator" className="group">
                            <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 group-hover:border-indigo-500">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="bg-indigo-100 p-3 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <Landmark className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-700">Home Loan EMI</h4>
                                        <p className="text-slate-500 text-sm mt-1">
                                            Plan your mortgage with advanced amortization and prepayment options.
                                        </p>
                                        <div className="mt-4 flex items-center text-sm font-medium text-indigo-600">
                                            Calculate EMI <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )}

                    {/* Income Tax Card - Show if current is NOT tax */}
                    {currentTool !== 'tax' && (
                        <Link href="/in/income-tax-calculator" className="group">
                            <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 group-hover:border-teal-500">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="bg-teal-100 p-3 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                        <Calculator className="w-6 h-6 text-teal-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-teal-700">Income Tax India</h4>
                                        <p className="text-slate-500 text-sm mt-1">
                                            Compare Old vs New Regime tax liability for FY 2024-25.
                                        </p>
                                        <div className="mt-4 flex items-center text-sm font-medium text-teal-600">
                                            Check Tax <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )}

                </div>
            </div>
        </section>
    );
}
