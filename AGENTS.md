# AGENTS.md — The Share Community Website

> Instructions for AI coding agents building the official website of **The Share Community**, a charitable community organisation.
> Read this whole file before writing any code. Follow it exactly. Where it says **MUST**, there is no discretion.

---

## 1. Project Summary

| Item | Detail |
|---|---|
| Organisation | The Share Community |
| Tagline | **Sharing Hope. Changing Lives.** |
| Type | Charity / community organisation website (non-profit, trust-led) |
| Founder | Late Pastor Vijay Kumar Mamuduri |
| CEO | Aaron Jeshurun Mamuduri |
| Goal | Build trust, tell the story, explain the programmes, and convert visitors into **donors, volunteers and partners** |
| Look & feel | Warm, hopeful community site. Attractive colour combination. **Scroll-driven animated storytelling.** |
| Language | **British English** (programmes, whilst, realise, organisation). Never convert to American spelling. |

### Audience
1. Potential donors and supporters
2. Volunteers (time, knowledge, skills)
3. Organisations, businesses, professionals and community groups seeking partnership
4. Families and communities who may want to learn about the support available

### Emotional Brief
The site must feel **compassionate, dignified, trustworthy, warm and hopeful**. It must NOT feel corporate, cold, flashy, guilt-tripping or exploitative of poverty. Treat every person described with dignity and respect.

---

## 2. Tech Stack (MUST use unless the owner says otherwise)

- **Framework:** Next.js (App Router, latest stable) + TypeScript
- **Styling:** Tailwind CSS with design tokens defined as CSS variables (see §4)
- **Scroll animation:** GSAP + ScrollTrigger (primary) and **Lenis** for smooth scrolling
- **Small UI transitions:** Framer Motion (`motion`) is allowed for hover, menu and modal transitions only. Do not mix it with GSAP on the same element.
- **Icons:** `lucide-react`
- **Fonts:** `next/font` (self-hosted), see §4.2
- **Forms:** React Hook Form + Zod validation, submitted to a Next.js route handler (`/api/contact`, `/api/volunteer`, `/api/partner`) that sends email (Resend or Nodemailer via env vars)
- **Images:** `next/image`, WebP/AVIF, lazy loaded below the fold
- **Hosting target:** Vercel (static-first; use SSG wherever possible)

Do not add heavy dependencies (no jQuery, no Bootstrap, no full UI kits, no 3D/WebGL libraries).

---

## 3. Site Map & Page Content

Content below comes from the owner's approved document. **Use the copy verbatim.** Do not rewrite, embellish, shorten or "improve" it. You may only split it across sections for layout.

### 3.1 Navigation (sticky header)
`Home · About · Programmes · Gallery · Contact` plus a prominent **Donate** button (accent colour) in the header on every page. Mobile: full-screen slide-in menu. Header is transparent on the hero and becomes a blurred cream/white bar after scrolling ~80px, with a thin scroll-progress bar beneath it.

### 3.2 Pages

| Route | Purpose |
|---|---|
| `/` | Home |
| `/about` | About Us (story, founder, CEO, vision, mission, values) |
| `/programmes` | Our Programmes |
| `/gallery` | Gallery (see §3.6 — placeholder-ready) |
| `/donate` | Donate |
| `/volunteer` | Become a Volunteer |
| `/partner` | Partner With Us |
| `/contact` | Contact + message form |

### 3.3 HOME (`/`) — section order

1. **Hero**
   - Headline: **Together, We Can Create Lasting Change**
   - Sub-headline: Empowering People. Strengthening Communities. Creating Brighter Futures.
   - Tagline: **Sharing Hope. Changing Lives.**
   - Intro: "The Share Community is dedicated to improving lives through compassion, opportunity and meaningful action."
   - CTAs: **Donate Now** (primary), **Become a Volunteer** (secondary)
