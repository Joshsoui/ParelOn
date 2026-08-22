import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useIsTouch } from "../../lib/useIsTouch";

export function AmbientGlow() {
  const isTouch = useIsTouch();
  const x = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const y = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const sx = useSpring(x, { damping: 40, stiffness: 60, mass: 0.8 });
  const sy = useSpring(y, { damping: 40, stiffness: 60, mass: 0.8 });
  const background = useMotionTemplate`radial-gradient(600px circle at ${sx}px ${sy}px, color-mix(in srgb, var(--color-brand) 14%, transparent), transparent 70%)`;

  useEffect(() => {
    if (isTouch) return;
    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ background }}
    />
  );
}
