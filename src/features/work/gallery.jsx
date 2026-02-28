import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import ExportedImage from "next-image-export-optimizer";

const gallery = [
  "/images/works/img-02.jpg",
  "/images/works/img-03.jpg",
  "/images/works/img-04.jpg",
  "/images/works/img-05.jpg",
  "/images/works/img-06.jpg",
  "/images/works/img-07.jpg",
  "/images/works/img-08.jpg",
  "/images/works/img-09.jpg",
  "/images/works/img-10.jpg",
  "/images/works/img-11.jpg",
  "/images/works/img-12.jpg",
];

const clipAnim = {
  initial: {
    clipPath: "inset(0% 0% 100% 0%)",
    opacity: 0,
  },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.25,
    },
  },
};

export default function Gallery() {
  const container = useRef(null);
  const hRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const imgs2 = [...gallery, ...gallery];
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (!hRef.current) return;
    const totalScroll = hRef.current.scrollWidth - window.innerWidth;
    setScrollWidth(totalScroll);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);

  return (
    <section ref={container} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={hRef}
          style={{ x }}
          className="px-10 flex items-center h-full gap-10 w-max max-ds:px-8 max-lg:px-5 max-md:px-2 max-md:gap-2 max-lg:gap-5 max-ds:gap-8"
        >
          {imgs2.map((src, i) => (
            <Card src={src} key={i} scrollX={x} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const Card = ({ src }) => {
  const [hover, setHover] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className="relative w-175 h-[90vh] flex items-center group overflow-hidden max-lg:w-125 max-md:w-100 max-lg:h-[75vh] max-md:h-[60vh]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.figure className="size-full overflow-hidden group-hover:brightness-50 group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
        <ExportedImage
          src={src}
          width={2000}
          height={2000}
          alt=""
          className="size-full object-cover "
        />
      </motion.figure>

      <AnimatePresence mode="sync">
        {hover && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.figure
              className="relative w-100 h-100 overflow-hidden max-lg:w-75 max-lg:h-75 max-md:w-50 max-md:h-50 will-change-[clip-path]"
              variants={clipAnim}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[130%] h-full">
                <ExportedImage
                  src={src}
                  width={2000}
                  height={2000}
                  alt=" "
                  className="size-full object-cover"
                />
              </div>
            </motion.figure>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
