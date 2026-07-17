export interface ProFeature {
  name: string;
  description: string;
  benefits: string[];
}

export const PRO_FEATURES: Record<string, ProFeature> = {
  'pdf-export': {
    name: 'PDF Export',
    description:
      'Export detailed PDF reports with charts, breakdowns, and personalized recommendations for any calculation.',
    benefits: [
      'Professional PDF reports with charts and graphs',
      'Detailed cost breakdowns and comparisons',
      'Personalized financial recommendations',
      'Share reports with advisors or family',
    ],
  },
  'ai-advice': {
    name: 'AI Financial Advice',
    description:
      'Get personalized AI-powered financial guidance tailored to your specific situation and goals.',
    benefits: [
      'Unlimited AI-powered financial conversations',
      'Personalized advice based on your data',
      'Investment and savings recommendations',
      'Tax optimization suggestions',
    ],
  },
  'ad-free': {
    name: 'Ad-Free Experience',
    description:
      'Enjoy a distraction-free experience without any advertisements while using all calculators.',
    benefits: [
      'Zero ads across all calculators',
      'Faster page loads without ad scripts',
      'Cleaner, distraction-free interface',
      'Uninterrupted calculations and analysis',
    ],
  },
  'advanced-analytics': {
    name: 'Advanced Analytics',
    description:
      'Access advanced charts, projections, and financial health scoring to track your progress over time.',
    benefits: [
      'Advanced charts and visualizations',
      'Long-term financial projections',
      'Financial Health Score analysis',
      'Historical data tracking and trends',
    ],
  },
  'document-scanner': {
    name: 'Document Scanner',
    description:
      'Scan receipts, bills, and financial documents using AI-powered OCR to auto-fill calculators.',
    benefits: [
      'AI-powered receipt and bill scanning',
      'Automatic data extraction from documents',
      'Auto-fill calculator inputs from scans',
      'Digital document organization',
    ],
  },
  'custom-branding': {
    name: 'Custom Report Branding',
    description:
      'Add your logo, name, and custom branding to exported PDF reports for a professional touch.',
    benefits: [
      'Add your logo to PDF reports',
      'Custom header and footer text',
      'Professional branded output',
      'Perfect for sharing with clients',
    ],
  },
  'voice-input': {
    name: 'Voice Input',
    description:
      'Use voice commands to input numbers and navigate calculators hands-free.',
    benefits: [
      'Hands-free calculator input',
      'Voice-powered number entry',
      'Accessibility-friendly experience',
      'Faster data entry for complex calculations',
    ],
  },
  'language-translation': {
    name: 'Language Translation',
    description:
      'Access all calculators and reports in 10+ Indian languages for a localized experience.',
    benefits: [
      'Support for 10+ Indian languages',
      'Translated calculator interfaces',
      'Localized financial terminology',
      'PDF reports in your preferred language',
    ],
  },
};
