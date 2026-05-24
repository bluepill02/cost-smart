"use client";

import { ProStatusProvider } from '@/lib/contexts/ProStatusContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProStatusProvider>
      {children}
    </ProStatusProvider>
  );
}
