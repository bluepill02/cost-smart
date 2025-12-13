import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | CostSmart',
    description: 'Terms of Service for CostSmart.',
    alternates: {
        canonical: 'https://costsmart.app/terms',
    }
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate">
            <h1>Terms of Service</h1>
            <p>Last updated: December 13, 2025</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
                By accessing CostSmart, you agree to be bound by these Terms of Service.
            </p>

            <h2>2. Disclaimer of Warranties</h2>
            <p>
                <strong>The tools and content on CostSmart are for informational purposes only.</strong> We make no warranties regarding the accuracy, reliability, or completeness of our calculations.
            </p>
            <p>
                CostSmart is not a financial advisor, tax professional, or customs broker. You should verify all estimates with qualified professionals before making financial decisions.
            </p>

            <h2>3. Limitation of Liability</h2>
            <p>
                CostSmart shall not be liable for any damages arising from the use or inability to use our services, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>

            <h2>4. Changes to Terms</h2>
            <p>
                We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of updated terms.
            </p>
        </div>
    );
}
