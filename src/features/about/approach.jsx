import { approach } from "@/data/about.data";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { textSlide } from "@/animations/shared/global-anim";
import TextAnimated from "@/components/ui/text-animated";
<<<<<<< HEAD
=======
import PixelRevealImage from "@/components/ui/pixel-reveal-image/pixel-reveal-image";
>>>>>>> 75c7aba ( newasd as)

const textSlideNoI = {
  initial: {
    y: "100%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.5,
    },
  },
  animate: (custom) => ({
    y: "0",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
  exit: {
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.5,
    },
  },
};

const CardGrid = ({ gallery, index, activeIndex, setActiveIndex }) => {
  const active = activeIndex === index;
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      className="relative group perspective-midrange flex-[1_1_0%] min-w-0 max-lg:w-full"
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(1)}
      animate={{ flexGrow: active ? 2 : 1.25 }}
      transition={{
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <motion.figure
        ref={ref}
        className="w-full h-[75vh] overflow-hidden max-lg:h-[60vh]"
        initial={{
          opacity: 0,
          rotateX: 45,
          rotateY: -45,
          filter: "brightness(0%)",
        }}
        animate={{
          opacity: inView ? 1 : 0,
          rotateX: inView ? 0 : 45,
          rotateY: inView ? 0 : -45,
          filter: inView ? "brightness(100%)" : "brightness(0%)",
          transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: index * 0.01,
          },
        }}
      >
        {gallery.src.includes(".mp4") ? (
          <video
            src={gallery.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metada"
            className="size-full object-cover brightness-80"
          />
        ) : (
<<<<<<< HEAD
          <Image
=======
          <PixelRevealImage
            inView={inView}
>>>>>>> 75c7aba ( newasd as)
            src={gallery.src}
            width={2000}
            height={2000}
            alt={gallery.alt}
<<<<<<< HEAD
            priority
=======
>>>>>>> 75c7aba ( newasd as)
            className="size-full object-cover brightness-80"
          />
        )}

        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="h-fit overflow-hidden">
            <motion.p
              className="text-s text-center font-general font-medium text-[14px] tracking-[-0.03em] leading-[1.2] uppercase max-md:text-[12px]"
              variants={textSlide}
              initial="initial"
              animate={inView ? "animate" : "initial"}
            >
              {gallery.style}
            </motion.p>
          </div>

          <TextAnimated
            phrases={gallery.description}
            variants={textSlideNoI}
            animate={inView && active}
<<<<<<< HEAD
            className="max-w-125 mx-auto min-h-20 font-inter font-normal text-s text-center text-[24px] tracking-[-0.03em] leading-[1] will-change-transform max-lg:text-[18px]"
=======
            className="max-w-100 mx-auto min-h-20 font-inter font-normal text-s text-center text-[18px] tracking-[-0.03em] leading-[1] will-change-transform max-lg:text-[16px]"
>>>>>>> 75c7aba ( newasd as)
            lineClassName="overflow-hidden"
            wordClassName="mr-1.5"
            wordDelay={0.025}
            lineDelay={0.015}
          />
        </div>
      </motion.figure>
    </motion.div>
  );
};

const Approach = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
<<<<<<< HEAD
  <section className="relative px-10 w-screen h-full overflow-hidden max-lg:px-5 max-md:px-2">
=======
    <section className="relative px-10 w-screen h-full overflow-hidden max-lg:px-5 max-md:px-2">
>>>>>>> 75c7aba ( newasd as)
      <div className="w-full flex items-center flex-wrap gap-2 max-lg:flex-col snap-mandatory overflow-x-scroll ">
        {approach.map((gallery, i) => (
          <CardGrid
            key={i}
            gallery={gallery}
            index={i}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Approach;
