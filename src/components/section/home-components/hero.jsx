import {
  AnimatePresence,
  motion,
  useAnimate,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IoArrowDownSharp } from "react-icons/io5";
import { useMousePosition } from "@/hooks/useMousePosition";
import { lab } from "./home.data";
import { heroIntro, mediaReveal, textSlide } from "./home.animations";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";

const size = 600;
const center = size / 2;
const radius = 250;

const totalTicks = 80;
const bigTicks = [0, 20, 40, 60];

const Hero = () => {
  const container = useRef(null);
  const isMobile = useIsMobile();
  const [activeTick, setActiveTick] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [previousItem, setPreviousItem] = useState(null);

  const activeItem = lab.find((i) => i.tick === activeTick);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const yMotion = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const scaleMotion = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const rotateXMotion = useTransform(scrollYProgress, [0, 1], [0, -75]);

  const y = isMobile ? 0 : yMotion;
  const scale = isMobile ? 1 : scaleMotion;
  const rotateX = isMobile ? 0 : rotateXMotion;

  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "75vh"]);

  const handleTickClick = (tickIndex) => {
    if (activeTick === tickIndex) return;

    const step = 360 / totalTicks;

    const from = activeTick * step;
    const to = tickIndex * step;

    let diff = to - from;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    setActiveTick(tickIndex);
    setRotation((prev) => prev - diff);
  };

  return (
    <section
      className="relative w-screen h-screen bg-black overflow-hidden select-none"
      ref={container}
    >
      <motion.div
        className="relative w-screen h-screen overflow-hidden will-change-transform"
        style={{ y: y2, perspective: 1400 }}
        variants={heroIntro}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 w-screen h-screen flex flex-col items-center justify-between">
          <BackgroundMedia
            activeItem={activeItem}
            previousItem={previousItem}
          />

          <motion.div
            ref={container}
            className="absolute inset-0 flex items-center justify-center z-20 will-change-transform"
            style={{ y, scale, perspective: 1400, rotateX }}
          >
            <CenterTitle activeItem={activeItem} />

            <CircleDial
              activeTick={activeTick}
              rotation={rotation}
              onTickClick={handleTickClick}
            />
          </motion.div>
          <div className=""></div>
          <motion.div
            className="mb-10 flex items-center gap-2 z-100 will-change-transform"
            style={{ y }}
          >
            <span className="text-s font-general text-[12px] leading-none tracking-[0.03em] uppercase">
              scroll
            </span>
            <IoArrowDownSharp className="text-s text-[14px]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const BackgroundMedia = ({ activeItem }) => {
  const [scope, animate] = useAnimate();
  const [displayItem, setDisplayItem] = useState(activeItem);

  useEffect(() => {
    if (!activeItem) return;

    const getSize = () => {
      const w = window.innerWidth;

      if (w <= 360) return "300px"; // max-xsm ~ 75
      if (w <= 480) return "340px"; // max-sm  ~ 85
      if (w <= 768) return "400px"; // max-md  ~ 100
      if (w <= 1024) return "500px"; // max-lg  ~ 125

      return "600px"; // desktop
    };

    const run = async () => {
      const size = getSize();

      // RESET
      await animate(
        ".media-active",
        {
          scale: 0,
          width: "0px",
          height: "0px",
          borderRadius: "9999px",
          rotate: 0,
        },
        { duration: 0 },
      );

      // NASCE
      await animate(
        ".media-active",
        {
          scale: 1,
          width: size,
          height: size,
          borderRadius: "9999px",
        },
        { duration: 0.75, ease: [0.645, 0.045, 0.355, 1] },
      );

      // COMEÇA A GIRAR
      await animate(
        ".media-active",
        {
          rotate: 180,
          opacity: 0,
          filter: "grayscale(100%)",
        },
        { duration: 0.5, ease: [0.645, 0.045, 0.355, 1] },
      );

      // 🔥 TROCA NO MEIO
      setDisplayItem(activeItem);

      // TERMINA O GIRO
      await animate(
        ".media-active",
        {
          rotate: 360,
          opacity: 1,
          filter: "grayscale(0%)",
        },
        { duration: 0.5, ease: [0.645, 0.045, 0.355, 1] },
      );

      // EXPANDE
      await animate(
        ".media-active",
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "48px",
        },
        { duration: 0.5, ease: [0.645, 0.045, 0.355, 1] },
      );

      // FLATTEN FINAL (linear)
      await animate(
        ".media-active",
        { borderRadius: "0px" },
        { duration: 0.25, ease: "linear" },
      );
    };

    run();
  }, [activeItem, animate]);

  return (
    <div
      className="absolute inset-0 w-screen h-screen overflow-hidden"
      ref={scope}
    >
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.figure
          className="media-active relative overflow-hidden flex items-center justify-center"
          style={{ width: 0, height: 0 }}
        >
          {displayItem?.src.includes(".mp4") ? (
            <video
              src={displayItem.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover brightness-75"
            />
          ) : (
            <Image
              src={displayItem.src}
              fill
              alt=""
              priority
              className="object-cover brightness-75"
            />
          )}
        </motion.figure>
      </div>
    </div>
  );
};

