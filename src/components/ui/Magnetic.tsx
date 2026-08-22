import { useRef, type PropsWithChildren } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch } from "../../lib/useIsTouch";

export function Magnetic({ children, strength = 0.4 }: PropsWithChildren<{ strength?: number }>) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 16, stiffness: 200, mass: 0.4 });
  const springY = useSpring(y, { damping: 16, stiffness: 200, mass: 0.4 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
