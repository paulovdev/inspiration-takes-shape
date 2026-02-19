import { awards } from "@/data/about.data";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { textSlide } from "@/animations/shared/global-anim";
import TextAnimated from "@/components/ui/text-animated";
const Awards = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  return (
    <section
      className="relative p-10 size-full flex flex-col items-center max-lg:px-5 max-md:px-2"
      ref={ref}
    >
      <div className="min-h-50 mt-10">
        <TextAnimated
          phrases={[
            `Offset has demonstrated its creativity and expertise through awards.With proven know-how and innovation, we elevate your brand and deliver optimal solutions.`,
          ]}
          variants={textSlide}
          animate={inView}
          className="max-w-125 mx-auto  text-p text-center font-general font-medium text-[14px] tracking-[-0.03em] leading-[1.2] uppercase max-md:text-[12px]"
          lineClassName="overflow-hidden"
          wordClassName="mr-1.5"
          wordDelay={0.025}
          lineDelay={0.015}
        />
      </div>
      <div className="relative w-full mb-12 flex items-start">
        <div className="h-fit overflow-hidden">
          <motion.p
            className="text-p  font-general font-medium text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]"
            variants={textSlide}
            initial="initial"
            animate={inView ? "animate" : "initial"}
          >
            [ Awards — 수상 내역 ]
          </motion.p>
        </div>
      </div>
      <div className="relative size-full flex items-start justify-between overflow-hidden max-md:flex-col">
        <div className="w-full flex flex-col items-start ">
          {awards.map((award, i) => (
            <div className="mb-2 w-full overflow-hidden h-fit">
              <motion.h3
                className="w-full flex items-center justify-between"
                custom={i * 0.075}
                variants={textSlide}
                initial="initial"
                animate={inView ? "animate" : "initial"}
              >
                <span className="text-p text-[62px] tracking-[-0.03em] leading-none max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px] group will-change-transform">
                  {award.title}
                </span>
                <span className="text-p text-[62px] tracking-[-0.03em] leading-none max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px] group will-change-transform">
                  {award.subTitle}
                </span>
              </motion.h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
