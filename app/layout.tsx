import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Swapping to Inter as per design
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Script from "next/script";
import AdContainer from '@/components/ads/AdContainer';

// Using Inter as the primary font "Fintech Trust"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CostSmart - Financial Calculators for the Modern Economy",
  metadataBase: new URL('https://cost-smart-five.vercel.app'),
  description: "Calculate Solar ROI, Import Duties, and more with our precise, data-driven tools.",
  icons: {
    icon: '/favicon.ico', // Default for now
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        {/* End Google Tag Manager (noscript) */}

        <Navbar />
        <main className="flex-1">
          {children}
        </main>

        {/* Global Bottom Ad - Safety Net */}
        <div className="container mx-auto px-4 py-8">
           <AdContainer slotId="1475703853" />
        </div>

        <Footer />

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
        {/* End Google Tag Manager */}

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
            gtag('config', 'G-HF2NW9CQRJ');
          `}
        </Script>

        {/* AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4280161410958958"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Custom Tag */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="199997"
          data-cfasync="false"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
