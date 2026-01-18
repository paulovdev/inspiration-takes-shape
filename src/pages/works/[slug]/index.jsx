import { useEffect, useRef } from "react";
import Nav from "@/components/navigation/nav";
import { works } from "@/data/data";
import { useIsPresent, motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";

import { useRouter } from "next/router";

import { IoArrowDownSharp } from "react-icons/io5";
import Image from "next/image";

const textSlideAnim = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0%",
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: i * 0.075 },
  }),
};
const title = "Credits for Content".split(" ");
const Hero = () => {
  const lenisRef = useRef(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.5,
      smooth: true,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    lenisRef.current = lenis;

    if (!hasScrolledRef.current) {
      lenis.scrollTo(0, { immediate: true });
      hasScrolledRef.current = true;
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  const router = useRouter();
  const { slug } = router.query;
  const ref = useRef();
  const isPresent = useIsPresent();
  ref.current = isPresent ? slug : ref.current;
  const work = works.find((item) => item.id === ref.current);

  if (!work) return null;
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);
  return (
    <>
      <Nav />
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
              {work.src.includes(".mp4") ? (
                <video
                  src={work.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="relative size-full object-cover brightness-75"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: 1.1,
                    transition: {
                      duration: 1,
                      delay: 0.5,
                      ease: [0.33, 1, 0.68, 1],
                    },
                  }}
                />
              ) : (
                <motion.img
                  src={work.src}
                  width={2000}
                  height={2000}
                  alt=""
                  autoPlay
                  muted
                  loop
                  className="relative size-full object-cover brightness-75"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: 1.1,
                    transition: {
                      duration: 1,
                      delay: 0.5,
                      ease: [0.33, 1, 0.68, 1],
                    },
                  }}
                />
              )}
            </figure>
          </div>
          <button
            type="button"
            onClick={() => router.push("/works", undefined, { scroll: false })}
            className="fixed top-0 left-0 px-10 pt-10 uppercase z-100"
          >
            <span className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-xsm:text-[12px]">
              back
            </span>
          </button>

          <div className="absolute inset-0 w-screen h-screen">
            <div className="p-10 w-full h-screen flex flex-col items-center justify-between gap-6">
              <div className="size-full flex flex-col justify-center items-center">
                <div className="overflow-hidden">
                  <motion.span
                    variants={textSlideAnim}
                    initial="initial"
                    animate="animate"
                    className="text-s font-general text-[14px] leading-[1.4] tracking-[0.03em] uppercase max-xsm:text-[12px]"
                  >
                    {work.year}
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
                      {work.name}
                    </motion.span>
                  </span>
                </h2>
              </div>
              <div className="overflow-hidden flex items-center gap-2">
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

      <div className="p-10 py-40 w-full bg-p flex flex-col items-start">
        <div className="mb-10 max-w-200 flex flex-col items-start">
          <span className="mb-1 text-s/50 font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-xsm:text-[12px]">
            description:
          </span>
          <p className="text-s text-[42px] leading-[1.1em] tracking-[-0.03em]">
            {work.description}
          </p>
        </div>

        <div className="mb-10 max-w-200 flex flex-col items-start">
          <span className="mb-1 text-s/50 font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-xsm:text-[12px]">
            category:
          </span>
          <p className="text-s text-[42px] leading-[1.1em] tracking-[-0.03em]">
            {work.category}
          </p>
        </div>

        <div className="mb-10 max-w-200 flex flex-col items-start">
          <span className="mb-1 text-s/50 font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-xsm:text-[12px]">
            license:
          </span>
          <p className="text-s text-[42px] leading-[1.1em] tracking-[-0.03em]">
            {work.license}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <Image src="bg-1.jpg" width={3000} height={3000} alt="" />
      </div>
    </>
  );
};
export default Hero;
