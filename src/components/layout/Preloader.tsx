import { motion, AnimatePresence } from "framer-motion";
import { OnMark } from "../ui/OnMark";

export function Preloader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(90deg, #A7D86B 0%, #C3DE73 100%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 1.04, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-[55vw] max-w-[520px] min-w-[220px]"
          >
            <OnMark className="w-full" color="#FFFFFF" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
