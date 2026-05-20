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
 * Injects SoftwareApplication + FAQPage schema for a calculator.
 * This component MUST be placed in the <head> section of calculator pages.
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
