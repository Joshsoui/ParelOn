export function GradientBlob({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[110px] animate-float ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--color-brand) 55%, transparent), transparent 70%)",
      }}
    />
  );
}
