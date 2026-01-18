import { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";

import { IoArrowDownSharp } from "react-icons/io5";

const textSlideAnim = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0%",
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: i * 0.075 },
  }),
};

const Hero = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "95vh"]);
  return (
    <>
      <section
        className="relative w-screen h-screen overflow-hidden"
        ref={container}
      >
        <motion.div
          className="relative w-screen h-screen overflow-hidden"
          style={{ y }}
        >
          <div className="absolute inset-0 w-screen h-screen -z-10">
            <figure className="overflow-hidden size-full">
              <motion.video
                src={"/works/video-6.mp4"}
                width={2000}
                height={2000}
                alt=""
                autoPlay
                muted
                loop
                playsInline
                className="relative size-full object-cover brightness-75"
              />
            </figure>
          </div>

          <div className="absolute inset-0 w-screen h-screen">
            <div className=" w-full h-screen flex flex-col items-center justify-between gap-6">
              <div className="size-full flex flex-col justify-center items-center">
                <div className="overflow-hidden">
                  <motion.span
                    variants={textSlideAnim}
                    initial="initial"
                    animate="animate"
                    className="text-s font-general text-[14px] leading-[1.4] tracking-[0.03em] uppercase max-xsm:text-[12px]"
                  >
                    Collection of
                  </motion.span>
                </div>
                <h2 className="flex gap-2 text-s text-[62px] tracking-[-0.03em] leading-none max-lg:text-[48px] max-md:text-[42px]">
                  <span className="overflow-hidden inline-block">
                    <motion.span
                      variants={textSlideAnim}
                      initial="initial"
                      animate="animate"
                      className="block"
                    >
                      Works
                    </motion.span>
                  </span>
                </h2>
              </div>
              <div className="mb-10 overflow-hidden flex items-center gap-2">
                <motion.span
                  variants={textSlideAnim}
                  initial="initial"
                  animate="animate"
                  custom={1}
                  className="text-s font-general text-[12px] leading-none tracking-[0.03em] uppercase"
                >
                  scroll
                </motion.span>
                <IoArrowDownSharp className="text-s text-[14px]" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};
export default Hero;
