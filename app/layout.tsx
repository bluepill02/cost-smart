import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Script from "next/script";
import AdContainer from '@/components/ads/AdContainer';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import CookieConsent from "@/components/ui/CookieConsent";
import BotpressLoader from "@/components/ui/BotpressLoader";
import GoogleAnalyticsTracker from "@/components/analytics/GoogleAnalytics";
import Providers from "@/components/providers/Providers";
import SoftAdBlockMessage from "@/components/ads/SoftAdBlockMessage";
import FloatingChatWidget from "@/components/features/FloatingChatWidget";

// DM Sans — refined body font with excellent legibility
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
});

// Sora — geometric display font for headings
const sora = Sora({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-sora',
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  title: "CostSmart | Free Financial Calculators — EMI, SIP & Tax",
  metadataBase: new URL(CANONICAL_DOMAIN),
  description: "30+ free financial calculators: EMI, SIP, income tax, home loan, FD, PPF, solar ROI, GST, salary and more. Make smarter money decisions with CostSmart.",
  keywords: [
    'financial calculator', 'EMI calculator', 'SIP calculator', 'income tax calculator',
    'loan calculator', 'FD calculator', 'PPF calculator', 'GST calculator',
    'salary calculator India', 'solar ROI calculator', 'free financial tools'
  ],
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: CANONICAL_DOMAIN,
    title: 'CostSmart - Free Financial Calculators',
    description: '30+ free financial calculators for SIP, EMI, loans, taxes, solar ROI, salary and more.',
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
    title: 'CostSmart - Free Financial Calculators',
    description: '30+ free financial calculators for SIP, EMI, loans, taxes, solar ROI, salary and more.',
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

        {/* AdSense - standard async tag (no data-nscript) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4280161410958958"
          crossOrigin="anonymous"
        />

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
      <body className={`${dmSans.variable} ${sora.variable} ${dmSans.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXMJDGZT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Providers>
        <Navbar />
        <GoogleAnalyticsTracker />

        {/* No global sticky ad — ads placed contextually per page for better UX & CTR */}

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
        <SoftAdBlockMessage />
        <FloatingChatWidget />
        </Providers>
        <CookieConsent />
        <BotpressLoader botConfigUrl={process.env.NEXT_PUBLIC_BOTPRESS_BOT_URL} />

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

      </body>
    </html>
  );
}
