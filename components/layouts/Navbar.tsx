import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-emerald-600 text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                        <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">
                        Cost<span className="text-emerald-600">Smart</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/solar-roi/New-York" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                        Solar ROI
                    </Link>
                    <Link href="/import-duty" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                        Import Duty
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                        About
                    </Link>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    {/* Temporary Login/Status Placeholder */}
                    <Badge variant="outline" className="hidden sm:flex border-slate-200 text-slate-500 font-normal">
                        Beta v1.0
                    </Badge>
                    <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">
                        Get Updates
                    </Button>
                </div>

            </div>
        </nav>
    );
}
