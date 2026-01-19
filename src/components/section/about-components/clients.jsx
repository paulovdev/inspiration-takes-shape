import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { bg, textHover, textSlide } from "./about.animations";
import { clients } from "./about.data";

const Clients = () => {
  const container = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(clients.length - 1, Math.floor(v * clients.length));
    setActiveIndex(index);
  });

  return (
    <section ref={ref} className="pt-20 bg-s">
      <div className="p-10 w-full flex flex-col max-lg:p-5 max-md:p-2">
        <div className="mb-10">
          <p className="text-p font-general font-medium text-[12px] tracking-[0.03em] uppercase">
            CLIENTS
          </p>
        </div>

        <div ref={container} className="w-full grid grid-cols-1 select-none">
          {clients.map((client, i) => {
            const active = activeIndex === i;

            return (
              <motion.div
                key={i}
                className="relative p-2 w-full overflow-hidden will-change-auto"
              >
                <motion.div
                  className="absolute inset-0 bg-p z-10 will-change-auto"
                  variants={bg}
                  initial="initial"
                  animate={active ? "animate" : "initial"}
                />

                <motion.h2
                  className="relative z-50 text-p text-[62px] tracking-[-0.03em] will-change-auto max-lg:text-[48px] max-md:text-[32px]"
                  custom={i}
                  variants={textSlide}
                  initial="initial"
                  animate={inView ? "animate" : "initial"}
                >
                  <motion.span
                    className="inline-block will-change-auto"
                    variants={textHover}
                    initial="initial"
                    animate={active ? "animate" : "initial"}
                    custom={15}
                  >
                    {client}
                  </motion.span>
                </motion.h2>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Clients;
