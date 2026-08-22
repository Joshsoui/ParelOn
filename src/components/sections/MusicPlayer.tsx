import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { EqualizerBars } from "../ui/EqualizerBars";

// Placeholder playlist — swap the ID below for the agency's own Spotify playlist or artist embed.
const SPOTIFY_EMBED_SRC =
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n?utm_source=generator&theme=0";

export function MusicPlayer() {
  return (
    <section id="sound" className="relative border-t border-line px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="03" label="Sound" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal index={1}>
              <h2 className="font-display text-3xl leading-[1.1] font-medium tracking-tight text-paper sm:text-5xl">
                Current rotation, straight from the roster.
              </h2>
            </Reveal>
            <Reveal index={2} className="mt-6 max-w-md">
              <p className="text-base text-mist sm:text-lg">
                A running playlist of the sets, edits and unreleased cuts moving through the
                agency right now. Press play and let it run.
              </p>
            </Reveal>
            <Reveal index={3} className="mt-10">
              <EqualizerBars />
            </Reveal>
          </div>

          <Reveal index={2} className="lg:col-span-7">
            <div className="relative rounded-3xl bg-gradient-to-br from-brand/40 via-brand-lime/10 to-transparent p-[1px]">
              <div className="rounded-3xl bg-ink-soft/90 p-3 shadow-[0_0_80px_-20px_var(--color-brand)] backdrop-blur-xl sm:p-5">
                <iframe
                  title="Spotify player"
                  style={{ borderRadius: "16px" }}
                  src={SPOTIFY_EMBED_SRC}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
