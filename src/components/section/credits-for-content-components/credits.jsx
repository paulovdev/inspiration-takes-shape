import { useState } from "react";
import { credits } from "./credits-for-content.data";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { bg, textHover, textSlide } from "./credits-for-content.animations";
const Credits = () => {
  const [hover, setHover] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  return (
    <div
      className="p-10 py-20 w-full h-fit bg-brd max-lg:p-5 max-md:p-2"
      ref={ref}
    >
      <div className="w-full mb-10 grid grid-cols-1 select-none">
        {credits.map((credit, i) => {
          const active = hover === i;

          return (
            <div
              key={i}
              className="relative p-2 w-full overflow-hidden h-fit"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <motion.div
                className="relative w-full grid grid-cols-3 items-center z-50"
                custom={i}
                variants={textSlide}
                initial="initial"
                animate={inView ? "animate" : "initial"}
              >
                {/*  */}

                <motion.div
                  variants={textHover}
                  initial="initial"
                  animate={active ? "animate" : "initial"}
                  className="col-span-2 text-p text-[62px] tracking-[-0.03em] leading-none max-lg:text-[48px] max-md:text-[32px]"
                  custom={15}
                >
                  {credit.name}
                </motion.div>

                {/*  */}

                <motion.div
                  href={credit.link}
                  variants={textHover}
                  initial="initial"
                  animate={active ? "animate" : "initial"}
                  className="w-full flex items-end justify-end"
                  custom={-15}
                >
                  <span className="font-general text-[14px] font-medium leading-[1.4] tracking-[0.03em] uppercase">
                    pinterest
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-p z-10"
                variants={bg}
                initial="initial"
                animate={active ? "animate" : "initial"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Credits;
