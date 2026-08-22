import { Magnetic } from "../ui/Magnetic";
import logoWordmark from "../../assets/logo-wordmark.svg";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "SoundCloud", href: "https://soundcloud.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-14 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <img src={logoWordmark} alt="/on" className="h-9 w-9" />
          <p className="mt-4 max-w-xs text-sm text-mist-dim">
            DJ management &amp; booking agency — representing the sound of what&rsquo;s next.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="font-mono text-xs tracking-[0.2em] text-mist uppercase transition-colors hover:text-brand"
            >
              {s.label}
            </a>
          ))}
        </div>

        <Magnetic>
          <a
            href="#top"
            data-cursor
            data-cursor-text="Top"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-brand hover:text-brand"
            aria-label="Back to top"
          >
            ↑
          </a>
        </Magnetic>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col-reverse items-start justify-between gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] tracking-[0.15em] text-mist-dim uppercase">
          © {new Date().getFullYear()} /on management. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
