export const textSlide = {
  initial: { y: "100%" },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: custom * 0.075,
    },
  }),
};

export const scale = {
  initial: { scale: 1 },
  animate: (custom) => ({
    scale: 1.1,
    transition: {
      duration: 1,
      delay: custom,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};
