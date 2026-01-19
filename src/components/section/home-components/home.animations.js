export const textSlide = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.075,
    },
  }),
};
export const textSlideNoI = {
  initial: { y: "100%" },
  animate: (custom) => ({
    y: "0",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
  exit: {
    y: "-100%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
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
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export const heroIntro = {
  initial: {
    opacity: 0,
    scale: 0.85,
    rotateX: -60,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 1,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export const titleSlide = {
  initial: { y: 30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    y: -30,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export const mediaReveal = {
  initial: {},
  animate: {
    borderRadius: "0px",
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.1,
    },
  },
};