2. **Belief statement** — "We believe that every individual deserves to be treated with dignity, supported through times of difficulty and given the opportunity to build a brighter future." followed by the "Through practical assistance, community programmes and meaningful partnerships…" paragraph.
3. **Welcome to The Share Community** — the welcome copy (compassion → action; individuals, children, families and communities; the education / healthcare and wellbeing / food and essential assistance / children's welfare / community development / livelihood initiatives sentence).
4. **What We Do** — 7 cards: Education Support · Healthcare & Wellbeing · Food & Essential Assistance · Children's Welfare · Community Development · Livelihood & Skills Development · Emergency & Disaster Relief. Each uses its own description from the document.
5. **Our Vision** and **Our Mission** (Home-page wording — see §9, Open Issue 1)
6. **Be Part of the Change** — "Every contribution, partnership and act of service has the potential to make a meaningful difference. Together, we can reach more people, create more opportunities and build stronger communities."
7. **Gallery teaser** → link to `/gallery`
8. **Make a Difference Today** — three CTA cards: Donate / Volunteer / Partner With Us
9. **Contact strip** and **Footer**

### 3.4 ABOUT (`/about`)
1. Title: **About The Share Community** — *A Legacy of Compassion. A Future of Hope.*
2. Intro paragraphs ("established upon a heartfelt commitment…" and "Our story is founded upon compassion…")
3. **Our Story** — the Late Pastor Vijay Kumar Mamuduri → his passing → Aaron Jeshurun Mamuduri as CEO → ambition for the future. Build this as a **vertical scroll timeline** (see §6).
4. **Our Founder** — Late Pastor Vijay Kumar Mamuduri, Founder, with the founder copy. Use a respectful portrait placeholder (§7).
5. **Chief Executive Officer** — Aaron Jeshurun Mamuduri, CEO, with the CEO copy. Portrait placeholder.
6. **Our Vision** and **Our Mission** (About-page wording)
7. **Our Values** — 8 cards: Compassion · Integrity · Respect · Transparency · Excellence · Service · Partnership · Hope, each with its one-line description.

### 3.5 PROGRAMMES (`/programmes`)
Title: **Our Programmes** — *Creating Opportunities. Strengthening Communities. Transforming Lives.* Followed by the two intro paragraphs.

Six programme blocks, each with a heading, a sub-line and the full body copy. Alternate left/right layout on desktop:

1. **Education for All** — *Opening Doors to Brighter Futures*
2. **Healthcare & Wellbeing** — *Supporting Health. Preserving Dignity.*
3. **Food & Essential Assistance** — *Supporting People Through Difficult Times*
4. **Children's Welfare** — *Helping Every Child Flourish*
5. **Community Development** — *Building Stronger Communities Together*
6. **Livelihood & Skills Development** — *Creating Opportunity. Building Independence.*

Then **Future Programmes**: show as a row/marquee of pill tags — Skills & Vocational Training · Women's Empowerment · Youth Development · Elderly Support · Community Health · Employment & Livelihoods · Emergency & Disaster Relief · Sustainable Community Projects — followed by the line "Programmes will be developed according to genuine community needs, available resources and our capacity to deliver them responsibly and effectively."

### 3.6 GALLERY (`/gallery`)
Copy: **Our Gallery** — *See Our Work in Action.* "Our gallery will share genuine photographs and stories from our charitable activities, projects and community initiatives. It will enable supporters to see the people, communities and stories at the heart of our work."

- The owner has **not supplied photos yet**. Build a responsive masonry grid driven by a single data file (`/data/gallery.ts`) so real images can be dropped into `/public/gallery/` and listed with a caption.
- With zero images, show a tasteful "Photographs coming soon" empty state. **Never fill the gallery with stock photos presented as the organisation's work.**
- Include a lightbox with keyboard support (Esc, arrow keys) and focus trapping.

### 3.7 DONATE / VOLUNTEER / PARTNER
- **Donate** — "Support our charitable programmes and community initiatives." Button text: **DONATE NOW**.
- **Volunteer** — "Give your time, knowledge, experience or skills to help make a difference." Button: **BECOME A VOLUNTEER**. Page has a form (name, email, phone, skills/area of interest, message).
- **Partner With Us** — "We welcome partnerships with organisations, businesses, professionals and community groups that share our commitment to positive change." Button: **PARTNER WITH US**. Page has a form (organisation, contact name, email, phone, message).

**Payments:** no payment gateway or bank details have been provided. Build the Donate page with a clearly marked integration point (`<DonateWidget />`) driven by env vars (e.g. `NEXT_PUBLIC_DONATE_URL`). If unset, the page shows the donation copy and a "Contact us to donate" button linking to `/contact`. **Do not invent bank account numbers, UPI IDs, charity registration numbers or payment links.**

### 3.8 CONTACT (`/contact`)
Copy: "We welcome enquiries from supporters, volunteers, organisations and potential partners."
Details (**use these placeholders exactly until the owner supplies real values; keep them in one config file `/config/site.ts`**):
- Email: `[Official Email]`
- Telephone: `[Telephone Number]`
- Address: `[Official Address]`

Form button: **SEND US A MESSAGE**. Fields: name, email, phone (optional), subject, message. Include honeypot spam field, server-side Zod validation, success and error states.

### 3.9 FOOTER (every page)
THE SHARE COMMUNITY · *Sharing Hope. Changing Lives.* · quick links · contact details from config · `© 2026 The Share Community. All Rights Reserved.`

---

## 4. Design System

### 4.1 Colour Palette — "Sunrise Hope"
Warm, hopeful and trustworthy: a deep teal for trust, sunrise amber for hope, coral for warmth, on a soft cream canvas. Define as CSS variables and Tailwind theme tokens. **Never hard-code hex values in components.**

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0B2E36` | Primary text, dark sections |
| `--teal-900` | `#0F4C5C` | Brand primary, headers, dark backgrounds |
| `--teal-600` | `#1B7F8C` | Links, secondary surfaces |
| `--teal-100` | `#D6EEF0` | Soft tints, card backgrounds |
| `--sun-500` | `#F5A524` | **Hope accent**: primary CTA fill, highlights |
| `--sun-200` | `#FDE3A8` | Soft glow, highlights |
| `--coral-500` | `#E8644F` | Warm accent (Donate hover, small emphasis) |
| `--leaf-500` | `#3BA776` | Growth accent (Livelihood / Community icons) |
| `--cream` | `#FFF8EC` | Default page background |
| `--white` | `#FFFFFF` | Cards |

Rules:
- Page background is `--cream`, not pure white. Alternate sections between cream, white, `--teal-100` and full-bleed `--teal-900`.
- Primary button: `--sun-500` background with `--ink` text (not white — white on amber fails contrast).
- Use soft gradients (teal → deeper teal; amber → coral glow) for hero and CTA bands. No more than two gradients per viewport.
- Each programme gets a signature accent from the palette (e.g. Education = sun, Healthcare = coral, Food = leaf, Children = sun-200/coral, Community = teal-600, Livelihood = leaf) used for icon tiles and animated underline.
- **WCAG AA contrast (4.5:1 body text, 3:1 large text/UI) is mandatory.** Verify before shipping.
- Dark-mode toggle is NOT required. Do not build one.

### 4.2 Typography
- Headings: a warm, humanist serif such as **Fraunces** or **Playfair Display** (via `next/font/google`).
- Body/UI: a clean sans such as **Inter** or **DM Sans**.
- Fluid type scale using `clamp()`. Hero H1 about `clamp(2.5rem, 6vw, 5rem)`. Body 17–18px, line-height 1.7, max line length ~70ch.
- Use italic serif for the sub-lines (e.g. *Opening Doors to Brighter Futures*).

### 4.3 Shape, Space and Imagery
- Generous whitespace; section padding `clamp(4rem, 10vw, 8rem)`.
- Rounded cards (`rounded-3xl`), soft layered shadows, organic blob and wave dividers between sections (inline SVG, colour-matched to adjacent sections).
- Decorative motifs: hands, sprouts/leaves, sunrise rays, linked circles ("community"). Draw as lightweight inline SVG; keep them subtle and tinted from the palette.
- Photography (when supplied) is warm-toned, with faces shown respectfully. No pity imagery, no dramatic desaturation.

### 4.4 Components to build (reusable)
`Header`, `Footer`, `Hero`, `SectionHeading`, `Button` (primary/secondary/ghost), `ProgrammeCard`, `ValueCard`, `TimelineItem`, `PersonCard`, `CTACard`, `PillTag`, `GalleryGrid`, `Lightbox`, `ScrollProgress`, `Reveal` (generic scroll-reveal wrapper), `FormField`, `WaveDivider`.

---

## 5. Animation Requirements — Scroll-Based

The signature feature is that **the site tells its story as the visitor scrolls**. Every page must feel alive while staying calm and respectful — gentle and purposeful, never gimmicky.

### 5.1 Global setup
- Initialise **Lenis** smooth scroll once in a client provider and sync it with GSAP: `lenis.on('scroll', ScrollTrigger.update)` and drive Lenis from `gsap.ticker`.
- Register ScrollTrigger once. Clean up triggers on unmount (`gsap.context()` + `ctx.revert()`).
- Use `will-change` sparingly. Animate **only `transform` and `opacity`** (plus `clip-path` for reveals). Never animate `top/left/width/height`.
- Timing: ease `power3.out`, durations 0.6–1.2s, stagger 0.08–0.15s.
- Global scroll-progress bar under the header (amber on teal).

### 5.2 Required effects

| Where | Effect |
|---|---|
| **Hero** | Headline lines reveal word-by-word (masked slide-up). Soft sunrise gradient + SVG rays slowly rotate/scale. Background shapes move with **parallax** at different speeds. A "scroll" cue pulses at the bottom. |
| **Section headings** | Fade-up with an animated underline drawing in under the keyword. |
| **Belief / Welcome text** | Paragraph text **colour-fills word by word as the user scrolls** (grey → ink), scrubbed to scroll position. |
| **What We Do cards** | Staggered rise-in; hover lifts, icon tile rotates slightly; on desktop, a **horizontal pinned scroll** or a staggered grid (pick one; fall back to the grid on mobile). |
| **Vision / Mission** | Full-bleed teal section; two large cards slide in from opposite sides; background gradient shifts as it passes. |
| **Numbers/Counters** | **Do not add any statistics counters.** No figures have been supplied. |
| **About — Our Story** | Vertical timeline: a line **draws itself** (SVG stroke scrubbed to scroll) while each story step fades in beside it (Founder's vision → legacy → CEO continues → future ambition). |
| **Founder / CEO** | Portrait frames reveal with a `clip-path` wipe; text staggers in. |
| **Values** | 8 cards pop in with a stagger; icons gently float on hover. |
| **Programmes page** | Each programme block alternates sides; image/illustration has a subtle parallax; the accent colour band expands behind it. A sticky side index highlights the active programme (scroll-spy) on desktop. |
| **Future Programmes pills** | Infinite slow marquee, paused on hover and under reduced motion. |
| **Gallery** | Images fade/scale in with stagger; lightbox open/close transitions. |
| **CTA band (Donate / Volunteer / Partner)** | Cards rise with stagger; Donate card has a gentle pulsing amber glow (static under reduced motion). |
| **Section transitions** | Animated wave/blob dividers; background colour blends smoothly between sections. |
| **Footer** | Fade-up; tagline reveals as it enters. |

### 5.3 Rules
- **`prefers-reduced-motion: reduce` MUST be honoured.** When set: disable Lenis, parallax, marquee, scrubbed text fills and pinned sections; show content in its final state with at most a simple opacity fade.
- Content must be fully readable and navigable **without JavaScript animation** (progressive enhancement). Never hide content permanently with `opacity: 0` in CSS unless JS is confirmed running.
- No scroll-jacking that blocks users from scrolling past a section. Pinned sections must be short (≤ ~1.5 viewport heights).
- Avoid layout shift: reserve space for animated elements.
- Target 60fps on mid-range Android phones. Test on throttled CPU.
- Keep animation tasteful: one primary effect per section, not five.

---

## 6. Responsive & Accessibility

- **Mobile-first.** Breakpoints: 360, 640, 768, 1024, 1280, 1536. Test at 360px width. No horizontal scroll at any size.
- Touch targets ≥ 44×44px.
- Semantic HTML: one `<h1>` per page, ordered headings, `<header>`, `<main>`, `<nav>`, `<footer>`, `<section aria-labelledby>`.
- Keyboard: visible focus rings (amber outline on dark, teal on light), skip-to-content link, accessible mobile menu with focus trap and Esc to close.
- All images have meaningful `alt`; decorative SVGs get `aria-hidden="true"`.
- Forms: visible labels, inline errors announced via `aria-live`, no placeholder-only labels.
- Target **Lighthouse ≥ 95** for Performance, Accessibility, Best Practices and SEO on mobile.

---

## 7. Images & Placeholders

- No photographs, logo or brand assets have been provided. Use:
  - A **temporary text wordmark** ("THE SHARE COMMUNITY" in the heading serif, with a small sunrise/hands SVG mark). Isolate it in `components/Logo.tsx` so it is trivially replaceable.
  - Illustrative SVG scenes (not photos of real-looking people) for programmes.
  - Clearly labelled portrait placeholders for the Founder and CEO (`/public/team/founder.jpg`, `/public/team/ceo.jpg` expected paths; show a styled initials avatar if the file is missing).
- **Never** use stock photos of people and imply they are the organisation's beneficiaries, volunteers or staff.
- Provide a short `ASSETS_NEEDED.md` listing everything the owner must supply (logo, founder and CEO photos, gallery photos, contact details, donation method, charity registration number, social links).

---

## 8. SEO & Metadata

- Unique `<title>` and meta description per page (e.g. `The Share Community — Sharing Hope. Changing Lives.`).
- Open Graph and Twitter card tags; generate an OG image (teal/amber branded) with `next/og`.
- JSON-LD: `Organization` (or `NGO`) schema on the home page, with `founder`/`employee` data where appropriate. Leave out any property the owner has not supplied (no invented address, phone or registration numbers).
- `sitemap.xml`, `robots.txt`, canonical URLs, favicon set.
- Clean, readable URLs as in §3.2.

---

## 9. Content Integrity Rules (IMPORTANT)

This is a charity website. Trust is everything.

1. **No fabricated content.** No invented statistics ("10,000 children helped"), testimonials, beneficiary stories, partner logos, awards, accreditations, locations, dates or donation figures.
2. **No fabricated legal or financial details.** No charity registration number, tax-exemption claims, bank details or payment links unless supplied.
3. **Use the supplied copy verbatim.** If a section needs extra copy (e.g. a form's helper text, error messages, alt text), keep it short, neutral and clearly functional.
4. **Preserve tone:** the document is deliberately modest ("We seek to…", "We aim to…", "Where resources and circumstances allow…"). Do not upgrade these into guarantees or claims of achievement.
5. **Respect the memorial context.** The founder is referred to as "Late Pastor Vijay Kumar Mamuduri". Keep this form of address everywhere. Treat his story with dignity and warmth.
6. The gallery is explicitly for **genuine** photographs only.

### Open Issues (flag to the owner; do not silently resolve)

1. **Mission wording differs between pages.** Home: "To serve individuals and communities with compassion and integrity by providing practical support, creating opportunities and developing sustainable programmes that improve lives and inspire hope." About: "To improve lives through compassionate and responsible action by advancing education, supporting healthcare and wellbeing, alleviating hardship, promoting children's welfare, developing livelihoods and strengthening communities." For now, **use each version on its own page exactly as written**, and store both in `/content/` with a `// TODO(owner): confirm single official mission statement` comment.
2. Contact details are placeholders (`[Official Email]`, `[Telephone Number]`, `[Official Address]`).
3. No donation method, logo, photographs, social media links or charity registration details supplied.
4. The document has no separate Donate, Volunteer, Partner or Contact page copy beyond the short blurbs in §3.7–3.8. Keep those pages simple and do not pad them.

---

## 10. Project Structure

```
/app
  layout.tsx            # fonts, providers (Lenis, GSAP), header/footer
  page.tsx              # Home
  about/page.tsx
  programmes/page.tsx
  gallery/page.tsx
  donate/page.tsx
  volunteer/page.tsx
  partner/page.tsx
  contact/page.tsx
  api/{contact,volunteer,partner}/route.ts
  sitemap.ts  robots.ts  opengraph-image.tsx
/components
  layout/  sections/  ui/  animation/   # Reveal, ScrollProgress, SmoothScroll, etc.
/content                # all supplied copy as typed data (verbatim)
/config/site.ts         # name, tagline, contact placeholders, nav, social links
/data/gallery.ts
/lib                    # gsap setup, zod schemas, mail helper
/public                 # gallery/, team/, icons
ASSETS_NEEDED.md
README.md
```

Keep all page copy in `/content` so the owner can edit text without touching components.

---

## 11. Coding Standards

- TypeScript strict mode; no `any`.
- Server Components by default; add `"use client"` only for animation, menus, forms and the lightbox.
- Small, single-purpose components; no file over ~250 lines.
- ESLint + Prettier configured; code must pass `next build` with zero warnings.
- Environment variables documented in `.env.example` (mail provider keys, `NEXT_PUBLIC_DONATE_URL`, `NEXT_PUBLIC_SITE_URL`). Never commit secrets.
- Sanitise and validate all form input server-side; rate-limit the form endpoints; use the honeypot field.
- No tracking or analytics cookies by default. If analytics is added later, use a privacy-friendly option and add a consent notice.

---

## 12. Workflow for the Agent

1. Scaffold the Next.js + TypeScript + Tailwind project.
2. Implement the design tokens (§4) and fonts, then the layout (header, footer, smooth scroll, progress bar).
3. Put all copy from §3 into `/content` **verbatim**.
4. Build pages in this order: Home → About → Programmes → Contact → Donate / Volunteer / Partner → Gallery.
5. Add the scroll animations from §5 section by section. Check each with reduced motion on and off.
6. Add forms, API routes, SEO and metadata.
7. Run through the checklist below. Fix everything before reporting done.
8. Report to the owner: what was built, the Open Issues in §9, and the `ASSETS_NEEDED.md` list.

### Definition of Done
- [ ] All 8 routes render and are linked correctly
- [ ] All copy matches the source document word for word (British spelling intact)
- [ ] Palette matches §4.1 and meets WCAG AA contrast
- [ ] Every required effect in §5.2 works; reduced motion fully respected
- [ ] No horizontal scroll at 360px; tested at 360 / 768 / 1280
- [ ] Keyboard-only navigation works, including menu and lightbox
- [ ] Lighthouse mobile ≥ 95 across all four categories
- [ ] Forms validate, submit and show success / error states
- [ ] No invented stats, testimonials, photos-as-fact, or legal / financial details
- [ ] `next build` passes with no errors or warnings
- [ ] `README.md` explains how to run, edit content, add gallery images and configure env vars

---

## 13. Out of Scope (do not build unless asked)

User accounts or login · CMS or admin dashboard · blog · e-commerce · multi-language switcher · dark mode · live chat · cookie-banner stack · fake donation processing.