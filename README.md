# Parel On — Artist Management & Bookings

A minimal, animation-driven onepager for an artist management & booking agency. No nav: a
centered logo, custom Spotify play/prev/next controls, and a "Get in touch" button that opens an
animated contact form modal.

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
  `src/components/ui/ContactModal.tsx` (`CONTACT_EMAIL`). To submit straight to an inbox or CRM
  instead, create a form endpoint (e.g. [Formspree](https://formspree.io) or
  [Web3Forms](https://web3forms.com), both free for a single form) and set:

  ```bash
  # .env.local
  VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-id
  ```

- **Music player / track queue** — swap the placeholder `TRACKS` array in
  `src/components/sections/HeroContact.tsx` for Parel On's own roster tracks. Each entry needs a
  `spotify:track:<id>` URI (Spotify → Share → Copy Song Link, the ID is the part after `/track/`)
  plus the artist/title text shown under the controls. See **How the player works** below for why
  this is a curated list rather than a linked playlist.

- **Headlines, logo label, socials** — all copy lives inline in `HeroContact.tsx` and
  `Footer.tsx`.

- **Logo** — `src/assets/logo-badge.svg` (gradient square badge, used for the favicon/app icon)
  and `src/assets/logo-wordmark.svg` (transparent, gradient-filled mark used across the site) are
  a traced vector of the supplied logo file, so they scale cleanly at any size.
  `src/assets/logo-mono.svg` is a `currentColor` version for one-off use elsewhere.

## How the player works

The play/prev/next buttons are wired to Spotify's official **iFrame Embed API**
(`src/lib/useSpotifyEmbed.ts`), not just a decorative overlay — `togglePlay()` really pauses and
resumes playback, and prev/next call `loadUri()` to switch tracks. Spotify's public embed API
doesn't expose "skip to next/previous track" for a playlist's contents (no track list, no
skip method), so instead of a linked playlist the player steps through the small `TRACKS` list
described above. That also means the artist/title line under the controls is instant and always
correct — no client-side lookup needed. The actual Spotify iframe stays in the DOM (small, tucked
under the now-playing text) since Spotify's controller API requires a live embed to control and
their branding guidelines expect it to stay visible.

## How the contact modal works

The "Get in touch" button and the modal card share a Framer Motion `layoutId`
(`src/components/ui/ContactModal.tsx`), so opening it animates the button growing into the modal
card rather than a plain fade-in. Escape and a backdrop click close it.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (tokens/theme in `src/index.css`)
- Framer Motion (shared-layout modal, magnetic buttons, custom cursor)
- Lenis (smooth scrolling)
- react-hook-form + zod (contact form validation)
