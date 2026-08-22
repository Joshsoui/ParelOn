import { Reveal } from "../ui/Reveal";
import { EqualizerBars } from "../ui/EqualizerBars";

// Placeholder playlist — swap the ID below for Parel On's own Spotify playlist or artist embed.
const SPOTIFY_EMBED_SRC =
  "https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n?utm_source=generator&theme=0&autoplay=1";

export function MusicPlayer() {
  return (
    <section id="sound" className="relative flex flex-col items-center px-6 py-28 lg:py-36">
      <Reveal>
        <EqualizerBars className="mx-auto" />
      </Reveal>

      <Reveal index={1} className="mt-10 w-full max-w-xl">
        <div className="rounded-3xl bg-gradient-to-br from-brand/40 via-white/10 to-transparent p-[1px]">
          <div className="rounded-3xl bg-black/40 p-3 shadow-[0_0_90px_-25px_var(--color-brand)] backdrop-blur-xl sm:p-4">
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
    </section>
  );
}
