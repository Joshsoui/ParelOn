import { motion } from "framer-motion";
import { KineticHeadline } from "../ui/KineticHeadline";
import { Marquee } from "../ui/Marquee";
import { GradientBlob } from "../ui/GradientBlob";
import { Magnetic } from "../ui/Magnetic";

const TICKER = [
  "BOOKINGS",
  "ARTIST MANAGEMENT",
  "TOURING",
  "BRAND PARTNERSHIPS",
  "A&R",
  "ROUTING",
];

export function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32">
      <GradientBlob className="top-[-10%] left-[-10%] h-[36rem] w-[36rem] opacity-40" />
      <GradientBlob className="right-[-15%] bottom-[10%] h-[28rem] w-[28rem] opacity-25 [animation-delay:1.5s]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-brand uppercase"
        >
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-brand" />
          DJ management &amp; booking agency
        </motion.div>

        <KineticHeadline
          start={ready}
          lines={["Representing", "the sound of", "what's next."]}
          className="font-display text-[10.5vw] leading-[0.95] font-semibold tracking-tight text-paper sm:text-[9vw] lg:text-[6.4vw]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-lg font-body text-base text-mist sm:text-lg"
        >
          /on is a boutique management and booking agency for electronic music&rsquo;s next generation
          — from first release to sold-out rooms. We build careers, not calendars.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#contact"
              data-cursor
              data-cursor-text="Book"
              className="rounded-full bg-brand px-7 py-3.5 font-mono text-xs tracking-[0.2em] text-ink uppercase transition-transform hover:scale-[1.03]"
            >
              Book an artist
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#sound"
              data-cursor
              data-cursor-text="Play"
              className="rounded-full border border-line px-7 py-3.5 font-mono text-xs tracking-[0.2em] text-paper uppercase transition-colors hover:border-brand/60 hover:text-brand"
            >
              Listen to the roster
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mt-16 border-t border-line py-5"
      >
        <Marquee items={TICKER} />
      </motion.div>
    </section>
  );
}
