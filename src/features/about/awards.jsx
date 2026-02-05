import { awards } from "@/data/about.data";
import { useInView } from "react-intersection-observer";
<<<<<<< HEAD

=======
import { motion } from "motion/react";
import { textSlide } from "@/animations/shared/global-anim";
>>>>>>> 75c7aba ( newasd as)
const Awards = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  return (
    <section
      className="relative p-10 w-full h-full flex items-start justify-between overflow-hidden max-md:flex-col max-lg:px-5 max-md:px-2"
      ref={ref}
    >
      <div className="flex-1 relative max-md:mb-12">
        <p className="text-p/50 font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]">
<<<<<<< HEAD
          [Prêmios]
=======
          [Awards]
>>>>>>> 75c7aba ( newasd as)
        </p>
      </div>
      <div className="flex-1 w-full flex flex-col items-start ">
        {awards.map((award, i) => (
<<<<<<< HEAD
          <div className="mb-2 w-full flex items-center justify-between">
            <p className="font-inter font-normal text-p text-[28px] tracking-[-0.03em] leading-[1.11] will-change-transform max-lg:text-[22px]">
              {award.title}
            </p>
            <p className="font-inter font-normal text-p text-[28px] tracking-[-0.03em] leading-[1.11] will-change-transform max-lg:text-[22px]">
              {award.subTitle}
            </p>
=======
          <div className="mb-2 w-full overflow-hidden h-fit">
            <motion.h3
              className="w-full flex items-center justify-between"
              custom={i * 0.075}
              variants={textSlide}
              initial="initial"
              animate={inView ? "animate" : "initial"}
            >
              <span className="font-inter font-normal text-p text-[28px] tracking-[-0.03em] leading-[1.11] will-change-transform max-lg:text-[22px]">
                {award.title}
              </span>
              <span className="font-inter font-normal text-p text-[28px] tracking-[-0.03em] leading-[1.11] will-change-transform max-lg:text-[22px]">
                {award.subTitle}
              </span>
            </motion.h3>
>>>>>>> 75c7aba ( newasd as)
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
