import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | CostSmart',
    description: 'Privacy Policy for CostSmart.',
    alternates: {
        canonical: 'https://costsmart.app/privacy',
    }
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate">
            <h1>Privacy Policy</h1>
            <p>Last updated: December 13, 2025</p>

            <p>
                At CostSmart, we prioritize your privacy. This policy outlines how we handle your data when you use our calculators and tools.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
                We collect minimal data necessary to operate our tools:
            </p>
            <ul>
                <li><strong>Usage Data:</strong> We use Google Analytics to understand how visitors interact with our site (pages visited, time spent). This data is anonymized.</li>
                <li><strong>Input Data:</strong> Values you enter into our calculators (e.g., product value, city name) are processed locally in your browser or temporarily for the purpose of the calculation. We do not store this personal financial data on our servers.</li>
            </ul>

            <h2>2. Cookies</h2>
            <p>
                We use cookies to enhance your experience and analyze traffic. You can control cookie preferences through your browser settings.
            </p>

            <h2>3. Third-Party Services</h2>
            <p>
                We may use third-party advertising partners who may collect non-personal information to show you relevant ads.
            </p>

            <h2>4. Contact Us</h2>
            <p>
                If you have questions about this policy, please contact us at support@costsmart.app.
            </p>
        </div>
    );
}
