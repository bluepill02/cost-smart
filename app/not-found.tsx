import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <div className="flex justify-center mb-6">
                <div className="bg-slate-100 p-4 rounded-full">
                    <AlertCircle className="w-12 h-12 text-slate-400" />
                </div>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Page Not Found</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
            <div className="flex justify-center gap-4">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link href="/">
                        Go Home
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/solar-roi/New-York">
                        Try Solar Tool
                    </Link>
                </Button>
            </div>
        </div>
    );
}
