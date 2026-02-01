export const menuContainer = {
  initial: { height: "0vh" },
  animate: {
    height: "100dvh",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    height: "0vh",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.25,
    },
  },
};

export const fade = {
  initial: { opacity: 0 },
  animate: ({ animate }) => ({
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: animate,
    },
  }),
  exit: ({ exit }) => ({
    opacity: 0,
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: exit,
    },
  }),
};

export const textSlide = {
  initial: { y: "100%" },
  animate: ({ animate }) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: animate,
    },
  }),
  exit: ({ exit }) => ({
    y: "100%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: exit,
    },
  }),
};

export const arrowRotate = {
  open: {
    rotate: 180,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
  closed: {
    rotate: 0,
    transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
  },
};

export const dropdown = {
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
      delay: 0.15,
    },
  },
};

export const line = {
  initial: { width: 0 },
  animate: {
    width: "100%",
    transition: {
      duration: 0.5,

      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    width: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};
