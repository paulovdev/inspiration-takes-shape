import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Menu } from "./menu";
import { useRouter } from "next/router";
import { motion } from "motion/react";
import { textSlide } from "../../../animations/sections/navigation.animations";
import { RiArrowDownSFill } from "react-icons/ri";

import { line } from "@/animations/shared/global-anim";
import { IoReorderTwoSharp } from "react-icons/io5";
import { dropNavigation } from "@/data/navigation.data";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="fixed top-0 right-0 px-10 pt-10 w-full flex items-center justify-between z-100 mix-blend-exclusion max-ds:px-8 max-lg:px-5 max-lg:pt-5 max-md:px-2">
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
            className="relative top-[1px] cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(null)}
          >
            <div className="relative overflow-hidden size-fit">
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
                laboratory
                <RiArrowDownSFill
                  className={`text-s text-[20px] ${hover ? "rotate-180" : "rotate-0"} transition-all duration-300 delay-100 ease-[cubic(0.33,1,0.68,1)]`}
                />
              </motion.button>
            </div>
            <AnimatePresence mode="wait">
              {hover && (
                <motion.div
                  className="absolute top-0 left-0 w-50 h-fit max-md:w-45"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  key={hover}
                >
                  <motion.div
                    className="mt-8 mb-4 w-full border-s/100 border-b-1"
                    variants={line}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  />
                  {dropNavigation.map((item, i) => (
                    <button
                      key={i}
                      /*       href={item.href}
                      target="_blank" */
                      className="relative mb-2 w-fit h-[15px] flex items-start group overflow-hidden"
                    >
                      <motion.p
                        className="font-general text-start text-s text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px] truncate cursor-pointer"
                        variants={textSlide}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{
                          animate: i * 0.1,
                          exit: 0,
                        }}
                      >
                        {item.label}
                      </motion.p>

                      <span className="absolute left-0 -bottom-[1px] h-[2px] w-0 bg-s transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
                    </button>
                  ))}
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
