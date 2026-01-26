import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { textSlide } from "./about.animations";
import Button from "../button";
import { opacity } from "@/animations/global-anim";

const About = ({
  phrases = [],

  showButton = false,
  buttonHref,
  buttonLabel,
  buttonTextColor,
  buttonBgColor,
  bgColor,
  textColor,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`py-20 ${bgColor} ${textColor} max-lg:py-15 max-md:py-10`}
    >
      <div className="p-10 w-full grid grid-cols-3 max-lg:flex max-lg:flex-col max-lg:items-start max-lg:p-5 max-md:p-2 max-lg:gap-10">
        <div className="col-start-3 w-full flex flex-col items-start">
          <div className="max-w-125 flex flex-col items-start">
            {phrases.map((phrase, i) => {
              const isPrinciple = phrase.startsWith("(0");

              const isTitle =
                phrase.includes("INSPIRATION TAKES SHAPE") ||
                phrase.includes("SINCE 2020 | 2026");

              return (
                <div key={i} className="overflow-hidden w-full">
                  <motion.p
                    custom={2.5 + i}
                    variants={textSlide}
                    initial="initial"
                    animate={inView ? "animate" : "initial"}
                    className={`
            font-general text-[14px] uppercase max-md:text-[12px]
            ${
              isTitle
                ? "font-semibold tracking-[0.03em] mb-8"
                : isPrinciple
                  ? "font-semibold tracking-[0.03em] mt-2 mb-1"
                  : "font-medium tracking-[0.03em] opacity-75"
            }
          `}
                  >
                    {phrase}
                  </motion.p>
                </div>
              );
            })}
          </div>

          <motion.div
            className="mt-8 w-full flex"
            variants={opacity}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            custom={1.2}
          >
            {showButton && (
              <Button
                buttonHref={buttonHref}
                buttonLabel={buttonLabel}
                buttonTextColor={buttonTextColor}
                buttonBgColor={buttonBgColor}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
