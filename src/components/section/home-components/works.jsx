import { works } from "@/data/works.data";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { textOverlap } from "./home.animations";
import { useMousePosition2 } from "@/hooks/useMousePosition";

const Card = ({ work, index, scrollYProgress, setActiveWork, bump }) => {
  const router = useRouter();
  const isLeft = index % 2 === 0;

  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    isLeft ? [0, 600] : [0, 300],
  );

  return (
    <motion.div
      style={{ y: y2 }}
      onClick={() => {
        router.push(`/works/${work.id}`, undefined, { scroll: false });
      }}
      className="relative group will-change-transform"
    >
      <figure
        className="h-[75vh] overflow-hidden max-lg:h-[60vh] max-md:h-[50vh]"
        onMouseEnter={() => {
          setActiveWork(work);
          bump();
        }}
        onMouseLeave={() => setActiveWork(null)}
      >
        {work.src.includes(".mp4") ? (
          <video
            src={work.src}
            autoPlay
            muted
            loop
            playsInline
            className="size-full object-cover group-hover:scale-110 group-hover:brightness-25 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
          />
        ) : (
          <Image
            src={work.src}
            width={2000}
            height={2000}
            alt={work.alt}
            priority
            className="size-full object-cover group-hover:scale-110 group-hover:brightness-25 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
          />
        )}
      </figure>
    </motion.div>
  );
};

const Works = () => {
  const container = useRef(null);
  const [activeWork, setActiveWork] = useState(null);
  const [tick, setTick] = useState(0);
  const { x, y } = useMousePosition2();

  const bump = () => setTick((t) => t + 1);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end center"],
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <>
      <section className="overflow-hidden" ref={container}>
        <motion.div
          className="relative w-screen h-[200vh] overflow-hidden max-md:h-[150vh]"
          ref={ref}
        >
          <div className="absolute -top-120 w-full h-[200vh] grid grid-cols-2 gap-2 max-lg:-top-75 max-lg:h-[175vh] max-md:h-[150vh]">
            {works.slice(0, 9).map((work, i) => (
              <Card
                key={work.id}
                work={work}
                index={i}
                scrollYProgress={scrollYProgress}
                setActiveWork={setActiveWork}
                bump={bump}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <motion.div
        className="fixed z-[1000]"
        style={{
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
        }}
      >
        <div className="w-75 flex items-center justify-between">
          <div className="relative h-[17px] w-full overflow-hidden">
            <AnimatePresence mode="sync">
              {activeWork && (
                <motion.p
                  key={`${activeWork.id}-${tick}`}
                  variants={textOverlap}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="
                    absolute left-0 top-0
                    text-s font-general text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]
                    whitespace-nowrap
                  "
                >
                  {activeWork.title}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-full h-[17px] overflow-hidden">
            <AnimatePresence mode="sync">
              {activeWork && (
                <motion.p
                  key={`${activeWork.id}-${tick}-year`}
                  variants={textOverlap}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="
                    absolute right-0 top-0
                    text-s font-general text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]
                  "
                >
                  {activeWork.year}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 flex items-center justify-center p-10  z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
      >
        <Link
          href="/works"
          className="group inline-block cursor-pointer text-s pointer-events-auto"
          style={{ pointerEvents: inView ? "auto" : "none" }}
        >
          <span className="relative text-[62px] tracking-[-0.03em] leading-none max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px]">
            See All Works
            <span className="absolute left-0 bottom-px h-[3px] w-full origin-left scale-x-100 bg-s transition-transform duration-300 ease-out group-hover:scale-x-0 max-lg:h-0.5" />
          </span>

          <span className="relative font-general text-s/75 text-[14px] uppercase -top-8 left-2 max-md:-top-4 tracking-[-0.03em] max-md:text-[12px] max">
            (20)
          </span>
        </Link>
      </motion.div>
    </>
  );
};

export default Works;
