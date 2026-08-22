import { motion } from "framer-motion";

export function SuccessCheck() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <motion.circle
        cx="32"
        cy="32"
        r="29"
        stroke="var(--color-brand)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.path
        d="M20 33.5 L28 41.5 L45 23.5"
        stroke="var(--color-brand)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut", delay: 0.5 }}
      />
    </svg>
  );
}
