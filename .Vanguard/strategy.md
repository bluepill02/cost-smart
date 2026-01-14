# Vanguard Strategic Log

## 2025 Q1 Strategic Focus

**Current Health:** 50% Stability (No automated tests, but clean architecture)
**Major Initiatives:**
1.  **Fortress of Functionality:** Establish a comprehensive E2E test suite using Playwright.
2.  **Traffic Engine:** Verify SEO metadata and Core Web Vitals.
3.  **Future-Proofing:** Ensure all dependencies are managed and no deprecated APIs are used.

**Threats:**
1.  **Regression Risk:** Without tests, any new feature could break existing calculators.
2.  **SEO Volatility:** Lack of structured data or semantic HTML verification could hurt rankings.
3.  **Data Integrity:** Solar data relies on a static JSON file; validation is needed.

## Strategic Roadmap

-   [ ] **Phase 1 (Immediate):** Implement Playwright E2E tests for Solar ROI and Homepage.
-   [ ] **Phase 2 (Short-term):** Add unit tests for `lib/solar-data.ts`.
-   [ ] **Phase 3 (Medium-term):** Automate SEO auditing (Lighthouse CI).
