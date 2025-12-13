import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Swapping to Inter as per design
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

// Using Inter as the primary font "Fintech Trust"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CostSmart - Financial Calculators for the Modern Economy",
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
        {/* Google Analytics Placeholder */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />

        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
