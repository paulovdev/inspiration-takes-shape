import { AnimatePresence, motion, useTransform } from "motion/react";

import { useMousePosition } from "@/hooks/useMousePosition";

import { textSlideNoI } from "../../../animations/sections/home.animations";

import { useIsMobile } from "@/hooks/useIsMobile";

const CenterTitle = ({ activeItem, setModal }) => {
  const isMobile = useIsMobile();
  const { x, y } = useMousePosition();

  const rotateY = useTransform(x, [0.5, -0.5], [-25, 25]);
  const rotateX = useTransform(y, [-0.5, 0.5], [-25, 25]);

  const rotateYFinal = isMobile ? 0 : rotateY;
  const rotateXFinal = isMobile ? 0 : rotateX;
  return (
    <motion.div
      className="absolute w-150 h-150 rounded-full flex items-center justify-center z-20 pointer-events-none overflow-hidden
      max-lg:w-125 max-lg:h-125 max-md:w-100 max-md:h-100 max-sm:w-85 max-sm:h-85 max-xsm:w-75 max-xsm:h-75 will-change-transform"
      style={{
        rotateY: rotateYFinal,
        rotateX: rotateXFinal,
        transformStyle: "preserve-3d",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div key={activeItem.tick} className="text-center">
          <div className="h-[14px] overflow-hidden">
            <motion.h1
              className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px]"
              variants={textSlideNoI}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
            >
              {activeItem.title}
              <span className="relative text-[10px] -top-[5px]">
                {activeItem.mark}
              </span>
            </motion.h1>
          </div>

          <div className="h-[16px] overflow-hidden mt-2">
            <motion.p
              className="text-s/50 text-[14px] opacity-50 tracking-[0.03em] uppercase max-md:text-[12px]"
              variants={textSlideNoI}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1.1}
            >
              {activeItem.year}
            </motion.p>
          </div>

          <div
            className="h-[16px] overflow-hidden mt-12 cursor-pointer pointer-events-auto"
            onClick={() => setModal(true)}
          >
            <motion.p
              className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px]"
              variants={textSlideNoI}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1.2}
            >
              {activeItem.action}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
export default CenterTitle;
