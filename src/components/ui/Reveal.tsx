import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

type RevealProps = PropsWithChildren<{
  index?: number;
  className?: string;
  once?: boolean;
}>;

export function Reveal({ index = 0, className, children, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
