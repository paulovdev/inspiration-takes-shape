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
      className={`pb-10 ${bgColor} ${textColor} max-lg:py-15 max-md:py-10`}
    >
      <div className="p-10 w-full flex max-lg:flex-col items-start max-ds:p-8 max-lg:p-5 max-md:p-2 max-lg:gap-10">
        <div className="flex-1"></div>
        <div className="flex-[0.75] w-full flex flex-col items-start">
          <div className="max-w-400 flex flex-col items-start">
            {phrases.map((phrase, i) => {
              const isPrinciple = phrase.startsWith("(0");

              const isTitle =
                phrase.includes("INSPIRATION TAKES SHAPE") ||
                phrase.includes("SINCE 2020 — 2026");

              return (
                <div key={i} className="overflow-hidden w-full">
                  <motion.p
                    custom={2.5 + i}
                    variants={textSlide}
                    initial="initial"
                    animate={inView ? "animate" : "initial"}
                    className={` text-[21px] max-lg:text-[16px] leading-[1.3]
            ${
              isTitle
                ? "mb-8 font-general font-semibold text-[14px]! tracking-[0.03em] uppercase "
                : isPrinciple
                  ? "mt-2 mb-2 font-general font-semibold text-[14px]! tracking-[0.03em] uppercase"
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
            className="mt-18 w-full flex"
            variants={opacity}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            custom={1}
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
