🧹 [code health] fix: replace 'any' with 'Record<string, unknown>' for adsbygoogle

🎯 **What:** Replaced the `any[]` type with `Record<string, unknown>[]` for the `adsbygoogle` array in the `Window` interface within `components/ads/AfterResultAd.tsx` and `components/ads/AdContainer.tsx`. Removed unnecessary `// eslint-disable-next-line @typescript-eslint/no-explicit-any` comments.
💡 **Why:** Using `any` bypasses TypeScript's type checking. Replacing it with `Record<string, unknown>` provides better type safety while still allowing the required behavior (pushing empty objects `{}` to the array for Google AdSense).
✅ **Verification:** Verified by running `npm run lint` and `npm run build` which passed without errors. Also ran `npx playwright test tests/seo.spec.ts` which executed successfully.
✨ **Result:** Improved code maintainability and type safety without altering the existing AdSense functionality.
