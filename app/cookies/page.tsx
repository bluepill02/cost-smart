import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | CostSmart',
    description: 'Cookie Policy for CostSmart.',
    alternates: {
        canonical: 'https://costsmart.app/cookies',
    }
};

export default function CookiesPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate">
            <h1>Cookie Policy</h1>
            <p>Last updated: December 13, 2025</p>

            <p>
                This Cookie Policy explains how CostSmart uses cookies and similar technologies to recognize you when you visit our website.
            </p>

            <h2>What are cookies?</h2>
            <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide reporting information.
            </p>

            <h2>How we use cookies</h2>
            <p>
                We use cookies for the following purposes:
            </p>
            <ul>
                <li><strong>Strictly Necessary Cookies:</strong> These are essential for the website to function properly.</li>
                <li><strong>Analytics Cookies:</strong> These help us understand how users interact with our website (e.g., Google Analytics).</li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>
                You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
            </p>
        </div>
    );
}
