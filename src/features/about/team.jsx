import { motion } from "motion/react";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { team } from "@/data/about.data";
import PixelRevealImage from "@/components/ui/pixel-reveal-image/pixel-reveal-image";

const CARD_WIDTH = 450;

const Card = ({ tea, index }) => {
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
        src={tea.src}
        fill
        alt={tea.name}
        className="size-full object-cover"
      />
      <div className="absolute inset-0 p-5 flex flex-col items-end justify-end">
        <p className="mb-2 font-inter text-s text-[24px] tracking-[-0.03em] leading-[1] max-lg:text-[18px]">
          {tea.name}
        </p>
        <p className="text-s/50 font-general text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
          {tea.role}
        </p>
      </div>
    </figure>
  );
};

const Team = () => {
  const slides = [...team, ...team];

  const xKeyframes = useMemo(() => {
    const steps = [];
    for (let i = 0; i <= team.length; i++) {
      steps.push(-i * CARD_WIDTH);
    }
    return steps;
  }, []);

  return (
    <div className="relative pt-10 px-10 py-2 w-full overflow-hidden h-[100vh] max-lg:px-5 max-md:px-2">
      <div className="relative mb-12">
        <p className="text-p/50 font-general font-bold text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
          [our team]
        </p>
      </div>

      <motion.div
        className="relative mr-10 flex"
        animate={{ x: xKeyframes }}
        transition={{
          duration: team.length * 4,
          ease: [0.76, 0, 0.24, 1],
          times: xKeyframes.map((_, i) => i / (xKeyframes.length - 1)),
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {slides.map((tea, i) => (
          <Card key={i} tea={tea} index={i} />
        ))}
      </motion.div>
    </div>
  );
};

export default Team;
