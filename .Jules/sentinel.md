## 2025-05-20 - Synchronous File I/O in Server Components
**Vulnerability:** Multiple occurrences of `fs.readFileSync` in Next.js Server Components (`app/`) to read `code_block.json`.
**Learning:** While `fs` is available in Server Components, using synchronous methods blocks the Node.js event loop, creating a Denial of Service (DoS) risk under load, especially for high-traffic pages like Landing Pages.
**Prevention:** Enforce usage of `fs.promises` (e.g., `await fs.readFile`) for all file operations in the Next.js app directory to ensure non-blocking execution.
