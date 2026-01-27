import { useRef, useState } from "react";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useMousePosition2 } from "@/hooks/useMousePosition";

const Reel = () => {
  const videoRef = useRef(null);
  const container = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [hover, setHover] = useState(false);

  const { x, y } = useMousePosition2();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "center center"],
  });

  const clipPathScroll = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(15% 15% 15% 15%)", "inset(0% 0% 0% 0%)"],
  );

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      <motion.div
        ref={container}
        className="w-screen h-screen flex items-center justify-center cursor-default will-change-auto"
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
          style={{
            clipPath: clipPathScroll,
          }}
          className="object-cover w-full h-screen will-change-[clip-path]
          "
        />
      </motion.div>

      <AnimatePresence>
        {hover && (
          <motion.div
            className="fixed z-[999] pointer-events-none"
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
              transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] },
            }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
          >
            <AnimatePresence mode="wait">
              <div className="flex items-center gap-2 text-s" key={isPlaying}>
                {/*    <p className="font-general text-[14px] tracking-[0.03em] uppercase max-md:text-[12px]">
                {isPlaying ? "PAUSE REEL" : "PLAY REEL"}
              </p> */}
                {isPlaying ? (
                  <motion.span
                    initial={{ clipPath: "inset(40% 40% 40% 40%)" }}
                    animate={{
                      clipPath: "inset(0% 0% 0% 0%)",
                      transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] },
                    }}
                    exit={{
                      clipPath: "inset(40% 40% 40% 40%)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <IoMdPause className="text-[124px]" />
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <IoMdPlay className="text-[124px]" />{" "}
                  </motion.span>
                )}
              </div>{" "}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Reel;
