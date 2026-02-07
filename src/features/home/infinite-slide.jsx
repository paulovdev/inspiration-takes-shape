import { slide } from "@/data/home.data";
import { motion } from "motion/react";
import TextAnimated from "@/components/ui/text-animated";
import { textSlide } from "@/animations/shared/global-anim";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import PixelRevealImage from "@/components/ui/pixel-reveal-image/pixel-reveal-image";

const InfiniteSlide = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  const speed = 100;
  const slides = [...slide, ...slide];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setVisibleCount(0);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= 6) clearInterval(interval);
    }, 75);

    return () => clearInterval(interval);
  }, [inView, slides.length]);

  return (
    <div
      className="relative pt-10 px-10 py-2 w-full overflow-hidden h-fit bg-s max-ds:px-8 max-lg:px-5 max-md:px-2"
      ref={ref}
    >
      <div className="relative mb-12">
        <p className="text-p/50 font-general font-bold text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
          [from our Instagram]
        </p>
      </div>

      <motion.div
        className="flex"
        animate={{ x: ["0%", "-75%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: slides.length * (100 / speed),
        }}
      >
        {slides.map((slid, i) => (
          <figure
            key={i}
            className={`w-[350px] max-md:w-[250px] ${
              i % 2 === 0
                ? "h-[40vh] max-md:h-[35vh]"
                : "h-[30vh] max-md:h-[25vh]"
            } mr-2 flex-shrink-0`}
          >
            <PixelRevealImage
              inView={i < visibleCount}
              src={slid.src}
              fill
              alt=""
              className="size-full object-cover"
            />
          </figure>
        ))}
      </motion.div>

      <div className="my-20">
        <TextAnimated
          phrases={[`— See more at @inspiration_takes_shape`]}
          variants={textSlide}
          animate={inView}
          as="h2"
          className="max-w-[1400px] w-full "
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

export default InfiniteSlide;
