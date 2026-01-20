import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IoArrowDownSharp } from "react-icons/io5";
import { textSlide, scale } from "./heros.animations";
import Image from "next/image";

const Hero = ({ title, subTitle, src }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <>
      <section
        className="relative w-screen h-screen overflow-hidden"
        ref={container}
      >
        <motion.div
          className="relative w-screen h-screen overflow-hidden will-change-transform"
          style={{ y }}
        >
          <div className="absolute inset-0 w-screen h-screen -z-10">
            <motion.figure
              className="overflow-hidden size-full"
              variants={scale}
              initial="initial"
              animate="animate"
              custom={0}
            >
              {src.includes(".mp4") ? (
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="relative size-full object-cover brightness-75"
                />
              ) : (
                <Image
                  src={src}
                  width={2000}
                  height={2000}
                  alt={title}
                  priority
                  className="relative size-full object-cover brightness-75"
                />
              )}
            </motion.figure>
          </div>

          <div className="absolute inset-0 w-screen h-screen">
            <div className=" w-full h-screen flex flex-col items-center justify-between gap-6">
              <div className="size-full flex flex-col justify-center items-center">
                <div className="mb-5 h-fit overflow-hidden">
                  <motion.span
                    variants={textSlide}
                    initial="initial"
                    animate="animate"
                    custom={3}
                    className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase flex items-center gap-2 will-change-transform
                    max-md:text-[12px]"
                  >
                    {subTitle}
                  </motion.span>
                </div>

                <div className="h-fit overflow-hidden">
                  <motion.h2
                    variants={textSlide}
                    initial="initial"
                    animate="animate"
                    custom={4}
                    className="text-s text-[62px] tracking-[-0.03em] leading-none max-lg:text-[48px] max-md:text-[42px]"
                  >
                    {title}
                  </motion.h2>
                </div>
              </div>

              <div className="mb-10 overflow-hidden">
                <motion.span
                  variants={textSlide}
                  initial="initial"
                  animate="animate"
                  custom={5}
                  className="text-s font-general text-[12px] leading-none tracking-[0.03em] uppercase flex items-center gap-2 will-change-transform"
                >
                  scroll
                  <IoArrowDownSharp className="text-s text-[14px] " />
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};
export default Hero;
