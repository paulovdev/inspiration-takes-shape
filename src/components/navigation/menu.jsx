import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaLink } from "react-icons/fa6";

import {
  menuContainerAnim,
  menuFadeAnim,
  maskFadeAnim,
  textSlideAnim,
  arrowRotateAnim,
  dropdownAnim,
} from "@/components/navigation/navigation.animations";

import {
  navigation,
  dropNavigation,
} from "@/components/navigation/navigation.data";

export const Menu = ({ setMenu }) => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <>
      <motion.div
        className="fixed top-0 right-0 w-200 bg-s/15 backdrop-blur-2xl z-110 max-lg:w-full"
        variants={menuContainerAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          className="relative h-full flex flex-col items-start justify-between"
          variants={menuFadeAnim}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="absolute top-0 right-0 px-10 pt-11 flex items-center max-lg:px-5 max-lg:pt-5">
            <button
              className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-xsm:text-[12px]"
              onClick={() => setMenu(false)}
            >
              close
            </button>
          </div>

          <div className="p-10 pt-20 size-full flex flex-col items-start justify-between max-lg:px-5">
            <div className="w-full flex flex-col items-start">
              {navigation.map((item, i) => {
                const isActive = router.pathname === item.href;
                const isOpen = openDropdown === item.label;

                return (
                  <div key={i} className="w-full mb-2 select-none">
                    <div
                      className="overflow-hidden h-fit flex items-center justify-between gap-4 group cursor-pointer"
                      onClick={() => {
                        if (item.dropDown) {
                          setOpenDropdown(isOpen ? null : item.label);
                        }
                      }}
                    >
                      <motion.p
                        className={`text-[62px] tracking-[-0.03em] leading-none max-lg:text-[48px] ${
                          isActive || isOpen
                            ? "text-s"
                            : "text-s/50 group-hover:text-s"
                        }`}
                        variants={textSlideAnim}
                        initial="initial"
                        animate="animate"
                        custom={i}
                        onClick={() =>
                          !item.dropDown &&
                          router.push(item.href, undefined, { scroll: false })
                        }
                      >
                        {item.label}
                      </motion.p>

                      {item.dropDown && (
                        <motion.span
                          variants={arrowRotateAnim}
                          animate={isOpen ? "open" : "closed"}
                          className={`relative left-1.5 text-[32px] opacity-0 ${
                            isOpen ? "opacity-100" : "group-hover:opacity-100 "
                          } transition-all`}
                        >
                          <MdOutlineKeyboardArrowDown
                            className={`relative ${
                              isOpen ? "text-s" : "text-s/50 group-hover:text-s"
                            }`}
                          />
                        </motion.span>
                      )}

                      <span
                        className={`relative right-1.5  w-2 h-2 transition-all duration-300 ${
                          isActive
                            ? "bg-s rounded-[2px]"
                            : "rounded-full bg-s/0 group-hover:bg-s"
                        } ${item.dropDown && "hidden"} `}
                      />
                    </div>

                    <div className="w-full overflow-hidden">
                      <AnimatePresence initial={false}>
                        {item.dropDown && isOpen && (
                          <motion.div
                            variants={dropdownAnim}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <motion.div
                              className="mt-5 border-s/100 border-b-2"
                              initial={{ width: 0 }}
                              animate={{
                                width: "100%",
                                transition: {
                                  duration: 0.3,
                                  delay: 0.25,
                                  ease: [0.33, 1, 0.68, 1],
                                },
                              }}
                            />
                            <div className="pt-5 flex flex-col gap-5">
                              {dropNavigation.map((sub, j) => (
                                <a
                                  key={j}
                                  href={sub.href}
                                  target="_blank"
                                  className="w-full h-fit overflow-hidden flex justify-between group hover:border-s/50"
                                >
                                  <motion.p
                                    className="font-general font-medium text-[14px] leading-none tracking-[0.03em] uppercase text-s group-hover:text-s/50"
                                    variants={textSlideAnim}
                                    initial="initial"
                                    animate="animate"
                                    custom={j}
                                  >
                                    {sub.label}
                                  </motion.p>

                                  <FaLink className="text-s group-hover:text-s/50" />
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-0 pb-10 flex items-center gap-2">
              <p className="text-s/50 font-general text-[14px] leading-none tracking-[0.03em] uppercase max-xsm:text-[12px]">
                socials:
              </p>
              <p className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-xsm:text-[12px]">
                instagram,
              </p>
              <p className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-xsm:text-[12px]">
                linkedin,
              </p>
              <p className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-xsm:text-[12px]">
                dribble,
              </p>
              <p className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-xsm:text-[12px]">
                x
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed inset-0 w-screen h-screen bg-s/25 backdrop-blur-sm brightness-50 z-100"
        variants={maskFadeAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => setMenu(false)}
      />
    </>
  );
};
