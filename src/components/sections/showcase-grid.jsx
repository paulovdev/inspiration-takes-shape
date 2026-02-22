import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "motion/react";

import { line, textSlide } from "@/animations/shared/global-anim";

const ShowcaseGrid = ({
  data = [],
  title,
  subTitle,
  grid = "grid-cols-4 max-ds:grid-cols-3 max-lg:grid-cols-2",
  gridIn = "grid-cols-1",
}) => {
  const [hover, setHover] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="p-10 py-20 w-full h-fit bg-s max-lg:px-5 max-md:px-2 max-lg:py-15 max-md:py-10"
    >
      <div className="mb-10 pl-2">
        <p className="text-p font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]">
          {title}
        </p>
      </div>

      <div className={`w-full grid ${grid} select-none`}>
        {data.map((item, i) => {
          const active = hover === i;
          return (
            <div
              key={i}
              className="relative p-2 w-full overflow-hidden h-fit cursor-pointer"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <motion.div
                className={`relative w-full grid ${gridIn} items-center z-50`}
                custom={i * 0.075}
                variants={textSlide}
                initial="initial"
                animate={inView ? "animate" : "initial"}
              >
                <div className="h-fit overflow-hidden relative">
                  <h2 className="text-p text-[62px] tracking-[-0.03em] leading-none max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px] will-change-transform">
                    {item.title}
                  </h2>
                </div>

                <div className="h-fit overflow-hidden">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      className="w-full flex items-end justify-end will-change-transform relative"
                    >
                      <span className="font-general text-[14px] font-medium leading-[1.4] tracking-[-0.03em] underline underline-offset-2 uppercase max-md:text-[12px]">
                        {item?.subTitle || subTitle}
                      </span>
                    </a>
                  )}
                </div>

                <div className="h-fit overflow-hidden">
                  {item.subTitle && !item.link && (
                    <p className="w-full flex items-end justify-end will-change-transform">
                      <span className="font-general text-[14px] font-medium leading-[1.4] tracking-[-0.03em] uppercase max-md:text-[12px]">
                        {item.subTitle || subTitle}
                      </span>
                    </p>
                  )}
                </div>
              </motion.div>
              <motion.div
                className="absolute bottom-0 w-full border-2 border-b border-p"
                variants={line}
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

export default ShowcaseGrid;
