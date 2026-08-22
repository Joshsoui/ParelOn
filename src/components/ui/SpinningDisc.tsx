import { OnMark } from "./OnMark";

export function SpinningDisc({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <div className="absolute inset-0 animate-spin-slow">
        <div className="absolute inset-0 rounded-full border border-line" />
        <div className="absolute inset-[12%] rounded-full border border-line-soft" />
        <div className="absolute inset-[24%] rounded-full border border-line-soft" />
        <div className="absolute inset-[36%] rounded-full border border-line-soft" />
      </div>
      <div className="absolute inset-[46%] flex items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-lime">
        <OnMark className="h-[45%] w-[45%]" color="var(--color-ink)" />
      </div>
    </div>
  );
}
