import { motion, AnimatePresence } from "framer-motion";
import logoOriginal from "../../assets/logo-original.png";

export function Preloader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }}
        >
          <motion.img
            src={logoOriginal}
            alt="Parel On"
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 1.04, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
