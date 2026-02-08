import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import Button from "@/components/ui/button";
import { GoGlobe } from "react-icons/go";

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

  const contactOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const contactY = useTransform(scrollYProgress, [0.35, 0.45], [250, 0]);

  const globe = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const globeRotate = useTransform(scrollYProgress, [0, 1], [180, -180]);

  const manifest = useTransform(scrollYProgress, [0.4, 0.6], ["100%", "0%"]);
  const remote = useTransform(scrollYProgress, [0.4, 0.6], ["100%", "0%"]);
  const buttons = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const itemOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={container} className="relative h-[400vh] bg-p select-none">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="sticky top-0 p-10 h-screen flex flex-col items-center justify-center gap-5 overflow-hidden z-30 max-ds:p-8 max-lg:p-5 max-md:p-2">
          <div className="overflow-hidden h-fit">
            <motion.h1
              style={{ y: titleY }}
              className="font-normal text-s text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px]"
            >
              Our studios around the world
            </motion.h1>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <motion.div
            style={{
              opacity: imageOpacity,
              clipPath: imageClip,
            }}
            className="relative size-full bg-s will-change-transform pointer-events-auto"
          >
            {/*
             */}
            <motion.div
              style={{ opacity: contactOpacity, y: contactY }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 max-lg:p-5 max-md:px-2"
            >
              {/* globe */}
              <motion.div
                style={{
                  scale: globe,
                  opacity: itemOpacity,
                  rotateY: globeRotate,
                }}
              >
                <GoGlobe className="mb-10 text-p text-[110px] max-lg:text-[60px]" />
              </motion.div>
              {/* manifest */}
              <motion.div
                style={{ opacity: itemOpacity }}
                className="mb-12 max-w-[1400px] w-full font-inter font-normal text-p
          text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px]"
              >
                <div className="overflow-hidden h-fit">
                  <motion.h2 style={{ y: manifest }}>
                    From creative hubs across the globe,
                  </motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>
                    our studios connect ideas, people, and culture.
                  </motion.h2>
                </div>
              </motion.div>
              {/* remote */}
              <div className="h-fit overflow-hidden">
                <motion.p
                  style={{ y: remote, opacity: itemOpacity }}
                  className="mt-4 font-general text-[14px] tracking-[-0.04em] text-p/60 uppercase"
                >
                  São Paulo · New York · Berlin · Tokyo
                </motion.p>
              </div>
              {/* buttons */}
              <motion.div
                style={{ opacity: buttons, opacity: itemOpacity }}
                className="mt-10 flex gap-2 max-lg:w-150 max-md:w-110"
              >
                <Button
                  buttonHref="/studios"
                  buttonLabel="Explore our studios"
                  buttonBgColor="#ffffff"
                  buttonTextColor="#000000"
                  
                />
                <Button
                  buttonHref="/contact"
                  buttonLabel="Start a project"
                  buttonBgColor="#000000"
                  buttonTextColor="#ffffff"
                />
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
