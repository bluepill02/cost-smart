'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LeadCaptureContextValue {
  exitPopupVisible: boolean;
  setExitPopupVisible: (visible: boolean) => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextValue>({
  exitPopupVisible: false,
  setExitPopupVisible: () => {},
});

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [exitPopupVisible, setExitPopupVisible] = useState(false);
  return (
    <LeadCaptureContext.Provider value={{ exitPopupVisible, setExitPopupVisible }}>
      {children}
    </LeadCaptureContext.Provider>
  );
}

export function useLeadCaptureContext() {
  return useContext(LeadCaptureContext);
}
