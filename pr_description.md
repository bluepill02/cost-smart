🎯 **What:** Removed the explicit `any` type and the `eslint-disable` comment for `Tooltip` `formatter` prop in `EMIVsSIPCalculator.tsx`, replacing it with `number | string | readonly (string | number)[] | undefined` to match `recharts` API.
💡 **Why:** Using `any` defeats TypeScript's safety features and relying on eslint disables is bad practice. Providing proper types improves codebase maintainability and type safety.
✅ **Verification:** Verified by running `npm run lint`, `npm run build`, and running playwright tests to confirm the build, typecheck, and rendering remain unbroken.
✨ **Result:** Enhanced typing of Recharts Tooltip without behavioral changes, reducing lint workarounds and improving codebase health.
