# Assets & Information Needed from the Organisation

This document lists the specific assets, configuration details, and official credentials required from **The Share Community** to transition from the current verified structure to complete public deployment.

---

## 1. Brand Assets & Logo
- **Official Logo**: High-resolution vector file (`.svg`) or transparent PNG (`.png`).
  - Expected location: `/public/logo.svg` or `/public/logo.png`.
  - Currently using: Accessible text wordmark in Fraunces serif with an inline SVG sunrise and hands motif in `components/ui/Logo.tsx`.
- **Favicon & App Icons**: High-res square icon for browser favicon and web manifests.

---

## 2. Leadership Photographs
Respectful, warm-toned portraits for the leadership cards on `/about`:
- **Late Pastor Vijay Kumar Mamuduri (Founder)**:
  - File path: `/public/team/founder.jpg`
  - Current placeholder: Styled monogram avatar (`VKM`) in a warm sunrise frame.
- **Aaron Jeshurun Mamuduri (Chief Executive Officer)**:
  - File path: `/public/team/ceo.jpg`
  - Current placeholder: Styled monogram avatar (`AJM`) in a warm sunrise frame.

---

## 3. Official Contact Details
Update `/config/site.ts` with genuine values replacing the current placeholders:
- **Email Address**: Replace `[Official Email]` with genuine contact address (e.g. `info@sharecommunity.org`).
- **Telephone Number**: Replace `[Telephone Number]` with genuine phone number.
- **Physical / Postal Address**: Replace `[Official Address]` with genuine organisation address.

---

## 4. Donation Method & Banking Integration
- **Donation Platform / Gateway URL**:
  - Configure environment variable `NEXT_PUBLIC_DONATE_URL` in `.env.local` or hosting provider settings (e.g. Stripe, JustGiving, Enthuse, PayPal Giving Fund, or direct bank transfer instruction page).
  - When unset, the site displays the donation description and directs supporters to the enquiry form.
- **Charity Registration Number / Legal Status** (if applicable):
  - When registered, provide the Charity Commission / Trust registration number to include in the footer and legal notice.

---

## 5. Gallery Photography
- **Authentic Project Photographs**:
  - Genuine photos of activities, community distributions, learning sessions, and workshops.
  - Drop files into `/public/gallery/` and declare them in `/data/gallery.ts` with descriptive captions.
  - *Note: As per charity integrity rules, no generic stock photos are included.*

---

## 6. Social Media Channels
Provide URLs to official social profiles to activate in `/config/site.ts`:
- Facebook
- Instagram
- YouTube / LinkedIn / X (Twitter)

---

## 7. Email Dispatch Configuration
To deliver form submissions from `/api/contact`, `/api/volunteer`, and `/api/partner`:
- **Resend API Key**: Set `RESEND_API_KEY` in `.env.local`.
- **Sender Address**: Set `EMAIL_FROM` (e.g., `The Share Community <noreply@yourdomain.org>`).
- **Recipient Address**: Set `EMAIL_TO` (e.g., `info@yourdomain.org`).
- In development without keys, all submissions log securely to server console without error.

---

## 8. Open Issues for Clarification
1. **Mission Statement Alignment**:
   - The Home page and About page currently feature two slight variations in wording as provided in the source document.
   - Home wording: *"To serve individuals and communities with compassion and integrity by providing practical support, creating opportunities and developing sustainable programmes that improve lives and inspire hope."*
   - About wording: *"To improve lives through compassionate and responsible action by advancing education, supporting healthcare and wellbeing, alleviating hardship, promoting children's welfare, developing livelihoods and strengthening communities."*
   - Both are preserved verbatim on their respective pages in `/content/home.ts` and `/content/about.ts`. Please confirm whether to standardise on one statement in the future.
