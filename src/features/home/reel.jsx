import { useRef, useState, useEffect } from "react";
import {
  IoMdPause,
  IoMdPlay,
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdClose,
} from "react-icons/io";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useMousePosition2 } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";

import PixelRevealImage from "@/components/ui/pixel-reveal-image/pixel-reveal-image";
import { useInView } from "react-intersection-observer";

const Reel = () => {
  const videoRef = useRef(null);
  const container = useRef(null);
  const isMobile = useIsMobile();
  const [videoOpen, setVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [hover, setHover] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "center center"],
  });

  const clipPathScroll = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(15% 15% 15% 15%)", "inset(0% 0% 0% 0%)"],
  );
  const { x, y } = useMousePosition2();
  const { ref, inView } = useInView({
    threshold: 0.15,
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
        className="relative mb-20 w-screen h-dvh flex items-center justify-center bg-black will-change-[clip-path]"
        onClick={() => setVideoOpen(true)}
      >
        <div className="absolute inset-0 size-full -z-10" ref={ref}>
          {/*  <Image
            src="/reel.png"
            width={2000}
            height={2000}
            alt=""
            className="size-full object-cover brightness-75"
          /> */}

          <PixelRevealImage
            inView={inView}
            src="/reel.png"
            fill
            className="size-full object-cover brightness-75"
            alt=""
          />
        </div>
        <div className="overflow-hidden h-fit cursor-pointer">
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
      </motion.div>

      <AnimatePresence mode="wait">
        {videoOpen && (
          <motion.div
            key="video-modal"
            className="fixed inset-0 w-screen h-dvh bg-black z-[9999] flex items-center justify-center will-change-[clip-path]"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <video
              ref={videoRef}
              src="/reel.mp4"
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
                onClick={toggleMute}
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
              className="absolute top-6 right-4 text-s mix-blend-exclusion text-[42px] cursor-pointer"
              onClick={closeVideo}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <IoMdClose />
            </div>

            <AnimatePresence>
              {!hover && !isMobile && (
                <motion.div
                  key={isPlaying ? "pause" : "play"}
                  className="fixed z-1000 pointer-events-none mix-blend-exclusion will-change-transform"
                  style={{
                    left: x,
                    top: y,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isPlaying ? (
                    <IoMdPause className="text-[82px] text-s" />
                  ) : (
                    <IoMdPlay className="text-[82px] text-s" />
                  )}
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
