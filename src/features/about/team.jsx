<<<<<<< HEAD
import { slide } from "@/data/home.data";
=======
>>>>>>> 75c7aba ( newasd as)
import Image from "next/image";
import { motion } from "motion/react";

import { useInView } from "react-intersection-observer";
<<<<<<< HEAD
import { useRef } from "react";
import { team } from "@/data/about.data";
=======

import { team } from "@/data/about.data";
import PixelRevealImage from "@/components/ui/pixel-reveal-image/pixel-reveal-image";
>>>>>>> 75c7aba ( newasd as)

const Team = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: false,
  });
  const speed = 100;
  const slides = [...team, ...team, ...team];

  return (
    <div
      className="relative pt-10 px-10 py-2 w-full overflow-hidden h-fit max-ds:px-8 max-lg:px-5 max-md:px-2"
      ref={ref}
    >
      <div className="relative mb-12">
        <p className="text-p/50 font-general font-bold text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
<<<<<<< HEAD
          [nosso time]
=======
          [our team]
>>>>>>> 75c7aba ( newasd as)
        </p>
      </div>
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-75%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: slides.length * (500 / speed),
        }}
      >
        {team.map((tea, i) => {
          const mod = i % 2 === 0;
          return (
            <figure
              key={i}
              className={`relative w-[450px] max-md:w-[250px] ${mod ? "h-[60vh] max-md:h-[50vh]" : "h-[50vh] max-md:h-[40vh]"} mr-2 flex-shrink-0`}
            >
<<<<<<< HEAD
              <Image
=======
              <PixelRevealImage
                inView={inView}
>>>>>>> 75c7aba ( newasd as)
                src={tea.src}
                width={2000}
                height={2000}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 p-5 size-full flex flex-col items-end justify-end">
                <p className="font-inter font-normal text-s text-center text-[24px] tracking-[-0.03em] leading-[1] will-change-transform max-lg:text-[18px]">
                  {tea.name}
                </p>
                <p className="text-s/50 font-general font-medium text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
                  {tea.role}
                </p>
              </div>
            </figure>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Team;
