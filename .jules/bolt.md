## 2025-05-22 - Cascading Renders in Calculators
**Learning:** Found a pattern where derived calculation results (e.g., ROI, system size) were stored in `useState` and updated via `useEffect` based on input props. This caused a "double render" on every user interaction (input update -> render -> effect -> state update -> render).
**Action:** Always prefer deriving data during render (using `useMemo` for expensive logic) to eliminate the second render cycle and synchronization bugs.
