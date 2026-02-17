import { lab, offsetTexts } from "@/data/home.data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import Modal from "./modal";
import Magnetic from "@/hooks/useMagnetic";

const textSlideNoI = {
  initial: {
    y: "100%",
    opacity: 0,
    filter: "blur(2px)",
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  animate: (custom) => ({
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
  exit: {
    y: "-100%",
    opacity: 0,
    filter: "blur(2px)",
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

const Hero = ({ lenisRef }) => {
  const [scope, animate] = useAnimate();
  const [phase, setPhase] = useState("idle");

  const [activeItem, setActiveItem] = useState(0);
  const [nextItem, setNextItem] = useState(null);
  const activeLab = lab[activeItem];

  const [modal, setModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const [textAnimating, setTextAnimating] = useState(false);

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    if (!lenisRef?.current) return;

    const body = document.body;

    if (isAnimating || isPreloading) {
      body.style.cursor = "wait";
      body.style.overflow = "hidden";
      lenisRef.current.stop();
    } else {
      body.style.cursor = "";
      body.style.overflow = "";
      lenisRef.current.start();
    }

    return () => {
      body.style.cursor = "";
      body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [isAnimating, isPreloading, lenisRef]);

  useEffect(() => {
    if (nextItem === null || nextItem === activeItem) return;

    const run = async () => {
      setIsAnimating(true);

      await wait(400);
      Promise.all([
        animate(
          ".img-a",
          {
            clipPath: "inset(55% 0% 55% 0%)",
            filter: "grayscale(100%) blur(62px)",
          },
          { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
        ),
        await animate(".line-a", { x: "0%" }, { duration: 0 }),

        await animate(
          ".line-a",
          { x: "100%" },
          { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
        ),

        await animate(".line-a", { x: "-100%" }, { duration: 0 }),
      ]);

      setActiveItem(nextItem);

      await wait(400);
      Promise.all([
        animate(
          ".img-a",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "grayscale(0%) blur(0px)",
          },
          { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
        ),
        await animate(
          ".line-a",
          { x: "0%" },
          { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
        ),
      ]);

      setPhase("enter");

      await wait(500);

      setPhase("idle");
      setIsAnimating(false);
      setNextItem(null);
    };

    run();
  }, [nextItem, activeItem, animate]);

  useEffect(() => {
    const run = async () => {
      setIsPreloading(true);
      setTextAnimating(true);
      (await animate(
        ".line-a",
        { x: "-100%" },
        { duration: 0, ease: [0.645, 0.045, 0.355, 1] },
      ),
        (animate(
          ".img-a",
          {
            clipPath: "inset(55% 0% 55% 0%)",
            filter: "grayscale(100%) blur(62px)",
          },
          { duration: 0 },
        ),
        await wait(3000),
        Promise.all([
          setTextAnimating(false),
          await wait(500),
          animate(
            ".img-a",
            {
              clipPath: "inset(0% 0% 0% 0%)",
              filter: "grayscale(0%) blur(0px)",
            },
            { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
          ),

          animate(
            ".bg-a",
            { opacity: 0 },
            { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
          ),
        ])));
      (await wait(500),
        await animate(
          ".line-a",
          { x: "0%" },
          { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
        ));

      setPhase("idle");
      setIsPreloading(false);
    };

    run();
  }, [animate]);

  return (
    <>
      <div className="relative w-full min-h-screen" ref={scope}>
        <motion.div className="img-a absolute inset-0 will-change-[clip-path] -z-10 pointer-events-none">
          <figure className="size-full overflow-hidden">
            {activeLab.src.endsWith(".mp4") ? (
              <video
                key={activeLab.src}
                src={activeLab.src}
                autoPlay
                muted
                loop
                playsInline
                className="size-full object-cover brightness-75"
              />
            ) : (
              <Image
                key={activeLab.src}
                src={activeLab.src}
                fill
                alt=""
                priority
                className="object-cover brightness-75"
              />
            )}
          </figure>
        </motion.div>

        {!isPreloading && (
          <>
            <div className="absolute inset-0 p-10 size-full flex items-end justify-start z-10 max-ds:p-8 max-lg:p-5  max-md:py-5">
              <div className="relative h-[14px] min-w-200 overflow-hidden">
                <AnimatePresence mode="sync" initial={false}>
                  {isAnimating ? (
                    <motion.div
                      key="loading"
                      initial={{ y: 19 }}
                      animate={{ y: 0 }}
                      exit={{ y: -19 }}
                      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                      className="absolute inset-0 flex items-start justify-start"
                    >
                      <p className="whitespace-nowrap text-s font-general text-[12px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] animate-pulse duration-200">
                        Loading
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="scroll"
                      initial={{ y: 19 }}
                      animate={{ y: 0 }}
                      exit={{ y: -19 }}
                      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                      className="absolute inset-0 flex items-start justify-start gap-2"
                    >
                      <p className="flex items-center gap-2 whitespace-nowrap text-s font-general text-[12px] leading-none tracking-[0.03em] uppercase max-md:text-[12px]">
                        <FaCircleExclamation className="text-s text-[12px]" />
                        Click the rounded to change lab
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center z-10">
              <div className="relative top-10 px-10 flex gap-[125px] max-lg:gap-[100px] max-md:gap-[50px] max-ds:px-8 max-lg:px-5 ">
                {lab.map((item, i) => {
                  const active = i === activeItem;

                  return (
                    <div key={item.title} className="relative ">
                      <AnimatePresence mode="wait">
                        {phase !== "exit" && (
                          <Magnetic>
                            <motion.button
                              onClick={() => {
                                if (isAnimating || i === activeItem) return;
                                setNextItem(i);
                                setPhase("exit");
                              }}
                              initial={{ opacity: 0, scale: 0.25 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.25 }}
                              transition={{
                                duration: 0.5,
                                ease: [0.33, 1, 0.68, 1],
                                delay: i * 0.075,
                              }}
                              
                              whileTap={{ scale: 1 }}
                              className={`size-3.5 rounded-full ${
                                active
                                  ? "bg-s scale-125 active:scale-100"
                                  : "bg-s/35 active:scale-100"
                              } hover:bg-s hover:scale-125 transition-colors cursor-pointer`}
                            />
                          </Magnetic>
                        )}
                      </AnimatePresence>
                      <AnimatePresence mode="wait">
                        {phase !== "exit" && active && (
                          <motion.div
                            key={activeItem}
                            className="absolute mt-12 w-[400px]"
                          >
                            <div className="mb-2 h-[16px] overflow-hidden">
                              <motion.p
                                key="loading"
                                variants={textSlideNoI}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                custom={0}
                                className="text-s font-general text-[14px] tracking-[-0.03em] leading-none uppercase"
                              >
                                {item.title}
                                <span className="relative -top-1 left-0.5">
                                  ®
                                </span>
                              </motion.p>
                            </div>

                            <div className="mb-12 h-[16px] overflow-hidden">
                              <motion.p
                                key="loading"
                                variants={textSlideNoI}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                custom={0.05}
                                className="text-s/50 font-general text-[14px] tracking-[-0.03em] leading-none uppercase"
                              >
                                {item.year}
                              </motion.p>
                            </div>

                            <div className="h-[20px] overflow-hidden">
                              <motion.button
                                onClick={() => setModal(true)}
                                key="loading"
                                variants={textSlideNoI}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="text-s font-general text-[14px] tracking-[-0.03em] leading-none uppercase cursor-pointer"
                              >
                                [ {item.action} ]
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="absolute inset-0 p-10 flex items-end justify-end z-10 pointer-events-none max-lg:items-center max-lg:-top-30 max-ds:p-8 max-lg:p-5 ">
              <AnimatePresence mode="wait">
                {phase !== "exit" && (
                  <div className="h-fit overflow-hidden" key={activeItem}>
                    <motion.h2 className="text-s text-[62px] tracking-[-0.03em] leading-none flex items-center">
                      {"Offset ®".split("").map((char, index) => (
                        <motion.span
                          key={index}
                          className="inline-block"
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-100%" }}
                          transition={{
                            duration: 0.5,
                            ease: [0.33, 1, 0.68, 1],
                            delay: index * 0.075,
                          }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </motion.h2>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
        <div className="absolute inset-0 flex flex-col justify-center z-10 pointer-events-none">
          <div className="line-a absolute left-0 w-full h-px bg-s/50" />
        </div>
        {isPreloading && (
          <div className="bg-a absolute inset-0 z-250 pointer-events-none bg-p" />
        )}
        <AnimatePresence mode="wait">
          {textAnimating && (
            <div className="absolute inset-0 flex flex-col justify-center z-250 pointer-events-none">
              {offsetTexts.map((text, i) => (
                <motion.p
                  key={`${text}-${i}`}
                  className="absolute font-general text-s text-[12px] uppercase tracking-[0.03em]"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: i * 0.025, duration: 0.5 },
                  }}
                  exit={{
                    opacity: 0,
                    y: Math.random() > 0.5 ? "-10%" : "10%",
                    filter: "blur(4px)",
                    transition: {
                      duration: 0.5,
                      delay: Math.random() * 0.025,
                    },
                  }}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.25 + 0.25,
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
      {isPreloading && (
        <div className="fixed inset-0 z-[9999]" style={{ cursor: "wait" }} />
      )}
      <AnimatePresence>
        {modal && (
          <Modal modal={modal} setModal={setModal} activeItem={activeLab} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
