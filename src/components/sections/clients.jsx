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

  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const clients2 = [...clients, ...clients];
  return (
    <section
      ref={ref}
      className="relative p-10 py-20 w-full max-lg:px-5 max-md:px-2 overflow-hidden"
    >
      <div className="relative mb-20">
        <p className="text-p font-general font-medium text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
          — Trusted by visionaries
        </p>
      </div>

      <motion.div
        ref={container}
        className="flex w-max items-center gap-40 max-lg:gap-30 max-md:gap-20"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: clients.length * 2.5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {clients2.map((client, i) => {
          const Icon = client.icon;
          const active = hover === i;

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative flex items-center justify-center h-75"
            >
              <div className="w-30 flex items-center justify-center">
                <div className="flex flex-row gap-5">
                  <Icon
                    className={`ml-30 text-[82px] text-p ${
                      active ? "scale-90" : "scale-100"
                    } transition-all duration-500`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Clients;
