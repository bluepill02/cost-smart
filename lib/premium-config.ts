export const PREMIUM_CONFIG = {
  plans: {
    free: {
      name: 'Free',
      price: 0,
      interval: null,
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
      features: [
        'PDF report exports',
        'Ad-free experience',
        'Advanced AI financial advice',
        'Priority support',
        'Advanced charts & projections',
        'Custom report branding',
        'Email report delivery',
      ],
    },
    proYearly: {
      name: 'Pro (Annual)',
      price: 29.99,
      interval: 'year' as const,
      features: [
        'Everything in Pro Monthly',
        'Save 50% vs monthly',
        'Early access to new features',
      ],
    },
  },
  paypal: {
    // Set the NEXT_PUBLIC_PAYPAL_CLIENT_ID environment variable with your PayPal client ID.
    // See: https://developer.paypal.com/docs/checkout/standard/integrate/
    clientId: (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '') as string,
    // PayPal hosted button URL - replace YOUR_BUTTON_ID with your actual button ID
    hostedButtonUrl: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YOUR_BUTTON_ID',
  },
} as const;

export type PlanKey = keyof typeof PREMIUM_CONFIG.plans;
