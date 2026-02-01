import { opacity, textSlide } from "@/animations/global-anim";
import { motion } from "motion/react";
import { FaLink } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";
import Button from "../button";

const navLinks = [
  { label: "Index", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
  { label: "Credits for content", href: "/credits" },
];

const manifestoLinks = [
  { label: "Inspiration takes shape®", href: "/terms" },
  { label: "Experimental direction™", href: "/privacy" },
  { label: "Design as language™", href: "/terms" },
  { label: "Future forms®", href: "/terms" },
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
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <footer
      ref={ref}
      className="relative h-[75vh] bg-s  max-ds:h-[85dvh] max-md:h-[90dvh] z-50"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 w-full h-[75vh] flex flex-col justify-between max-md:gap-10 max-ds:h-[80dvh] max-md:h-[80dvh]">
        <div className="w-full p-10 flex justify-between items-start gap-25 max-ds:gap-15 max-lg:flex-col max-lg:gap-10 max-ds:p-8 max-lg:p-5 max-md:p-2">
          <div className="flex-1 size-full flex items-start justify-start gap-25 max-ds:gap-15">
            <div className="flex flex-col items-start max-ds:truncate">
              <motion.p
                initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
                animate={
                  inView
                    ? { y: 0, opacity: 1, filter: "blur(0px)" }
                    : { y: 120, opacity: 0, filter: "blur(12px)" }
                }
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 text-p text-[42px] tracking-[-0.03em] leading-none max-ds:text-[32px] max-lg:text-[28px] max-md:text-[24px]"
              >
                Site Index
              </motion.p>
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="mb-2 overflow-hidden h-fit"
                >
                  <motion.p
                    custom={i}
                    variants={textSlide}
                    initial="initial"
                    animate={inView ? "animate" : "initial"}
                    className="text-p font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase max-md:text-[12px] hover:text-p/75 transition-all cursor-pointer"
                  >
                    {link.label}
                  </motion.p>
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
                className="mb-8 text-p text-[42px] tracking-[-0.03em] leading-none max-ds:text-[32px] max-lg:text-[28px] max-md:text-[24px]"
              >
                Lab
              </motion.p>
              {manifestoLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="mb-2 overflow-hidden h-fit"
                >
                  <motion.p
                    custom={i}
                    variants={textSlide}
                    initial="initial"
                    animate={inView ? "animate" : "initial"}
                    className="text-p font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase flex items-center gap-2 max-md:text-[12px] hover:text-p/75 transition-all cursor-pointer"
                  >
                    {link.label} <FaLink className="text-[12px]" />
                  </motion.p>
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
                className="mb-8 text-p text-[42px] tracking-[-0.03em] leading-none max-ds:text-[32px] max-lg:text-[28px] max-md:text-[24px]"
              >
                Socials
              </motion.p>
              {socialLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="mb-2 overflow-hidden h-fit"
                >
                  <motion.p
                    custom={i}
                    variants={textSlide}
                    initial="initial"
                    animate={inView ? "animate" : "initial"}
                    className="text-p font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase max-md:text-[12px] hover:text-p/75 transition-all cursor-pointer"
                  >
                    {link.label}
                  </motion.p>
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
              className="mb-8 text-p text-[42px] tracking-[-0.03em] leading-none max-ds:text-[32px] max-lg:text-[28px] max-md:text-[24px]"
            >
              Newsletter — no spam, only good things.
            </motion.p>
            <div className="overflow-hidden h-fit">
              <motion.p
                htmlFor="email"
                variants={textSlide}
                initial="initial"
                animate={inView ? "animate" : "initial"}
                custom={2}
                className=" text-p font-general font-medium text-[14px] tracking-[-0.03em] leading-none uppercase max-md:text-[12px]"
              >
                your email adress
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
                className="my-4 px-2 py-2 w-100 inline-block border-2 border-p outline-none group max-md:w-full"
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
                buttonHref="/contact"
                buttonLabel="subscribe"
                buttonBgColor="#000000"
                buttonTextColor="#ffffff"
              />
            </motion.div>
          </div>
        </div>

        <div className="w-full overflow-hidden px-10 pb-6 max-ds:px-8 max-lg:px-5 max-md:px-2 ">
          <motion.h2
            initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
            animate={
              inView
                ? { y: 0, opacity: 1, filter: "blur(0px)" }
                : { y: 120, opacity: 0, filter: "blur(12px)" }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-left font-normal leading-none tracking-[-0.06em] text-[8vw] max-ds:text-[7.9vw] max-lg:text-[8vw] max-md:text-[8vw]"
          >
            INSPIRATION TAKES SHAPE <span className="text-[8vw]">®</span>
          </motion.h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
