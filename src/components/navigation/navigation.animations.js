export const menuContainerAnim = {
  initial: { height: "0vh" },
  animate: {
    height: "85vh",
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
  exit: {
    height: "0vh",
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
      delay: 0.5,
    },
  },
};

export const menuFadeAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};
export const maskFadeAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.5,
    },
  },
};

export const textSlideAnim = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.25 + i * 0.025,
    },
  }),
};

export const arrowRotateAnim = {
  open: {
    rotate: 180,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
  closed: {
    rotate: 0,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
};

export const dropdownAnim = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.1,
    },
  },
};
