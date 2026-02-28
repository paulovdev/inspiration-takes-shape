import { useRef, useState, useEffect, useCallback } from "react";
import {
  IoMdPause,
  IoMdPlay,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useMousePosition2 } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useInView } from "react-intersection-observer";
import { IoClose } from "react-icons/io5";
import { textOverlap } from "@/animations/shared/global-anim";
import ExportedImage from "next-image-export-optimizer";

const Reel = () => {
  const videoRef = useRef(null);
  const container = useRef(null);
  const isMobile = useIsMobile();
  const [videoOpen, setVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [hover, setHover] = useState(false);
  const [tick, setTick] = useState(0);
  const bumpMedia = useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "center end"],
  });

  const clipPathScroll = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 0% 0%)", "inset(15% 15% 15% 15%)"],
  );

  const textY = useTransform(scrollYProgress, [0, 2.5], [0, -600]);

  const { x, y } = useMousePosition2();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const update = () => setTime(Math.floor(video.currentTime));
    video.addEventListener("timeupdate", update);
    return () => video.removeEventListener("timeupdate", update);
  }, [videoOpen]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const closeVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsPlaying(false);
    setVideoOpen(false);
  };
  useEffect(() => {
    if (!videoOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [videoOpen]);

  return (
    <>
      <motion.div
        ref={container}
        style={{ clipPath: clipPathScroll }}
        className="relative w-screen h-dvh flex items-center justify-center bg-p will-change-[clip-path]"
        onClick={() => setVideoOpen(true)}
      >
        <div className="absolute inset-0 size-full -z-10" ref={ref}>
          <ExportedImage
            src="/images/reel.jpg"
            width={2000}
            height={2000}
            alt=""
            className="size-full object-cover brightness-75"
          />
        </div>
        <div className="overflow-hidden h-fit cursor-pointer z-50">
          <motion.h3
            className="relative text-s text-[62px] tracking-[-0.03em] leading-none max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px] group will-change-transform"
            initial={false}
            animate={{
              y: videoOpen ? -100 : 0,
              transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
                delay: videoOpen ? 0 : 0.25,
              },
            }}
          >
            Watch Showcase
            <span className="absolute left-0 bottom-px h-[3px] w-full origin-left scale-x-100 bg-s transition-transform duration-300 ease-out group-hover:scale-x-0 max-lg:h-0.5" />
          </motion.h3>
        </div>
        <div className="absolute inset-0 flex items-end justify-center p-10 max-ds:p-8 max-lg:p-5 max-md:p-2">
          <div className="h-fit overflow-hidden">
            <motion.p
              className="pointer-events-auto relative text-s font-general font-normal text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px] max-md:-top-1"
              style={{ y: textY }}
            >
              — SHOWCASE MADE BY picao.ai
            </motion.p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {videoOpen && (
          <motion.div
            key="video-modal"
            className="fixed inset-0 w-screen h-dvh bg-p z-[9999] flex items-center justify-center will-change-[clip-path]"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <video
              ref={videoRef}
              src="/videos/reel.mp4"
              autoPlay
              muted
              playsInline
              loop
              onClick={togglePlayPause}
              className="absolute inset-0 size-full object-cover"
            />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between mix-blend-exclusion items-end pointer-events-none">
              <div
                className="pointer-events-auto text-s text-[28px] cursor-pointer max-lg:text-[24px]"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => {
                  toggleMute();
                  bumpMedia();
                }}
              >
                {isMuted ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
              </div>

              <div
                className="pointer-events-auto relative text-s font-general font-normal text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px] max-md:-top-1"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {time} seconds
              </div>
            </div>

            <div
              className="absolute top-0 right-0 px-10 pt-10 text-s mix-blend-exclusion text-[42px] cursor-pointer
              max-ds:px-8 max-lg:px-5 max-lg:pt-5"
              onClick={closeVideo}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <button
                className="text-s font-general text-[14px] leading-none tracking-[-0.03em] uppercase max-md:text-[12px] cursor-pointer flex items-center gap-2"
                onClick={() => setVideoOpen(false)}
              >
                <IoClose className="text-[16px] max-md:text-[14px]" /> close
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!hover && !isMobile && (
                <motion.div
                  key={hover}
                  className="fixed bg-s/5 rounded-full backdrop-blur-lg mix-blend-difference z-1000 "
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
                  <div className="w-40 h-40 flex items-center justify-center gap-2">
                    <div className="relative w-full h-[17px] overflow-hidden">
                      <AnimatePresence mode="sync" initial={false}>
                        {isPlaying ? (
                          <motion.div
                            key="pause"
                            className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center gap-2"
                            variants={textOverlap}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <IoMdPause className="text-[12px] text-s" />
                            <p className="text-s font-general font-normal text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px] whitespace-nowrap">
                              PAUSE
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="play"
                            className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center gap-2"
                            variants={textOverlap}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <IoMdPlay className="text-[12px] text-s" />
                            <p className="text-s font-general font-normal text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px] whitespace-nowrap">
                              PLAY
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Reel;
