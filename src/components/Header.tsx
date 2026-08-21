import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { CalendlyModal } from "./CalendlyModal";

const navLinks = [
  { to: "/how-it-works", label: "How It Works" },
  { to: "/services", label: "Services" },
  { to: "/results", label: "Results" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-4 z-50 px-4 md:px-6">
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full border bg-card/90 px-3 py-2 pl-5 shadow-sm backdrop-blur-md md:flex md:justify-between">
        <Link to="/" className="min-w-0 shrink-0">
          <Logo hideMark />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`kicker px-3 py-2 transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <CalendlyModal>
            <button className="hidden rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 lg:inline-flex">
              Book a call
            </button>
          </CalendlyModal>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-9 w-9 place-items-center rounded-full text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border bg-card p-4 shadow-sm md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`kicker rounded-lg px-3 py-3 transition-colors hover:bg-muted ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <CalendlyModal>
              <button
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-primary-foreground w-full"
              >
                Book a call
              </button>
            </CalendlyModal>
          </div>
        </div>
      )}
    </header>
  );
}
