import { useCountUp } from "../../lib/useCountUp";

export function StatItem({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { ref, value } = useCountUp(target);
  return (
    <div ref={ref}>
      <div className="font-display text-4xl font-semibold text-paper sm:text-5xl">
        {value}
        <span className="text-brand">{suffix}</span>
      </div>
      <div className="mt-2 font-mono text-xs tracking-[0.2em] text-mist-dim uppercase">{label}</div>
    </div>
  );
}
