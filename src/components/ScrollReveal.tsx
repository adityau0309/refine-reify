import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Adds a premium, subtle scroll-reveal to every section (and its immediate
 * content blocks) across the site. Purely presentational.
 */
export function ScrollReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = new Set<Element>();
    document.querySelectorAll("main section").forEach((section) => {
      const kids = Array.from(section.children).flatMap((child) =>
        child.classList.contains("mx-auto") ? Array.from(child.children) : [child]
      );
      const list = kids.length > 1 ? kids : [section];
      list.forEach((el, i) => {
        el.classList.add("reveal");
        (el as HTMLElement).style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
        targets.add(el);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
