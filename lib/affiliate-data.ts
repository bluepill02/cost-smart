export interface AffiliateProduct {
  title: string;
  description: string;
  amazonUrl: string;
  category: string;
}

const AFFILIATE_TAG = "vellichor-21";

function amazonSearchUrl(searchTerm: string): string {
  return `https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}&tag=${AFFILIATE_TAG}`;
}

const PRODUCTS: Record<string, AffiliateProduct[]> = {
  "home-finance": [
    {
      title: "Home Loan Guide India",
      description: "Complete guide to home buying and loan management in India.",
      amazonUrl: amazonSearchUrl("home loan guide India"),
      category: "Home & Property",
    },
    {
      title: "Financial Planning Books",
      description: "Best-selling personal finance books for smart money management.",
      amazonUrl: amazonSearchUrl("personal finance books India"),
      category: "Finance & Investing",
    },
    {
      title: "Home Office Organizer",
      description: "Keep your financial documents organized with file organizers.",
      amazonUrl: amazonSearchUrl("home office file organizer"),
      category: "Home & Property",
    },
    {
      title: "Scientific Calculator",
      description: "Essential for quick EMI and interest calculations on the go.",
      amazonUrl: amazonSearchUrl("scientific calculator Casio"),
      category: "Business & Productivity",
    },
  ],
  "solar-energy": [
    {
      title: "Solar Panel Kit",
      description: "High-efficiency solar panels for rooftop installation in India.",
      amazonUrl: amazonSearchUrl("solar panel kit home India"),
      category: "Solar & Energy",
    },
    {
      title: "Solar Inverter",
      description: "Reliable solar inverters for grid-tied and off-grid systems.",
      amazonUrl: amazonSearchUrl("solar inverter for home"),
      category: "Solar & Energy",
    },
    {
      title: "Solar Power Monitor",
      description: "Track your solar generation and savings with smart monitors.",
      amazonUrl: amazonSearchUrl("solar power meter monitor"),
      category: "Solar & Energy",
    },
    {
      title: "Solar Battery Storage",
      description: "Store excess energy for use during night or power cuts.",
      amazonUrl: amazonSearchUrl("solar battery lithium home"),
      category: "Solar & Energy",
    },
  ],
  "home-renovation": [
    {
      title: "Power Tools Combo Kit",
      description: "Complete toolkit for DIY home renovation projects.",
      amazonUrl: amazonSearchUrl("power tools combo kit Bosch"),
      category: "Home & Property",
    },
    {
      title: "Interior Paint Set",
      description: "Premium wall paints for a fresh look during renovation.",
      amazonUrl: amazonSearchUrl("interior wall paint Asian Paints"),
      category: "Home & Property",
    },
    {
      title: "Measuring Tools",
      description: "Laser distance meter and measuring tape for accurate estimates.",
      amazonUrl: amazonSearchUrl("laser distance meter measuring tape"),
      category: "Home & Property",
    },
    {
      title: "Home Improvement Books",
      description: "Step-by-step guides for successful home renovation projects.",
      amazonUrl: amazonSearchUrl("home improvement renovation guide book"),
      category: "Home & Property",
    },
  ],
  "freelance-business": [
    {
      title: "Ergonomic Desk Setup",
      description: "Standing desk converter for a productive work-from-home setup.",
      amazonUrl: amazonSearchUrl("standing desk converter ergonomic"),
      category: "Business & Productivity",
    },
    {
      title: "Business & Freelance Books",
      description: "Top books on freelancing, pricing, and client management.",
      amazonUrl: amazonSearchUrl("freelance business books"),
      category: "Business & Productivity",
    },
    {
      title: "Noise Cancelling Headphones",
      description: "Focus better with premium noise cancellation for deep work.",
      amazonUrl: amazonSearchUrl("noise cancelling headphones Sony"),
      category: "Business & Productivity",
    },
    {
      title: "Planner & Productivity Journal",
      description: "Stay organized with time-blocking planners designed for freelancers.",
      amazonUrl: amazonSearchUrl("productivity planner journal"),
      category: "Business & Productivity",
    },
  ],
  "retirement-planning": [
    {
      title: "Retirement Planning Books",
      description: "Expert guides on building a retirement corpus and FIRE movement.",
      amazonUrl: amazonSearchUrl("retirement planning books India"),
      category: "Finance & Investing",
    },
    {
      title: "Health Monitor Devices",
      description: "Smart health devices to track fitness as you plan for the long term.",
      amazonUrl: amazonSearchUrl("health monitor smartwatch fitness"),
      category: "Health & Wellness",
    },
    {
      title: "Investment Books India",
      description: "Learn value investing and wealth building strategies.",
      amazonUrl: amazonSearchUrl("investment books India Parag Parikh"),
      category: "Finance & Investing",
    },
  ],
  "investment": [
    {
      title: "The Intelligent Investor",
      description: "The definitive book on value investing by Benjamin Graham.",
      amazonUrl: amazonSearchUrl("intelligent investor Benjamin Graham"),
      category: "Finance & Investing",
    },
    {
      title: "Stock Market Books India",
      description: "Bestsellers on Indian stock market investing and mutual funds.",
      amazonUrl: amazonSearchUrl("stock market books India beginners"),
      category: "Finance & Investing",
    },
    {
      title: "Financial Calculator",
      description: "HP or Texas Instruments financial calculator for compound interest.",
      amazonUrl: amazonSearchUrl("financial calculator HP"),
      category: "Business & Productivity",
    },
    {
      title: "Wealth Building Journals",
      description: "Track your investments and net worth growth systematically.",
      amazonUrl: amazonSearchUrl("investment tracking journal planner"),
      category: "Finance & Investing",
    },
  ],
  "debt-management": [
    {
      title: "Debt-Free Living Books",
      description: "Proven strategies to eliminate debt and build wealth.",
      amazonUrl: amazonSearchUrl("debt free books Dave Ramsey"),
      category: "Finance & Investing",
    },
    {
      title: "Budget Planner",
      description: "Track expenses and allocate payments with a dedicated planner.",
      amazonUrl: amazonSearchUrl("budget planner notebook monthly"),
      category: "Finance & Investing",
    },
    {
      title: "Personal Finance Books India",
      description: "Indian personal finance guides for managing EMIs and savings.",
      amazonUrl: amazonSearchUrl("personal finance India Let's Talk Money"),
      category: "Finance & Investing",
    },
  ],
  "business-tools": [
    {
      title: "Business Plan Books",
      description: "Learn to write compelling business plans and secure funding.",
      amazonUrl: amazonSearchUrl("business plan books startup"),
      category: "Business & Productivity",
    },
    {
      title: "Office Equipment",
      description: "Printers, scanners, and essentials for your business office.",
      amazonUrl: amazonSearchUrl("office printer scanner business"),
      category: "Business & Productivity",
    },
    {
      title: "Accounting & Tally Books",
      description: "Master business accounting and GST compliance.",
      amazonUrl: amazonSearchUrl("accounting books Tally GST India"),
      category: "Business & Productivity",
    },
    {
      title: "Business Calculator",
      description: "Professional calculators for margin, markup, and profit analysis.",
      amazonUrl: amazonSearchUrl("business calculator Casio professional"),
      category: "Business & Productivity",
    },
  ],
  "india-personal-finance": [
    {
      title: "Let's Talk Money",
      description: "Monika Halan's bestseller on personal finance for Indians.",
      amazonUrl: amazonSearchUrl("Let's Talk Money Monika Halan"),
      category: "Finance & Investing",
    },
    {
      title: "Tax Planning Guide",
      description: "Save more with smart tax planning under new and old regimes.",
      amazonUrl: amazonSearchUrl("income tax planning guide India"),
      category: "Finance & Investing",
    },
    {
      title: "Mutual Fund Books",
      description: "Understand SIP, ELSS, and mutual fund investing in India.",
      amazonUrl: amazonSearchUrl("mutual fund investing India books"),
      category: "Finance & Investing",
    },
    {
      title: "Financial Organizer Binder",
      description: "Keep track of FD receipts, PPF statements, and tax documents.",
      amazonUrl: amazonSearchUrl("financial document organizer binder"),
      category: "Business & Productivity",
    },
  ],
  "shipping-trade": [
    {
      title: "Shipping & Packaging Supplies",
      description: "Bubble wrap, boxes, and tape for safe product shipping.",
      amazonUrl: amazonSearchUrl("shipping packaging supplies bubble wrap boxes"),
      category: "Business & Productivity",
    },
    {
      title: "Import Export Guide India",
      description: "Complete handbook for import-export business in India.",
      amazonUrl: amazonSearchUrl("import export business guide India"),
      category: "Business & Productivity",
    },
    {
      title: "Digital Weighing Scale",
      description: "Precision scale for calculating shipping costs by weight.",
      amazonUrl: amazonSearchUrl("digital weighing scale parcel shipping"),
      category: "Business & Productivity",
    },
  ],
  "travel-currency": [
    {
      title: "Travel Accessories Kit",
      description: "Passport holder, travel wallet, and organizer for international trips.",
      amazonUrl: amazonSearchUrl("travel accessories passport holder wallet"),
      category: "Travel & Lifestyle",
    },
    {
      title: "Forex Card Holder",
      description: "RFID-blocking card holder for multi-currency forex cards.",
      amazonUrl: amazonSearchUrl("RFID blocking card holder travel"),
      category: "Travel & Lifestyle",
    },
    {
      title: "International Travel Guides",
      description: "Best travel guides with budgeting tips for popular destinations.",
      amazonUrl: amazonSearchUrl("international travel guide book budget"),
      category: "Travel & Lifestyle",
    },
  ],
  "property": [
    {
      title: "Real Estate Investing Books",
      description: "Learn property investment strategies for wealth building.",
      amazonUrl: amazonSearchUrl("real estate investing books India"),
      category: "Home & Property",
    },
    {
      title: "Home Buying Guide India",
      description: "Navigate the process of buying your first home in India.",
      amazonUrl: amazonSearchUrl("home buying guide first time India"),
      category: "Home & Property",
    },
    {
      title: "Property Tax & Legal Books",
      description: "Understand property laws, registration, and stamp duty.",
      amazonUrl: amazonSearchUrl("property tax legal guide India"),
      category: "Home & Property",
    },
  ],
};

