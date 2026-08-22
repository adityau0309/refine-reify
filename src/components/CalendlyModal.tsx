import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/aditya-u0309/30min";

function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.Calendly) {
      resolve();
      return;
    }
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export function openCalendly(): void {
  loadCalendlyScript().then(() => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  });
}

export function useCalendlyScript() {
  useEffect(() => {
    loadCalendlyScript();
  }, []);
}
