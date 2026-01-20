import { works } from "@/data/works.data";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { bg, mediaOverlap, textHover, textSlideNoI } from "./works.animations";
import { useMousePosition2 } from "@/hooks/useMousePosition";
import { scale } from "@/animations/global-anim";

const CardGrid = ({ work, index }) => {
  const router = useRouter();
  const [hover, setHover] = useState(null);

  return (
    <>
      <motion.div
        key={index}
        onClick={() => {
          router.push(`/works/${work.id}`, undefined, { scroll: false });
        }}
        className="relative group"
      >
        <figure
          className="h-[75vh] overflow-hidden"
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(null)}
        >
          {work.src.includes(".mp4") ? (
            <video
              src={work.src}
              autoPlay
              muted
              loop
              playsInline
              className="size-full object-cover group-hover:scale-110 group-hover:brightness-50 transition-all duration-500 cubic-bezier(0.33, 1, 0.68, 1)"
            />
          ) : (
            <Image
              src={work.src}
              width={2000}
              height={2000}
              alt={work.alt}
              className="size-full object-cover group-hover:scale-110 group-hover:brightness-50 transition-all duration-500 cubic-bezier(0.33, 1, 0.68, 1)"
            />
          )}
          <div className="absolute inset-0 p-5 w-full flex items-center justify-between">
            <div className="h-[15px] overflow-hidden cursor-default">
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
    </>
  );
};

const CardList = ({ work, setActiveWork, setVisible, bumpMedia }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => {
        setHover(true);
        setActiveWork(work);
        setVisible(true);
        bumpMedia();
      }}
      onMouseLeave={() => {
        setHover(false);
        setVisible(false);
      }}
      onClick={() =>
        router.push(`/works/${work.id}`, undefined, { scroll: false })
      }
      className="relative p-2 w-full grid grid-cols-4 items-center cursor-default"
    >
      <motion.div
        variants={textHover}
        initial="initial"
        animate={hover ? "animate" : "initial"}
        custom={15}
        className="col-span-3 text-[62px] tracking-[-0.03em] max-lg:text-[48px] max-md:text-[32px]"
      >
        {work.title}
      </motion.div>

      <motion.div
        variants={textHover}
        initial="initial"
        animate={hover ? "animate" : "initial"}
        custom={-15}
        className="flex items-end justify-end"
      >
        <span className="text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]">
          {work.year}
        </span>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-p z-[-1]"
        variants={bg}
        initial="initial"
        animate={hover ? "animate" : "initial"}
      />
    </motion.div>
  );
};

const Works = () => {
  const [mode, setMode] = useState("grid");
  const { x, y } = useMousePosition2();
  const [activeWork, setActiveWork] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mediaTick, setMediaTick] = useState(0);

  const bumpMedia = () => {
    setMediaTick((t) => t + 1);
  };

  const { ref, inView } = useInView({
    threshold: 0.03,
    triggerOnce: false,
  });
  return (
    <section
      className="relative bg-s w-screen h-full overflow-hidden"
      ref={ref}
    >
      {mode === "grid" && (
        <div className="p-2 grid grid-cols-3 gap-2 max-lg:grid-cols-2 max-md:grid-cols-1 z-20">
          {works.map((work, i) => (
            <CardGrid key={i} work={work} index={i} />
          ))}
        </div>
      )}

      {mode === "list" && (
        <div className="p-10 mb-20 relative z-20 max-lg:p-5 max-md:p-2">
          {works.map((work, i) => (
            <CardList
              key={i}
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
            className="fixed bottom-0 p-3 w-full mix-blend-exclusion flex items-center justify-center  
            z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <button
              onClick={() => setMode("grid")}
              className="relative group pointer-events-auto"
            >
              <span className="relative text-s text-[62px] tracking-[-0.03em] max-lg:text-[48px] max-md:text-[32px]">
                Grid
                <span
                  className="absolute left-0 bottom-px h-[1px] w-full bg-s origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300
                "
                />
              </span>
            </button>

            <span className="mx-2 text-s text-[62px] tracking-[-0.03em] max-lg:text-[48px] max-md:text-[32px]">
              /
            </span>

            <button
              onClick={() => setMode("list")}
              className="relative group pointer-events-auto"
            >
              <span className="relative text-s text-[62px] tracking-[-0.03em] max-lg:text-[48px] max-md:text-[32px]">
                List
                <span
                  className="absolute left-0 bottom-px h-[1px] w-full bg-s origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300
                  "
                />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {mode === "list" && visible && (
          <motion.div
            style={{ x, y }}
            className="
      pointer-events-none fixed top-0 left-0
      w-120 h-75 z-30
      overflow-hidden will-change-auto
    "
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
                  {activeWork.src.includes(".mp4") ? (
                    <video
                      src={activeWork.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="size-full object-cover"
                    />
                  ) : (
                    <Image
                      src={activeWork.src}
                      width={2000}
                      height={2000}
                      alt={activeWork.alt}
                      className="size-full object-cover"
                    />
                  )}
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
