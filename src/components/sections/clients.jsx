import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "react-intersection-observer";
import { clients } from "@/data/clients.data";
import { useRef, useState } from "react";

const card = {
  initial: ({ customY }) => ({
    opacity: 0,
    y: customY,
  }),
  animate: ({ delay }) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1],
      delay,
    },
  }),
};

const Clients = () => {
  const container = useRef(null);
  const [hover, setHover] = useState(null);

  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative p-10 py-20 w-full max-lg:px-5 max-md:px-2 overflow-hidden"
    >
      <div className="relative mb-20">
        <p className="text-p font-general font-medium text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
          [ SELECTED CLIENTS — 선정된 고객 ]
        </p>
      </div>

      <div
        ref={container}
        className="relative grid grid-cols-6 items-start justify-between max-lg:grid-cols-4 max-md:grid-cols-3"
      >
        {clients.map((client, i) => {
          const Icon = client.icon;
          const active = hover === i;

          return (
            <motion.div
              key={i}
              custom={{
                delay: i * 0.04,
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              variants={card}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              className="relative flex items-center justify-center h-[30vh]"
            >
              <div className="w-30 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="flex flex-row gap-5"
                  animate={{ x: active ? -100 : 0 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Icon
                    className={`ml-30 text-[82px] text-p ${
                      active ? "opacity-0" : "opacity-100"
                    } transition-all duration-500 delay-200`}
                  />
                  <Icon className="mr-5 text-[82px] text-p" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Clients;
