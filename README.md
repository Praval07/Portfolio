# Praval Saxena — Portfolio (v2: Editorial / White-Black-Gold Redesign)

This is a full visual redesign of the v1 "quiet luxury" build, rebuilt against
a reference mockup you provided (gradient hero wordmark, video banner,
numbered section rail, dark skills/experience/contact sections, FAQ,
testimonials, golden-yellow accent system). Same Next.js App Router codebase
and content architecture underneath — the design system and section set
changed, not the engineering foundation.

## ⚠️ Two uploads didn't come through

`portfolio_of_myself` and `New_folder` arrived as **empty files** — folder
uploads don't currently survive transfer in this environment. That means I
never saw your actual prior source code or the real Zeffir reference
screenshots. This redesign was built entirely from the one detailed mockup
image you pasted inline, which was thorough enough to work from directly. If
you have real Zeffir screenshots or existing code to compare against, **zip
them first** and upload the `.zip` — that will come through intact.

## Setup

```bash
pnpm install
pnpm dev       # http://localhost:3000
```

Same caveat as before: this was written without network access in the build
environment, so `pnpm install`/`pnpm build` have not been run here. Run them
as your first step locally.

## What changed from v1

- **Design tokens** (`app/globals.css`): palette flipped from paper/forest/copper
  to white/black/golden-yellow. Legacy token names (`--color-forest`,
  `--color-copper`) are kept as aliases pointing at gold values, so nothing
  else broke — but the *new* tokens (`--color-gold`, `--color-gold-soft`,
  `--color-gold-deep`) are what new components actually use.
- **Hero**: huge gradient wordmark ("PRAVAL SAXENA") + rounded video banner
  with overlay text and CTAs, replacing the editorial split hero.
- **Navbar**: floating pill nav, blurs on scroll, matches the reference.
- **New sections**, in the order shown on the homepage:
  `Hero → About → Skills (dark) → Projects → ExperienceTimeline (dark,
  horizontal) → FAQ → Testimonials → ResumeCTA → Contact (dark)`.
- **SectionRail** (`components/ui/SectionRail.tsx`): the numbered vertical
  labels ("01 — About Me", "02 — Skills", …) from the reference. Desktop-only
  by design — there's no clean way to keep that editorial detail without
  crowding content on mobile.
- Old v1-only section components (`EngineeringJourney`, `Philosophy`,
  `Experience`, `CaseStudies`) were **deleted**, not left dangling — the repo
  only contains what's actually in use.
- Case study detail pages (`/case-studies/[slug]`) were **not** redesigned
  visually — they inherit the new tokens automatically (same class names,
  new variable values), so they already look consistent. A 5th case study,
  **Rapid Revision Hub**, was added to match the new project list.

## What's still placeholder — same honesty as before

- `data/social.ts` — GitHub/LinkedIn/email are fake
- `data/projects.ts` — GitHub/demo links are empty strings (icons won't
  render until filled in — see `components/sections/Projects.tsx`)
- `data/testimonials.ts` — **entirely placeholder**, bracketed on purpose.
  Do not publish this section until you have real quotes, or delete the
  `<Testimonials />` line from `app/page.tsx`.
- `data/timeline.ts` — placeholder milestone dates/titles
- `data/experience.ts` — still used by `components/resume/ResumeViewer.tsx`,
  which isn't wired into a route yet
- **Hero video**: `components/sections/Hero.tsx` points at
  `/assets/hero-video.mp4`, which doesn't exist. Drop the real file there —
  autoplay/loop/mute/poster are already configured. Until then, your
  portrait shows as the poster image, so nothing looks broken.
- `public/resume.pdf` — still needs to be added
- Skill badges (`data/skillBadges.ts`) use colored monogram glyphs (e.g. "Py"
  for Python) instead of real brand logos — deliberate, to avoid bundling
  brand icon assets without a proper license/attribution pass. Swap in real
  logo SVGs later if you want exact brand marks.

## Manual QA checklist

Same as v1 — I still can't run Lighthouse/axe without a browser or network
in this environment:
- [ ] Keyboard pass across the new FAQ accordion (Enter/Space should toggle,
      focus ring visible)
- [ ] Confirm hero video actually autoplays muted on mobile Safari once the
      real file is added (iOS is strict about this — `muted` + `playsInline`
      are both already set, which is the standard fix)
- [ ] Reduced-motion check — `Reveal`-wrapped sections should render
      statically with animation disabled
- [ ] Contrast check on the gold-on-dark text (`text-gold-soft` on `bg-ink`)
      at small sizes — it's close to AA and worth a manual check with your
      final font weights

## Suggested next steps

1. Add the real hero video file
2. Fill in `data/projects.ts` GitHub/demo links
3. Replace or remove `data/testimonials.ts`
4. Add `public/resume.pdf`
5. `pnpm install && pnpm build`, fix anything version-related, deploy a preview
