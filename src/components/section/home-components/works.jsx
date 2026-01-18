import { works } from "@/data/data";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { textSlideNoI } from "./home.animations";

const Card = ({ work, index, inView }) => {
  const router = useRouter();
  const [hover, setHover] = useState(null);

  return (
    <motion.div
      onClick={() => {
        router.push(`/works/${work.id}`, undefined, { scroll: false });
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: inView ? 1 : 0,
        transition: {
          duration: 0.5,
          ease: [0.33, 1, 0.68, 1],
          delay: index * 0.1,
        },
      }}
      className="relative group"
    >
      <figure
        className="h-[75vh] overflow-hidden max-lg:h-[50vh] max-md:h-[35vh]"
        onMouseEnter={() => setHover(index)}
        onMouseLeave={() => setHover(null)}
      >
        {work.src.includes(".mp4") ? (
          <video
            src={work.src}
            autoPlay
            muted
            loop
            playsInline
            className="size-full object-cover group-hover:scale-110 group-hover:brightness-50 transition-all duration-500 cubic-bezier(0.33, 1, 0.68, 1)"
          />
        ) : (
          <Image
            src={work.src}
            width={2000}
            height={2000}
            alt={work.alt}
            priority
            className="size-full object-cover group-hover:scale-110 group-hover:brightness-50 transition-all duration-500 cubic-bezier(0.33, 1, 0.68, 1)"
          />
        )}

        <div className="absolute inset-0 p-5 w-full flex items-center justify-between max-md:flex-col max-md:items-start">
          <div className="h-[15px] overflow-hidden cursor-default">
            <motion.div
              variants={textSlideNoI}
              initial="initial"
              animate={hover === index ? "animate" : "initial"}
              className="flex flex-col items-start justify-center"
            >
              <p className="text-s font-general text-[14px] uppercase">
                {work.name}
              </p>
              <p className="text-s font-general text-[14px] uppercase">
                {work.name}
              </p>
            </motion.div>
          </div>

          <div className="h-[15px] overflow-hidden cursor-default">
            <motion.div
              variants={textSlideNoI}
              initial="initial"
              animate={hover === index ? "animate" : "initial"}
              className="flex flex-col items-start justify-center"
            >
              <p className="text-s font-general text-[14px] uppercase">
                {work.year}
              </p>
              <p className="text-s font-general text-[14px] uppercase">
                {work.year}
              </p>
            </motion.div>
          </div>
        </div>
      </figure>
    </motion.div>
  );
};

const Works = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  const { ref: cardsRef, inView: cardsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: linkRef, inView: linkInView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <>
      <section className="overflow-hidden" ref={container}>
        <motion.div
          className="relative w-screen h-[180vh] overflow-hidden"
          ref={linkRef}
          style={{ y }}
        >
          <div className="absolute inset-0 w-screen h-[180vh]">
            <div ref={cardsRef} className="grid grid-cols-3 gap-2">
              {works.slice(0, 12).map((work, i) => (
                <Card key={i} work={work} index={i} inView={cardsInView} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <motion.div
        className="fixed inset-0 flex items-center justify-center p-10 h-full z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: linkInView ? 1 : 0,
          transition: {
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
          },
        }}
      >
        <Link
          href="/works"
          className="group inline-block cursor-pointer text-s pointer-events-auto"
        >
          <span className="relative text-[62px] tracking-[-0.03em] leading-none max-lg:text-[48px] max-md:text-[42px]">
            See All Works
            <span className="absolute left-0 bottom-px h-[1px] w-full origin-left scale-x-100 bg-s transition-transform duration-300 ease-out group-hover:scale-x-0" />
          </span>

          <span className="relative font-general text-s/75 uppercase -top-8 left-2 max-lg:-top-6 max-lg:text-[14px]">
            (20)
          </span>
        </Link>
      </motion.div>
    </>
  );
};

export default Works;
