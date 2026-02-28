import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import Button from "../ui/button";
import { opacity, textSlide } from "@/animations/shared/global-anim";
import TextAnimated from "../ui/text-animated";

const TextBlock = ({
  blockTitle,
  blockPhrases = [],
  showButton = false,
  buttonHref,
  buttonLabel,
  buttonTextColor,
  buttonBgColor,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`pb-10 max-lg:py-15 max-lg:pt-0 max-md:pb-10`}
    >
      <div className="p-10 w-full flex max-lg:flex-col items-start max-ds:p-8 max-lg:p-5 max-md:p-2 max-lg:gap-10">
        <div className="flex-1">
          <p className="text-p font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]">
            {blockTitle}
          </p>
        </div>

        <div className="flex-1 w-full flex flex-col items-start">
          <div className="max-w-200 flex flex-col items-start">
            <TextAnimated
              phrases={blockPhrases}
              animate={inView}
              variants={textSlide}
              className="font-inter font-normal text-p text-[22px] tracking-[-0.03em] max-lg:text-[22px] leading-[1.11]"
              lineClassName="overflow-hidden"
              wordClassName="mr-1"
              wordDelay={0.025}
              lineDelay={0.015}
            />
          </div>

          {showButton && (
            <motion.div
              className="mt-18 w-full flex"
              variants={opacity}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              custom={1}
            >
              <Button
                buttonHref={buttonHref}
                buttonLabel={buttonLabel}
                buttonTextColor={buttonTextColor}
                buttonBgColor={buttonBgColor}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextBlock;
