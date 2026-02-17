import { motion } from "motion/react";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import PixelRevealImage from "@/components/ui/pixel-reveal-image/pixel-reveal-image";
import { slide } from "@/data/home.data";
import TextAnimated from "@/components/ui/text-animated";
import { textSlide } from "@/animations/shared/global-anim";
import { FaHeart, FaComment } from "react-icons/fa";

const CARD_WIDTH = 450;

const Card = ({ src, index }) => {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <figure
      ref={ref}
      className={`relative w-[450px] max-md:w-[250px] ${
        index % 2 === 0
          ? "h-[60vh] max-md:h-[50vh]"
          : "h-[50vh] max-md:h-[40vh]"
      } mr-2 flex-shrink-0`}
    >
      <PixelRevealImage
        inView={inView}
        src={src}
        fill
        alt=" "
        className="size-full object-cover"
      />
      <div className="absolute inset-0 p-5 flex flex-col items-end justify-end">
        <p className="mb-2 font-inter text-s text-[24px] tracking-[-0.03em] leading-[1] max-lg:text-[18px] flex items-center gap-2">
          <FaHeart className="text-red-500" /> 1.2K
        </p>
        <p className="text-s/50 font-general text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px] flex items-center gap-2">
          <FaComment /> 324
        </p>
      </div>
    </figure>
  );
};

const Team = () => {
  const slides = [...slide, ...slide];

  const xKeyframes = useMemo(() => {
    const steps = [];
    for (let i = 0; i <= slide.length; i++) {
      steps.push(-i * CARD_WIDTH);
    }
    return steps;
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <div
      className="relative pt-10 px-10 py-2 w-full overflow-hidden h-[100vh] max-lg:px-5 max-md:px-2 max-lg:h-fit max-lg:pt-0"
      ref={ref}
    >
      <div className="relative mb-12 flex items-center gap-1">
        <p className="text-p/50 font-general font-bold text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
          [from our Instagram —
        </p>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className="relative text-p font-general font-bold text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px] group cursor-pointer"
        >
          @inspiration_takes_shape
          <span className="absolute left-0 -bottom-[1px] h-[2px] w-0 bg-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
        </a>
        <p className="text-p/50"> ]</p>
      </div>

      <motion.div
        className="relative mr-10 flex"
        animate={{ x: xKeyframes }}
        transition={{
          duration: slide.length * 4,
          ease: [0.76, 0, 0.24, 1],
          times: xKeyframes.map((_, i) => i / (xKeyframes.length - 1)),
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {slides.map((src, i) => (
          <Card key={i} src={src.src} index={i} />
        ))}
      </motion.div>

      <div className="mt-40 mb-20 max-lg:mt-10 max-lg:mb-0">
        <TextAnimated
          phrases={[`Join a team shaping the future of intelligent systems.`]}
          variants={textSlide}
          animate={inView}
          as="h2"
          className="max-w-[1400px] w-full"
          lineClassName="
            font-inter font-normal text-p
          text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px]
            flex flex-wrap mb-12
          "
          wordClassName="mr-2.5"
          wordDelay={0.025}
          lineDelay={0.015}
        />
      </div>
    </div>
  );
};

export default Team;
