# Quick Start Guide: Using New SEO Components

This guide shows how to integrate the newly created SEO components into your calculator and blog pages.

---

## 1. FAQ Section Component

### Basic Usage (With Default FAQs)

```tsx
import { FAQSection } from '@/components/ui/FAQSection';

export default function SolarROICalculator() {
  return (
    <div>
      {/* Your calculator UI */}
      
      {/* Add FAQ section at the bottom */}
      <FAQSection 
        calculatorType="solar" 
        className="mt-12" 
      />
    </div>
  );
}
```

### Advanced Usage (Custom FAQs)

```tsx
import { FAQSection } from '@/components/ui/FAQSection';

const customFAQs = [
  {
    question: "How is compound interest calculated?",
    answer: "Compound interest is calculated using the formula: A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounds per year, and t is time in years."
  },
  {
    question: "What's the difference between simple and compound interest?",
    answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest."
  }
];

export default function FDCalculator() {
  return (
    <div>
      {/* Calculator UI */}
      
      <FAQSection 
        faqs={customFAQs}
        title="FD Calculator Frequently Asked Questions"
        className="mt-12" 
      />
    </div>
  );
}
```

### Available Calculator Types

The `calculatorType` prop accepts:
- `solar` - Solar ROI questions
- `tax` - Income tax questions
- `loan` - Home loan / EMI questions
- `investment` - SIP / PPF / FD questions
- `business` - Freelance / GST / profit margin questions
- `property` - Stamp duty / rent vs buy questions
- `general` - Generic calculator questions (default)

---

## 2. Data Freshness Badge

### RBI Data Badge (for FD, PPF, SIP calculators)

```tsx
import { RBIDataBadge } from '@/components/ui/DataFreshnessBadge';

export default function PPFCalculator() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1>PPF Calculator</h1>
        <RBIDataBadge variant="compact" />
      </div>
      
      {/* Calculator form */}
    </div>
  );
}
```

### Tax Data Badge (for income tax, salary calculators)

```tsx
import { TaxDataBadge } from '@/components/ui/DataFreshnessBadge';

export default function IncomeTaxCalculator() {
  return (
    <div>
      <div className="mb-8">
        <h1>Income Tax Calculator FY 2025-26</h1>
        <TaxDataBadge variant="detailed" />
      </div>
      
      {/* Calculator form */}
    </div>
  );
}
```

### Currency Data Badge (for currency converter)

```tsx
import { CurrencyDataBadge } from '@/components/ui/DataFreshnessBadge';

export default function CurrencyConverter() {
  return (
    <div>
      <CurrencyDataBadge variant="default" />
      {/* Converter UI */}
    </div>
  );
}
```

### Badge Variants

**Compact:** One line, minimal design
```tsx
<RBIDataBadge variant="compact" />
// Output: • Updated 31 Jan, 2026
```

**Default:** Pill-shaped badge with source
```tsx
<RBIDataBadge variant="default" />
// Output: [•] Updated 31 Jan, 2026 • Reserve Bank of India
```

**Detailed:** Full card with all metadata
```tsx
<RBIDataBadge variant="detailed" />
// Output: Card with icon, update date, source, fiscal year, update frequency
```

---

## 3. Breadcrumbs Component

### Manual Breadcrumbs

```tsx
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function CitySpecificSolarPage({ city }: { city: string }) {
  return (
    <div>
      <Breadcrumbs 
        items={[
          { name: 'Calculators', url: '/calculators' },
          { name: 'Solar ROI', url: '/solar-roi' },
          { name: city } // Current page (no URL)
        ]}
        className="mb-6"
      />
      
      {/* Page content */}
    </div>
  );
}
```

### Auto-Generated Breadcrumbs from URL

```tsx
'use client';

import { generateBreadcrumbsFromPath, Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { usePathname } from 'next/navigation';

export default function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbsFromPath(pathname);
  
  return <Breadcrumbs items={breadcrumbs} />;
}
```

**Example URL → Breadcrumb Generation:**
```
/solar-roi/mumbai/1000
→ Home > Solar Roi > Mumbai > 1000

/in/income-tax-calculator
→ Home > In > Income Tax Calculator

/blog/ultimate-guide-solar-savings
→ Home > Blog > Ultimate Guide Solar Savings
```

---

## 4. Blog Post Schema (Already Integrated)

When creating a new blog post, ensure you pass the `slug` prop:

```tsx
import BlogLayout from '@/components/blog/BlogLayout';

export default function NewBlogPost() {
  return (
    <BlogLayout
      title="How to Calculate Solar ROI"
      date="2026-01-31"
      readingTime="5 min"
      category="Calculators"
      author="CostSmart Team"
      description="Learn how to calculate ROI for solar panel installation with practical examples."
      slug="how-to-calculate-solar-roi"  // ← Add this!
    >
      {/* Blog content here */}
    </BlogLayout>
  );
}
```

The `BlogLayout` component automatically adds:
- ✅ BlogPosting schema
- ✅ Author information
- ✅ Publisher (CostSmart)
- ✅ Date published/modified
- ✅ Article section
- ✅ Accessibility metadata

---

## 5. Adding FAQs to Existing Calculator Pages

### Step-by-Step Example: Solar ROI Calculator

