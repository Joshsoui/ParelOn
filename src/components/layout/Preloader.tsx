import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }}
        >
          <motion.div
            exit={{ scale: 0.85, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          >
            <svg width="120" height="120" viewBox="0 0 240 240" fill="none">
              <defs>
                <linearGradient id="preloaderGradient" x1="0" y1="0" x2="240" y2="0">
                  <stop offset="0%" stopColor="#A7D86B" />
                  <stop offset="100%" stopColor="#C3DE73" />
                </linearGradient>
              </defs>
              <motion.path
                d="M52 178 L100 62"
                stroke="url(#preloaderGradient)"
                strokeWidth="17"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              />
              <motion.circle
                cx="138"
                cy="123"
                r="31"
                stroke="url(#preloaderGradient)"
                strokeWidth="17"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.path
                d="M187 154 L187 124 Q187 92 206 92 Q224 92 224 124 L224 154"
                stroke="url(#preloaderGradient)"
                strokeWidth="17"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: "easeInOut", delay: 0.35 }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
