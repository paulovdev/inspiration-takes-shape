import { useRef, useState, useLayoutEffect } from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useMousePosition2 } from "@/hooks/useMousePosition";

const reelAnim = {
  initial: { scale: 1, transition: { duration: 0.25 } },
  open: { scale: 1.1, transition: { duration: 0.25 } },
};

const Reel = () => {
  const videoRef = useRef(null);
  const container = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);

  const { x, y } = useMousePosition2();
  const [hover, setHover] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  useLayoutEffect(() => {
    if (container.current && isPlaying) {
      setPlaceholderHeight(container.current.offsetHeight);
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      {isPlaying && <div style={{ height: placeholderHeight }} />}

      <motion.div
        ref={container}
        className={`w-screen flex items-center justify-center cursor-default
          ${isPlaying ? "fixed inset-0 z-50" : "relative h-screen p-10"}
        will-change-transform`}
        variants={reelAnim}
        initial="initial"
        animate={isPlaying ? "open" : "initial"}
      >
        <motion.video
          ref={videoRef}
          src="/reel.mp4"
          loop
          muted
          playsInline
          onClick={togglePlayPause}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ scale: isPlaying ? 1 : scale }}
          className={`
            object-cover 
            ${isPlaying ? "w-full h-full rounded-none" : "w-full h-[850px]"}
          will-change-transform`}
        />
      </motion.div>

      {/* Cursor */}
      <AnimatePresence>
        {hover && (
          <motion.div
            className="fixed z-[999] mix-blend-exclusion pointer-events-none will-change-auto"
            style={{
              left: x,
              top: y,
              translateX: "-50%",
              translateY: "-50%",
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
              transition: { duration: 0.2 },
            }}
          >
            <div className="flex items-center gap-2 text-white">
              <p className="font-general text-[14px] tracking-[0.03em] uppercase max-xsm:text-[12px]">
                {isPlaying ? "PAUSE REEL" : "PLAY REEL"}
              </p>
              {isPlaying ? <IoMdPause /> : <IoMdPlay />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Reel;
