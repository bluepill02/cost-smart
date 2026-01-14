## 2024-05-22 - Missing Label-Input Associations
**Learning:** Standard UI component libraries (like Radix/shadcn) often provide separate `Label` and `Input` components. While they look correct visually, they don't automatically associate via `htmlFor` and `id` unless explicitly wired. This breaks the experience for screen reader users who won't hear the label when focusing the input.
**Action:** Always verify `htmlFor` matches `id` when using separate Label components. Use `aria-labelledby` for complex triggers like Select or Dropdown if they don't map to a native input directly.

## 2026-01-14 - Controlled Sliders & Accessibility
**Learning:** When using Radix Slider (or shadcn wrapper), simply updating the state variable connected to `onValueChange` is NOT enough to update the slider's visual position if the component is uncontrolled (using `defaultValue`). You must switch to controlled mode (`value={...}`) to support programmatic updates (like from AI). Also, Sliders need explicit `aria-labelledby` linking to their visible labels.
**Action:** Always check if a form input can be updated programmatically. If so, use controlled components (`value` + `onChange/onValueChange`) instead of uncontrolled (`defaultValue`).
