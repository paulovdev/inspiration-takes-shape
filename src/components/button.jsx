import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa6";

export const textOverlap = {
  initial: {
    y: "0%",
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  animate: {
    y: -14,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const Button = ({
  buttonHref,
  buttonLabel,
  buttonTextColor = "#000",
  buttonBgColor = "#fff",
}) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={buttonHref}
      scroll={false}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="mt-10 px-4 py-4 w-75 inline-block group"
      style={{ background: buttonBgColor }}
    >
      <div className="w-full flex items-end justify-between">
        <div className="relative h-[16px] overflow-hidden">
          <motion.div
            variants={textOverlap}
            initial="initial"
            animate={hover ? "animate" : "initial"}
            className="flex flex-col will-change-transform"
          >
            <p
              className="text-s font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase"
              style={{ color: buttonTextColor }}
            >
              {buttonLabel}
            </p>
            <p
              className="text-s font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase"
              style={{ color: buttonTextColor }}
            >
              {buttonLabel}
            </p>
          </motion.div>
        </div>

        <div className="relative h-[15px] overflow-hidden">
          <motion.div
            variants={textOverlap}
            initial="initial"
            animate={hover ? "animate" : "initial"}
            className="flex flex-col items-end will-change-transform"
          >
            <FaArrowRight
              className="text-[14px] rotate-45 group-hover:rotate-0 transition-all"
              size={14}
              color={buttonTextColor}
            />
            <FaArrowRight
              className="text-[14px] rotate-45 group-hover:rotate-0 transition-all"
              color={buttonTextColor}
            />
          </motion.div>
        </div>
      </div>
    </Link>
  );
};

export default Button;
