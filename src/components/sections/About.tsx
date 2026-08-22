import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { StatItem } from "../ui/StatItem";
import { SpinningDisc } from "../ui/SpinningDisc";

export function About() {
  return (
    <section id="agency" className="relative border-t border-line px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="01" label="Agency" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal index={1}>
              <p className="font-display text-3xl leading-[1.15] font-medium tracking-tight text-paper sm:text-5xl lg:text-6xl">
                We sit between the booth and the boardroom — turning raw talent into{" "}
                <span className="text-gradient">lasting careers</span>, one release, one stage, one
                room at a time.
              </p>
            </Reveal>

            <Reveal index={2} className="mt-10 max-w-xl">
              <p className="text-base text-mist sm:text-lg">
                Founded by people who&rsquo;ve stood on both sides of the decks, /on handles the
                parts of the business artists shouldn&rsquo;t have to think about — bookings,
                routing, contracts, brand deals — so they can focus on the music. Independent,
                selective, and built for the long run.
              </p>
            </Reveal>

            <Reveal index={3} className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              <StatItem target={40} suffix="+" label="Artists" />
              <StatItem target={300} suffix="+" label="Shows / yr" />
              <StatItem target={20} suffix="+" label="Countries" />
              <StatItem target={6} label="Years" />
            </Reveal>
          </div>

          <div className="hidden items-center justify-center lg:col-span-4 lg:flex">
            <Reveal index={2} className="w-full max-w-[280px]">
              <SpinningDisc />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
