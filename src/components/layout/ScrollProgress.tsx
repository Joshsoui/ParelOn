import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-silver-dim to-silver-bright"
      style={{ scaleX }}
    />
  );
}
