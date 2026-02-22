import { useInView } from "react-intersection-observer";

import { textSlide } from "@/animations/shared/global-anim";
import TextAnimated from "@/components/ui/text-animated";
const Mnaso = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <>
      <section
        ref={ref}
        className="relative px-10 pt-20 w-full flex flex-col items-start cursor-default max-ds:px-8 max-lg:px-5 max-md:px-2 max-lg:pt-20 max-md:pt-10"
      >
        <TextAnimated
          phrases={[
            `Offset® bridges strategy and execution, turning AI ambition into real, shipped solutions that move teams forward.`,
            ``,
          ]}
          variants={textSlide}
          animate={inView}
          as="h2"
          className="max-w-[1200px] flex flex-col max-ds:max-w-[700px] max-lg:max-w-full"
          lineClassName="font-inter font-normal text-p text-[62px] tracking-[-0.035em] leading-[1.15] max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px] flex flex-wrap mb-14"
          wordClassName="mr-2"
          wordDelay={0.035}
          lineDelay={0.035}
        />
        <div className="mb-20 w-full flex items-end justify-end">
          <TextAnimated
            phrases={[
              `With deep technical expertise and sharp product thinking, we help organizations go beyond ideas and actually win with AI.`,
              ``,
              `We don’t just advise or prototype. We build, execute, and deliver AI solutions that create real impact.`,
            ]}
            variants={textSlide}
            animate={inView}
            className="max-w-125 text-p text-end font-general font-medium text-[14px] tracking-[-0.03em] leading-[1.2] uppercase max-md:text-[12px]"
            lineClassName="overflow-hidden"
            wordClassName="mr-1.5"
            wordDelay={0.025}
            lineDelay={0.035}
          />
        </div>
      </section>
    </>
  );
};

export default Mnaso;
