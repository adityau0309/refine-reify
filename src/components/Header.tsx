import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

const navLinks = [
  { to: "/system", label: "The System" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/pricing", label: "Pricing" },
  { to: "/results", label: "Results" },
  { to: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-4 z-50 px-4 md:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border bg-card/90 px-3 py-2 pl-5 shadow-sm backdrop-blur-md md:px-5 md:py-3">
        <Link to="/" className="shrink-0">
          <Logo />
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

        <div className="flex items-center gap-2">
          <Link
            to="/start"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 md:px-5 md:py-2.5"
          >
            Free AR health check
            <ArrowRightIcon />
          </Link>

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
          </div>
        </div>
      )}
    </header>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
