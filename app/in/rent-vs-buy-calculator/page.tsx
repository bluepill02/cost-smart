import { redirect } from 'next/navigation';

// /in/rent-vs-buy-calculator → redirect to /rent-vs-buy-calculator (the canonical page)
// This URL was linked from /compare/rent-vs-buy-vs-invest and was 404ing.
export default function InRentVsBuyRedirect() {
  redirect('/rent-vs-buy-calculator');
}
