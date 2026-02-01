import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { FaStarOfLife } from "react-icons/fa6";

const JoinUs = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.25, [0.3]],
    ["100%", "0%", "-100%"],
  );

  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0.35, 0.55], ["20%", "-20%"]);
  const imageScale = useTransform(scrollYProgress, [0.35, 0.55], [0, 5]);

  const contactOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const contactY = useTransform(scrollYProgress, [0.55, 0.7], [80, 0]);

  const item1 = useTransform(scrollYProgress, [0.6, 0.7], [40, 0]);
  const item2 = useTransform(scrollYProgress, [0.65, 0.75], [40, 0]);
  const item3 = useTransform(scrollYProgress, [0.7, 0.8], [40, 0]);
  const itemOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);

  return (
    <section ref={container} className="relative h-[600vh] select-none">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="sticky top-0 p-10 h-screen flex flex-col items-center justify-center gap-5 overflow-hidden max-ds:p-8 max-lg:p-5 max-md:p-2">
          <div className="overflow-hidden h-fit">
            <motion.h1
              style={{ y: titleY }}
              className="font-normal text-p text-[128px] leading-[1.1] tracking-[-0.06em] max-lg:text-[56px] max-md:text-[34px] max-md:tracking-[-0.03em]"
            >
              Dreams, in physical form
            </motion.h1>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.figure
            style={{ opacity: imageOpacity, y: imageY, scale: imageScale }}
            className="relative w-[420px] h-[520px] will-change-transform"
          >
            <Image
              src="/bg.jpg"
              width={2000}
              height={2000}
              alt=""
              className="size-full object-cover"
              priority
            />
          </motion.figure>
        </div>

        <motion.div
          style={{ opacity: contactOpacity, y: contactY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 max-lg:p-5 max-md:px-2"
        >
          <motion.div style={{ y: item1, opacity: itemOpacity }}>
            <FaStarOfLife className="mb-10 text-s text-[110px] max-lg:text-[60px]" />
          </motion.div>

          <motion.p
            style={{ y: item2, opacity: itemOpacity }}
            className="max-w-xl font-medium text-s text-[20px] leading-[1.3] tracking-[-0.02em] max-lg:text-[16px] max-lg:w-full"
          >
            We collaborate with bold thinkers, designers and builders shaping
            what’s next.
          </motion.p>

          <motion.p
            style={{ y: item3, opacity: itemOpacity }}
            className="mt-4 font-general text-[14px] tracking-[0.2em] text-s/60 uppercase"
          >
            Remote · Hybrid · Global
          </motion.p>

          <motion.div
            style={{ y: item3, opacity: itemOpacity }}
            className="mt-10 flex gap-2 max-lg:w-150 max-md:w-110"
          >
            <Button
              buttonHref="/join-us"
              buttonLabel="join the team"
              buttonBgColor="#ffffff"
              buttonTextColor="#000000"
            />
            <Button
              buttonHref="/contact"
              buttonLabel="start a project"
              buttonBgColor="#000000"
              buttonTextColor="#ffffff"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinUs;
