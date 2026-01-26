"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const BigText = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const smallY = useTransform(scrollYProgress, [0.4, 1], [60, -40]);
  const smallOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section
      ref={container}
      className="relative p-10 h-[200vh] select-none max-lg:p-5 max-md:p-2"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-6">
        <motion.h1
          style={{
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale,
          }}
          className="font-general font-medium text-[14px] leading-[1.2] tracking-[0.03em] uppercase text-center max-md:text-[12px]"
        >
          Inspiration takes shape®
        </motion.h1>

        <motion.div
          style={{
            y: smallY,
            opacity: smallOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <p className="max-w-125 font-general font-medium text-[14px] leading-[1.2] tracking-[0.03em] uppercase text-center max-md:text-[12px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
            aspernatur animi debitis illo perspiciatis libero eum vitae minima
            incidunt facilis! Dolor praesentium corporis culpa? Ullam quae
            nesciunt laudantium! Corrupti, laudantium?
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BigText;
