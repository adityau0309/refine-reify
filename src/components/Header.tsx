import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { openCalendly, useCalendlyScript } from "./CalendlyModal";

const navLinks = [
  { to: "/how-it-works", label: "How It Works" },
  { to: "/results", label: "Results" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const serviceLinks = [
  ["01", "Collect"],
  ["02", "Resolve"],
  ["03", "Apply"],
  ["04", "Protect"],
  ["05", "Escalate"],
  ["06", "Pay"],
  ["07", "See"],
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useCalendlyScript();

  return (
    <header className="sticky top-4 z-50 px-4 md:px-6">
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full border bg-card/90 px-3 py-2 pl-5 shadow-sm backdrop-blur-md md:flex md:justify-between">
        <Link to="/" className="min-w-0 shrink-0">
          <Logo hideMark />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.slice(0, 1).map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`kicker px-3 py-2 transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`kicker inline-flex items-center gap-1 px-3 py-2 transition-colors hover:text-primary ${pathname === "/services" ? "text-primary" : "text-muted-foreground"}`}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
            >
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-2xl border bg-card p-2 shadow-xl">
                {serviceLinks.map(([number, name]) => (
                  <Link
                    key={name}
                    to="/services"
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                  >
                    <span className="display-heading text-sm text-primary">{number}</span>
                    <span className="font-display text-sm font-bold">{name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`kicker px-3 py-2 transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={openCalendly}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 lg:inline-flex"
          >
            Book a call
          </button>
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
            <Link
              to="/how-it-works"
              onClick={() => setMobileOpen(false)}
              className={`kicker rounded-lg px-3 py-3 transition-colors hover:bg-muted ${pathname === "/how-it-works" ? "text-primary" : "text-muted-foreground"}`}
            >
              How It Works
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileOpen(false)}
              className={`kicker rounded-lg px-3 py-3 transition-colors hover:bg-muted ${pathname === "/services" ? "text-primary" : "text-muted-foreground"}`}
            >
              Services
            </Link>
            <div className="ml-3 border-l border-border pl-3">
              {serviceLinks.map(([number, name]) => (
                <Link
                  key={name}
                  to="/services"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  <span className="text-xs font-bold text-primary">{number}</span>
                  <span>{name}</span>
                </Link>
              ))}
            </div>
            {navLinks.slice(1).map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`kicker rounded-lg px-3 py-3 transition-colors hover:bg-muted ${isActive ? "text-primary" : "text-muted-foreground"}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openCalendly();
              }}
              className="mt-2 w-full rounded-full bg-primary px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-primary-foreground"
            >
              Book a call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
