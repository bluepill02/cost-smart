import React from 'react';
import { BlogLayout } from '@/components/blog/BlogLayout';

export default function Post() {
  return (
    <BlogLayout
      title="How to Use the Property Registration Cost Calculator"
      date="2025-01-26"
      readingTime="3 min read"
      category="Home & Property"
      author="CostSmart Team"
    >
      <p>
        When buying a property, the "agreement value" is not the final price. The government demands its share
        in the form of Stamp Duty and Registration Charges. These can add 6-10% to your total cost—a massive amount
        that many first-time buyers fail to plan for.
      </p>

      <p>
        Our <strong>Property Registration Charges Calculator</strong> helps you determine exactly how much extra cash you need to arrange.
      </p>

      <h2>Using the Tool</h2>

      <h3>1. Select Your State</h3>
      <p>
        Land is a state subject in India, meaning every state has its own tax laws.
        Select your state from the dropdown. We cover major states like Maharashtra, Karnataka, Delhi, UP, and more.
      </p>

      <h3>2. Enter Property Value</h3>
      <p>
        Enter the <strong>Market Value</strong> or the <strong>Agreement Value</strong> of the property, whichever is higher.
        Stamp duty is always calculated on the higher of the two.
      </p>

      <h3>3. Select Gender</h3>
      <p>
        Many states promote women's property ownership by offering lower stamp duty rates.
      </p>
      <ul>
        <li><strong>Maharashtra:</strong> 1% concession for women.</li>
        <li><strong>Delhi:</strong> 2% concession for women.</li>
        <li><strong>Punjab:</strong> 1% concession.</li>
      </ul>
      <p>
        Select 'Female' or 'Joint' to see if you qualify for these savings.
      </p>

      <h2>Understanding the Output</h2>
      <ul>
        <li><strong>Stamp Duty:</strong> The major tax component.</li>
        <li><strong>Registration Fee:</strong> The fee to record the transaction. In some states (like Maharashtra), this is 1% of the value (capped at ₹30,000 for properties below ₹30L in some older rules, but generally 1% now). In others, it is a fixed fee. Our calculator uses the latest standard percentage rates.</li>
      </ul>

      <p>
        Check your liability now: <a href="/in/property-registration-cost-calculator" className="text-emerald-600 hover:underline">Calculate Registration Charges</a>.
      </p>
    </BlogLayout>
  );
}
