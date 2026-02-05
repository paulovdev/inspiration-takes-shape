import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Menu } from "./menu";
import { useRouter } from "next/router";
import { motion } from "motion/react";
import { textSlide } from "../../../animations/sections/navigation.animations";
import { RiArrowDownSFill } from "react-icons/ri";

import { line } from "@/animations/shared/global-anim";
import { IoReorderTwoSharp } from "react-icons/io5";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="fixed top-0 right-0 px-10 pt-10 w-full flex items-center justify-between z-100 mix-blend-exclusion max-lg:px-5 max-lg:pt-5">
        {router.pathname === "/" ? (
          <div></div>
        ) : (
          <button
            onClick={() => router.back()}
            scroll={false}
            className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] cursor-pointer"
          >
            back
          </button>
        )}
        <div className="relative flex items-center gap-6">
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(null)}
          >
            <div className="relative overflow-hidden h-[19px]">
              <motion.button
                className=" text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] flex items-center "
                variants={textSlide}
                initial={false}
                animate={menu ? "initial" : "animate"}
                custom={{
                  animate: 0.5,
                  exit: 0,
                }}
              >
                language
                <RiArrowDownSFill
                  className={`text-s text-[20px] ${hover ? "rotate-180" : "rotate-0"} transition-all duration-300 delay-100 ease-[cubic(0.33,1,0.68,1)]`}
                />
              </motion.button>
            </div>
            <AnimatePresence mode="wait">
              {hover && (
                <motion.div
                  className="absolute top-0 left-0 w-fit h-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  key={hover}
                >
                  <motion.div
                    className="mt-8 mb-2 border-s/100 border-b-1"
                    variants={line}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  />
                  <div className="mb-1 overflow-hidden h-[19px]">
                    <motion.button
                      className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] cursor-pointer"
                      variants={textSlide}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={{
                        animate: 0,
                        exit: 0,
                      }}
                    >
                      Brazilian
                    </motion.button>
                  </div>
                  <div className="mb-1 overflow-hidden h-[19px]">
                    <motion.button
                      className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] cursor-pointer"
                      variants={textSlide}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={{
                        animate: 0.1,
                        exit: 0,
                      }}
                    >
                      English
                    </motion.button>
                  </div>
                  <div className="mb-1 overflow-hidden h-[19px]">
                    <motion.button
                      className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] cursor-pointer"
                      variants={textSlide}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={{
                        animate: 0.1,
                        exit: 0,
                      }}
                    >
                      Spanish
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative overflow-hidden h-[19px]">
            <motion.button
              className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] cursor-pointer flex items-center gap-2"
              variants={textSlide}
              initial={false}
              animate={menu ? "initial" : "animate"}
              custom={{
                animate: 0.5,
                exit: 0,
              }}
              onClick={() => setMenu(true)}
            >
              <IoReorderTwoSharp className="text-[20px]" /> menu
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {menu && <Menu setMenu={setMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Nav;
