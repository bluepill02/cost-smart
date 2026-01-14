## 2024-05-22 - Missing Label-Input Associations
**Learning:** Standard UI component libraries (like Radix/shadcn) often provide separate `Label` and `Input` components. While they look correct visually, they don't automatically associate via `htmlFor` and `id` unless explicitly wired. This breaks the experience for screen reader users who won't hear the label when focusing the input.
**Action:** Always verify `htmlFor` matches `id` when using separate Label components. Use `aria-labelledby` for complex triggers like Select or Dropdown if they don't map to a native input directly.

## 2025-05-23 - Radix Slider Accessibility
**Learning:** The Radix UI `Slider` primitive's root component accepts standard HTML attributes, but the actual focusable `role="slider"` element is the `Thumb`. Passing `aria-label` to the `Root` does not automatically propagate it to the `Thumb` in all wrappers.
**Action:** When wrapping Radix Primitives, explicitly pass `aria-label` (or other aria attributes) to the interactive child (e.g., `SliderPrimitive.Thumb`) to ensure screen readers announce the control correctly.
