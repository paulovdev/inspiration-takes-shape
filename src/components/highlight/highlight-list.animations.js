export const textSlide = {
  initial: { y: "120%" },
  animate: (i) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.075,
    },
  }),
};

export const textHover = {
  initial: {
    x: 0,
    color: "#000000",
  },
  animate: (custom) => ({
    x: custom,
    color: "#ffffff",
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

export const bg = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
