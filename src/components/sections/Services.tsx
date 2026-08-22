import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { TiltCard } from "../ui/TiltCard";

const SERVICES = [
  {
    n: "01",
    title: "Booking",
    desc: "Global routing across clubs, festivals and private events — negotiated by people who know what a room is actually worth.",
  },
  {
    n: "02",
    title: "Management",
    desc: "Day-to-day career direction: release strategy, positioning and the decisions that compound over a decade, not a season.",
  },
  {
    n: "03",
    title: "Touring",
    desc: "Routing, logistics and production advance so every date lands clean — from a 300-cap room to a main stage.",
  },
  {
    n: "04",
    title: "Brand partnerships",
    desc: "Selective collaborations with labels, festivals and brands that fit the artist — never the other way around.",
  },
];

export function Services() {
  return (
    <section id="roster" className="relative border-t border-line px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="02" label="What we do" />
        </Reveal>

        <Reveal index={1} className="mt-6 max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.1] font-medium tracking-tight text-paper sm:text-5xl">
            Everything between the studio and the stage.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} index={i + 1}>
              <TiltCard className="h-full">
                <span className="font-mono text-xs tracking-[0.2em] text-brand">{s.n}</span>
                <h3 className="mt-6 font-display text-2xl font-medium text-paper sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm text-mist sm:text-base">{s.desc}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
