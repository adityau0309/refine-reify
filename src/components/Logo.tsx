import { cn } from "../lib/utils";

/**
 * Recify brand mark: a minimal circular "cash-flow" glyph — an ascending
 * stroke closing an open ring, suggesting receivables coming full circle.
 */
export function LogoMark({ className }: { className?: string | undefined }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("h-7 w-7", className)}
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="13"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="2"
      />
      <path
        d="M6.5 21.5C8 12.5 14 8 25.5 8.5"
        stroke="var(--color-primary)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M19.5 6.2 26 8.6l-2.4 6.4"
        stroke="var(--color-primary)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  wordClassName,
}: {
  className?: string | undefined;
  markClassName?: string | undefined;
  wordClassName?: string | undefined;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={markClassName} />
      <span
        className={cn(
          "font-display text-lg font-extrabold lowercase tracking-tight md:text-xl",
          wordClassName
        )}
      >
        recify<span className="text-primary">.</span>
      </span>
    </span>
  );
}
