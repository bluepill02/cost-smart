import React from 'react';
import { getCalculatorSchema, getFAQSchema, getDefaultFAQs, DEFAULT_FAQS } from '@/lib/seo-utils';
import JsonLd from './JsonLd';

interface CalculatorSchemaInjectorProps {
  calculatorName: string;
  calculatorDescription: string;
  urlPath: string;
  calculatorType: keyof typeof DEFAULT_FAQS;
}

/**
 * Injects SoftwareApplication + FAQPage JSON-LD schema for a calculator page.
 * Place this component at the top of the calculator page's return JSX.
 * JSON-LD script tags are valid in both <head> and <body>.
 *
 * Usage:
 * <CalculatorSchemaInjector
 *   calculatorName="Home Loan Calculator"
 *   calculatorDescription="Calculate EMI and total interest..."
 *   urlPath="/home-loan-calculator"
 *   calculatorType="loan"
 * />
 */
export default function CalculatorSchemaInjector({
  calculatorName,
  calculatorDescription,
  urlPath,
  calculatorType,
}: CalculatorSchemaInjectorProps) {
  // Get the calculator schema
  const calculatorSchema = getCalculatorSchema(
    calculatorName,
    calculatorDescription,
    urlPath,
    'FinanceApplication'
  );

  // Get default FAQs for this calculator type
  const faqs = getDefaultFAQs(calculatorType);
  const faqSchema = getFAQSchema(faqs);

  return (
    <>
      <JsonLd data={calculatorSchema} />
      <JsonLd data={faqSchema} />
    </>
  );
}
