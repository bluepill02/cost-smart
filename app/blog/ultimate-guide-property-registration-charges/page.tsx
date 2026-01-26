import React from 'react';
import { BlogLayout } from '@/components/blog/BlogLayout';

export default function Post() {
  return (
    <BlogLayout
      title="The Ultimate Guide to Property Registration Charges in India (2025)"
      date="2025-01-26"
      readingTime="6 min read"
      category="Home & Property"
      author="Legal Desk"
    >
      <p>
        Buying a home is the biggest financial decision for most Indians. While you negotiate hard on the property price,
        the government charges—Stamp Duty and Registration Fees—are non-negotiable and substantial.
      </p>

      <h2>What are these charges?</h2>
      <ul>
        <li><strong>Stamp Duty:</strong> A tax levied by the state government on the transaction of property. It acts as legal evidence of ownership.</li>
        <li><strong>Registration Charge:</strong> A fee paid to the Sub-Registrar of Assurances to preserve the sale deed in government records.</li>
      </ul>

      <h2>Current Rates in Major States (2025)</h2>

      <h3>Maharashtra</h3>
      <ul>
        <li><strong>Stamp Duty:</strong> 5% (Metro areas may have +1% Metro Cess/LBT = 6%)</li>
        <li><strong>Registration:</strong> 1%</li>
        <li><strong>Concession:</strong> 1% rebate for female buyers.</li>
      </ul>

      <h3>Karnataka (Bengaluru)</h3>
      <ul>
        <li><strong>Stamp Duty:</strong> 5% (reduced from 5.6% recently for affordable housing in some tiers)</li>
        <li><strong>Registration:</strong> 1%</li>
        <li><strong>Surcharge:</strong> Cess and surcharge often take the effective rate to roughly 6.6%.</li>
      </ul>

      <h3>Delhi</h3>
      <ul>
        <li><strong>Men:</strong> 6% Stamp Duty + 1% Reg</li>
        <li><strong>Women:</strong> 4% Stamp Duty + 1% Reg</li>
        <li><strong>Joint:</strong> 5% Stamp Duty + 1% Reg</li>
      </ul>

      <h2>How to Save Money?</h2>
      <ol>
        <li><strong>Register in a Woman's Name:</strong> As seen above, states like Delhi and Haryana offer significant discounts (up to 2%). On a ₹50 Lakh property, a 2% saving is ₹1 Lakh!</li>
        <li><strong>Tax Benefits:</strong> Stamp duty and registration charges are eligible for tax deduction under <strong>Section 80C</strong> of the Income Tax Act, within the overall limit of ₹1.5 Lakhs.</li>
      </ol>

      <h2>The Process</h2>
      <p>
        Most states now offer <strong>e-Stamping</strong> to prevent fraud. You can pay the duty online via the Stock Holding Corporation of India (SHCIL) website or state specific portals (like IGR Maharashtra).
      </p>

      <p>
        Always calculate these costs *before* finalizing your budget. Use our <a href="/in/property-registration-cost-calculator" className="text-emerald-600 hover:underline">Registration Fee Calculator</a> to get an exact figure.
      </p>
    </BlogLayout>
  );
}
