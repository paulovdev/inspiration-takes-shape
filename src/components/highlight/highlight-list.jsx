import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { bg, textHover, textSlide } from "./highlight-list.animations";

const HighlightList = ({
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
        <p className="text-p font-general font-medium text-[14px] tracking-[0.03em] uppercase max-md:text-[12px]">
          {title}
        </p>
      </div>
      <div className={`w-full grid ${grid} select-none`}>
        {data.map((item, i) => {
          const active = hover === i;

          return (
            <div
              key={i}
              className="relative p-2 w-full overflow-hidden h-fit"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <motion.div
                className={`relative w-full grid ${gridIn} items-center z-50`}
                custom={i}
                variants={textSlide}
                initial="initial"
                animate={inView ? "animate" : "initial"}
              >
                <div className="h-fit overflow-hidden">
                  <motion.h2
                    variants={textHover}
                    initial="initial"
                    animate={active ? "animate" : "initial"}
                    custom={15}
                    className="text-p text-[62px] tracking-[-0.03em] leading-none max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px]"
                  >
                    {item.title}
                  </motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  {item.link && (
                    <motion.a
                      href={item.link}
                      target="_blank"
                      variants={textHover}
                      initial="initial"
                      animate={active ? "animate" : "initial"}
                      custom={-15}
                      className="w-full flex items-end justify-end"
                    >
                      <span className="font-general text-[14px] font-medium leading-[1.4] tracking-[0.03em] underline underline-offset-2 uppercase max-md:text-[12px]">
                        {item?.subTitle || subTitle}
                      </span>
                    </motion.a>
                  )}
                </div>
                <div className=" h-fit overflow-hidden">
                  {item.subTitle &&
                    item.link !==
                    (
                      <motion.p
                        variants={textHover}
                        initial="initial"
                        animate={active ? "animate" : "initial"}
                        custom={-15}
                        className="w-full flex items-end justify-end"
                      >
                        <span className="font-general text-[14px] font-medium leading-[1.4] tracking-[0.03em] uppercase max-md:text-[12px]">
                          {item?.subTitle || subTitle}
                        </span>
                      </motion.p>
                    )}
                </div>
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

export default HighlightList;
