import { works } from "@/data/data";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { bg, clip, textHover, textSlideNoI } from "./works.animations";
import { useMousePosition2 } from "@/hooks/useMousePosition";

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
                <p className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase">
                  {work.name}
                </p>
                <p className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase">
                  {work.name}
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
                <p className="text-s font-general text-[14px] leading-[1.2] tracking-[-0.03em] uppercase">
                  {work.year}
                </p>
                <p className="text-s font-general text-[14px] leading-[1.2] tracking-[-0.03em] uppercase">
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

const CardList = ({ work, setActiveWork, setVisible }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => {
        setHover(true);
        setActiveWork(work);
        setVisible(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setVisible(false);
      }}
      onClick={() =>
        router.push(`/works/${work.id}`, undefined, { scroll: false })
      }
      className="relative p-2 w-full grid grid-cols-4 items-center cursor-pointer"
    >
      <motion.div
        variants={textHover}
        initial="initial"
        animate={hover ? "animate" : "initial"}
        custom={15}
        className="col-span-3 text-[62px] tracking-[-0.03em] max-lg:text-[48px] max-md:text-[32px]"
      >
        {work.name}
      </motion.div>

      <motion.div
        variants={textHover}
        initial="initial"
        animate={hover ? "animate" : "initial"}
        custom={-15}
        className="flex items-end justify-end"
      >
        <span className="text-[14px] uppercase">{work.year}</span>
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

      <AnimatePresence mode="popLayout">
        {mode === "list" && visible && activeWork && (
          <motion.div
            style={{ x, y }}
            className="pointer-events-none fixed top-0 left-0 w-100 h-75 z-30 max-lg:w-75 max-lg:h-50"
          >
            <motion.div
              key={activeWork.id}
              variants={clip}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full overflow-hidden"
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
                  alt={activeWork.alt}
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Works;
