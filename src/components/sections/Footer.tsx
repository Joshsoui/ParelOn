import { Magnetic } from "../ui/Magnetic";
import logoWordmark from "../../assets/logo-wordmark.svg";

export function Footer() {
  return (
    <footer className="relative flex flex-col items-center gap-6 px-6 py-16">
      <img src={logoWordmark} alt="Parel On" className="h-8 w-8" />

      <div className="flex items-center gap-6">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          data-cursor
          className="font-mono text-[11px] tracking-[0.2em] text-mist-dim uppercase transition-colors hover:text-silver"
        >
          Instagram
        </a>
        <a
          href="https://soundcloud.com"
          target="_blank"
          rel="noreferrer"
          data-cursor
          className="font-mono text-[11px] tracking-[0.2em] text-mist-dim uppercase transition-colors hover:text-silver"
        >
          SoundCloud
        </a>
      </div>

      <Magnetic>
        <a
          href="#top"
          data-cursor
          data-cursor-text="Top"
          className="mt-2 flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-silver hover:text-silver"
          aria-label="Back to top"
        >
          ↑
        </a>
      </Magnetic>

      <p className="mt-2 font-mono text-[10px] tracking-[0.15em] text-mist-dim uppercase">
        © {new Date().getFullYear()} Parel On
      </p>
    </footer>
  );
}
