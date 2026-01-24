import React from 'react';
import type { Metadata } from 'next';
import { BlogLayout } from '@/components/blog/BlogLayout';

export const metadata: Metadata = {
  title: 'GST Inclusive vs Exclusive: How to Calculate Correctly?',
  description: 'Confused by GST calculations? Learn the difference between Inclusive and Exclusive GST with simple formulas and examples.',
  alternates: {
    canonical: '/blog/gst-inclusive-vs-exclusive',
  },
};

export default function BlogPost() {
  return (
    <BlogLayout
      title="GST Inclusive vs Exclusive: How to Calculate Correctly?"
      date="2025-01-28"
      readingTime="4 min read"
      category="Taxation"
      author="CostSmart Team"
    >
      <p>
        Goods and Services Tax (GST) is part of daily life in India, but calculating it can still be tricky depending on whether the price you see includes the tax or not. Let's break down the two modes used in our <strong>GST Calculator</strong>.
      </p>

      <h2>1. GST Exclusive (Tax is Extra)</h2>
      <p>
        This is common in B2B transactions or when you buy raw materials. You have a base price, and GST is added on top.
      </p>
      <div className="bg-slate-100 p-4 rounded-lg my-4 border-l-4 border-emerald-500">
        <strong>Formula:</strong><br/>
        <code>Tax Amount = Base Price × (GST Rate / 100)</code><br/>
        <code>Total Price = Base Price + Tax Amount</code>
      </div>
      <p>
        <em>Example:</em> You buy a service for ₹1,000 + 18% GST.<br/>
        Tax = 1000 × 0.18 = ₹180.<br/>
        Total You Pay = ₹1,180.
      </p>

      <h2>2. GST Inclusive (Tax is Included)</h2>
      <p>
        This is what consumers see in MRP (Maximum Retail Price). The price tag on a shirt says ₹1,180 (Inclusive of Taxes). As a business owner, you need to "back-calculate" to find the actual revenue and the tax liability.
      </p>
      <div className="bg-slate-100 p-4 rounded-lg my-4 border-l-4 border-blue-500">
        <strong>Formula:</strong><br/>
        <code>Base Price = Total Price / (1 + GST Rate / 100)</code><br/>
        <code>Tax Amount = Total Price - Base Price</code>
      </div>
      <p>
        <em>Example:</em> You sell an item for ₹1,180 (MRP) with 18% GST.<br/>
        Base Price = 1180 / 1.18 = ₹1,000.<br/>
        Tax Liability = 1180 - 1000 = ₹180.
      </p>

      <p>
        <strong>Common Mistake:</strong> Simply calculating 18% of ₹1,180 (which is ₹212.4) is WRONG! That would imply a tax on tax. You must use the division formula above.
      </p>

      <h2>Input Tax Credit (ITC)</h2>
      <p>
        For businesses, GST is not a cost but a "pass-through". The GST you pay on purchases (Input Tax) can be subtracted from the GST you collect on sales (Output Tax). This is why calculating the "Base Price" correctly is crucial for your profitability analysis.
      </p>

      <div className="mt-12 p-6 bg-slate-50 rounded-xl border-l-4 border-emerald-500">

    <h2>Beyond the Basics: GST for Business Owners</h2>
    <p>While calculating GST is simple arithmetic, understanding its impact on your cash flow is where expertise comes in. The Goods and Services Tax (GST) is not a cost to your business if you are eligible for <strong>Input Tax Credit (ITC)</strong>.</p>

    <h3>Input Tax Credit (ITC) Explained</h3>
    <p>ITC allows you to reduce the tax you have already paid on inputs from the tax you have to pay on output. Effectively, you only pay tax on the <em>value addition</em>. Use our "GST Exclusive" mode to determine your base cost and tax liability separately.</p>

    <h3>Reverse Charge Mechanism (RCM)</h3>
    <p>Be aware of RCM scenarios where the recipient of goods/services is liable to pay GST instead of the supplier. This often applies to services like Goods Transport Agency (GTA) or legal services. Our calculator helps you verify the exact tax quantum to be deposited under RCM.</p>

      </div>
</BlogLayout>
  );
}
