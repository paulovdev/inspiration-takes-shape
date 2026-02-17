import { motion, useTransform, AnimatePresence } from "motion/react";
import { useState, forwardRef, useMemo } from "react";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useMousePosition2 } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ====== Dial System ====== */
const DIAL_SIZE = 570;
const CENTER = DIAL_SIZE / 2;
const RADIUS = 250;
const DOT_RADIUS_OFFSET = 18; // <<< afasta as bolinhas do anel

const TOTAL_TICKS = 80;
const BIG_TICKS = [0, 20, 40, 60];

const SMALL_DOT_SIZE = 0;
const BIG_DOT_SIZE = 8;

const CircleDial = forwardRef(
  ({ activeTick, rotation, onTickClick, lab }, ref) => {
    const { x, y } = useMousePosition();
    const { x: fx, y: fy } = useMousePosition2();
    const isMobile = useIsMobile();

    const [hoveredBigTick, setHoveredBigTick] = useState(null);

    /* ====== Tilt ====== */
    const rotateY = useTransform(x, [0.5, -0.5], [-20, 20]);
    const rotateX = useTransform(y, [-0.5, 0.5], [-20, 20]);

    const tiltStyle = useMemo(
      () => ({
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: isMobile ? "flat" : "preserve-3d",
      }),
      [isMobile, rotateX, rotateY],
    );

    /* ====== Ticks ====== */
    const ticks = useMemo(
      () =>
        Array.from({ length: TOTAL_TICKS }, (_, i) => {
          const angleDeg = (360 / TOTAL_TICKS) * i;
          const angleRad = (angleDeg * Math.PI) / 180;

          const r = RADIUS + DOT_RADIUS_OFFSET;

          return {
            index: i,
            angle: angleDeg,
            isBig: BIG_TICKS.includes(i),
            cx: CENTER + Math.sin(angleRad) * r,
            cy: CENTER - Math.cos(angleRad) * r,
          };
        }),
      [],
    );

    const hoveredItem = useMemo(() => {
      if (!lab || hoveredBigTick === null) return null;
      const index = BIG_TICKS.indexOf(hoveredBigTick);
      return index !== -1 ? lab[index] : null;
    }, [hoveredBigTick, lab]);

    return (
      <>
        {/* ===== Floating Label ===== */}
        {!isMobile && (
          <motion.div
            className="fixed z-[1000] pointer-events-none"
            style={{
              left: fx,
              top: fy,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <div className="w-75 flex items-center justify-center">
              <div className="relative h-[17px] overflow-hidden">
                <AnimatePresence mode="sync">
                  {hoveredBigTick !== null && hoveredItem && (
                    <motion.p
                      key={hoveredItem.tick}
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -18, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      className="text-s font-general text-[14px] tracking-[-0.05em] uppercase whitespace-nowrap"
                    >
                      {hoveredItem.title}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== Dial ===== */}
        <motion.svg
          ref={ref}
          width={DIAL_SIZE}
          height={DIAL_SIZE}
          viewBox={`0 0 ${DIAL_SIZE} ${DIAL_SIZE}`}
          className="
            block w-150 h-150 rounded-full bg-s/2 backdrop-blur-2xl z-10
            max-lg:w-125 max-lg:h-125
            max-md:w-100 max-md:h-100
            max-sm:w-85 max-sm:h-85
            max-xsm:w-75 max-xsm:h-75
            will-change-auto
          "
          initial={{ rotate: 360 }}
          animate={{ rotate: rotation }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 35,
            delay: 0.1,
          }}
          style={tiltStyle}
        >
          {/* Base Ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.5"
          />

          {/* Dots */}
          {ticks.map(({ index, cx, cy, isBig }) => {
            const isActive = index === activeTick;
            const isHover = hoveredBigTick === index;

            return (
              <motion.circle
                key={index}
                cx={cx}
                cy={cy}
                r={isBig ? BIG_DOT_SIZE : SMALL_DOT_SIZE}
                fill="white"
                opacity={isActive ? 1 : isBig ? 0.75 : 0.15}
                onMouseEnter={() => isBig && setHoveredBigTick(index)}
                onMouseLeave={() => setHoveredBigTick(null)}
                onClick={() => isBig && onTickClick(index)}
                transition={{ type: "spring", stiffness: 50, damping: 120 }}
                className={`
                  ${isBig ? "cursor-pointer" : ""}
                  ${
                    isActive || isHover
                      ? "drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                      : ""
                  }
                  transition-all duration-250
                `}
              />
            );
          })}
        </motion.svg>
      </>
    );
  },
);

CircleDial.displayName = "CircleDial";
export default CircleDial;
