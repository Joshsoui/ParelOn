# /on — DJ Management & Bookings

A one-page, animation-driven landing site for a DJ management & booking agency. Built with
React, TypeScript, Tailwind CSS, Framer Motion and Lenis for smooth scrolling.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
npm run lint      # oxlint
```

## Customize before launch

- **Contact form** — by default the form opens a pre-filled `mailto:` to the address set in
  `src/components/sections/Contact.tsx` (`CONTACT_EMAIL`). To submit straight to an inbox or CRM
  instead, create a form endpoint (e.g. [Formspree](https://formspree.io) or
  [Web3Forms](https://web3forms.com), both free for a single form) and set:

  ```bash
  # .env.local
  VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-id
  ```

- **Music player** — swap the placeholder playlist in
  `src/components/sections/MusicPlayer.tsx` (`SPOTIFY_EMBED_SRC`) for the agency's own Spotify
  playlist/artist embed link (Spotify → Share → Embed playlist/artist).

- **Roster stats, copy, socials** — edit `About.tsx`, `Services.tsx`, `Hero.tsx` and
  `Footer.tsx` directly; all copy lives inline in the section components.

- **Logo** — `src/assets/logo-badge.svg` (gradient square badge, used for the favicon/app icon)
  and `src/assets/logo-wordmark.svg` (transparent, gradient-filled mark used across the site) are
  hand-built vector recreations of the supplied logo, so they scale cleanly at any size.
  `src/assets/logo-mono.svg` is a `currentColor` version for one-off use elsewhere.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (tokens/theme in `src/index.css`)
- Framer Motion (scroll reveals, magnetic buttons, cursor, tilt cards)
- Lenis (smooth scrolling)
- react-hook-form + zod (contact form validation)
