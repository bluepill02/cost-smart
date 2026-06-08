# Lead Capture Form Field IDs - CRM/Apollo Mapping Reference

This document lists all lead capture forms deployed on the CostSmart website, along with their HTML identifiers for CRM field mapping (Apollo.io, HubSpot, etc.).

---

## Forms Overview

| # | Form Name | Form `name` Attribute | Type | Placement |
|---|-----------|----------------------|------|-----------|
| 1 | Newsletter Inline | `costsmart-newsletter-form` | Inline section | Homepage (between Blog Highlights and Trust Section) |
| 2 | Exit Intent Popup | `costsmart-exit-intent-form` | Modal popup | Global (all pages, triggers on exit intent) |
| 3 | Floating Bottom Bar | `costsmart-bottombar-form` | Sticky bottom bar | Global (all pages, appears after 60% scroll) |
| 4 | Calculator Result Gate | `costsmart-calculator-gate-form` | Inline CTA card | Calculator pages (below results) |
| 5 | Blog Sidebar | `costsmart-blog-sidebar-form` | Sticky sidebar widget | Blog article pages |

---

## Field IDs by Form

### 1. Newsletter Inline Form (`costsmart-newsletter-form`)

| Field | HTML `id` | HTML `name` | Type | Required |
|-------|-----------|-------------|------|----------|
| Email | `costsmart-newsletter-email` | `costsmart-newsletter-email` | email | Yes |
| Name | `costsmart-newsletter-name` | `costsmart-newsletter-name` | text | No |

**Component:** `components/lead-capture/NewsletterInlineForm.tsx`
**Value Prop:** "Get Smart Money Tips" - weekly financial insights newsletter
**Trigger:** Always visible (inline section)

---

### 2. Exit Intent Popup (`costsmart-exit-intent-form`)

| Field | HTML `id` | HTML `name` | Type | Required |
|-------|-----------|-------------|------|----------|
| Email | `costsmart-exit-email` | `costsmart-exit-email` | email | Yes |
| Name | `costsmart-exit-name` | `costsmart-exit-name` | text | No |

**Component:** `components/lead-capture/ExitIntentPopup.tsx`
**Value Prop:** "Free Financial Planning Toolkit" (PDF lead magnet)
**Trigger:** Mouse leaves viewport (clientY < 10)
**Dismiss Logic:** localStorage key `costsmart-exit-dismissed` - suppressed for 7 days after dismissal

---

### 3. Floating Bottom Bar (`costsmart-bottombar-form`)

| Field | HTML `id` | HTML `name` | Type | Required |
|-------|-----------|-------------|------|----------|
| Email | `costsmart-bottombar-email` | `costsmart-bottombar-email` | email | Yes |

**Component:** `components/lead-capture/FloatingBottomBar.tsx`
**Value Prop:** "Weekly Financial Tips"
**Trigger:** User scrolls past 60% of page height
**Dismiss Logic:** sessionStorage key `costsmart-bottombar-dismissed` - suppressed for current session

---

### 4. Calculator Result Gate (`costsmart-calculator-gate-form`)

| Field | HTML `id` | HTML `name` | Type | Required |
|-------|-----------|-------------|------|----------|
| Email | `costsmart-calcgate-email` | `costsmart-calcgate-email` | email | Yes |
| Name | `costsmart-calcgate-name` | `costsmart-calcgate-name` | text | No |

**Component:** `components/lead-capture/CalculatorResultGate.tsx`
**Value Prop:** "Get Full Report via Email" - detailed PDF with charts and insights
**Trigger:** Always visible (inline below calculator results)
**Current Placement:** `/in/sip-calculator` (below AfterResultAd)

---

### 5. Blog Sidebar Form (`costsmart-blog-sidebar-form`)

| Field | HTML `id` | HTML `name` | Type | Required |
|-------|-----------|-------------|------|----------|
| Email | `costsmart-sidebar-email` | `costsmart-sidebar-email` | email | Yes |

**Component:** `components/lead-capture/BlogSidebarForm.tsx`
**Value Prop:** "Smart Money Insights" - weekly digest
**Trigger:** Always visible (sticky sidebar on desktop)
**Current Placement:** `/blog/sip-vs-lumpsum` (right sidebar, desktop only)

---

## Integration Notes

- All forms currently log submissions to `console.log` (no backend endpoint yet)
- All forms show a success state after submission
- Form data format: `{ name?: string, email: string }`
- Apollo.io tracker is loaded globally via `app/layout.tsx` and will capture form submissions automatically when mapped
- To connect to Apollo/CRM: map the `name` attributes above to your CRM contact fields

## Adding to New Pages

```tsx
// Calculator pages
import CalculatorResultGate from '@/components/lead-capture/CalculatorResultGate';
// Place below your calculator results:
<CalculatorResultGate />

// Blog pages (sidebar)
import BlogSidebarForm from '@/components/lead-capture/BlogSidebarForm';
// Place in a sidebar column:
<aside><BlogSidebarForm /></aside>
```
