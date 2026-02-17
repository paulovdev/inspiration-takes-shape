import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import React, { useEffect, useRef, useState, forwardRef } from "react";

import { FaCircleExclamation } from "react-icons/fa6";

import { lab, manifestoPhrases } from "../../data/home.data";
import { heroIntro } from "../../animations/sections/home.animations";

import { useIsMobile } from "@/hooks/useIsMobile";

import BackgroundMedia from "./hero/bg-media";
import CenterTitle from "./hero/center-title";
import CircleDial from "./hero/circle-dial";
import Modal from "./hero/modal";
import Manifesto from "@/components/sections/manifesto";
import TextAnimated from "@/components/ui/text-animated";
import { textSlide } from "@/animations/shared/global-anim";
import { IoArrowDownSharp } from "react-icons/io5";

const totalTicks = 80;

const Hero = ({ lenis }) => {
  const container = useRef(null);
  const isMobile = useIsMobile();
  const [activeTick, setActiveTick] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modal, setModal] = useState(false);
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

  useEffect(() => {
    if (!lenis?.current) return;

    const body = document.body;

    if (isAnimating) {
      lenis.current.scrollTo(0, {
        immediate: true,
        lock: true,
      });
      body.style.overflow = "hidden";
      body.style.cursor = "wait";
      lenis.current.stop();
    } else {
      body.style.overflow = "";
      body.style.cursor = "";
      lenis.current.start();
    }

    return () => {
      body.style.overflow = "";
      body.style.cursor = "";
      lenis.current?.start();
    };
  }, [isAnimating, lenis]);

  return (
    <>
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
              activeTick={activeTick}
              isAnimatingRef={isAnimatingRef}
              setIsAnimating={setIsAnimating}
              dialRef={dialRef}
            />

            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20 will-change-transform"
              style={{ y, scale, perspective: 1400, rotateX }}
            >
              <CenterTitle
                activeItem={activeItem}
                setModal={setModal}
                isMobile={isMobile}
              />

              <CircleDial
                ref={dialRef}
                lab={lab}
                activeTick={activeTick}
                rotation={rotation}
                onTickClick={handleTickClick}
              />
            </motion.div>
            <div className=""></div>

            <div className="mb-10 flex justify-center z-100 will-change-transform">
              <div className="relative h-[14px] min-w-200 overflow-hidden">
                <AnimatePresence mode="sync" initial={false}>
                  {isAnimating ? (
                    <motion.div
                      key="loading"
                      initial={{ y: 19 }}
                      animate={{ y: 0 }}
                      exit={{ y: -19 }}
                      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <p className="whitespace-nowrap text-s font-general text-[12px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] animate-pulse duration-200">
                        Loading
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="scroll"
                      initial={{ y: 19 }}
                      animate={{ y: 0 }}
                      exit={{ y: -19 }}
                      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                      className="absolute inset-0 flex items-center justify-center gap-2"
                    >
                      <p className="flex items-center gap-2 whitespace-nowrap text-s font-general text-[12px] leading-none tracking-[0.03em] uppercase max-md:text-[12px]">
                        SCROLL DOWN TO VIEW MORE
                        <IoArrowDownSharp className="text-[14px]" />
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="absolute top-1/2 left-5 w-full h-screen max-lg:hidden">
              <p className="whitespace-nowrap text-s font-general text-[12px] leading-none tracking-[0.03em] uppercase flex items-center   gap-2 max-md:text-[12px] ">
                <FaCircleExclamation className="text-[12px]" />
                Click the rounded to change lab
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      <AnimatePresence mode="wait">
        {modal && (
          <Modal
            key={modal}
            setModal={setModal}
            modal={modal}
            activeItem={activeItem}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
