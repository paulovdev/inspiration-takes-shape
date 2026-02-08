import { useEffect, useRef } from "react";
import { works } from "@/data/works.data";
import { useIsPresent } from "motion/react";
import Lenis from "lenis";

import { useRouter } from "next/router";

import Transition from "@/components/layout/transition";
import PageHero from "@/components/sections/hero";
import Nav from "@/components/layout/navigation/nav";

import Gallery from "@/features/work/gallery";
import Manifesto from "@/components/sections/manifesto";
import { manifestoPhrases } from "@/data/about.data";

const Index = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenisRef.current = lenis;

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
    <Transition lenis={lenisRef}>
      <Nav />
      <main className="w-auto min-h-screen bg-s">
        <PageHero
          title={[work.heroDescription]}
          subTitle={work.title}
          src={work.cover}
        />

        <div className="relative pt-10 px-10 py-2 w-full overflow-hidden h-fit bg-s max-ds:px-8 max-lg:px-5 max-md:px-2">
          <div className="relative mb-12">
            <p className="mb-4 text-p/50 font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]">
              [year]
            </p>
            <h3
              className="font-normal text-p text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px]"
            >
              {work.year}
            </h3>
          </div>

          <div className="relative mb-12">
            <p className="mb-4 text-p/50 font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]">
              [category]
            </p>
            <h3
              className="font-normal text-p text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px]"
            >
              {work.category}
            </h3>
          </div>

          <div className="relative mb-12">
            <p className="mb-4 text-p/50 font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]">
              [license]
            </p>
            <h3
              className="font-normal text-p text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px]"
            >
              {work.license}
            </h3>
          </div>
        </div>

        <Gallery imgs={work.images} />

        <Manifesto manifestoPhrases={[work.footerDescription]} />
      </main>
    </Transition>
  );
};
export default Index;
