import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function CalendlyModal({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const loadCalendlyScript = () => {
      if (window.Calendly) {
        return; // Script already loaded
      }

      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    };

    loadCalendlyScript();
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/aditya-u0309/30min",
      });
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
    </Dialog>
  );
}
