"use client";

import { useEffect } from "react";

const CONSENT_KEY = "costsmart-cookie-consent";
const CONSENT_ACCEPTED_EVENT = "costsmart-consent-accepted";
const BOTPRESS_INJECT_URL = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";

declare global {
  interface Window {
    __costsmartBotpressLoaded?: boolean;
  }
}

interface BotpressLoaderProps {
  botConfigUrl?: string;
}

function appendScript(src: string, id: string, onLoad?: () => void) {
  if (document.getElementById(id)) {
    onLoad?.();
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  if (onLoad) {
    script.addEventListener("load", onLoad, { once: true });
  }
  document.body.appendChild(script);
}

export default function BotpressLoader({ botConfigUrl }: BotpressLoaderProps) {
  useEffect(() => {
    if (!botConfigUrl) return;

    const loadBotpress = () => {
      if (window.__costsmartBotpressLoaded) return;
      if (localStorage.getItem(CONSENT_KEY) !== "accepted") return;

      window.__costsmartBotpressLoaded = true;
      appendScript(BOTPRESS_INJECT_URL, "costsmart-botpress-inject", () => {
        appendScript(botConfigUrl, "costsmart-botpress-config");
      });
    };

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", loadBotpress, { once: true });
    } else {
      loadBotpress();
    }

    window.addEventListener(CONSENT_ACCEPTED_EVENT, loadBotpress);
    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, loadBotpress);
      window.removeEventListener("DOMContentLoaded", loadBotpress);
    };
  }, [botConfigUrl]);

  return null;
}
