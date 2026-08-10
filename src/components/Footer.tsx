import { Link } from "@tanstack/react-router";

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
      <div className="mx-auto mt-8 max-w-7xl flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
          recify.
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/security" className="hover:text-foreground">
            Security
          </Link>
          <Link to="/faq" className="hover:text-foreground">
            FAQ
          </Link>
          <Link to="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Recify. All rights reserved.</p>
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
