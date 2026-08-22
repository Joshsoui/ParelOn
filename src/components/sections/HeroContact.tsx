import { useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "../ui/Magnetic";
import { ContactModal } from "../ui/ContactModal";
import { OnMark } from "../ui/OnMark";
import logoWordmark from "../../assets/logo-wordmark.svg";

const CONTACT_LAYOUT_ID = "contact-card";

export function HeroContact({ ready }: { ready: boolean }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)" }}
              animate={{ opacity: [0.3, 0.65, 0.3], scale: [0.88, 1.1, 0.88] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative h-24 w-24 sm:h-32 sm:w-32"
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/*
                The scale-breathe above is Framer Motion's own inline-style `transform`, so the glitch
                jitter (a stylesheet animation on the same property) lives on this separate plain child
                instead of fighting over it — same fix as the intro's glitch.
              */}
              <div className="logo-glitch-shift relative h-full w-full">
                <img src={logoWordmark} alt="Parel On" className="h-full w-full" />
                <OnMark
                  className="logo-glitch-ghost-a pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
                  color="#00e5ff"
                />
                <OnMark
                  className="logo-glitch-ghost-b pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
                  color="#ff2e9a"
                />
              </div>
            </motion.div>
          </div>
          <span className="font-mono text-[11px] tracking-[0.4em] text-mist-dim uppercase">
            Artist management
          </span>
        </div>

        <motion.div
          layoutId={CONTACT_LAYOUT_ID}
          animate={{ opacity: contactOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="mt-10"
        >
          <Magnetic>
            <button
              onClick={() => setContactOpen(true)}
              data-cursor
              data-cursor-text="Go"
              className="rounded-full bg-silver px-8 py-3.5 font-mono text-xs tracking-[0.2em] text-ink uppercase transition-transform hover:scale-[1.03]"
            >
              Get in touch
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} layoutId={CONTACT_LAYOUT_ID} />
    </section>
  );
}
