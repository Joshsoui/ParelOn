import { useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "../ui/Magnetic";
import { ContactModal } from "../ui/ContactModal";
import { PrevIcon, NextIcon, PlayIcon, PauseIcon } from "../ui/PlayerIcons";
import { useSpotifyEmbed } from "../../lib/useSpotifyEmbed";
import logoWordmark from "../../assets/logo-wordmark.svg";

// Placeholder demo queue — swap these for Parel On's own roster tracks (Spotify → Share → Copy Song Link,
// the ID after /track/ becomes spotify:track:<id>).
const TRACKS = [
  { uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b", artist: "The Weeknd", title: "Blinding Lights" },
  { uri: "spotify:track:7qiZfU4dY1lWllzX7mPBI3", artist: "Ed Sheeran", title: "Shape of You" },
  { uri: "spotify:track:4uLU6hMCjMI75M1A2tKUQC", artist: "Rick Astley", title: "Never Gonna Give You Up" },
];

const CONTACT_LAYOUT_ID = "contact-card";

export function HeroContact({ ready }: { ready: boolean }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const { iframeRef, doc, isPaused, togglePlay, loadTrack } = useSpotifyEmbed(TRACKS[0].uri);

  function goTo(delta: number) {
    const next = (trackIndex + delta + TRACKS.length) % TRACKS.length;
    setTrackIndex(next);
    loadTrack(TRACKS[next].uri);
  }

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
            <motion.img
              src={logoWordmark}
              alt="Parel On"
              className="relative h-24 w-24 sm:h-32 sm:w-32"
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="font-mono text-[11px] tracking-[0.4em] text-mist-dim uppercase">
            Artist management
          </span>
        </div>

        <div className="mt-10 flex items-center gap-7">
          <button
            onClick={() => goTo(-1)}
            data-cursor
            data-cursor-text="Prev"
            aria-label="Previous track"
            className="text-brand transition-transform hover:scale-110"
          >
            <PrevIcon className="h-6 w-6" />
          </button>

          <button
            onClick={togglePlay}
            data-cursor
            data-cursor-text={isPaused ? "Play" : "Pause"}
            aria-label={isPaused ? "Play" : "Pause"}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-ink transition-transform hover:scale-105"
          >
            {isPaused ? <PlayIcon className="ml-0.5 h-6 w-6" /> : <PauseIcon className="h-6 w-6" />}
          </button>

          <button
            onClick={() => goTo(1)}
            data-cursor
            data-cursor-text="Next"
            aria-label="Next track"
            className="text-brand transition-transform hover:scale-110"
          >
            <NextIcon className="h-6 w-6" />
          </button>

          {/*
            The Spotify iFrame API runs inside its own nested iframe (see useSpotifyEmbed) instead of
            directly in this page, so whatever it resizes stays physically confined to that iframe's own
            box — a real browser viewport boundary, not a CSS rule it could ever override. The outer wrapper
            with overflow + contain is a second, redundant layer of insurance.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
            style={{ contain: "strict" }}
          >
            <iframe ref={iframeRef} srcDoc={doc} title="playback" tabIndex={-1} style={{ border: 0, width: 1, height: 1 }} />
          </div>
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
              className="rounded-full bg-brand px-8 py-3.5 font-mono text-xs tracking-[0.2em] text-ink uppercase transition-transform hover:scale-[1.03]"
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
