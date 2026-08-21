import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export function CalendlyModal({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const loadCalendlyScript = () => {
      if (window.Calendly) {
        return; // Script already loaded
      }

      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
      };
      document.head.appendChild(script);
    };

    loadCalendlyScript();
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open && contentRef.current && window.Calendly) {
      // Clear any existing content
      contentRef.current.innerHTML = "";
      
      // Create the widget div
      const widgetDiv = document.createElement("div");
      widgetDiv.className = "calendly-inline-widget";
      widgetDiv.style.minWidth = "320px";
      widgetDiv.style.height = "700px";
      widgetDiv.setAttribute("data-url", "https://calendly.com/aditya-u0309/30min");
      
      contentRef.current.appendChild(widgetDiv);
      
      // Initialize the widget
      window.Calendly?.initInlineWidget({
        url: "https://calendly.com/aditya-u0309/30min",
        parentElement: contentRef.current,
      });
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 border-0">
        <div ref={contentRef} className="w-full" />
      </DialogContent>
    </Dialog>
  );
}