**File:** `app/solar-roi/page.tsx`

**Before:**
```tsx
export default function SolarROIPage() {
  return (
    <div>
      <h1>Solar ROI Calculator</h1>
      <SolarForm />
      <RelatedTools currentTool="solar" />
    </div>
  );
}
```

**After:**
```tsx
import { FAQSection } from '@/components/ui/FAQSection';
import { RBIDataBadge } from '@/components/ui/DataFreshnessBadge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function SolarROIPage() {
  return (
    <div>
      {/* Add breadcrumbs at top */}
      <Breadcrumbs 
        items={[
          { name: 'Calculators', url: '/' },
          { name: 'Solar ROI' }
        ]}
        className="mb-6"
      />
      
      <div className="flex items-center justify-between mb-4">
        <h1>Solar ROI Calculator</h1>
        {/* Add data freshness badge */}
        <RBIDataBadge variant="compact" />
      </div>
      
      <SolarForm />
      
      {/* Add FAQ section before related tools */}
      <FAQSection 
        calculatorType="solar" 
        className="my-12" 
      />
      
      <RelatedTools currentTool="solar" />
    </div>
  );
}
```

---

## 6. Quick Integration Checklist

For each calculator page, add in this order:

### Top Section
- [ ] Breadcrumbs component
- [ ] Data freshness badge (if uses RBI/tax data)

### Middle Section
- [ ] Calculator form (existing)

### Bottom Section
- [ ] FAQ section (before related tools)
- [ ] Related tools (existing)

---

## 7. Component Props Reference

### FAQSection Props
```typescript
interface FAQSectionProps {
  faqs?: FAQItem[];              // Custom FAQs (optional)
  calculatorType?: string;       // 'solar' | 'tax' | 'loan' | etc.
  title?: string;                // Custom title (default: "Frequently Asked Questions")
  className?: string;            // Additional CSS classes
}
```

### DataFreshnessBadge Props
```typescript
interface DataFreshnessBadgeProps {
  dataType: 'rbi' | 'tax' | 'currency' | 'custom';
  lastUpdated?: string;          // For custom type only (ISO 8601 date)
  dataSource?: string;           // For custom type only
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}
```

### Breadcrumbs Props
```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[];       // Array of breadcrumb items
  className?: string;
}

interface BreadcrumbItem {
  name: string;                  // Display name
  url?: string;                  // Link URL (omit for current page)
}
```

---

## 8. Schema Validation

After adding components, validate structured data:

1. **Build the site:**
   ```bash
   pnpm run build
   ```

2. **Test in Google Rich Results Test:**
   - Go to: https://search.google.com/test/rich-results
   - Enter page URL
   - Check for:
     - ✅ FAQ schema detected
     - ✅ Breadcrumb schema detected
     - ✅ Article schema detected (for blogs)
     - ❌ No errors or warnings

3. **Verify in Google Search Console:**
   - Check "Enhancements" section
   - Look for "FAQ" and "Breadcrumb" reports
   - Monitor rich result impressions

---

## 9. Performance Considerations

### Component Bundle Sizes
- FAQSection: ~3KB (client component)
- DataFreshnessBadge: ~2KB (client component)
- Breadcrumbs: ~1.5KB (client component)
- **Total:** ~6.5KB added per page

### Optimization Tips
1. Use `variant="compact"` for data badges when space is limited
2. Lazy load FAQ section below the fold:
   ```tsx
   import dynamic from 'next/dynamic';
   
   const FAQSection = dynamic(() => import('@/components/ui/FAQSection'), {
     loading: () => <p>Loading FAQs...</p>
   });
   ```

3. Conditionally render breadcrumbs only on nested pages

---

## 10. Common Issues & Solutions

### Issue: FAQ accordion not working
**Cause:** Component needs 'use client' directive  
**Solution:** Already included in component file, no action needed

### Issue: Breadcrumbs showing encoded URLs
**Cause:** Special characters in city/state names  
**Solution:** Use `decodeURIComponent()` when generating from pathname

### Issue: Data badge showing "stale" warning
**Cause:** Data is >90 days old  
**Solution:** Update RBI_DATA in `lib/rbi-data.ts` with current rates

### Issue: Schema not detected by Google
**Cause:** JavaScript not executing or JSON-LD syntax error  
**Solution:** Check browser console for errors, validate JSON-LD syntax

---

## 11. Next Steps

After integrating these components:

1. **Deploy to production**
   ```bash
   git add .
   git commit -m "feat: Add SEO components (FAQ, breadcrumbs, data badges)"
   git push
   ```

2. **Submit sitemap to Google Search Console**
   - URL: `https://cost-smart-five.vercel.app/sitemap.xml`

3. **Request indexing for top pages**
   - Use "Request Indexing" in GSC for:
     - Homepage
     - Top 10 calculators
     - Top 5 blog posts

4. **Monitor results**
   - Check GSC "Enhancements" for rich results
   - Track impressions/clicks in "Performance"
   - Look for FAQ rich snippets appearing

---

## 12. Support

For issues or questions:
- Check `IMPLEMENTATION_SUMMARY.md` for detailed implementation notes
- Review component source code in `components/ui/`
- Test schema markup: https://search.google.com/test/rich-results

**Last Updated:** January 31, 2026
