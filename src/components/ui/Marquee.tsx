type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
};

export function Marquee({ items, className = "", reverse = false }: MarqueeProps) {
  const track = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-4xl font-medium tracking-tight text-paper/90 sm:text-6xl">
            {item}
          </span>
          <span aria-hidden className="h-2 w-2 rounded-full bg-brand" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`flex w-full overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {track}
        {track}
      </div>
    </div>
  );
}
