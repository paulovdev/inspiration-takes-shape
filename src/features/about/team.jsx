import { useMousePosition2 } from "@/hooks/useMousePosition";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { team } from "@/data/about.data";
import { useIsMobile } from "@/hooks/useIsMobile";
import ExportedImage from "next-image-export-optimizer";

export const clipAnim = {
  initial: { clipPath: "inset(100% 0% 0% 0%)" },
  animate: (i) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.25 + 0.075 * i,
    },
  }),
};
export const textSlideAnim = {
  initial: { y: "100%" },
  animate: {
    y: "0",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.15,
    },
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const Card = ({ tea, index, setHovered }) => {
  return (
    <div className="">
      <figure className="relative w-fit h-[75vh] max-ds:h-[35vh]">
        <ExportedImage
          src={tea.src}
          width={2000}
          height={2000}
          alt={tea.name}
          className="w-125 h-full object-cover"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(null)}
        />
      </figure>
      <div className="relative py-5 flex flex-col items-start justify-start">
        <p className="mb-2 font-general text-p text-[14px] tracking-[-0.03em] leading-none uppercase max-lg:text-[12px]">
          {tea.name}
        </p>
        <p className="mb-2 font-general text-p/50 text-[12px] tracking-[-0.03em] leading-none uppercase max-lg:text-[10px]">
          {tea.role}
        </p>
      </div>
    </div>
  );
};

const Slides = () => {
  const [hovered, setHovered] = useState(null);
  const { x, y } = useMousePosition2();
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <>
      <div
        ref={ref}
        className="relative bg-s pt-10 py-2 w-full overflow-hidden h-fit max-ds:px-8 max-lg:px-5 max-md:px-2"
      >
        <div className="relative px-10 mb-12 max-ds:px-8 max-lg:px-5 max-md:px-2">
          <p className="text-p font-general font-medium text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px]">
            — Team
          </p>
        </div>
        <div className="max-lg:pl-5 max-md:pl-2 w-fit pr-0 flex items-start gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory">
          <Swiper
            autoplay={{ delay: 5000 }}
            loop={true}
            modules={[Autoplay]}
            spaceBetween={8}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              992: { slidesPerView: 3.2 },
            }}
          >
            {team.map((tea, i) => (
              <SwiperSlide key={i} className="w-fit!">
                <Card
                  tea={tea}
                  setHovered={setHovered}
                  className="size-full overflow-hidden"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {!isMobile && hovered && (
          <motion.div
            className="fixed bg-s/5 rounded-full backdrop-blur-lg z-1000 "
            style={{
              left: x,
              top: y,
              translateX: "-50%",
              translateY: "-50%",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: {
                duration: 0.25,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.5,
              },
            }}
          >
            <motion.div className="w-40 h-40 flex items-center justify-center gap-2">
              <div className="h-fit overflow-hidden">
                <motion.p
                  className="text-s text-center font-general font-medium text-[14px] tracking-[-0.03em] leading-[1.2] uppercase max-md:text-[12px]"
                  {...textSlideAnim}
                >
                  Drag
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Slides;
