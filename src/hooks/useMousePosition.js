import { useEffect } from "react";
import { useMotionValue, useSpring } from "motion/react";

export function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 300, damping: 50 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const xNorm = e.clientX / window.innerWidth - 0.5;
      const yNorm = e.clientY / window.innerHeight - 0.5;

      x.set(xNorm);
      y.set(yNorm);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return { x: smoothX, y: smoothY };
}

export function useMousePosition2() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 1200, damping: 55 });
  const smoothY = useSpring(y, { stiffness: 1200, damping: 55 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return { x: smoothX, y: smoothY };
}
