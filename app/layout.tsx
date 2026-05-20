import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Script from "next/script";
import AdContainer from '@/components/ads/AdContainer';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import CookieConsent from "@/components/ui/CookieConsent";

// Using Inter as the primary font with optimized loading
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "CostSmart - Financial Calculators for the Modern Economy",
  metadataBase: new URL(CANONICAL_DOMAIN),
  description: "Calculate Solar ROI, Import Duties, Loans, Taxes, and more with our precise, data-driven financial calculators.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: CANONICAL_DOMAIN,
    title: 'CostSmart - Financial Calculators',
    description: 'Free financial calculators for SIP, loans, taxes, solar ROI, and more.',
    images: [
      {
        url: `${CANONICAL_DOMAIN}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'CostSmart Financial Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CostSmart - Financial Calculators',
    description: 'Free financial calculators for SIP, loans, taxes, solar ROI, and more.',
    images: [`${CANONICAL_DOMAIN}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#f8fafc" />

        {/* Organization Schema - Root level for brand recognition */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CostSmart',
              url: CANONICAL_DOMAIN,
              logo: `${CANONICAL_DOMAIN}/favicon.ico`,
              description: 'Financial calculators for modern financial planning',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Support',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXMJDGZT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />

        {/* Above-the-fold Ad Placement (High Viewability) */}
        <div className="w-full bg-white border-b border-slate-200 py-2 lg:sticky lg:top-16 z-40">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="w-full max-w-4xl">
              <AdContainer slotId="1706594832" size="leaderboard" />
            </div>
          </div>
        </div>

        <main className="flex-1">
          {children}
        </main>

        {/* Mid-page Ad - Safety Net */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <AdContainer slotId="1475703853" size="rectangle" />
          </div>
        </div>

        <Footer />
        <CookieConsent />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TXMJDGZT');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HF2NW9CQRJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HF2NW9CQRJ', {
              'page_path': window.location.pathname,
              'page_title': document.title
            });
          `}
        </Script>

        {/* AdSense - Loaded after interactive for faster FCP */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4280161410958958"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
