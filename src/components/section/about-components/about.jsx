import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
const textSlideAnim = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.075,
    },
  }),
};
const phrases = [
  "INSPIRATION TAKES SHAPE® is an art direction and",
  "experimental design studio focused on transforming",
  "ideas into form.",
  " ",
  "We work with visual systems, identities and interactive",
  "experiences, driven by research, experimentation and",
  "concept development.",
  " ",
  "Design is not decoration — it is structure, intention",
  "and narrative.",
];

const phrases2 = ["Design in a unique way."];

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section className="pt-30 bg-s" ref={ref}>
      <div className="p-10 w-full flex items-start justify-between max-lg:flex-col max-lg:items-center max-lg:p-5 max-md:p-2 gap-10">
        <div className="">
          {phrases2.map((phrase, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                className="text-p font-general text-[14px] leading-[1.4] tracking-[0.03em] uppercase max-lg:text-center"
                custom={5 + i}
                variants={textSlideAnim}
                initial="initial"
                animate={inView ? "animate" : ""}
              >
                {phrase}
              </motion.p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start max-lg:items-center">
          {phrases.map((phrase, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                className="text-p text-[32px] leading-[1.1em] tracking-[-0.03em] text-center "
                custom={2.5 + i}
                variants={textSlideAnim}
                initial="initial"
                animate={inView ? "animate" : ""}
              >
                {phrase}
              </motion.h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
