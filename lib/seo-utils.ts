import { WithContext, SoftwareApplication, FAQPage, BreadcrumbList } from 'schema-dts';

export function getCalculatorSchema(
  name: string,
  description: string,
  urlPath: string,
  category: string = 'FinanceApplication'
): WithContext<SoftwareApplication> {
  const baseUrl = 'https://cost-smart-five.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    applicationCategory: category,
    operatingSystem: 'Web',
    url: `${baseUrl}${urlPath}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'CostSmart',
      url: baseUrl,
    },
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(faqs: FAQItem[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  const baseUrl = 'https://cost-smart-five.vercel.app';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${baseUrl}${item.url}` : undefined,
    })),
  };
}

// Default FAQ sets for different calculator types
export const DEFAULT_FAQS = {
  solar: [
    {
      question: "How accurate is the solar ROI calculator?",
      answer: "Our calculator uses official solar irradiance data and current electricity rates to provide estimates within ±10% accuracy. Actual savings may vary based on system efficiency, maintenance, and weather patterns."
    },
    {
      question: "What factors affect solar panel ROI?",
      answer: "Key factors include: local electricity rates, average daily sunlight hours, system installation cost, available subsidies, system efficiency, maintenance costs, and electricity consumption patterns."
    },
    {
      question: "How long does it take to recover solar investment?",
      answer: "In most Indian cities, the payback period ranges from 4-7 years depending on electricity rates and system size. After this, you essentially get free electricity for the remaining 20+ years of panel life."
    },
    {
      question: "Are government subsidies included in calculations?",
      answer: "Yes, our calculator factors in central government subsidies for residential solar installations up to 10 kW capacity. State-level subsidies vary and should be verified locally."
    }
  ],
  tax: [
    {
      question: "Which tax regime should I choose?",
      answer: "New regime is beneficial if you don't have significant deductions. Old regime works better if you maximize 80C (₹1.5L), HRA, home loan interest, and other deductions exceeding ₹2.5L annually."
    },
    {
      question: "What is standard deduction?",
      answer: "Standard deduction is a flat ₹75,000 deduction available to salaried individuals under the new tax regime (₹50,000 in old regime). It's automatically applied to reduce taxable income."
    },
    {
      question: "How is tax calculated on salary?",
      answer: "Tax is calculated on gross salary minus exemptions (HRA, LTA) and deductions (80C, 80D, etc.). The remaining taxable income is taxed as per slab rates, plus 4% cess on final tax amount."
    },
    {
      question: "When should I pay advance tax?",
      answer: "If your tax liability exceeds ₹10,000 in a year, you must pay advance tax in four installments: 15% by June 15, 45% by Sep 15, 75% by Dec 15, and 100% by Mar 15."
    }
  ],
  loan: [
    {
      question: "What is EMI and how is it calculated?",
      answer: "EMI (Equated Monthly Installment) is a fixed monthly payment comprising principal and interest. It's calculated using the formula: P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is tenure in months."
    },
    {
      question: "Should I prepay my loan?",
      answer: "Prepayment is beneficial if your loan interest rate exceeds your investment returns. For home loans below 7-8%, investing surplus funds in equity may yield better long-term returns."
    },
    {
      question: "How does loan tenure affect total interest?",
      answer: "Longer tenure means lower EMI but higher total interest paid. For example, a ₹50L loan at 8% for 20 years costs ₹41.9L in interest, while the same loan for 10 years costs ₹21.8L in interest."
    },
    {
      question: "What is the difference between fixed and floating rates?",
      answer: "Fixed rates remain constant throughout the loan tenure, providing payment certainty. Floating rates change with market conditions (MCLR/repo rate), potentially saving money when rates fall but increasing costs when rates rise."
    }
  ],
  investment: [
    {
      question: "What is SIP and how does it work?",
      answer: "SIP (Systematic Investment Plan) allows investing a fixed amount regularly in mutual funds. It averages purchase cost through rupee-cost averaging and benefits from compounding over long periods."
    },
    {
      question: "What returns can I expect from SIP?",
      answer: "Historically, equity mutual funds have delivered 12-15% CAGR over 10+ years. However, returns vary by fund type, market conditions, and investment horizon. Past performance doesn't guarantee future returns."
    },
    {
      question: "Should I invest lump sum or through SIP?",
      answer: "SIP is better for regular income earners and reduces market timing risk. Lump sum works when you have surplus funds and markets are undervalued. Combining both strategies often yields optimal results."
    },
    {
      question: "How is PPF different from FD?",
      answer: "PPF offers tax-free returns (7.1% currently), 15-year lock-in, and EEE tax status. FD offers flexible tenure, immediate liquidity, but taxable interest (6-7.5%). PPF suits long-term tax-free savings; FD suits short-term liquidity needs."
    }
  ],
  business: [
    {
      question: "How do I calculate my freelance rate?",
      answer: "Calculate desired annual income, add 30-40% for business expenses, taxes, and benefits, then divide by billable hours (typically 1,200-1,500 hours/year). Add a buffer for unpaid work, sick days, and vacations."
    },
    {
      question: "What is break-even point?",
      answer: "Break-even is when total revenue equals total costs (fixed + variable). It's calculated as: Fixed Costs / (Selling Price per Unit - Variable Cost per Unit). Beyond this point, each sale generates profit."
    },
    {
      question: "How do I calculate profit margin?",
      answer: "Gross profit margin = (Revenue - Cost of Goods Sold) / Revenue × 100. Net profit margin = (Net Profit / Revenue) × 100. A healthy margin varies by industry: retail (2-5%), software (15-25%), services (10-20%)."
    },
    {
      question: "What GST rate applies to my business?",
      answer: "GST rates are 5%, 12%, 18%, or 28% depending on goods/services. Most services are 18%. Essentials like food items are 5-12%. Luxury items and sin goods are 28%. Check HSN code for specific rates."
    }
  ],
  property: [
    {
      question: "How much stamp duty do I need to pay?",
      answer: "Stamp duty rates vary by state (3-7% of property value). Women buyers often get 1-2% concession. Registration charges are typically 1% extra. Total transaction cost ranges from 4-9% depending on location."
    },
    {
      question: "Should I rent or buy a home?",
      answer: "Buy if you plan to stay 5+ years, have down payment (20%), and home loan EMI < 40% of income. Rent if career is unstable, you prioritize liquidity, or want to invest surplus in higher-return assets."
    },
    {
      question: "How do I calculate property tax?",
      answer: "Property tax is based on Annual Rental Value (ARV) determined by municipal authorities. Rates vary: 0.05-0.20% of ARV in metros. Self-occupied properties often get lower rates or exemptions up to certain limits."
    },
    {
      question: "What are hidden costs of home buying?",
      answer: "Beyond down payment: stamp duty (4-7%), registration (1%), legal fees (0.5%), brokerage (1-2%), GST on under-construction (~5%), interior work (₹500-2000/sqft), and maintenance (₹2-5/sqft monthly)."
    }
  ],
  general: [
    {
      question: "How do I use the calculator?",
      answer: "Enter your values in the input fields, and results are calculated automatically. Use the sliders or input boxes for precise values. Results update in real-time as you adjust parameters."
    },
    {
      question: "Is my data stored or tracked?",
      answer: "No. All calculations happen in your browser. We don't store or transmit your personal financial data. Your calculation history is saved locally on your device only."
    },
    {
      question: "Can I save or export results?",
      answer: "Yes, most calculators allow you to save results locally or export as PDF. Click the 'Save' or 'Export' button below the calculator results."
    },
    {
      question: "How often is data updated?",
      answer: "Interest rates, tax slabs, and government policy data are updated quarterly or when official changes are announced. Currency rates update hourly."
    }
  ]
};

// Helper to get default FAQs based on calculator type
export function getDefaultFAQs(calculatorType: keyof typeof DEFAULT_FAQS): FAQItem[] {
  return DEFAULT_FAQS[calculatorType] || DEFAULT_FAQS.general;
}