const CenterTitle = ({ activeItem }) => {
  const isMobile = useIsMobile();
  const { x, y } = useMousePosition();

  const rotateYMotion = useTransform(x, [0.5, -0.5], [-25, 25]);
  const rotateXMotion = useTransform(y, [-0.5, 0.5], [-25, 25]);

  const rotateY = isMobile ? 0 : rotateYMotion;
  const rotateX = isMobile ? 0 : rotateXMotion;

  return (
    <motion.div
      className="absolute w-150 h-150 rounded-full flex items-center justify-center z-20 pointer-events-none overflow-hidden
      max-lg:w-125 max-lg:h-125 max-md:w-100 max-md:h-100 max-sm:w-85 max-sm:h-85 max-xsm:w-75 max-xsm:h-75 will-change-transform"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div key={activeItem.tick} className="text-center">
          <div className="overflow-hidden">
            <motion.h1
              className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-xsm:text-[12px] will-change-transform"
              variants={textSlide}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {activeItem.title}
              <span className="relative text-[12px] -top-[3px]">
                {activeItem.mark}
              </span>
            </motion.h1>
          </div>

          <div className="overflow-hidden mt-2">
            <motion.p
              className="text-s/50 text-[14px] opacity-50 tracking-[0.03em] uppercase max-xsm:text-[12px] will-change-transform"
              variants={textSlide}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {activeItem.year}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const CircleDial = ({ activeTick, rotation, onTickClick }) => {
  const { x, y } = useMousePosition();
  const isMobile = useIsMobile();
  const rotateYMotion = useTransform(x, [0.5, -0.5], [-20, 20]);
  const rotateXMotion = useTransform(y, [-0.5, 0.5], [-20, 20]);

  const rotateYFinal = isMobile ? 0 : rotateYMotion;
  const rotateXFinal = isMobile ? 0 : rotateXMotion;

  const [hover, setHover] = useState(null);
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="block w-150 h-150 bg-s/2 backdrop-blur-2xl rounded-full z-10 
      max-lg:w-125 max-lg:h-125 max-md:w-100 max-md:h-100 max-sm:w-85 max-sm:h-85 max-xsm:w-75 max-xsm:h-75 will-change-auto"
      initial={{ rotate: 360, transition: { duration: 0.5, delay: 0.5 } }}
      animate={{ rotate: rotation }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
      style={{
        rotateX: rotateXFinal,
        rotateY: rotateYFinal,
        transformStyle: isMobile ? "flat" : "preserve-3d",
      }}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />

      {Array.from({ length: totalTicks }).map((_, i) => {
        const angle = (360 / totalTicks) * i;
        const isBig = bigTicks.includes(i);
        const isActive = i === activeTick;
        const isHover = hover === i;

        const baseLength = isBig ? 25 : 12;

        return (
          <>
            <motion.line
              key={i}
              x1={center}
              y1={center - radius}
              x2={center}
              y2={center - radius - baseLength}
              stroke="white"
              strokeWidth={isBig ? (isMobile ? 10 : 6) : 1}
              opacity={isActive ? 1 : isBig ? 0.75 : 0.25}
              transform={`rotate(${angle} ${center} ${center})`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => isBig && onTickClick(i)}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              className={`
              ${isBig ? "cursor-pointer" : ""}
              ${
                isHover || isActive
                  ? "drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  : ""
              }
            will-change-auto`}
            />
          </>
        );
      })}
    </motion.svg>
  );
};

export default Hero;
