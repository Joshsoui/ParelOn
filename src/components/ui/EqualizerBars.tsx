const HEIGHTS = [0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.35, 0.7, 0.55, 0.95];

export function EqualizerBars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-16 items-end gap-1.5 ${className}`}>
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="w-1.5 origin-bottom rounded-full bg-gradient-to-t from-brand-deep to-brand-lime"
          style={{
            height: `${h * 100}%`,
            animation: `eq 1.1s ease-in-out ${i * 0.08}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes eq {
          from { transform: scaleY(0.35); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
