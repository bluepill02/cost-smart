import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">

                    {/* Brand Col */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-lg font-bold mb-4">CostSmart</h3>
                        <p className="text-sm max-w-xs leading-relaxed">
                            Empowering smart financial decisions for homeowners and importers.
                            Data-driven tools for the modern economy.
                        </p>
                    </div>

                    {/* Links Col 1 */}
                    <div>
                        <h4 className="text-white font-medium mb-4">Tools</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/solar-roi/New-York" className="hover:text-emerald-400">Solar Estimator</Link></li>
                            <li><Link href="/import-duty" className="hover:text-emerald-400">Import Calculator</Link></li>
                            <li><Link href="/share" className="hover:text-emerald-400">Share Results</Link></li>
                        </ul>
                    </div>

                    {/* Links Col 2 */}
                    <div>
                        <h4 className="text-white font-medium mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-emerald-400">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 mt-8 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© {currentYear} CostSmart Inc. All rights reserved.</p>

                    {/* Legal Disclaimer */}
                    <p className="opacity-60 max-w-2xl text-center md:text-right">
                        <strong>Disclaimer:</strong> This website provides estimates for informational purposes only.
                        CostSmart is not a financial advisor or customs broker.
                        Consult with qualified professionals before making financial decisions.
                    </p>
                </div>
            </div>

            {/* Cookie Banner Placeholder */}
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-700 p-4 text-xs text-center z-50 transform translate-y-full transition-transform" id="cookie-banner">
                We use cookies to improve your experience. <button className="underline text-emerald-400 ml-2">Accept</button>
            </div>
        </footer>
    );
}
