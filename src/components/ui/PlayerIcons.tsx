type IconProps = { className?: string };

export function PrevIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6 5a1 1 0 0 1 1 1v5.1l9.4-6.27A1 1 0 0 1 18 5.68v12.64a1 1 0 0 1-1.6.8L7 12.9V18a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function NextIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18 5a1 1 0 0 0-1 1v5.1L7.6 4.83A1 1 0 0 0 6 5.68v12.64a1 1 0 0 0 1.6.8L17 12.9V18a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1Z" />
    </svg>
  );
}

export function PlayIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7.5 5.14a1 1 0 0 1 1.5-.87l10.2 6.86a1 1 0 0 1 0 1.74L9 19.73a1 1 0 0 1-1.5-.87Z" />
    </svg>
  );
}

export function PauseIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1.2" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}