const SLUG_TO_CATEGORY: Record<string, string> = {
  "home-loan": "home-finance",
  "solar-roi": "solar-energy",
  "home-renovation": "home-renovation",
  "freelance-rate": "freelance-business",
  "retirement": "retirement-planning",
  "investment": "investment",
  "debt-payoff": "debt-management",
  "business-loan": "business-tools",
  "break-even": "business-tools",
  "profit-margin": "business-tools",
  "emi": "india-personal-finance",
  "sip": "india-personal-finance",
  "fd": "india-personal-finance",
  "ppf": "india-personal-finance",
  "salary": "india-personal-finance",
  "income-tax": "india-personal-finance",
  "shipping-cost": "shipping-trade",
  "import-duty": "shipping-trade",
  "currency": "travel-currency",
  "loan": "home-finance",
  "emergency-fund": "debt-management",
  "rent-vs-buy": "property",
  "invoice-generator": "business-tools",
};

export function getRecommendations(calculatorSlug: string): AffiliateProduct[] {
  const category = SLUG_TO_CATEGORY[calculatorSlug];
  if (!category) {
    return PRODUCTS["india-personal-finance"]?.slice(0, 3) ?? [];
  }
  const products = PRODUCTS[category];
  if (!products) {
    return [];
  }
  return products.slice(0, 4);
}

export function getAllProducts(): AffiliateProduct[] {
  const seen = new Set<string>();
  const all: AffiliateProduct[] = [];
  for (const products of Object.values(PRODUCTS)) {
    for (const product of products) {
      if (!seen.has(product.title)) {
        seen.add(product.title);
        all.push(product);
      }
    }
  }
  return all;
}

export function getProductsByCategory(): Record<string, AffiliateProduct[]> {
  const all = getAllProducts();
  const grouped: Record<string, AffiliateProduct[]> = {};
  for (const product of all) {
    if (!grouped[product.category]) {
      grouped[product.category] = [];
    }
    grouped[product.category].push(product);
  }
  return grouped;
}
