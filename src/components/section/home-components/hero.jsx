import {
  AnimatePresence,
  motion,
  useAnimate,
  useScroll,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState, forwardRef } from "react";

import { IoArrowDownSharp } from "react-icons/io5";
import { useMousePosition } from "@/hooks/useMousePosition";
import { lab } from "./home.data";
import { heroIntro, textSlideNoI } from "./home.animations";

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
  const isAnimatingRef = useRef(false);
  const dialRef = useRef(null);

  const activeItem = lab.find((i) => i.tick === activeTick);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const yMotion = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scaleMotion = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const rotateXMotion = useTransform(scrollYProgress, [0, 1], [0, -75]);

  const y = isMobile ? 0 : yMotion;
  const scale = isMobile ? 1 : scaleMotion;
  const rotateX = isMobile ? 0 : rotateXMotion;

  const y2 = useTransform(scrollYProgress, [0, 5], [0, 400]);

  const handleTickClick = (tickIndex) => {
    if (isAnimatingRef.current) return;
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
      className=" w-screen h-screen bg-black overflow-hidden select-none"
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
            isAnimatingRef={isAnimatingRef}
            dialRef={dialRef}
          />

          <motion.div
            ref={container}
            className="absolute inset-0 flex items-center justify-center z-20 will-change-transform"
            style={{ y, scale, perspective: 1400, rotateX }}
          >
            <CenterTitle activeItem={activeItem} />

            <CircleDial
              ref={dialRef}
              activeTick={activeTick}
              rotation={rotation}
              onTickClick={handleTickClick}
            />
          </motion.div>
          <div className=""></div>
          <div className="mb-10 flex items-center gap-2 z-100 will-change-transform">
            <span className="text-s font-general text-[12px] leading-none tracking-[0.03em] uppercase">
              scroll
            </span>
            <IoArrowDownSharp className="text-s text-[14px]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const BackgroundMedia = ({ activeItem, isAnimatingRef, dialRef }) => {
  const [scope, animate] = useAnimate();
  const [displayItem, setDisplayItem] = useState(activeItem);

  useEffect(() => {
    if (!activeItem || isAnimatingRef.current || !scope.current) return;

    let frame;

    const run = async () => {
      if (!dialRef.current) {
        frame = requestAnimationFrame(run);
        return;
      }

      const el = scope.current;
      const rect = dialRef.current.getBoundingClientRect();

      if (!rect.width) {
        frame = requestAnimationFrame(run);
        return;
      }

      const radius = rect.width / 2;
      const circleSmall = `circle(${radius - 40}px at 50% 50%)`;
      const circleFull = `circle(150% at 50% 50%)`;

      isAnimatingRef.current = true;

      await animate(
        el,
        {
          rotate: 0,
          opacity: 1,
          filter: "grayscale(0%) blur(0px)",
          clipPath: circleFull,
        },
        { duration: 0 },
      );

      await animate(
        el,
        {
          clipPath: circleSmall,
          filter: "grayscale(40%) blur(20px)",
        },
        { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
      );

      await animate(
        el,
        {
          rotate: 180,
          opacity: 0,
          filter: "grayscale(100%) blur(80px)",
        },
        { duration: 1, ease: [0.76, 0, 0.24, 1] },
      );

      setDisplayItem(activeItem);

      await animate(
        el,
        {
          rotate: 360,
          opacity: 1,
          filter: "grayscale(0%) blur(40px)",
        },
        { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
      );

      await animate(
        el,
        {
          clipPath: circleFull,
          filter: "grayscale(0%) blur(0px)",
        },
        { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
      );

      isAnimatingRef.current = false;
    };
    run();
    return () => cancelAnimationFrame(frame);
  }, [activeItem, animate]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <motion.div
        ref={scope}
        className="absolute inset-0 will-change-[clip-path,transform,filter]"
        style={{ clipPath: "circle(150% at 50% 50%)" }}
      >
        {displayItem?.src.includes(".mp4") ? (
          <video
            key={displayItem.src}
            src={displayItem.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover brightness-75"
          />
        ) : (
          <Image
            key={displayItem.src}
            src={displayItem.src}
            fill
            alt=""
            priority
            className="object-cover brightness-75"
          />
        )}
      </motion.div>
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
          <div className="h-[14px] overflow-hidden">
            <motion.h1
              className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] will-change-transform"
              variants={textSlideNoI}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1.25}
            >
              {activeItem.title}
              <span className="relative text-[10px] -top-[3px]">
                {activeItem.mark}
              </span>
            </motion.h1>
          </div>

          <div className="h-[16px] overflow-hidden mt-2">
            <motion.p
              className="text-s/50 text-[14px] opacity-50 tracking-[0.03em] uppercase max-md:text-[12px] will-change-transform"
              variants={textSlideNoI}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
            >
              {activeItem.year}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const CircleDial = forwardRef(({ activeTick, rotation, onTickClick }, ref) => {
  const { x, y } = useMousePosition();
  const isMobile = useIsMobile();
  const rotateYMotion = useTransform(x, [0.5, -0.5], [-20, 20]);
  const rotateXMotion = useTransform(y, [-0.5, 0.5], [-20, 20]);

  const rotateYFinal = isMobile ? 0 : rotateYMotion;
  const rotateXFinal = isMobile ? 0 : rotateXMotion;

  const [hover, setHover] = useState(null);
  return (
    <motion.svg
      ref={ref}
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
});

export default Hero;
