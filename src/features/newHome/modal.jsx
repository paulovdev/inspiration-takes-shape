import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";

import TextAnimated from "@/components/ui/text-animated";

import { IoClose } from "react-icons/io5";
import { fade, textSlide } from "@/animations/sections/navigation.animations";
import { modalContainer } from "@/animations/sections/home.animations";

import Image from "next/image";
import { textSlide2 } from "@/animations/shared/global-anim";

const Modal = ({ setModal, modal, activeItem }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!modal || !scrollRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current.firstElementChild,
      smoothWheel: true,
      lerp: 0.1,
      syncTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [modal]);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modal]);

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 w-full bg-s z-[100]"
        variants={modalContainer}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div ref={scrollRef} className=" size-full overflow-hidden">
          <div className="absolute top-0 right-0 px-10 py-3 bg-p flex items-center max-lg:px-5 z-10">
            <button
              className=" font-medium font-general text-s text-[14px] leading-none tracking-[-0.02em] uppercase max-md:text-[12px] cursor-pointer flex items-center gap-1"
              onClick={() => setModal(false)}
            >
              <IoClose className="text-[16px] max-md:text-[14px] text-s" />{" "}
              close
            </button>
          </div>
          <div className="relative px-10 py-20 w-full flex items-start justify-between gap-10 max-ds:px-8 max-lg:px-5 max-md:px-2 max-lg:flex-col">
            <div className="sticky top-20 flex-1 w-full max-lg:relative max-lg:mb-6 max-lg:top-0 max-lg:max-w-full">
              <div className="mb-12 overflow-hidden h-fit ">
                <motion.p
                  className=" text-p/50 font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]"
                  variants={textSlide}
                  initial="initial"
                  animate="animate"
                  custom={{ animate: 0.4 }}
                >
                  — Number°{activeItem.number}
                </motion.p>
              </div>
              <div className="mb-2 overflow-hidden h-fit ">
                <motion.h3
                  className="text-p font-general font-medium text-[14px] leading-none tracking-[-0.03em] uppercase "
                  variants={textSlide}
                  initial="initial"
                  animate="animate"
                  custom={{ animate: 0.5 }}
                >
                  {activeItem.title}
                  <span className="relative left-0.5 -top-1">
                    {activeItem.mark}
                  </span>
                </motion.h3>
              </div>
              <div className="mb-12 overflow-hidden h-fit ">
                <motion.p
                  className=" text-p/50 font-general font-medium text-[14px] leading-none tracking-[-0.03em] uppercase"
                  variants={textSlide}
                  initial="initial"
                  animate="animate"
                  custom={{ animate: 0.6 }}
                >
                  {activeItem.year} — {activeItem.meta}
                </motion.p>
              </div>
              <AnimatePresence mode="wait">
                {activeItem.system && (
                  <div className="space-y-2" key={activeItem}>
                    {activeItem.system.map((item, i) => (
                      <div key={i} className="h-[14px] overflow-hidden">
                        <motion.p
                          className="w-full flex items-center justify-between text-p font-general font-medium text-[14px] leading-none tracking-[-0.03em] uppercase"
                          variants={textSlide}
                          initial="initial"
                          animate="animate"
                          custom={{ animate: 0.7 + i * 0.025 }}
                        >
                          <span>{item.label}</span>
                          <span>{item.value}</span>
                        </motion.p>
                      </div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-full flex-2 flex flex-col items-end">
              <div className="flex flex-col max-lg:mt-8">
                <motion.figure
                  className="mb-4 relative max-w-300 w-full h-[60vh] max-ds:h-[45vh] max-lg:h-[40vh]"
                  initial={{ clipPath: "inset(0% 0% 100% 0% )" }}
                  animate={{
                    clipPath: "inset(0% 0% 0% 0%)",
                    transition: {
                      duration: 0.5,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.5,
                    },
                  }}
                >
                  <Image
                    src={activeItem.src2}
                    width={2000}
                    height={2000}
                    alt={activeItem.alt}
                    className="size-full object-cover"
                  />
                </motion.figure>
                {activeItem.statement && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: modal ? 1 : 0, y: modal ? 0 : 20 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 text-p text-end font-general font-medium text-[14px] leading-none tracking-[-0.03em] uppercase will-change-transform"
                  >
                    {activeItem.statement}
                  </motion.p>
                )}
                <TextAnimated
                  phrases={activeItem.description}
                  variants={textSlide2}
                  animate={modal}
                  as="h2"
                  className="max-w-300 flex flex-col max-ds:max-w-[700px] max-lg:max-w-full"
                  lineClassName="font-inter font-normal text-p text-[62px] tracking-[-0.035em] leading-[1.15] max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px] flex flex-wrap mb-14"
                  wordClassName="mr-2"
                  wordDelay={0.025}
                  lineDelay={0.025}
                />
              </div>
              <div className="flex flex-col  max-lg:mt-8">
                <motion.figure
                  className="mb-12 relative max-w-300 w-full h-[60vh] max-ds:h-[45vh] max-lg:h-[40vh]"
                  initial={{ clipPath: "inset(0% 0% 100% 0% )" }}
                  animate={{
                    clipPath: "inset(0% 0% 0% 0%)",
                    transition: {
                      duration: 0.5,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.5,
                    },
                  }}
                >
                  <Image
                    src={activeItem.src3}
                    width={2000}
                    height={2000}
                    alt={activeItem.alt}
                    className="size-full object-cover"
                  />
                </motion.figure>
                <TextAnimated
                  phrases={activeItem.description2}
                  variants={textSlide}
                  animate={modal}
                  as="h2"
                  className="max-w-300 flex flex-col max-ds:max-w-[700px] max-lg:max-w-full"
                  lineClassName="font-inter font-normal text-p text-[62px] tracking-[-0.035em] leading-[1.15] max-ds:text-[52px] max-lg:text-[48px] max-md:text-[32px] flex flex-wrap mb-14"
                  wordClassName="mr-2"
                  wordDelay={0.025}
                  lineDelay={0.015}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 w-full h-dvh bg-s/5 backdrop-blur-2xl z-[90]"
        variants={fade}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ animate: 0, exit: 0.5 }}
        onClick={() => setModal(false)}
      />
    </>
  );
};

export default Modal;
