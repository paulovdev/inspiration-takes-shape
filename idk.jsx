"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { clients } from "@/data/clients.data";
import { useState } from "react";
const card = {
  initial: ({ customY }) => ({
    opacity: 0,
    y: customY,
  }),
  animate: ({ delay }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay,
    },
  }),
};

const lineX = {
  initial: {
    scaleX: 0,
    transition: {
      ease: [0.76, 0, 0.24, 1],
      duration: 0.5,
      delay: 0.25,
    },
  },
  animate: {
    scaleX: 1,
    transition: {
      ease: [0.76, 0, 0.24, 1],
      duration: 0.5,
    },
  },
};

const lineY = {
  initial: {
    scaleY: 0,
    transition: {
      ease: [0.76, 0, 0.24, 1],
      duration: 0.5,
      delay: 0.25,
    },
  },
  animate: {
    scaleY: 1,
    transition: {
      ease: [0.76, 0, 0.24, 1],
      duration: 0.5,
    },
  },
};

const Clients = ({ title }) => {
  const [hover, setHover] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  return (
    <section
      ref={ref}
      className="relative p-10 py-20 w-full max-lg:px-5 max-md:px-2 max-lg:py-16 max-md:py-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_60%)]" />

      <div className="relative mb-12">
        <p className="text-p font-general font-medium text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
          {title}
        </p>
      </div>

      <div
        ref={ref}
        className="relative grid grid-cols-4 grid-rows-2 border-t border-l border-p/15 z-10
                   max-lg:grid-cols-2 max-lg:grid-rows-4"
      >
        {clients.slice(0, 8).map((client, i) => {
          const Icon = client.icon;
          const active = hover === i;

          return (
            <motion.div
              key={i}
              custom={{ delay: i * 0.075, customY: 40 + i * 10 }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              variants={card}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              className="relative flex items-center justify-center h-[30vh]
                 border-r border-b border-p/15 group"
            >
              <div className="absolute top-3 left-3">
                <div className="w-fit h-5 overflow-hidden">
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    initial={{ y: 0 }}
                    animate={{ y: active ? -20 : 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <span className="text-p/75 font-general font-medium text-[14px] tracking-[-0.03em] uppercase">
                      {client.title}
                    </span>
                    <span className="text-p/75 font-general font-medium text-[14px] tracking-[-0.03em] uppercase ">
                      {client.title}
                    </span>
                  </motion.div>
                </div>
              </div>
              <div className="absolute bottom-3 right-3">
                <div className="w-5 overflow-hidden">
                  <motion.div
                    className="flex flex-row items-center justify-center gap-1"
                    initial={{ x: 0 }}
                    animate={{ x: active ? -20 : 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <span
                      className={`ml-4  text-p/75 font-medium text-[14px] tracking-[-0.03em] ${active ? "opacity-0" : "opacity-100"} transition-all duration-500 delay-250`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className=" text-p/75 font-medium text-[14px] tracking-[-0.03em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                </div>
              </div>
              <div className="w-30 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="flex flex-row gap-5"
                  initial={{ x: 0 }}
                  animate={{ x: active ? -100 : 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <Icon
                    className={`ml-30 text-[82px] text-p ${active ? "opacity-0" : "opacity-100"} transition-all duration-500 delay-250`}
                  />

                  <Icon className="mr-5 text-[82px] text-p" />
                </motion.div>
              </div>

              <>
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-p origin-left"
                  variants={lineX}
                  animate={active ? "animate" : "initial"}
                />

                <motion.div
                  className="absolute top-0 right-0 w-0.5 h-full bg-p origin-top"
                  variants={lineY}
                  initial="initial"
                  animate={active ? "animate" : "initial"}
                />

                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-p origin-right"
                  variants={lineX}
                  animate={active ? "animate" : "initial"}
                />

                <motion.div
                  className="absolute top-0 left-0 w-0.5 h-full bg-p origin-bottom"
                  variants={lineY}
                  animate={active ? "animate" : "initial"}
                />
              </>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Clients;
