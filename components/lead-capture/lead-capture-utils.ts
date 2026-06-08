'use client';

const LEAD_CAPTURED_KEY = 'costsmart-lead-captured';

/**
 * Mark that a lead has been captured across all forms.
 * Once set, all forms should hide themselves.
 */
export function markLeadCaptured(): void {
  try {
    localStorage.setItem(LEAD_CAPTURED_KEY, String(Date.now()));
  } catch {}
}

/**
 * Check if a lead has already been captured by any form.
 */
export function isLeadAlreadyCaptured(): boolean {
  try {
    return !!localStorage.getItem(LEAD_CAPTURED_KEY);
  } catch {
    return false;
  }
}
