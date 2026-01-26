import { services } from "@/data/about.data";

import { useInView } from "react-intersection-observer";

import { motion } from "motion/react";
import Image from "next/image";

import { textSlide, textSlideNoI } from "../home-components/home.animations";
import { useState } from "react";

const CardGrid = ({ gallery, index }) => {
  const [hover, setHover] = useState(false);
  const active = hover === index;
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      className="relative group perspective-midrange"
      onMouseEnter={() => setHover(index)}
      onMouseLeave={() => setHover(false)}
      animate={{ flexGrow: active ? 4 : 1 }}
      transition={{
        duration: 0.75,
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
            className="size-full object-cover"
          />
        ) : (
          <Image
            src={gallery.src}
            width={2000}
            height={2000}
            alt={gallery.alt}
            priority
            className="size-full object-cover"
          />
        )}

        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="h-fit overflow-hidden">
            <motion.p
              className="text-s font-general text-[14px] tracking-[0.03em] uppercase text-center"
              variants={textSlide}
              initial="initial"
              animate={inView ? "animate" : "initial"}
            >
              {gallery.style}
            </motion.p>
          </div>

          <div className="min-h-20">
            {gallery.description.map((phrase, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase text-center"
                  variants={textSlideNoI}
                  initial="initial"
                  animate={inView ? "animate" : "initial"}
                  custom={0.5 + i * 0.075}
                >
                  {phrase}
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </motion.figure>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="relative p-10 bg-s w-screen h-full overflow-hidden max-lg:px-5 max-md:px-2">
     
      <div className="w-full flex items-center flex-wrap gap-2 max-lg:flex-nowrap snap-mandatory overflow-x-scroll ">
        {services.map((gallery, i) => (
          <CardGrid key={i} gallery={gallery} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Services;
