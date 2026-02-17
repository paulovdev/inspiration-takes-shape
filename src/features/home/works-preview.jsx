import { works } from "@/data/works.data";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { mergeRefs } from "react-merge-refs";
import { textOverlap } from "../../animations/sections/home.animations";
import { useMousePosition2 } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";
import PixelRevealImage from "@/components/ui/pixel-reveal-image/pixel-reveal-image";

const Card = ({ work, index, scrollYProgress, setActiveWork, bump }) => {
  const router = useRouter();
  const isLeft = index % 2 === 0;

  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    isLeft ? [0, 600] : [0, 300],
  );

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      style={{ y: y2 }}
      ref={ref}
      onClick={() => {
        router.push(`/works/${work.id}`);
      }}
      className="relative group cursor-pointer will-change-transform"
    >
      <figure
        className="h-[75vh] overflow-hidden max-lg:h-[60vh] max-md:h-[50vh]"
        onMouseEnter={() => {
          setActiveWork(work);
          bump();
        }}
        onMouseLeave={() => setActiveWork(null)}
      >
        <PixelRevealImage
          inView={inView}
          src={work.cover}
          fill
          className="size-full object-cover group-hover:scale-110 group-hover:brightness-25 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
          alt={work.alt}
        />
      </figure>
    </motion.div>
  );
}; 

const WorksPreview = () => {
  const container = useRef(null);
  const [activeWork, setActiveWork] = useState(null);
  const [tick, setTick] = useState(0);
  const { x, y } = useMousePosition2();
  const isMobile = useIsMobile();

  const bump = () => setTick((t) => t + 1);

  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: false,
  });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end center"],
  });

  return (
    <>
      <section ref={container} className="relative overflow-hidden mb-10">
        <div className="absolute inset-0 h-[100vh] max-md:h-[75vh]" ref={ref} />
        <div className="relative w-screen h-[200vh] overflow-hidden max-md:h-[150vh]">
          <div className="absolute -top-120 w-full h-[200vh] grid grid-cols-2 gap-2 max-lg:-top-75 max-lg:h-[175vh] max-md:h-[150vh]">
            {works.slice(0, 8).map((work, i) => (
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
        </div>
      </section>

      {!isMobile && (
        <motion.div
          className="fixed z-[1000] max-md:hidden"
          style={{
            left: x,
            top: y,
            translateX: "-50%",
            translateY: "-50%",
            pointerEvents: "none",
          }}
        >
          <div className="w-150 h-full flex items-center justify-center max-ds:w-[100px] max-lg:w-[75px] ">
            <div className="relative w-full h-[17px] overflow-hidden">
              <AnimatePresence mode="sync">
                {activeWork && (
                  <motion.p
                    key={`${activeWork.id}-${tick}`}
                    variants={textOverlap}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute left-1/2 -translate-x-1/2 top-0  text-s font-general font-normal text-[14px] tracking-[-0.05em] uppercase max-md:text-[12px] whitespace-nowrap"
                  >
                    {activeWork.title}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="fixed inset-0 flex items-end justify-end p-10 z-20 pointer-events-none will-change-[opacity]"
        initial={{ opacity: 0, y: 24 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 24,
          transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
        }}
      >
        <Link
          href="/works"
          className="group inline-block text-center cursor-pointer pointer-events-auto"
          style={{ pointerEvents: inView ? "auto" : "none" }}
        >
          <span className="relative text-s text-[62px] tracking-[-0.03em] leading-none max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px]">
            See all works
            <span className="absolute left-0 bottom-px h-[3px] w-full origin-left scale-x-100 bg-s transition-transform duration-300 ease-out group-hover:scale-x-0 max-lg:h-0.5" />
          </span>

          <span className="relative font-general text-s/75 text-[14px] uppercase -top-8 left-2 max-md:-top-4 tracking-[-0.03em] max-md:text-[12px]">
            (20)
          </span>
        </Link>
      </motion.div>
    </>
  );
};

export default WorksPreview;
