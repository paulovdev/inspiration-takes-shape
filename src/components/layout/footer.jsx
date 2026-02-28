import { opacity, textSlide } from "@/animations/shared/global-anim";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Button from "../ui/button";
import ExportedImage from "next-image-export-optimizer";

const navLinks = [
  { label: "Index", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
  /*  { label: "Credits for content", href: "/credits" }, */
];

const manifestoLinks = [
  { label: "offset", mark: "®", href: "/terms" },
  { label: "EARTH", mark: "®", href: "/privacy" },
  { label: "Experimental direction", mark: "®", href: "/terms" },
  { label: "Future Shapes", mark: "®", href: "/terms" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", external: true },
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "Behance", href: "https://behance.net", external: true },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <footer
      ref={ref}
      className="relative h-[90vh] max-ds:h-[100dvh] max-md:h-[90dvh] z-50 will-change-[clip-path]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 w-full h-[90vh] flex flex-col justify-between max-md:gap-10 max-ds:h-[95dvh] max-md:h-[80dvh]">
        <div className="w-full p-10 flex justify-between items-start gap-25 z-10 max-ds:gap-15 max-lg:flex-col max-lg:gap-10 max-ds:p-8 max-lg:p-5 max-md:p-2">
          <div className="flex-1 size-full flex items-start justify-start gap-25 max-ds:gap-15">
            <div className="flex flex-col items-start gap-10">
              <div className="flex flex-col items-start max-ds:truncate">
                <motion.p
                  initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
                  animate={
                    inView
                      ? { y: 0, opacity: 1, filter: "blur(0px)" }
                      : { y: 120, opacity: 0, filter: "blur(12px)" }
                  }
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8 font-inter font-normal text-s text-[28px] tracking-[-0.03em] max-lg:text-[22px] leading-[1.11]"
                >
                  Navigate
                </motion.p>
                {navLinks.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="mb-2 relative overflow-hidden size-fit group"
                  >
                    <motion.p
                      custom={i * 0.075}
                      variants={textSlide}
                      initial="initial"
                      animate={inView ? "animate" : "initial"}
                      className="text-s font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase max-md:text-[12px] cursor-pointer"
                    >
                      {link.label}
                    </motion.p>
                    <span className="absolute left-0 -bottom-[1px] h-[2px] w-0 bg-s transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
                  </a>
                ))}
              </div>
              <div className="flex flex-col items-start max-ds:truncate">
                <motion.p
                  initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
                  animate={
                    inView
                      ? { y: 0, opacity: 1, filter: "blur(0px)" }
                      : { y: 120, opacity: 0, filter: "blur(12px)" }
                  }
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8 font-inter font-normal text-s text-[28px] tracking-[-0.03em] max-lg:text-[22px] leading-[1.11]"
                >
                  Laboratory
                </motion.p>
                {manifestoLinks.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative mb-2 size-fit overflow-hidden group"
                  >
                    <motion.p
                      custom={i * 0.075}
                      variants={textSlide}
                      initial="initial"
                      animate={inView ? "animate" : "initial"}
                      className="text-s font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase max-md:text-[12px] cursor-pointer"
                    >
                      {link.label}
                      <span className="relative text-[10px] -top-[5px]">
                        {link.mark}
                      </span>
                    </motion.p>
                    <span className="absolute left-0 -bottom-[1px] h-[2px] w-0 bg-s transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start max-ds:truncate">
              <motion.p
                initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
                animate={
                  inView
                    ? { y: 0, opacity: 1, filter: "blur(0px)" }
                    : { y: 120, opacity: 0, filter: "blur(12px)" }
                }
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 font-inter font-normal text-s text-[28px] tracking-[-0.03em] max-lg:text-[22px] leading-[1.11]"
              >
                Socials
              </motion.p>
              {socialLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="mb-2 relative overflow-hidden size-fit group"
                >
                  <motion.p
                    custom={i * 0.075}
                    variants={textSlide}
                    initial="initial"
                    animate={inView ? "animate" : "initial"}
                    className="text-s font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase max-md:text-[12px] cursor-pointer"
                  >
                    {link.label}
                  </motion.p>
                  <span className="absolute left-0 -bottom-[1px] h-[2px] w-0 bg-s transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div className="w-full flex-1 flex flex-col items-start">
            <motion.p
              initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
              animate={
                inView
                  ? { y: 0, opacity: 1, filter: "blur(0px)" }
                  : { y: 120, opacity: 0, filter: "blur(12px)" }
              }
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 font-inter font-normal text-s text-[28px] tracking-[-0.03em] max-lg:text-[22px] leading-[1.11]"
            >
              Newsletter — no spam, only good stuff.
            </motion.p>
            <div className="overflow-hidden h-fit">
              <motion.p
                htmlFor="email"
                variants={textSlide}
                initial="initial"
                animate={inView ? "animate" : "initial"}
                custom={0.2}
                className=" text-s font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase max-md:text-[12px]"
              >
                Your email address
              </motion.p>
            </div>
            <motion.div
              className="w-full flex"
              variants={opacity}
              initial="initial"
              animate={inView ? "animate" : "initial"}
            >
              <input
                type="text"
                name="email"
                className="my-4 px-2 py-2 w-100 inline-block border-2 border-s text-s outline-none group max-md:w-full"
              />
            </motion.div>
            <motion.div
              className="w-full flex"
              variants={opacity}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              custom={0.1}
            >
              <Button
                buttonHref="/newsletter"
                buttonLabel="subscribe"
                buttonBgColor="#ffffff"
                buttonTextColor="#000000"
              />
            </motion.div>
          </div>
        </div>

        <div className="w-full overflow-hidden px-10 pb-6 z-10 max-ds:px-8 max-lg:px-5 max-md:px-2 ">
          <motion.h2
            initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
            animate={
              inView
                ? { y: 0, opacity: 1, filter: "blur(0px)" }
                : { y: 120, opacity: 0, filter: "blur(12px)" }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-left text-s font-normal leading-none tracking-[-0.06em] text-[9.5vw] max-ds:text-[7.9vw] max-lg:text-[9.5vw] max-md:text-[9.5vw]"
          >
            offset<span className="text-[8vw]">®</span>
          </motion.h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
