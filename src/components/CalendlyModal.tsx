import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
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

export function CalendlyInline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadCalendlyScript().then(() => {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      // If the auto-init hasn't populated the widget yet (e.g. the script was
      // already loaded before this element mounted), initialize it explicitly.
      if (!containerRef.current.querySelector("iframe")) {
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: containerRef.current,
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget"
      data-url={CALENDLY_URL}
      aria-label="Schedule a call with Recify"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
