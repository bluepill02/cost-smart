"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface ProStatusContextValue {
  isPro: boolean;
  isLoading: boolean;
  proEmail: string | null;
  setProEmail: (email: string) => void;
  /** @deprecated Use setProEmail instead */
  subscriptionId: string | null;
  /** @deprecated Use setProEmail instead. Calls verify-subscription to resolve email. */
  setSubscriptionId: (id: string) => void;
  clearSubscription: () => void;
}

const ProStatusContext = createContext<ProStatusContextValue>({
  isPro: false,
  isLoading: true,
  proEmail: null,
  setProEmail: () => {},
  subscriptionId: null,
  setSubscriptionId: () => {},
  clearSubscription: () => {},
});

const STORAGE_KEY = 'costsmart_pro_email';
const SESSION_KEY = 'costsmart_pro_verified';
const REVALIDATE_MS = 30 * 60 * 1000; // 30 minutes

interface CachedVerification {
  isPro: boolean;
  timestamp: number;
}

export function ProStatusProvider({ children }: { children: ReactNode }) {
  const [proEmail, setProEmailState] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load email from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProEmailState(stored);
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  }, []);

  // Verify subscription when proEmail changes
  useEffect(() => {
    if (!proEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPro(false);
      setIsLoading(false);
      return;
    }

    // Check sessionStorage cache
    try {
      const cached = sessionStorage.getItem(SESSION_KEY);
      if (cached) {
        const parsed: CachedVerification = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;
        if (age < REVALIDATE_MS) {
          setIsPro(parsed.isPro);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Ignore cache read errors
    }

    // Verify with server using email
    setIsLoading(true);
    fetch('/api/pro/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: proEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        const active = data.isPro === true;
        setIsPro(active);
        // Cache result in sessionStorage
        try {
          const cacheEntry: CachedVerification = {
            isPro: active,
            timestamp: Date.now(),
          };
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(cacheEntry));
        } catch {
          // Ignore cache write errors
        }
      })
      .catch(() => {
        setIsPro(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [proEmail]);

  const setProEmail = useCallback((email: string) => {
    const normalized = email.toLowerCase().trim();
    setProEmailState(normalized);
    try {
      localStorage.setItem(STORAGE_KEY, normalized);
      // Clear cached verification so it re-verifies
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  /**
   * @deprecated Use setProEmail. This calls verify-subscription to resolve the email.
   */
  const setSubscriptionId = useCallback((id: string) => {
    // Call verify-subscription to get the email, then store it
    fetch('/api/paypal/verify-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          setProEmail(data.email);
        }
      })
      .catch(() => {
        // Fallback: store nothing if verification fails
      });
  }, [setProEmail]);

  const clearSubscription = useCallback(() => {
    setProEmailState(null);
    setIsPro(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return (
    <ProStatusContext.Provider
      value={{
        isPro,
        isLoading,
        proEmail,
        setProEmail,
        subscriptionId: null,
        setSubscriptionId,
        clearSubscription,
      }}
    >
      {children}
    </ProStatusContext.Provider>
  );
}

export function useProStatus() {
  return useContext(ProStatusContext);
}
