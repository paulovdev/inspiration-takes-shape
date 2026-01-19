import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import Link from "next/link";
import { textSlide } from "./about.animations";

const About = ({
  phrases = [],
  subPhrases = [],
  showButton = false,
  buttonHref,
  buttonLabel,
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
      <div className="p-10 w-full flex items-start justify-between max-lg:flex-col max-lg:items-start max-lg:p-5 max-md:p-2 gap-10">
        <div>
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

        <div className="flex flex-col items-start  ">
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

          {showButton && (
            <Link
              href={buttonHref}
              scroll={false}
              className="mt-10 px-20 py-2 bg-current"
            >
              <span
                className={`font-general text-[12px] font-medium tracking-[0.03em] uppercase ${bgColor.replace("bg-", "text-")}`}
              >
                {buttonLabel}
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
