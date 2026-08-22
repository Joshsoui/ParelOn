import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "../ui/Magnetic";
import logoWordmark from "../../assets/logo-wordmark.svg";

const LINKS = [
  { href: "#agency", label: "Agency" },
  { href: "#roster", label: "Roster" },
  { href: "#sound", label: "Sound" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" data-cursor className="flex items-center gap-2">
          <img src={logoWordmark} alt="/on" className="h-9 w-9" />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor
              className="font-mono text-xs tracking-[0.2em] text-mist uppercase transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Magnetic>
            <a
              href="#contact"
              data-cursor
              data-cursor-text="Go"
              className="rounded-full border border-brand/50 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-brand uppercase transition-colors hover:bg-brand hover:text-ink"
            >
              Book a session
            </a>
          </Magnetic>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
            className="h-px w-6 bg-paper"
          />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-px w-6 bg-paper" />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
            className="h-px w-6 bg-paper"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-ink md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-paper"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 w-fit rounded-full border border-brand/50 px-5 py-2.5 font-mono text-xs tracking-[0.2em] text-brand uppercase"
              >
                Book a session
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
