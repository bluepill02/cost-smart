export const PREMIUM_CONFIG = {
  plans: {
    free: {
      name: 'Free',
      price: 0,
      interval: null,
      planId: null,
      features: [
        'All 30+ calculators',
        'Basic calculation results',
        'Community access',
        'Shareable results links',
        'Mobile-friendly interface',
      ],
    },
    proMonthly: {
      name: 'Pro',
      price: 4.99,
      interval: 'month' as const,
      planId: 'P-9D476140703510157NIJUZ7A',
      features: [
        'Unlimited PDF report exports',
        'Ad-free experience',
        'Advanced AI financial advice with action steps',
        'Priority email support',
        'Advanced charts & projections',
        'Custom report branding for clients',
        'Email report delivery',
        'AI document scanner (receipt OCR)',
        'Full financial health analysis',
        '10+ Indian language translation',
        'Voice-powered calculator input',
      ],
    },
    proYearly: {
      name: 'Pro (Annual)',
      price: 29.99,
      interval: 'year' as const,
      planId: 'P-7WP30407BV817674TNIJU2AQ',
      features: [
        'Everything in Pro Monthly',
        'Save 50% vs monthly billing',
        'Early access to new features',
      ],
    },
  },
  paypal: {
    // Set the NEXT_PUBLIC_PAYPAL_CLIENT_ID environment variable with your PayPal client ID.
    // See: https://developer.paypal.com/docs/checkout/standard/integrate/
    clientId: (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '') as string,
  },
} as const;

export type PlanKey = keyof typeof PREMIUM_CONFIG.plans;
