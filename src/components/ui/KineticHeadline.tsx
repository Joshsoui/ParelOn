import { motion } from "framer-motion";

export function KineticHeadline({
  lines,
  start,
  className = "",
  delayStart = 0,
}: {
  lines: string[];
  start: boolean;
  className?: string;
  delayStart?: number;
}) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: "110%" }}
            animate={start ? { y: "0%" } : {}}
            transition={{
              duration: 1,
              delay: delayStart + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
