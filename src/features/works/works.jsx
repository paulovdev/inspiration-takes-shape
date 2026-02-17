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
import { scale, textOverlap } from "@/animations/shared/global-anim";
import { useIsMobile } from "@/hooks/useIsMobile";
import PixelRevealImage from "@/components/ui/pixel-reveal-image/pixel-reveal-image";

const CardGrid = memo(({ work, index, setActiveWork, bumpMedia }) => {
  const router = useRouter();

  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  return (
    <motion.div
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
          bumpMedia();
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
});

const CardList = memo(({ work, setActiveWork, setVisible, bumpMedia }) => {
  const router = useRouter();

  const handleEnter = useCallback(() => {
    setActiveWork(work);
    setVisible(true);
    bumpMedia();
  }, [setActiveWork, setVisible, bumpMedia, work]);

  const goToWork = useCallback(() => {
    router.push(`/works/${work.id}`, undefined, { scroll: false });
  }, [router, work.id]);

  return (
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={() => {
        setActiveWork(null);
        setVisible(false);
      }}
      onClick={goToWork}
      className="relative p-2 py-6 w-full grid grid-cols-3 items-center cursor-pointer"
    >
      <div className="flex items-start justify-start">
        <span className=" font-general font-medium text-p text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px] ">
          {work.year}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <span className=" font-general font-medium text-p text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px] ">
          {work.category}
        </span>
      </div>
      <div className="flex items-end justify-end">
        <span className=" font-general font-medium text-p text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px] ">
          {work.client}
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
            <CardGrid
              key={work.id}
              inView={inView}
              setActiveWork={setActiveWork}
              work={work}
              bumpMedia={bumpMedia}
              index={i}
            />
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
                Grid
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
                List
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
            className="pointer-events-none fixed top-0 left-0 w-110 h-65 z-30 overflow-hidden will-change-transform -translate-x-1/2 -translate-y-1/2"
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
                  <PixelRevealImage
                    inView={activeWork}
                    src={activeWork.cover}
                    fill
                    alt={activeWork.alt}
                    className="size-full object-cover brightness-75"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

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
                    key={`${activeWork.id}-${mediaTick}`}
                    variants={textOverlap}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute left-1/2 -translate-x-1/2 top-0  text-s font-general font-normal text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px] whitespace-nowrap"
                  >
                    {activeWork.title}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Works;
