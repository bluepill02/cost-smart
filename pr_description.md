🎯 **What:** Removed leftover `console.log('Error sharing', error);` from `components/features/ShareButton.tsx` in the catch block of `navigator.share`.
💡 **Why:** Removing leftover `console.log` improves code hygiene, readability, and prevents unneeded console noise for known errors (such as a user cancelling the native share dialog).
✅ **Verification:** Verified by checking types with `npm run build` and running `npm run lint`. I also successfully ran the main unit tests and Playwright testing suite.
✨ **Result:** A cleaner component without unexpected logs leaking to the user console.
