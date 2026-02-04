import { works } from "@/data/works.data";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback, memo } from "react";
import { useInView } from "react-intersection-observer";
import {
  mediaOverlap,
  textSlideNoI,
} from "../../animations/sections/works.animations";
import { useMousePosition2 } from "@/hooks/useMousePosition";
import { scale } from "@/animations/shared/global-anim";
import { useIsMobile } from "@/hooks/useIsMobile";

const CardGrid = memo(({ work, index }) => {
  const router = useRouter();
  const [hover, setHover] = useState(null);

  const handleEnter = useCallback(() => setHover(index), [index]);
  const handleLeave = useCallback(() => setHover(null), []);
  const goToWork = useCallback(() => {
    router.push(`/works/${work.id}`, undefined, { scroll: false });
  }, [router, work.id]);

  return (
    <motion.div onClick={goToWork} className="relative group cursor-pointer">
      <figure
        className="h-[75vh] overflow-hidden"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <Image
          src={work.src}
          width={2000}
          height={2000}
          alt={work.alt}
          className="size-full object-cover group-hover:scale-110 group-hover:brightness-50 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
        />

        <div className="absolute inset-0 p-5 w-full flex items-center justify-between">
          <div className="h-[15px] overflow-hidden cursor-pointer">
            <motion.div
              variants={textSlideNoI}
              initial="initial"
              animate={hover === index ? "animate" : "initial"}
              className="flex flex-col items-start justify-center"
            >
              <p className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-md:text-[12px]">
                {work.title}
              </p>
              <p className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-md:text-[12px]">
                {work.title}
              </p>
            </motion.div>
          </div>

          <div className="h-[15px] overflow-hidden cursor-default">
            <motion.div
              variants={textSlideNoI}
              initial="initial"
              animate={hover === index ? "animate" : "initial"}
              className="flex flex-col items-start justify-center"
            >
              <p className="text-s font-general text-[14px] leading-[1.2] tracking-[-0.03em] uppercase max-md:text-[12px]">
                {work.year}
              </p>
              <p className="text-s font-general text-[14px] leading-[1.2] tracking-[-0.03em] uppercase max-md:text-[12px]">
                {work.year}
              </p>
            </motion.div>
          </div>
        </div>
      </figure>
    </motion.div>
  );
});

const CardList = memo(({ work, setActiveWork, setVisible, bumpMedia }) => {
  const router = useRouter();

  const handleEnter = useCallback(() => {
    setActiveWork(work);
    setVisible(true);
    bumpMedia();
  }, [setActiveWork, setVisible, bumpMedia, work]);

  const handleLeave = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const goToWork = useCallback(() => {
    router.push(`/works/${work.id}`, undefined, { scroll: false });
  }, [router, work.id]);

  return (
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={goToWork}
      className="relative p-2 w-full grid grid-cols-4 items-center cursor-pointer"
    >
      <div className="col-span-3 text-[62px] tracking-[-0.03em] max-lg:text-[48px] max-md:text-[32px]">
        {work.title}
      </div>

      <div className="flex items-end justify-end">
        <span className="text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]">
          {work.year}
        </span>
      </div>
    </motion.div>
  );
});

const Works = () => {
  const [mode, setMode] = useState("grid");
  const { x, y } = useMousePosition2();
  const [activeWork, setActiveWork] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mediaTick, setMediaTick] = useState(0);

  const isMobile = useIsMobile();

  const bumpMedia = useCallback(() => {
    setMediaTick((t) => t + 1);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.03,
    triggerOnce: false,
  });

  return (
    <section
      className="relative bg-s border-b border-p/10 w-screen h-full overflow-hidden"
      ref={ref}
    >
      {mode === "grid" && (
        <div className="p-2 grid grid-cols-3 gap-2 max-lg:grid-cols-2 max-md:grid-cols-1 z-20">
          {works.map((work, i) => (
            <CardGrid key={work.id} work={work} index={i} />
          ))}
        </div>
      )}

      {mode === "list" && (
        <div className="relative p-10 mb-20 z-20 max-ds:p-8 max-lg:p-5 max-md:p-2">
          {works.map((work) => (
            <CardList
              key={work.id}
              work={work}
              setActiveWork={setActiveWork}
              setVisible={setVisible}
              bumpMedia={bumpMedia}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {inView && (
          <motion.div
            className="fixed bottom-0 p-3 w-full mix-blend-exclusion flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <button
              onClick={() => setMode("grid")}
              className="relative group pointer-events-auto"
            >
              <span className="relative text-s text-[62px] tracking-[-0.03em] max-lg:text-[48px] max-md:text-[32px] cursor-pointer">
                Grade
                <span className="absolute left-0 bottom-px h-[3px] w-full origin-left scale-x-100 bg-s transition-transform duration-300 ease-out group-hover:scale-x-0 max-lg:h-0.5" />
              </span>
            </button>

            <span className="mx-2 text-s text-[62px] tracking-[-0.03em] max-lg:text-[48px] max-md:text-[32px]">
              /
            </span>

            <button
              onClick={() => setMode("list")}
              className="relative group pointer-events-auto"
            >
              <span className="relative text-s text-[62px] tracking-[-0.03em] max-lg:text-[48px] max-md:text-[32px] cursor-pointer">
                Lista
                <span className="absolute left-0 bottom-px h-[3px] w-full origin-left scale-x-100 bg-s transition-transform duration-300 ease-out group-hover:scale-x-0 max-lg:h-0.5" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {mode === "list" && visible && !isMobile && (
          <motion.div
            style={{ x, y }}
            className="pointer-events-none fixed top-0 left-0 w-120 h-75 z-30 overflow-hidden will-change-transform -translate-x-1/2 -translate-y-1/2"
            {...scale}
          >
            <AnimatePresence mode="sync" initial={false}>
              {activeWork && (
                <motion.div
                  key={`${activeWork.id}-${mediaTick}`}
                  variants={mediaOverlap}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={activeWork.src}
                    width={2000}
                    height={2000}
                    alt={activeWork.alt}
                    className="size-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Works;
