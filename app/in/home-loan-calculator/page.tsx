import { redirect } from 'next/navigation';

// /in/home-loan-calculator → redirect to /home-loan-calculator (the canonical page)
// The dynamic [city] route handles /in/home-loan-calculator/[city] already.
// This index page was 404ing - fix by redirecting to the main calculator.
export default function InHomeLoanRedirect() {
  redirect('/home-loan-calculator');
}
