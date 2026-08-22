# Parel On — Artist Management & Bookings

A minimal, animation-driven onepager for an artist management & booking agency. No nav, almost
no copy: a large centered logo and two headlines that morph — driven by scroll — into a contact
form, followed by an autoplaying Spotify embed and a small footer.

Built with React, TypeScript, Tailwind CSS, Framer Motion and Lenis for smooth scrolling.

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
  `src/components/sections/HeroContact.tsx` (`CONTACT_EMAIL`). To submit straight to an inbox or
  CRM instead, create a form endpoint (e.g. [Formspree](https://formspree.io) or
  [Web3Forms](https://web3forms.com), both free for a single form) and set:

  ```bash
  # .env.local
  VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-id
  ```

- **Music player** — swap the placeholder playlist in
  `src/components/sections/MusicPlayer.tsx` (`SPOTIFY_EMBED_SRC`) for Parel On's own Spotify
  playlist/artist embed link (Spotify → Share → Embed playlist/artist). Note: the `autoplay=1`
  param is a best-effort — browsers block unmuted audio autoplay until the visitor has interacted
  with the page at least once, so on a first visit the player may sit ready-to-press rather than
  playing instantly. This is a browser policy, not something any site can override.

- **Headlines, logo label, socials** — all copy lives inline in `HeroContact.tsx` and
  `Footer.tsx`.

- **Logo** — `src/assets/logo-badge.svg` (gradient square badge, used for the favicon/app icon)
  and `src/assets/logo-wordmark.svg` (transparent, gradient-filled mark used across the site) are
  hand-built vector recreations of the supplied logo, so they scale cleanly at any size.
  `src/assets/logo-mono.svg` is a `currentColor` version for one-off use elsewhere.

## How the morph works

`HeroContact.tsx` pins the hero viewport (`position: sticky`) for a tall (240vh) scroll region and
drives the logo's scale/position, the headline's fade-out and the form's fade-in from a single
`useScroll` progress value — no separate "sections" for hero vs. contact, just one continuous
scroll-linked transition.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (tokens/theme in `src/index.css`)
- Framer Motion (scroll-linked morph, magnetic buttons, custom cursor)
- Lenis (smooth scrolling)
- react-hook-form + zod (contact form validation)
