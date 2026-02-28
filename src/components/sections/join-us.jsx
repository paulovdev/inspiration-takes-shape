import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ExportedImage from "next-image-export-optimizer";

const JoinUs = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.3],
    ["100%", "0%", "-150%"],
  );

  const imageOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const imageClip = useTransform(
    scrollYProgress,
    [0.35, 0.68],
    ["circle(0% at 50% 50%)", "circle(100.0% at 50% 50%)"],
  );

  const globe = useTransform(scrollYProgress, [0.4, 0.6], [0, 4]);

  const globeRotate = useTransform(scrollYProgress, [0, 1], [180, -180]);

  const manifest = useTransform(scrollYProgress, [0.5, 0.6], ["100%", "0%"]);

  const itemOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={container} className="relative h-[400vh] bg-p select-none">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="sticky top-0 p-10 w-full h-screen flex flex-col items-center justify-center gap-5 overflow-hidden z-30 max-ds:p-8 max-lg:p-5 max-md:p-2">
          <div className="overflow-hidden h-fit">
            <motion.h1
              style={{ y: titleY }}
              className="font-normal text-s text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px]"
            >
              Join Offset® and make a difference.
            </motion.h1>
          </div>
          <div className="absolute inset-0 w-screen h-screen -z-10">
            <ExportedImage
              src="/images/join.jpg"
              width={2000}
              height={2000}
              alt=""
              className="relative size-full object-cover"
            />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <motion.div
            style={{
              opacity: imageOpacity,
              clipPath: imageClip,
            }}
            className="relative size-full bg-s pointer-events-auto"
          >
            <motion.div className="absolute inset-0 size-full flex items-center justify-center z-10 max-lg:p-5 max-md:px-2">
              <motion.div
                style={{
                  scale: globe,
                  opacity: itemOpacity,
                  rotateY: globeRotate,
                }}
              >
                <p className="text-p text-[110px] max-lg:text-[60px]">+</p>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-10 size-full flex flex-col items-start justify-center text-p
           font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase max-md:text-[12px] max-ds:p-8 max-lg:p-5 max-md:px-2 will-change-transform"
              >
                <div className="overflow-hidden h-fit">
                  <motion.h2 style={{ y: manifest }}>SAO PAULO</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>RIO DE JANEIRO</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>NEW YORK</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>ORLANDO</motion.h2>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-10 size-full flex flex-col items-end justify-center text-p
           font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase max-md:text-[12px] max-ds:p-8 max-lg:p-5 max-md:px-2 will-change-transform"
              >
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>TOKYO</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>JAPAN</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>BERLIN</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>ROMA</motion.h2>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-10 size-full flex flex-col items-start justify-end font-inter font-normal text-p
          text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px] max-ds:p-8 max-lg:p-5 max-md:px-2 will-change-transform"
              >
                <div className="overflow-hidden h-fit">
                  <motion.h2 style={{ y: manifest }}>Phantom®</motion.h2>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-10 size-full flex flex-col items-end justify-end font-inter font-normal text-p
          text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px] max-ds:p-8 max-lg:p-5 max-md:px-2 will-change-transform"
              >
                <div className="overflow-hidden h-fit">
                  <motion.h2 style={{ y: manifest }}>팬텀®</motion.h2>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="relative size-full bg-p will-change-transform" />
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
