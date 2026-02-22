import { useInView } from "react-intersection-observer";
import { textSlide } from "@/animations/shared/global-anim";
import TextAnimated from "@/components/ui/text-animated";

const Manifesto = ({ manifestoPhrases }) => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="relative px-10 pt-20 w-full flex flex-col items-start cursor-default max-lg:px-3 max-lg:pt-20 max-md:pt-10"
    >
      <TextAnimated
        phrases={manifestoPhrases}
        variants={textSlide}
        animate={inView}
        as="h2"
        className="max-w-[1200px] w-full flex flex-col"
        lineClassName="
          font-inter font-normal text-p text-[62px] tracking-[-0.035em] leading-[1.15] 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px]
          flex flex-wrap mb-12
        "
        wordClassName="mr-2"
        wordDelay={0.025}
        lineDelay={0.015}
      />

      <div className="w-full h-[1px] my-10 bg-s/15 max-lg:my-10 max-md:mt-0"></div>
    </div>
  );
};

export default Manifesto;
