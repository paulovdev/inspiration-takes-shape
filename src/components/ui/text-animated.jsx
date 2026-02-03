import { motion } from "framer-motion";

const TextAnimated = ({
  phrases,
  variants,
  animate = true,
  as = "div",
  wordDelay = 0.03,
  lineDelay = 0.015,
  className = "",
  lineClassName = "",
  wordClassName = "",
}) => {
  let cumulativeDelay = 0;
  const LineTag = as;

  return (
    <div className={className}>
      {phrases.map((phrase, lineIndex) => {
        const words = phrase.split(" ");

        const line = (
          <LineTag
            key={lineIndex}
            className={`overflow-hidden ${lineClassName}`}
          >
            {words.map((word, wordIndex) => {
              const delay = cumulativeDelay + wordIndex * wordDelay;
              const bold = phrase.includes("A INSPIRAÇÃO GANHA FORMA®");
              return (
                <span
                  key={wordIndex}
                  className={`overflow-hidden inline-block mr-1 ${wordClassName} ${bold && "font-medium"}`}
                >
                  <motion.span
                    custom={delay}
                    variants={variants}
                    initial="initial"
                    animate={animate ? "animate" : "initial"}
                    className="inline-block will-change-transform"
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </LineTag>
        );

        cumulativeDelay += words.length * lineDelay;
        return line;
      })}
    </div>
  );
};

export default TextAnimated;
