import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Instagram } from "lucide-react";
import logoAsset from "../assets/recify-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="section-padding px-4 md:px-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-foreground p-8 text-center text-background md:p-16">
        <p className="kicker mb-4 text-background/70">Ready to turn receivables into cash?</p>
        <h2 className="display-heading mx-auto max-w-3xl text-3xl md:text-5xl">
          From outstanding invoices to{" "}
          <span className="text-primary">outstanding outcomes.</span>
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/start"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get your free AR health check
            <ArrowRightIcon />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-background/10"
          >
            Book a call
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link to="/how-it-works" className="hover:text-foreground">
            How it works
          </Link>
          <Link to="/industries" className="hover:text-foreground">
            Industries
          </Link>
          <Link to="/about" className="hover:text-foreground">
            About
          </Link>
          <Link to="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <Link to="/faq" className="hover:text-foreground">
            FAQ
          </Link>
          <Link to="/security" className="hover:text-foreground">
            Security
          </Link>
          <Link to="/privacy-policy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-foreground">
            Terms
          </Link>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Recify logo"
              width={36}
              height={36}
              loading="lazy"
              className="h-9 w-9 shrink-0 rounded-lg object-contain"
            />
            <div className="flex flex-col items-start">
              <Link to="/" className="text-foreground">
                <Logo hideMark />
              </Link>
              <p className="text-xs">© {new Date().getFullYear()} Recify. All rights reserved.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              href="https://www.instagram.com/recify.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
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
