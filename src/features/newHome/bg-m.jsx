import Image from "next/image";
import { motion, useAnimate } from "motion/react";
import { useEffect } from "react";

const BgM = ({ activeItem, isAnimatingRef, setIsAnimating }) => {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const run = async () => {
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
      } finally {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }
    };
  }, [animate]);
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <motion.div
        ref={scope}
        className="absolute inset-0 will-change-[clip-path,transform,filter]"
        style={{ clipPath: "circle(150% at 50% 50%)" }}
      >
        {activeItem?.src.includes(".mp4") ? (
          <video
            key={activeItem.src}
            src={activeItem.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="size-full object-cover brightness-75"
          />
        ) : (
          <Image
            key={activeItem.src}
            src={activeItem.src}
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

export default BgM;
