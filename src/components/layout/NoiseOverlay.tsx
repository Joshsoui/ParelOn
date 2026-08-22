export function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] bg-grain">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
