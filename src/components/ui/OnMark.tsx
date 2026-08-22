export function OnMark({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" className={className} aria-hidden>
      <path d="M130 445 L250 155" stroke={color} strokeWidth="42" strokeLinecap="butt" />
      <path
        fillRule="evenodd"
        fill={color}
        d="M345 229c-43.078 0-78 34.921-78 78s34.922 78 78 78 78-34.921 78-78-34.922-78-78-78zm0 42c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36z"
      />
      <path
        d="M468 385 L468 311 Q468 229 514 229 Q560 229 560 311 L560 385"
        stroke={color}
        strokeWidth="42"
        strokeLinecap="butt"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
