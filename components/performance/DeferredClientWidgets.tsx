"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LeadCaptureProvider } from "@/components/lead-capture/LeadCaptureContext";

const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent"));
const BotpressLoader = dynamic(() => import("@/components/ui/BotpressLoader"));
const SoftAdBlockMessage = dynamic(() => import("@/components/ads/SoftAdBlockMessage"));
const AdBlockWall = dynamic(() => import("@/components/ads/AdBlockWall"));
const FloatingChatWidget = dynamic(() => import("@/components/features/FloatingChatWidget"));
const ExitIntentPopup = dynamic(() => import("@/components/lead-capture/ExitIntentPopup"));
const FloatingBottomBar = dynamic(() => import("@/components/lead-capture/FloatingBottomBar"));

type DeferredClientWidgetsProps = {
  botConfigUrl?: string;
};

export default function DeferredClientWidgets({ botConfigUrl }: DeferredClientWidgetsProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const enableWidgets = () => setIsReady(true);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(enableWidgets, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(enableWidgets, 1200);
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!isReady) return null;

  return (
    <>
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
