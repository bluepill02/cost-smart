🎯 **What:**
Added a test suite for `cn` utility in `lib/utils.ts`, solving the gap where this core function was not tested.

📊 **Coverage:**
- Standard string class merging
- Object-based conditional classes
- Array-based class lists
- Handling of falsy, null, and undefined inputs
- Conflict resolution behavior of Tailwind classes via `twMerge`
- Complex combination of the above

✨ **Result:**
The `cn` utility is now tested by `tests/utils.spec.ts` in the Playwright suite, creating a safety net for any potential refactors of this critical utility logic.
