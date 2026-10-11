"use client";

import { useEffect, useState } from "react";
import GoogleAnalyticsTracker from "@/components/analytics/GoogleAnalytics";
import SoftAdBlockMessage from "@/components/ads/SoftAdBlockMessage";
import AdBlockWall from "@/components/ads/AdBlockWall";
import FloatingChatWidget from "@/components/features/FloatingChatWidget";
import ExitIntentPopup from "@/components/lead-capture/ExitIntentPopup";
import FloatingBottomBar from "@/components/lead-capture/FloatingBottomBar";
import { LeadCaptureProvider } from "@/components/lead-capture/LeadCaptureContext";
import CookieConsent from "@/components/ui/CookieConsent";
import BotpressLoader from "@/components/ui/BotpressLoader";

interface ClientEnhancementsProps {
  botConfigUrl?: string;
}

export default function ClientEnhancements({ botConfigUrl }: ClientEnhancementsProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEnabled(true);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <GoogleAnalyticsTracker />
      <SoftAdBlockMessage />
      <AdBlockWall />
      {!botConfigUrl && <FloatingChatWidget />}
      <LeadCaptureProvider>
        <ExitIntentPopup />
        <FloatingBottomBar />
      </LeadCaptureProvider>
      <CookieConsent />
      <BotpressLoader botConfigUrl={botConfigUrl} />
    </>
  );
}
