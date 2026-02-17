import { motion, useAnimate } from "motion/react";
import React, { useEffect, useRef, useState, forwardRef } from "react";

import Image from "next/image";

const BackgroundMedia = ({
  activeItem,

  isAnimatingRef,
  setIsAnimating,
}) => {
  const [scope, animate] = useAnimate();
  const [displayItem, setDisplayItem] = useState(activeItem);
  const lastAnimatedTick = useRef(activeTick);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!activeItem || !scope.current) return;
    if (isFirstMount.current) {
      isFirstMount.current = false;
      lastAnimatedTick.current = activeTick;
      setDisplayItem(activeItem);
      return;
    }
    if (lastAnimatedTick.current === activeTick) return;
    if (isAnimatingRef.current) return;

    let frame;
    const run = async () => {
      if (!dialRef.current) return (frame = requestAnimationFrame(run));
      const el = scope.current;
      const rect = dialRef.current.getBoundingClientRect();
      if (!rect.width) return (frame = requestAnimationFrame(run));

      const radius = rect.width / 2;
      const circleSmall = `circle(${radius - 40}px at 50% 50%)`;
      const circleFull = `circle(150% at 50% 50%)`;

      isAnimatingRef.current = true;
      setIsAnimating(true);

      try {
        await animate(
          el,
          {
            rotate: 0,
            opacity: 1,
            filter: "grayscale(0%) blur(0px)",
            clipPath: circleFull,
          },
          { duration: 0 },
        );
        await animate(
          el,
          { clipPath: circleSmall, filter: "grayscale(40%) blur(20px)" },
          { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
        );
        await animate(
          el,
          { rotate: 180, opacity: 0, filter: "grayscale(100%) blur(80px)" },
          { duration: 1, ease: [0.76, 0, 0.24, 1] },
        );

        setDisplayItem(activeItem);

        await animate(
          el,
          { rotate: 360, opacity: 1, filter: "grayscale(0%) blur(40px)" },
          { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
        );
        await animate(
          el,
          { clipPath: circleFull, filter: "grayscale(0%) blur(0px)" },
          { duration: 1, ease: [0.645, 0.045, 0.355, 1] },
        );

        lastAnimatedTick.current = activeTick;
      } finally {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }
    };

    run();
    return () => cancelAnimationFrame(frame);
  }, [activeItem, activeTick, animate]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <motion.div
        ref={scope}
        className="absolute inset-0 will-change-[clip-path,transform,filter]"
        style={{ clipPath: "circle(150% at 50% 50%)" }}
      >
        {displayItem?.src.includes(".mp4") ? (
          <video
            key={displayItem.src}
            src={displayItem.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="size-full object-cover brightness-75"
          />
        ) : (
          <Image
            key={displayItem.src}
            src={displayItem.src}
            fill
            alt=""
            priority
            className="object-cover brightness-75"
          />
        )}
      </motion.div>
    </div>
  );
};
export default BackgroundMedia;
