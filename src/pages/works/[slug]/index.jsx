import { useEffect, useRef } from "react";
import Nav from "@/components/navigation/nav";
import { works } from "@/data/works.data";
import { useIsPresent } from "motion/react";
import Lenis from "lenis";

import { useRouter } from "next/router";

import Image from "next/image";
import Hero from "@/components/hero/hero";

const Index = () => {
  const lenisRef = useRef(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenisRef.current = lenis;

    if (!hasScrolledRef.current) {
      lenis.scrollTo(0, { immediate: true });
      hasScrolledRef.current = true;
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  const router = useRouter();
  const { slug } = router.query;
  const ref = useRef();
  const isPresent = useIsPresent();
  ref.current = isPresent ? slug : ref.current;
  const work = works.find((item) => item.id === ref.current);

  if (!work) return null;

  return (
    <>
      <Nav />
      <Hero title={work.description} subTitle={work.title} src={work.src} />

      <div className="p-10 py-40 w-full bg-p flex flex-col items-start">
        <div className="mb-10 max-w-200 flex flex-col items-start">
          <span className="mb-1 text-s/50 font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-md:text-[12px]">
            year:
          </span>
          <p className="text-s text-[42px] leading-[1.1em] tracking-[-0.03em]">
            {work.year}
          </p>
        </div>
        <div className="mb-10 max-w-200 flex flex-col items-start">
          <span className="mb-1 text-s/50 font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-md:text-[12px]">
            category:
          </span>
          <p className="text-s text-[42px] leading-[1.1em] tracking-[-0.03em]">
            {work.category}
          </p>
        </div>

        <div className="mb-10 max-w-200 flex flex-col items-start">
          <span className="mb-1 text-s/50 font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-md:text-[12px]">
            license:
          </span>
          <p className="text-s text-[42px] leading-[1.1em] tracking-[-0.03em]">
            {work.license}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <Image src="/bg-1.jpg" width={3000} height={3000} alt="" />
      </div>
    </>
  );
};
export default Index;
