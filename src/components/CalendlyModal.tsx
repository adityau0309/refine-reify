import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/aditya-u0309/30min";
const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

function loadCalendlyCss(): void {
  const existing = document.querySelector(`link[href="${CALENDLY_CSS_HREF}"]`);
  if (existing) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = CALENDLY_CSS_HREF;
  document.head.appendChild(link);
}

function loadCalendlyScript(): Promise<void> {
  loadCalendlyCss();

  return new Promise((resolve) => {
    if (window.Calendly) {
      resolve();
      return;
    }
    const existing = document.querySelector(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`,
    ) as HTMLScriptElement | null;

    if (existing) {
      if (window.Calendly) {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => resolve());
      }
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
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
