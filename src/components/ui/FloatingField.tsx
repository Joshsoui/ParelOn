import type { InputHTMLAttributes, Ref } from "react";

type FloatingFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
};

export function FloatingField({ label, error, ref, className = "", ...inputProps }: FloatingFieldProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        ref={ref}
        {...inputProps}
        placeholder=" "
        className="peer w-full border-b border-line bg-transparent pt-5 pb-2 text-paper outline-none transition-colors focus:border-accent"
      />
      <label
        className="pointer-events-none absolute top-5 left-0 font-mono text-sm text-mist-dim uppercase transition-all duration-200
          peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-[0.15em] peer-focus:text-accent
          peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.15em]"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-amber-300">{error}</p>}
    </div>
  );
}
