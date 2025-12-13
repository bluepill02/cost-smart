import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Sun, Ship, ArrowRight } from 'lucide-react';

interface RelatedToolsProps {
    currentTool: 'solar' | 'import';
}

export default function RelatedTools({ currentTool }: RelatedToolsProps) {
    return (
        <section className="py-12 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-5xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                    More Financial Tools
                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Solar Card - Show if current is NOT solar */}
                    {currentTool !== 'solar' && (
                        <Link href="/solar-roi/New-York" className="group">
                            <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 group-hover:border-emerald-500">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="bg-amber-100 p-3 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                        <Sun className="w-6 h-6 text-amber-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700">Solar ROI Implementation</h4>
                                        <p className="text-slate-500 text-sm mt-1">
                                            Calculate exact savings from solar panels based on your local roof data.
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

                    {/* Fallback/Placement Card if we only show one (Centered?) 
               Actually, for now, let's just leave the grid gap. 
               Or maybe show a "Coming Soon" tool? */}

                </div>
            </div>
        </section>
    );
}
