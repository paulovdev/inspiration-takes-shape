import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IoArrowDownSharp } from "react-icons/io5";
import { scale } from "../../animations/sections/hero.animations";
import { textSlide } from "@/animations/shared/global-anim";
import TextAnimated from "../ui/text-animated";

import ExportedImage from "next-image-export-optimizer";

const PageHero = ({ title = [], subTitle, src }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  return (
    <>
      <section
        className="relative w-full h-dvh overflow-hidden"
        ref={container}
      >
        <motion.div
          className="relative w-screen h-screen overflow-hidden transform-gpu"
          style={{ y }}
        >
          <motion.figure
            className=" absolute inset-0 overflow-hidden w-screen h-screen"
            variants={scale}
            initial="initial"
            animate="animate"
            custom={0}
          >
            <ExportedImage
              src={src}
              width={2000}
              height={2000}
              className="relative size-full object-cover brightness-60"
              alt={title}
            />
          </motion.figure>

          <div className="absolute inset-0 w-screen h-screen">
            <div className="w-full h-screen flex flex-col items-center justify-between gap-6">
              <div className="size-full flex flex-col justify-center items-center">
                <div className="mb-5 h-fit overflow-hidden">
                  <motion.span
                    variants={textSlide}
                    initial="initial"
                    animate="animate"
                    custom={0.1}
                    className="text-s font-general text-[14px] leading-none tracking-[-0.03em] uppercase text-center flex items-center gap-2 will-change-transform
                    max-md:text-[12px]"
                  >
                    {subTitle}
                  </motion.span>
                </div>

                <TextAnimated
                  phrases={title}
                  variants={textSlide}
                  as="h2"
                  className="max-w-[1400px] w-full flex flex-col"
                  lineClassName="
          text-s text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px] 
          flex items-center justify-center flex-wrap mb-12
        "
                  wordClassName="mr-2"
                  wordDelay={0.025}
                  lineDelay={0.015}
                />
              </div>

              <div className="mb-10 overflow-hidden">
                <motion.span
                  variants={textSlide}
                  initial="initial"
                  animate="animate"
                  custom={0.2}
                  className="max-md:hidden text-s font-general text-[12px] leading-none tracking-[-0.03em] uppercase flex items-center gap-2 will-change-transform"
                >
                  scroll down
                  <IoArrowDownSharp className="text-s text-[14px] " />
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};
export default PageHero;
