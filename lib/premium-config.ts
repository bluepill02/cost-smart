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
    // Replace with your actual PayPal client ID
    clientId: 'YOUR_PAYPAL_CLIENT_ID',
    // PayPal hosted button URL - replace with your actual button ID
    hostedButtonUrl: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YOUR_BUTTON_ID',
  },
} as const;

export type PlanKey = keyof typeof PREMIUM_CONFIG.plans;
