# Rebuild and polish the Recify site in this project

## Summary

Since the Recify project is not accessible in this workspace, I will rebuild the full site from the public site reference, preserving the exact color palette, fonts, copy, and page structure. Then I will apply a structural and spacing polish pass so it reads as a cohesive, premium B2B brand site with no unfinished-looking empty space.

## Scope

- Recreate all 11 requested routes:
  - `/` (Home)
  - `/system`
  - `/services`
  - `/industries`
  - `/pricing`
  - `/results`
  - `/about`
  - `/faq`
  - `/contact`
  - `/start`
  - `/security`
- Preserve existing copy, color palette (warm cream, deep ink, muted teal), and typography (Archivo display, Poppins body).
- Keep the existing rounded-card aesthetic and pill-shaped navigation/CTAs.
- Do not add a backend; the contact and start forms are presentational.

## Technical approach

1. **Design tokens and assets**
   - Update `src/styles.css` with the Recify oklch color tokens, font stacks, and radius values extracted from the live site.
   - Add Google Fonts link for Archivo + Poppins to `src/routes/__root.tsx`.
   - Download the Recify logo and favicon into `public/` and point `__root.tsx` at them.

2. **Shared layout components**
   - `Header` — floating pill navigation with Recify logo, page links, and "Free AR health check" CTA.
   - `Footer` — minimal closing section with the recurring tagline and essential links.
   - `SectionHeader` — kicker + large display headline with primary-colored word and underline accent.
   - `SectionContainer` — consistent max-width (`max-w-7xl`) and horizontal padding.
   - Reusable cards: `FeatureCard`, `PricingCard`, `ProcessCard`, `IndustryCard`, `ResultCard`, `SecurityCard`, `AccordionItem`.
   - Buttons: primary pill and secondary outline with consistent arrow icon treatment.

3. **Page implementation**
   - Each route is a leaf with its own `head()` metadata.
   - Compose each page from the shared section library:
     - Home: hero, problem statement, three-function cards, AI/human split, traditional vs Recify model, four-step process, industries, ideal fit, free AR health check, outcomes, pricing tiers, security teaser, FAQ preview, closing CTA.
     - System: hero, four-step process, AI/human split, traditional vs Recify, closing CTA.
     - Services: hero, three-function cards, closing CTA.
     - Industries: hero, three industry cards.
     - Pricing: hero, three pricing tiers, pre-tier notes.
     - Results: hero, four outcome cards, four-step process, closing CTA.
     - About: hero, mission statement, three value cards, closing CTA.
     - FAQ: hero, accordion list.
     - Contact: hero, contact form card, "What we'll cover" dark card.
     - Start: hero, multi-step fit questionnaire (presentational).
     - Security: hero, security commitment grid.

4. **Polish pass**
   - Apply a single spacing scale (e.g., `py-20` to `py-24` between sections) and remove any gaps larger than one full empty viewport.
   - Align all section headers to the same max-width and center them consistently.
   - Equalize card heights within each grid and ensure they never overflow on mobile.
   - Keep headline sizes in a consistent hierarchy: hero H1, section H2, card H3.
   - Standardize all CTAs, kicker labels, and body text widths.
   - Make the floating header responsive; on mobile collapse into a sheet or compact row.
   - Verify no relative/placeholder URLs remain and all internal `<Link>` routes exist.

5. **Verification**
   - Run `bun run build` to confirm type and route errors are resolved.
   - Preview the site locally and compare screenshots to the reference for layout, spacing, and alignment.
   - Run a quick responsive check at mobile and desktop widths.

## Deliverables

- Updated `src/styles.css` with Recify tokens.
- New/updated `src/routes/__root.tsx` with fonts, favicon, and shared layout.
- New `src/components/` shared components.
- New route files for all 11 pages.
- Route-specific `head()` metadata.
- A published-ready, polished Recify site in this project.
