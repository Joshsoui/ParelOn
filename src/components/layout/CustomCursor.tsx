import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch } from "../../lib/useIsTouch";

export function CustomCursor() {
  const isTouch = useIsTouch();
  const [variant, setVariant] = useState<"default" | "hover">("default");
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    if (isTouch) return;

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        setVariant("hover");
        setLabel(target.dataset.cursorText ?? "");
      } else {
        setVariant("default");
        setLabel("");
      }
    }

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        className="absolute top-0 left-0 h-2 w-2 rounded-full bg-brand"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-brand/60 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: variant === "hover" ? (label ? 92 : 56) : 32,
          height: variant === "hover" ? (label ? 92 : 56) : 32,
          backgroundColor: variant === "hover" ? "rgba(167,216,107,0.12)" : "rgba(167,216,107,0)",
        }}
        transition={{ type: "spring", damping: 24, stiffness: 260 }}
      >
        {label && (
          <span className="font-mono text-[10px] tracking-[0.15em] text-brand uppercase">{label}</span>
        )}
      </motion.div>
    </div>
  );
}
