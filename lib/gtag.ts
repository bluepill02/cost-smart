export const GA_TRACKING_ID = "G-HF2NW9CQRJ";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Log page views
export const pageview = (url: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
};

// Log specific events
export const trackEvent = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
