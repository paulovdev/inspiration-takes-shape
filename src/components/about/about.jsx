import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { textSlide } from "./about.animations";
import Button from "../button";
import { opacity } from "@/animations/global-anim";

const About = ({
  phrases = [],
  subPhrases = [],
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
      className={`py-20 ${bgColor} ${textColor}  max-lg:py-15 max-md:py-10`}
    >
      <div className="p-10 w-full grid grid-cols-3 max-lg:flex max-lg:flex-col max-lg:items-start max-lg:p-5 max-md:p-2 max-lg:gap-10">
        <div className="">
          {subPhrases.map((phrase, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                className="font-general font-medium text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-md:text-[12px]"
                custom={5 + i}
                variants={textSlide}
                initial="initial"
                animate={inView ? "animate" : "initial"}
              >
                {phrase}
              </motion.p>
            </div>
          ))}
        </div>

        <div className="col-start-3 flex flex-col items-start">
          {phrases.map((phrase, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                className="text-[28px] leading-[1.1] tracking-[-0.03em] max-lg:text-[24px] max-md:text-[22px] max-xsm:text-[20px]"
                custom={2.5 + i}
                variants={textSlide}
                initial="initial"
                animate={inView ? "animate" : "initial"}
              >
                {phrase}
              </motion.h2>
            </div>
          ))}

          <motion.div
            className="mt-10 flex"
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
