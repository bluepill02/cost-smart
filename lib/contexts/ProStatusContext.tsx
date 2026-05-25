"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface ProStatusContextValue {
  isPro: boolean;
  isLoading: boolean;
  subscriptionId: string | null;
  setSubscriptionId: (id: string) => void;
  clearSubscription: () => void;
}

const ProStatusContext = createContext<ProStatusContextValue>({
  isPro: false,
  isLoading: true,
  subscriptionId: null,
  setSubscriptionId: () => {},
  clearSubscription: () => {},
});

const STORAGE_KEY = 'costsmart_subscription_id';
const SESSION_KEY = 'costsmart_pro_verified';
const REVALIDATE_MS = 30 * 60 * 1000; // 30 minutes

interface CachedVerification {
  isPro: boolean;
  timestamp: number;
}

export function ProStatusProvider({ children }: { children: ReactNode }) {
  const [subscriptionId, setSubscriptionIdState] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load subscriptionId from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSubscriptionIdState(stored);
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  }, []);

  // Verify subscription when subscriptionId changes
  useEffect(() => {
    if (!subscriptionId) {
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

    // Verify with server
    setIsLoading(true);
    fetch('/api/paypal/verify-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        const active = data.status === 'ACTIVE';
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
        // On network error, don't revoke Pro status if previously verified
        setIsPro(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [subscriptionId]);

  const setSubscriptionId = useCallback((id: string) => {
    setSubscriptionIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
      // Clear cached verification so it re-verifies
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const clearSubscription = useCallback(() => {
    setSubscriptionIdState(null);
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
      value={{ isPro, isLoading, subscriptionId, setSubscriptionId, clearSubscription }}
    >
      {children}
    </ProStatusContext.Provider>
  );
}

export function useProStatus() {
  return useContext(ProStatusContext);
}
