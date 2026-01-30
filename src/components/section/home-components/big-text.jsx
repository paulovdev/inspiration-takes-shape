"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Button from "@/components/button";
import { FaStarOfLife } from "react-icons/fa6";

const BigText = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "center start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -500]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.85]);

  const smallY = useTransform(scrollYProgress, [0.25, 0.55], [80, -80]);
  const smallOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.45],
    [0, 1, 0],
  );

  const imageOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.5, 0.75], [0.8, 5]);
  const imageY = useTransform(scrollYProgress, [0.5, 0.75], [100, -100]);

  const contactOpacity = useTransform(scrollYProgress, [0.72, 0.85], [0, 1]);
  const contactY = useTransform(scrollYProgress, [0.72, 0.9], [80, 0]);
  const contactScale = useTransform(scrollYProgress, [0.72, 0.9], [0.95, 1]);

  return (
    <section
      ref={container}
      className="relative  h-[700vh] select-none max-lg:p-5 max-md:p-2"
    >
      <div className="sticky top-0 p-10 h-screen flex flex-col items-center justify-center gap-6 overflow-hidden">
        <motion.h1
          style={{
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale,
          }}
          className="will-change-transform font-normal text-[92px] leading-[1.2] tracking-[-0.04em] text-start max-lg:text-[56px] max-md:text-[34px]"
        >
          We transform vision into structured design systems, connecting
          aesthetics, technology and human experience.
        </motion.h1>

        <motion.div
          style={{
            y: smallY,
            opacity: smallOpacity,
          }}
          className="will-change-transform absolute inset-0 flex items-center justify-center"
        >
          <p className="max-w-125 font-medium text-[14px] leading-[1.2] tracking-[0.03em] uppercase text-center max-md:text-[12px]">
            Inspiration takes shape®
          </p>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.figure
            style={{
              opacity: imageOpacity,
              scale: imageScale,
              y: imageY,
            }}
            className="will-change-transform relative w-125 h-125"
          >
            <Image
              src="/bg-1.jpg"
              width={2000}
              height={2000}
              alt=""
              className="size-full object-cover"
              priority
            />
          </motion.figure>
        </div>

        <motion.div
          style={{
            opacity: contactOpacity,
            y: contactY,
            scale: contactScale,
          }}
          className="will-change-transform absolute inset-0 p-10 flex flex-col items-center justify-center z-10 max-lg:p-5 max-md:p-2"
        >
          <FaStarOfLife className="mb-12 text-s text-[128px] tracking-[-0.03em] leading-none text-center max-lg:text-[48px] max-md:text-[42px]" />

          <p className="max-w-150 text-s font-medium text-[21px] tracking-[-0.03em] leading-[1.2] text-center max-lg:text-[16px]">
            Reliable production partner for teams adapting to the constantly
            evolving landscape of content production
          </p>

          <Button
            buttonHref="/contact"
            buttonLabel="contact us"
            buttonBgColor="#ffffff"
            buttonTextColor="#000000"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BigText;
