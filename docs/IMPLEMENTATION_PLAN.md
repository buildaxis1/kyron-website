# Website Redesign & Careers Page — Implementation Plan

Based on the project proposal (discussions with Jay and Nathaniel), design inspiration:
https://www.assorthealth.com/ (UX patterns only, not a copy).

## Codebase Architecture (Milestone 1 findings)

- **Framework**: Next.js (App Router, Turbopack) + TypeScript + Tailwind CSS
- **Homepage**: `src/app/page.tsx` composes section components from
  `src/app/_components/home/` (Hero, Testimonials, VoiceAIPanel, DashboardPreview,
  Offerings, Pipeline, carousels, InsuranceDenialCalculator)
- **Shared UI**: `src/app/_components/Common/` (SectionTitle, Breadcrumb),
  `src/app/_components/ui/` (orb, buttons, shadcn/ui)
- **Navigation**: `src/app/_components/Header/menuData.tsx`
- **Existing resources/blog**: `src/app/resources/blog` renders PDF-style resource
  cards from `src/app/resources/data/resource-data.ts` — not a real blog with
  article pages
- **Theming**: CSS-variable based tokens (`bg-card`, `text-foreground`,
  `text-muted-foreground`) with dark-mode support

## Implementation Plan

### Milestone 2 — Homepage updates
- New **Medical AI Receptionist** homepage section
  (AI phone receptionist, scheduling, patient communication, voice AI automation,
  workflow optimization, benefits for clinics/providers)
- New **Revenue Cycle Management AI** homepage section
  (voice AI calling payers: eligibility & benefits checks, prior authorization,
  claim status inquiries, denial reason clarification, appeal follow-ups)
- Placeholder demo-video slots for both products (recordings embedded later)
- Wire sections into `src/app/page.tsx`, preserve existing branding

### Milestone 3 — Careers page + Blog section
- `/careers`: mission, why join Kyron Medical, benefits & perks, open positions,
  hiring process, culture, application CTA
- `/blog`: listing page + `/blog/[slug]` detail pages, featured article,
  categories, SEO-friendly metadata
- Add both to header navigation and footer

### Milestone 4 — Test & polish
- Lint/build verification, responsive checks, fix issues, prep for demo

## Constraints
- No branding changes (logo, colors, identity preserved)
- Animations subtle & performance-friendly (scroll reveals, hover states)
- Fully responsive (desktop / tablet / mobile)
