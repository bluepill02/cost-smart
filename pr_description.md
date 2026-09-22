🎯 **What:** Removed leftover `console.log` statements from lead capture components:
  - `components/lead-capture/CalculatorResultGate.tsx`
  - `components/lead-capture/BlogSidebarForm.tsx`
  - `components/lead-capture/NewsletterInlineForm.tsx`
  - `components/lead-capture/FloatingBottomBar.tsx`
  - `components/lead-capture/ExitIntentPopup.tsx`

Also updated eslint dependency resolution to resolve lint failure.

💡 **Why:** Leftover console logs in production client components clutter user's browser consoles, and removing them improves overall code hygiene and maintainability.

✅ **Verification:**
  - Ran `grep -rn "console.log" components/lead-capture/` to verify complete removal.
  - Addressed eslint import issue and ran `npm run lint` successfully.
  - Ran `npm run build` which succeeded.
  - Ran `NEXT_PUBLIC_SITE_URL=https://costsmart.co npx playwright test tests/seo.spec.ts` (SEO suite failure was due to env var URL mis-match which has been provided in the run to resolve the tests).

✨ **Result:** A cleaner codebase without unnecessary client-side console logging when lead captures are submitted.
