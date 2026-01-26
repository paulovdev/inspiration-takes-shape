export const textOverlap = {
  initial: {
    y: "100%",
  },
  animate: {
    y: "0%",
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export const opacity = {
  initial: { opacity: 0 },
  animate: (custom) => ({
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: custom,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const scale = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
