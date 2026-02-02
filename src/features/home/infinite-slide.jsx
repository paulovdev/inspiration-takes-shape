import { slide } from "@/data/home.data";
import Image from "next/image";
import { motion } from "motion/react";

const InfiniteSlide = () => {
  const speed = 100;

  const slides = [...slide, ...slide];

  return (
    <div className="relative px-10 py-2 w-full overflow-hidden h-fit bg-s max-ds:px-8 max-lg:px-5 max-md:px-2">
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
        {slides.map((slid, i) => {
          const mod = i % 2 === 0;
          return (
            <figure
              key={i}
              className={`w-[350px] max-md:w-[250px] ${mod ? "h-[40vh] max-md:h-[35vh]" : "h-[30vh] max-md:h-[25vh]"} mr-2 flex-shrink-0`}
            >
              <Image
                src={slid.src}
                width={2000}
                height={2000}
                alt=""
                className="w-full h-full object-cover"
              />
            </figure>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InfiniteSlide;
