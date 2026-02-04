import { motion } from "motion/react";
import { useEffect } from "react";

const Transition = ({ children }) => {
  useEffect(() => {
    document.body.style.cursor = "wait";

    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className="relative bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          document.body.style.cursor = "default";
        }}
        className="relative z-1 bg-p min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Transition;
