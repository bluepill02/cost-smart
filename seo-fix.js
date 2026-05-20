/**
 * CostSmart SEO Bulk Fixer
 * Fixes: title length, description length/missing, canonical missing, OG blocks, multiple H1
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
let totalFixes = 0;

function readFile(p) { return fs.readFileSync(p, 'utf-8'); }
function writeFile(p, c) { fs.writeFileSync(p, c, 'utf-8'); }
function fix(p, original, updated, label) {
  if (original !== updated) {
    writeFile(p, updated);
    console.log(`✅ Fixed [${label}]: ${p.replace(ROOT, '')}`);
    totalFixes++;
  }
}

// ============================================================
// FIX 1: Titles too long - shorten each one
// ============================================================
const titleFixes = {
  'app/layout.tsx': {
    from: "CostSmart - Free Financial Calculators | Loans, Taxes, Investments & More",
    to:   "CostSmart | Free Financial Calculators — EMI, SIP, Tax & More",
  },
  'app/blog/page.tsx': {
    from: "Financial Blog | CostSmart — Money Tips, Guides & Calculator Walkthroughs",
    to:   "Financial Blog | CostSmart — Money, Tax & Investment Guides",
  },
  'app/blog/ultimate-guide-property-registration-charges/page.tsx': {
    from: "Ultimate Guide to Property Registration Charges in India 2025 | CostSmart",
    to:   "Property Registration Charges in India 2025 | CostSmart",
  },
  'app/home-renovation-cost-estimator/page.tsx': {
    from: "Home Renovation Cost Estimator India | Painting, Flooring, Plumbing Rates",
    to:   "Home Renovation Cost Estimator India | CostSmart",
  },
  'app/moving-cost-calculator/page.tsx': {
    from: "Moving Cost Calculator | Relocation & Packers Movers Estimate | CostSmart",
    to:   "Moving Cost Calculator | Packers & Movers Cost | CostSmart",
  },
  'app/compare/solar-vs-wind/page.tsx': {
    from: "Solar vs Wind Energy ROI Calculator - Which is Better for India in 2026?",
    to:   "Solar vs Wind Energy Calculator — India 2026 | CostSmart",
  },
  'app/compare/rent-vs-buy-vs-invest/page.tsx': {
    from: "Rent vs Buy vs Invest Calculator - Best Property Decision in India 2026",
    to:   "Rent vs Buy vs Invest Calculator — India 2026 | CostSmart",
  },
  'app/tools/ai-advisor/page.tsx': {
    from: "AI Financial Advisor - Free Personalized Financial Guidance | CostSmart",
    to:   "Free AI Financial Advisor | CostSmart",
  },
  'app/compare/ppf-vs-fd/page.tsx': {
    from: "PPF vs FD Calculator - Which is Better for Long-term Savings in 2026?",
    to:   "PPF vs FD Calculator — Long-term Savings 2026 | CostSmart",
  },
  'app/in/property-registration-cost-calculator/page.tsx': {
    from: "Property Registration Charges Calculator India | State-wise Fees 2025",
    to:   "Property Registration Calculator India 2025 | CostSmart",
  },
  'app/blog/ultimate-guide-property-registration-cost/page.tsx': {
    from: "Ultimate Guide to Property Registration Cost Calculation | CostSmart",
    to:   "Property Registration Cost Guide India | CostSmart",
  },
  'app/in/gst-calculator/page.tsx': {
    from: "GST Calculator India | Inclusive vs Exclusive GST Calculation (2025)",
    to:   "GST Calculator India | Inclusive & Exclusive 2025 | CostSmart",
  },
  'app/compare/fd-vs-mutual-fund/page.tsx': {
    from: "FD vs Mutual Fund Calculator - Which Investment is Better in 2026?",
    to:   "FD vs Mutual Fund Calculator — India 2026 | CostSmart",
  },
  'app/blog/ultimate-guide-fixed-deposit-interest/page.tsx': {
    from: "Ultimate Guide to Fixed Deposit Interest Calculation | CostSmart",
    to:   "Fixed Deposit Interest Calculation Guide | CostSmart",
  },
  'app/blog/how-to-use-property-registration-cost-calculator/page.tsx': {
    from: "How to Use the Property Registration Cost Calculator | CostSmart",
    to:   "Property Registration Cost Calculator Guide | CostSmart",
  },
  'app/compare/page.tsx': {
    from: "Financial Comparisons - Make Smarter Money Decisions | CostSmart",
    to:   "Financial Comparisons | CostSmart",
  },
  'app/tools/page.tsx': {
    from: "AI Financial Tools - Budget Analyzer & Smart Advisor | CostSmart",
    to:   "Free AI Financial Tools | CostSmart",
  },
  'app/blog/ultimate-guide-freelance-hourly-rate/page.tsx': {
    from: "Ultimate Guide to Freelance Hourly Rate Calculation | CostSmart",
    to:   "Freelance Hourly Rate Calculation Guide | CostSmart",
  },
  'app/tools/budget-analyzer/page.tsx': {
    from: "Smart Budget Analyzer - AI-Powered Expense Tracking | CostSmart",
    to:   "AI Budget Analyzer — Expense Tracking | CostSmart",
  },
  'app/blog/ultimate-guide-income-tax-liability/page.tsx': {
    from: "Ultimate Guide to Income Tax Liability Calculation | CostSmart",
    to:   "Income Tax Liability Calculation Guide | CostSmart",
  },
  'app/blog/ultimate-guide-professional-invoice/page.tsx': {
    from: "Ultimate Guide to Professional Invoice Calculation | CostSmart",
    to:   "Professional Invoice Creation Guide | CostSmart",
  },
  'app/blog/ultimate-guide-rent-vs-buy-decision/page.tsx': {
    from: "Ultimate Guide to Rent vs Buy Decision Calculation | CostSmart",
    to:   "Rent vs Buy Decision Guide India | CostSmart",
  },
  'app/in/income-tax-calculator/page.tsx': {
    from: "Income Tax Calculator FY 2024-25 (AY 25-26) | Old vs New Regime",
    to:   "Income Tax Calculator FY 2024-25 | New vs Old Regime",
  },
};

for (const [relPath, { from, to }] of Object.entries(titleFixes)) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) { console.log(`⚠️  Not found: ${relPath}`); continue; }
  const c = readFile(fullPath);
  fix(fullPath, c, c.replace(from, to), 'TITLE_LENGTH');
}

// ============================================================
// FIX 2: Descriptions too long — trim to ≤160 chars
// ============================================================
const descFixes = {
  'app/compare/page.tsx': {
    from: "Compare financial options side-by-side: FD vs Mutual Funds, PPF vs FD, Solar vs Wind, Rent vs Buy. Data-driven, India-focused analysis with free calculators.",
    to:   "Compare FD vs Mutual Funds, PPF vs FD, Solar vs Wind, Rent vs Buy. Data-driven India-focused analysis with free calculators.",
  },
  'app/compare/ppf-vs-fd/page.tsx': {
    from: "Compare Public Provident Fund (PPF) and Fixed Deposit (FD). Analyze interest rates, tax benefits, liquidity, and returns to find which is better for you.",
    to:   "Compare PPF vs FD — interest rates, tax benefits, liquidity and returns. Find which is better for your savings goal.",
  },
  'app/compare/rent-vs-buy-vs-invest/page.tsx': {
    from: "Compare renting, buying home with loan, or investing in SIP/FD. Analyze total costs, wealth creation, and opportunity cost. India-specific, updated for 2026.",
    to:   "Compare renting, buying or investing in SIP/FD. Analyze costs, wealth creation and opportunity cost for India 2026.",
  },
  'app/moving-cost-calculator/page.tsx': {
    from: "Calculate your home or office relocation costs including packers and movers charges, transportation, insurance, and packing materials. India-specific rates for 2025.",
    to:   "Calculate home or office relocation costs — packers & movers, transport, insurance, packing. India-specific rates for 2025.",
  },
};

for (const [relPath, { from, to }] of Object.entries(descFixes)) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) { console.log(`⚠️  Not found: ${relPath}`); continue; }
  const c = readFile(fullPath);
  fix(fullPath, c, c.replace(from, to), 'DESC_TOO_LONG');
}

// Fix solar-roi/[city] dynamic description (too long with template)
{
  const p = path.join(ROOT, 'app/solar-roi/[city]/page.tsx');
  if (fs.existsSync(p)) {
    let c = readFile(p);
    const oldDesc = "description: `Calculate your exact solar savings in ${city.city_name}. Based on ${city.avg_daily_sunlight_hours} hours of sun and ${city.avg_electricity_cost_per_kwh} ${city.country === 'India' ? 'INR' : 'USD'}/kWh rates.`";
    const newDesc = "description: `Solar ROI calculator for ${city.city_name}: ${city.avg_daily_sunlight_hours} peak sun hours, ${city.avg_electricity_cost_per_kwh}/kWh rate. Get payback period, savings, and panel count.`";
    fix(p, c, c.replace(oldDesc, newDesc), 'DESC_TOO_LONG (solar city)');
  }
}

// ============================================================
// FIX 3: Descriptions too short — expand
// ============================================================
const shortDescFixes = {
  'app/in/lpg-subsidy-calculator/page.tsx': {
    from: "Calculate annual savings from LPG subsidies.",
    to:   "Calculate your annual LPG subsidy savings. Enter cylinder count and subsidy rate to know your total yearly benefit under PMUY and other government schemes.",
  },
  'app/in/water-bill-calculator/page.tsx': {
    from: "Calculate estimated water bill charges based on usage.",
    to:   "Calculate your monthly water bill based on usage in kilolitres. Covers slab rates for major Indian cities including Mumbai, Delhi, Chennai, and Bangalore.",
  },
  'app/in/electricity-bill-calculator/page.tsx': {
    from: "Estimate your monthly electricity bill based on consumption.",
    to:   "Estimate your monthly electricity bill using state-wise slab rates. Add appliances, get per-unit cost, and see how to reduce your power consumption in India.",
  },
  'app/in/gst-input-credit-calculator/page.tsx': {
    from: "Calculate Net GST Payable after Input Tax Credit adjustment.",
    to:   "Calculate net GST payable after claiming Input Tax Credit (ITC). Enter GST collected on sales and GST paid on purchases to find your exact tax liability.",
  },
  'app/in/property-tax-calculator/page.tsx': {
    from: "Estimate municipal property tax based on annual value and rates.",
    to:   "Estimate municipal property tax for your home or commercial property. Covers major Indian cities with rates based on annual value, location, and property type.",
  },
  'app/in/tds-calculator/page.tsx': {
    from: "Calculate TDS deduction for contractors, professionals, and rent.",
    to:   "Calculate TDS deduction rates for salary, contractors, professionals, rent, and interest. Know exactly how much is deducted at source under Income Tax Act.",
  },
  'app/solar-roi/page.tsx': {
    from: "Find your city to calculate accurate solar savings. Calculate payback periods, tax credits, and 20-year savings.",
    to:   "Find your city to calculate accurate solar savings. Get payback period, panel capacity, and 20-year savings based on local irradiance and electricity rates.",
  },
  'app/home-loan-calculator/page.tsx': {
    from: "Calculate your Home Loan EMI, total interest payable, and amortization schedule with our advanced calculator.",
    to:   "Calculate home loan EMI, total interest payable, and full amortization schedule. Supports all loan types with prepayment simulation for Indian banks.",
  },
  'app/blog/retirement-corpus-guide/page.tsx': {
    from: "Stop guessing your retirement number. Learn how to calculate your inflation-adjusted corpus requirement.",
    to:   "Stop guessing your retirement number. Learn how to calculate your inflation-adjusted corpus requirement and how much to save each month to retire comfortably.",
  },
  'app/blog/emergency-fund-importance/page.tsx': {
    from: "An emergency fund is your financial seatbelt. Learn why you need it, how much to save, and where to keep it.",
    to:   "An emergency fund is your financial seatbelt. Learn why you need it, how many months of expenses to save, and the best liquid accounts to park it in India.",
  },
  'app/blog/ctc-vs-in-hand/page.tsx': {
    from: "Offered 10 LPA but getting only 60k per month? Understand the difference between Cost to Company (CTC) and",
    to:   "Offered 10 LPA but getting only 60k per month? Understand the full breakdown of CTC vs in-hand salary — PF, gratuity, HRA, and all deductions explained.",
  },
  'app/blog/home-loan-prepayment-benefits/page.tsx': {
    from: "Home loan interest can cost more than the principal itself. Learn how small prepayments can cut your",
    to:   "Home loan interest can cost more than the principal itself. Learn how regular prepayments save lakhs in interest and cut your loan tenure by years.",
  },
  'app/in/income-tax-calculator/page.tsx': {
    from: "Calculate your Income Tax for FY 2024-25. Compare New Regime (default) vs Old Regime to find where you save more tax.",
    to:   "Calculate income tax for FY 2024-25 under New Regime vs Old Regime. Includes 80C, HRA, NPS deductions and the ₹7L tax-free rebate. Updated for Budget 2024.",
  },
};

for (const [relPath, { from, to }] of Object.entries(shortDescFixes)) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) { console.log(`⚠️  Not found: ${relPath}`); continue; }
  const c = readFile(fullPath);
  fix(fullPath, c, c.replace(from, to), 'DESC_TOO_SHORT');
}

// ============================================================
// FIX 4: Add missing metadata to redirect pages
// ============================================================
{
  const inHomeLoan = path.join(ROOT, 'app/in/home-loan-calculator/page.tsx');
  const inRentVsBuy = path.join(ROOT, 'app/in/rent-vs-buy-calculator/page.tsx');
  
  const homeLoanContent = `import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator India | CostSmart',
  description: 'Calculate home loan EMI for Indian banks. Get amortization schedule, total interest payable, and city-specific interest rates for Mumbai, Delhi, Bangalore and more.',
  alternates: { canonical: 'https://cost-smart-five.vercel.app/home-loan-calculator' },
};

export default function InHomeLoanRedirect() {
  redirect('/home-loan-calculator');
}
`;
  
  const rentVsBuyContent = `import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator India | CostSmart',
  description: 'Calculate whether renting or buying a home is better for you. Compare 20-year NPV, opportunity cost, and break-even point for Indian property markets.',
  alternates: { canonical: 'https://cost-smart-five.vercel.app/rent-vs-buy-calculator' },
};

export default function InRentVsBuyRedirect() {
  redirect('/rent-vs-buy-calculator');
}
`;
  
  writeFile(inHomeLoan, homeLoanContent);
  console.log('✅ Fixed [METADATA_MISSING]: /in/home-loan-calculator');
  totalFixes++;
  
  writeFile(inRentVsBuy, rentVsBuyContent);
  console.log('✅ Fixed [METADATA_MISSING]: /in/rent-vs-buy-calculator');
  totalFixes++;
}

// ============================================================
// FIX 5: Add metadata to blog posts missing it
// ============================================================
{
  const posts = [
    {
      path: 'app/blog/how-to-use-home-renovation-cost-estimator/page.tsx',
      title: 'How to Use the Home Renovation Cost Estimator | CostSmart',
      desc: 'Step-by-step guide to using the CostSmart Home Renovation Cost Estimator. Estimate painting, flooring, plumbing, and civil work costs for your Indian home.',
      canonical: 'https://cost-smart-five.vercel.app/blog/how-to-use-home-renovation-cost-estimator',
    },
    {
      path: 'app/blog/ultimate-guide-home-renovation-cost/page.tsx',
      title: 'Home Renovation Costs in India 2025 — Complete Guide | CostSmart',
      desc: 'Complete guide to home renovation costs in India 2025. Get per sq ft rates for painting, flooring, electrical, plumbing, modular kitchen, and hidden costs.',
      canonical: 'https://cost-smart-five.vercel.app/blog/ultimate-guide-home-renovation-cost',
    },
  ];
  
  for (const post of posts) {
    const fullPath = path.join(ROOT, post.path);
    if (!fs.existsSync(fullPath)) { console.log(`⚠️  Not found: ${post.path}`); continue; }
    let c = readFile(fullPath);
    if (!c.includes('export const metadata')) {
      const metadataBlock = `import { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${post.title}',\n  description: '${post.desc}',\n  alternates: { canonical: '${post.canonical}' },\n};\n\n`;
      c = c.replace("import React from 'react';", `import React from 'react';\n${metadataBlock.trim()}`);
      // simpler: prepend
      c = `import { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${post.title}',\n  description: '${post.desc}',\n  alternates: { canonical: '${post.canonical}' },\n};\n\n` + c;
      writeFile(fullPath, c);
      console.log(`✅ Fixed [METADATA_MISSING]: ${post.path}`);
      totalFixes++;
    }
  }
}

// ============================================================
// FIX 6: Add missing canonicals
// ============================================================
const canonicalFixes = {
  'app/dashboard/page.tsx': {
    search: "title: ",
    insertBefore: "  alternates: { canonical: 'https://cost-smart-five.vercel.app/dashboard' },\n  ",
  },
  'app/global-salary-converter/page.tsx': {
    search: "title: ",
    insertBefore: "  alternates: { canonical: 'https://cost-smart-five.vercel.app/global-salary-converter' },\n  ",
  },
  'app/tools/budget-analyzer/page.tsx': {
    search: "title: ",
    insertBefore: "  alternates: { canonical: 'https://cost-smart-five.vercel.app/tools/budget-analyzer' },\n  ",
  },
};

for (const [relPath, cfg] of Object.entries(canonicalFixes)) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) { console.log(`⚠️  Not found: ${relPath}`); continue; }
  let c = readFile(fullPath);
  if (!c.includes('alternates') && !c.includes('canonical')) {
    // Find the metadata export and add alternates before title
    const metaMatch = c.match(/export const metadata[^{]*{([^}]+)}/s);
    if (metaMatch) {
      const oldMeta = metaMatch[0];
      const newMeta = oldMeta.replace(cfg.search, cfg.insertBefore + cfg.search);
      fix(fullPath, c, c.replace(oldMeta, newMeta), 'CANONICAL_MISSING');
    }
  }
}

// Homepage canonical - add to app/layout.tsx metadata
{
  const p = path.join(ROOT, 'app/layout.tsx');
  let c = readFile(p);
  if (c.includes('export const metadata') && !c.includes('alternates')) {
    // Add canonical after description
    c = c.replace(
      "  openGraph: {",
      "  alternates: {\n    canonical: 'https://cost-smart-five.vercel.app',\n  },\n  openGraph: {"
    );
    fix(p, readFile(p), c, 'CANONICAL_MISSING (homepage)');
  }
}

// ============================================================
// FIX 7: Fix multiple H1 in /currency page
// ============================================================
{
  const p = path.join(ROOT, 'app/currency/page.tsx');
  if (fs.existsSync(p)) {
    let c = readFile(p);
    const h1Matches = c.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    if (h1Matches.length > 1) {
      // Change the second h1 to h2
      let count = 0;
      const fixed = c.replace(/<h1/gi, (match) => {
        count++;
        return count > 1 ? '<h2' : match;
      }).replace(/<\/h1>/gi, (match) => {
        // this approach won't work for close tags separately, handle differently
        return match;
      });
      // Better approach: find second h1 and replace open+close tags
      const firstH1Idx = c.indexOf('<h1');
      const secondH1Idx = c.indexOf('<h1', firstH1Idx + 1);
      if (secondH1Idx !== -1) {
        const closingTag = '</h1>';
        const secondH1End = c.indexOf(closingTag, secondH1Idx);
        if (secondH1End !== -1) {
          let result = c;
          // Replace second h1 open tag
          const h1OpenEnd = c.indexOf('>', secondH1Idx) + 1;
          const h1OpenTag = c.substring(secondH1Idx, h1OpenEnd);
          const h2OpenTag = h1OpenTag.replace(/^<h1/, '<h2');
          result = result.substring(0, secondH1Idx) + h2OpenTag + result.substring(h1OpenEnd);
          // Now find and replace the corresponding close tag
          const newClosingIdx = result.indexOf('</h1>', secondH1Idx);
          if (newClosingIdx !== -1) {
            result = result.substring(0, newClosingIdx) + '</h2>' + result.substring(newClosingIdx + 5);
          }
          fix(p, c, result, 'MULTIPLE_H1');
        }
      }
    }
  }
}

// ============================================================
// FIX 8: Add OG metadata blocks to top calculator pages
// ============================================================
const ogFixes = {
  'app/in/sip-calculator/page.tsx': {
    canonical: 'https://cost-smart-five.vercel.app/in/sip-calculator',
    title: 'SIP Calculator | Mutual Fund Returns Estimator India',
    desc: 'Calculate SIP returns with compound interest over 5-30 years. Compare monthly vs lumpsum investing, see wealth growth charts, and plan your mutual fund goals.',
  },
  'app/in/emi-calculator/page.tsx': {
    canonical: 'https://cost-smart-five.vercel.app/in/emi-calculator',
    title: 'EMI Calculator India — Home, Car & Personal Loan',
    desc: 'Calculate EMI for home, car, and personal loans in India. Get amortization schedule, total interest, and compare different loan tenures instantly.',
  },
  'app/in/salary-calculator/page.tsx': {
    canonical: 'https://cost-smart-five.vercel.app/in/salary-calculator',
    title: 'Salary Calculator India | CTC to In-Hand (FY 2024-25)',
    desc: 'Convert CTC to in-hand salary instantly. Calculates PF, professional tax, HRA exemption, income tax, and all deductions for FY 2024-25.',
  },
  'app/in/ppf-calculator/page.tsx': {
    canonical: 'https://cost-smart-five.vercel.app/in/ppf-calculator',
    title: 'PPF Calculator India | Maturity & Interest',
    desc: 'Calculate PPF maturity amount, year-wise interest, and partial withdrawal schedule. Based on current 7.1% interest rate. Great for tax-free wealth building.',
  },
  'app/in/fd-calculator/page.tsx': {
    canonical: 'https://cost-smart-five.vercel.app/in/fd-calculator',
    title: 'FD Calculator India | Fixed Deposit Returns',
    desc: 'Calculate fixed deposit maturity and interest for all major Indian banks. Supports monthly, quarterly, and annual compounding with TDS deduction.',
  },
  'app/calculators/page.tsx': {
    canonical: 'https://cost-smart-five.vercel.app/calculators',
    title: 'All Free Financial Calculators | CostSmart',
    desc: 'Browse all 35+ free financial calculators: EMI, SIP, income tax, salary, PPF, FD, GST, retirement, property, solar ROI, and more — all India-focused.',
  },
  'app/blog/page.tsx': {
    canonical: 'https://cost-smart-five.vercel.app/blog',
    title: 'Financial Blog | CostSmart — Money, Tax & Investment Guides',
    desc: 'Expert guides on SIP vs Lumpsum, income tax, home loans, debt payoff, salary breakdowns, and smart investing in India. No jargon, just clear answers.',
  },
};

for (const [relPath, cfg] of Object.entries(ogFixes)) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) { console.log(`⚠️  Not found: ${relPath}`); continue; }
  let c = readFile(fullPath);
  
  // Only add OG if not already present
  if (c.includes('openGraph')) continue;
  
  // Build OG block to insert
  const ogBlock = `  openGraph: {\n    title: '${cfg.title}',\n    description: '${cfg.desc}',\n    url: '${cfg.canonical}',\n    type: 'website',\n  },\n`;
  
  // Insert before closing brace of metadata object
  // Find "alternates:" or end of metadata
  if (c.includes('alternates:')) {
    const insertPoint = c.indexOf('  alternates:');
    const before = c.substring(0, insertPoint);
    const after = c.substring(insertPoint);
    const newContent = before + ogBlock + after;
    fix(fullPath, c, newContent, 'OG_MISSING');
  }
}

// ============================================================
// FIX 9: Dynamic page descriptions
// ============================================================

// /in/home-loan-calculator/[city] - add description to generateMetadata
{
  const p = path.join(ROOT, 'app/in/home-loan-calculator/[city]/page.tsx');
  if (fs.existsSync(p)) {
    let c = readFile(p);
    if (!c.includes('description:') && c.includes('generateMetadata')) {
      c = c.replace(
        "title: `Home Loan EMI Calculator",
        "description: `Calculate home loan EMI in \${cityParam}. Compare interest rates across banks, get amortization schedule, and see how prepayments save you money.`,\n        title: \`Home Loan EMI Calculator"
      );
      fix(p, readFile(p), c, 'DESC_MISSING (dynamic)');
    }
  }
}

// /in/salary-calculator/[city] - add description
{
  const p = path.join(ROOT, 'app/in/salary-calculator/[city]/page.tsx');
  if (fs.existsSync(p)) {
    let c = readFile(p);
    if (!c.includes('description:') && c.includes('generateMetadata')) {
      // Find the title line and add description
      const titlePattern = /title:\s*`[^`]+`/;
      const titleMatch = c.match(titlePattern);
      if (titleMatch) {
        const newBlock = `description: \`Salary calculator for \${cityName}: convert CTC to in-hand salary with city-specific HRA, professional tax, and cost of living data for FY 2024-25.\`,\n        ${titleMatch[0]}`;
        c = c.replace(titlePattern, newBlock);
        fix(p, readFile(p), c, 'DESC_MISSING (dynamic salary city)');
      }
    }
  }
}

console.log(`\n✅ Total fixes applied: ${totalFixes}`);
