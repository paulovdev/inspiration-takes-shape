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
 