import { useMousePosition } from "@/hooks/useMousePosition";

const { x, y } = useMousePosition();

<AnimatePresence mode="wait">
  <motion.div
    className="fixed z-1000"
    style={{
      left: x,
      top: y,
      translateX: "-50%",
      translateY: "-50%",
      pointerEvents: "none",
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
    }}
    exit={{
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.25,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.5,
      },
    }}
  >
    <div className="w-75 flex items-center justify-between">
      <div className="h-[15px] overflow-hidden cursor-default">
        <motion.div
          variants={textSlideAnim}
          initial="initial"
          animate={hover === index ? "animate" : "initial"}
          className="flex flex-col items-start justify-center"
        >
          <p className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-md:text-[12px]">
            {work.name}
          </p>
          <p className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-md:text-[12px]">
            {work.name}
          </p>
        </motion.div>
      </div>
     
    </div>
  </motion.div>
</AnimatePresence>;
