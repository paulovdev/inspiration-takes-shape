import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { textSlide } from "../about/about.animations";

const phrases = [
  "We guide brands that challenge the ordinary,",
  "connecting purpose, aesthetics, and technology",
  "in every detail.",
];

const Tran = ({ heroPhrases }) => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <div
      className="relative px-10 pt-20 w-full bg-s flex flex-col items-start cursor-default max-lg:px-3 max-lg:pt-10"
      ref={ref}
    >
      {heroPhrases.map((phrase, i) => (
        <div key={i} className="overflow-hidden w-full">
          <motion.h2
            className="w-full text-p text-[clamp(1em,5vw,4.25vw)] tracking-[-0.03em] leading-[1.1] will-change-auto"
            custom={2.5 + i}
            variants={textSlide}
            initial="initial"
            animate={inView ? "animate" : "initial"}
          >
            {phrase}
          </motion.h2>
        </div>
      ))}
      <div className="w-full h-[1px] my-20 bg-p/15 max-lg:my-10"></div>
    </div>
  );
};

export default Tran;
