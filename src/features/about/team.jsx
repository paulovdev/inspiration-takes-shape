import { motion } from "motion/react";

import { useInView } from "react-intersection-observer";
import { team } from "@/data/about.data";
import PixelRevealImage from "@/components/ui/pixel-reveal-image/pixel-reveal-image";

const Card = ({ tea, index }) => {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <div className="" ref={ref}>
      <figure className="relative w-full h-[50vh]">
        <PixelRevealImage
          inView={inView}
          src={tea.src}
          fill
          alt={tea.name}
          className="size-full object-cover"
        />
      </figure>
      <div className="relative py-5 flex flex-col items-start justify-start">
        <p className="mb-2 font-general text-p text-[14px] tracking-[-0.03em] leading-none uppercase max-lg:text-[18px]">
          {tea.name}
        </p>
        <p className="mb-2 font-general text-p/50 text-[14px] tracking-[-0.03em] leading-none uppercase max-lg:text-[18px]">
          {tea.role}
        </p>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <div className="relative pt-10 px-10 py-2 w-full overflow-hidden h-fit max-lg:px-5 max-md:px-2">
      <div className="relative mb-12">
        <p className="text-p/50 font-general font-bold text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
          [ Team — 팀 ]
        </p>
      </div>

      <motion.div className="relative grid grid-cols-4 gap-5">
        {team.map((tea, i) => (
          <Card key={i} tea={tea} index={i} />
        ))}
      </motion.div>
    </div>
  );
};

export default Team;
