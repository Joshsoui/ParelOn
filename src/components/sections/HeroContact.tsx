import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "../ui/Magnetic";
import { ContactModal } from "../ui/ContactModal";
import { PrevIcon, NextIcon, PlayIcon, PauseIcon } from "../ui/PlayerIcons";
import { useSpotifyEmbed } from "../../lib/useSpotifyEmbed";
import { useSoundCloudEmbed } from "../../lib/useSoundCloudEmbed";
import logoWordmark from "../../assets/logo-wordmark.svg";

// Demo queue — swap these for Parel On's own roster tracks whenever you're ready.
// Spotify: Share → Copy Song Link, the ID after /track/ becomes spotify:track:<id>.
// SoundCloud: Share → Copy Link, paste the full soundcloud.com/... URL as-is.
type QueueTrack =
  | { platform: "spotify"; uri: string; artist: string; title: string }
  | { platform: "soundcloud"; url: string; artist: string; title: string };

const TRACKS: QueueTrack[] = [
  { platform: "spotify", uri: "spotify:track:0QfHRJwzVFgNLQwZmMpUfz", artist: "Jeno, Wempe", title: "In The Air" },
  { platform: "spotify", uri: "spotify:track:404MxkOiMnqfYgiHtI7jEr", artist: "Jeno, Wempe", title: "Contra" },
  { platform: "soundcloud", url: "https://on.soundcloud.com/IoXEksVqHRwGU22812", artist: "", title: "" },
  { platform: "soundcloud", url: "https://on.soundcloud.com/vtbdZO5bi67GCOx6T3", artist: "", title: "" },
  { platform: "spotify", uri: "spotify:track:2gCcxsBjL0Tii4cVPOwswZ", artist: "", title: "" },
  { platform: "spotify", uri: "spotify:track:7qiZfU4dY1lWllzX7mPBI3", artist: "Ed Sheeran", title: "Shape of You" },
  { platform: "spotify", uri: "spotify:track:4uLU6hMCjMI75M1A2tKUQC", artist: "Rick Astley", title: "Never Gonna Give You Up" },
];

const FIRST_SPOTIFY_URI = TRACKS.find((t) => t.platform === "spotify")?.uri;
const FIRST_SOUNDCLOUD_URL = TRACKS.find((t) => t.platform === "soundcloud")?.url;

const CONTACT_LAYOUT_ID = "contact-card";

export function HeroContact({ ready }: { ready: boolean }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [activePlatform, setActivePlatform] = useState<QueueTrack["platform"]>(TRACKS[0].platform);
  const [contactOpen, setContactOpen] = useState(false);

  const {
    iframeRef: spotifyIframeRef,
    doc: spotifyDoc,
    isPaused: spotifyIsPaused,
    togglePlay: spotifyTogglePlay,
    pause: spotifyPause,
    loadTrack: spotifyLoadTrack,
  } = useSpotifyEmbed(FIRST_SPOTIFY_URI ?? "spotify:track:0VjIjW4GlUZAMYd2vXMi3b");

  const {
    iframeRef: soundcloudIframeRef,
    doc: soundcloudDoc,
    isPaused: soundcloudIsPaused,
    trackInfo: soundcloudTrackInfo,
    togglePlay: soundcloudTogglePlay,
    pause: soundcloudPause,
    loadTrack: soundcloudLoadTrack,
  } = useSoundCloudEmbed(FIRST_SOUNDCLOUD_URL);

  const isPaused = activePlatform === "spotify" ? spotifyIsPaused : soundcloudIsPaused;

  const current = TRACKS[trackIndex];
  const nowPlaying =
    current.platform === "soundcloud" && soundcloudTrackInfo
      ? soundcloudTrackInfo
      : { artist: current.artist, title: current.title };
  const nowPlayingText = [nowPlaying.artist, nowPlaying.title].filter(Boolean).join(" — ");

  function togglePlay() {
    if (activePlatform === "spotify") spotifyTogglePlay();
    else soundcloudTogglePlay();
  }

  function goTo(delta: number) {
    const nextIndex = (trackIndex + delta + TRACKS.length) % TRACKS.length;
    const next = TRACKS[nextIndex];
    setTrackIndex(nextIndex);

    if (next.platform !== activePlatform) {
      if (activePlatform === "spotify") spotifyPause();
      else soundcloudPause();
    }
    setActivePlatform(next.platform);

    if (next.platform === "spotify") spotifyLoadTrack(next.uri);
    else soundcloudLoadTrack(next.url);
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
            Both the Spotify and SoundCloud embed APIs run inside their own nested iframes (see
            useSpotifyEmbed / useSoundCloudEmbed) instead of directly in this page, so whatever either one
            resizes stays physically confined to that iframe's own box — a real browser viewport boundary,
            not a CSS rule it could ever override. The outer wrapper with overflow + contain is a second,
            redundant layer of insurance. Only the active platform's controller ever plays audio.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
            style={{ contain: "strict" }}
          >
            <iframe
              ref={spotifyIframeRef}
              srcDoc={spotifyDoc}
              title="playback-spotify"
              tabIndex={-1}
              style={{ border: 0, width: 1, height: 1 }}
            />
            {soundcloudDoc && (
              <iframe
                ref={soundcloudIframeRef}
                srcDoc={soundcloudDoc}
                title="playback-soundcloud"
                tabIndex={-1}
                style={{ border: 0, width: 1, height: 1 }}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {!isPaused && nowPlayingText && (
            <motion.p
              key={nowPlayingText}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="mt-5 font-mono text-[11px] tracking-[0.4em] text-mist-dim uppercase"
            >
              {nowPlayingText}
            </motion.p>
          )}
        </AnimatePresence>

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
