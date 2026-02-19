import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/navigation/nav";
import Transition from "@/components/layout/transition";
import Clients from "@/components/sections/clients";
import PageHero from "@/components/sections/hero";
import JoinUs from "@/components/sections/join-us";
import Manifesto from "@/components/sections/manifesto";
import TextBlock from "@/components/sections/text-block";
import { blockPhrases, manifestoPhrases } from "@/data/about.data";
import Approach from "@/features/about/approach";
import Awards from "@/features/about/awards";
import Team from "@/features/about/team";
import Reel from "@/features/home/reel";
import Lenis from "lenis";
import InfiniteSlide from "@/features/home/infinite-slide";
import { useEffect, useRef } from "react";

const Index = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <Transition lenis={lenisRef}>
      <Nav />

      <main className="w-auto min-h-screen bg-s">
        <PageHero
          title={[`About — Offset®`]}
          subTitle="agency — 대행사"
          src="/about/img-01.jpg"
        />
        <Manifesto manifestoPhrases={manifestoPhrases} />
        <TextBlock
          blockTitle="[ since — 부터 2020 ]"
          blockPhrases={blockPhrases}
          bgColor="bg-s"
          textColor="text-p"
          buttonHref="/about"
          buttonLabel="read more"
          buttonBgColor="#000000"
          buttonTextColor="#ffffff"
        />
        <Approach />
        <Clients
          bgColor="bg-s"
          lineColor="border-p/15"
          textColor="text-p"
          logoColor="text-p/75"
          logoHoverColor="hover:text-p"
        />
        <Reel />
        <Awards />
        <Team />

        <JoinUs />
        <div className="mt-10 mb-2 w-full h-px bg-p/25" />
        <InfiniteSlide />
      </main>

      <Footer />
    </Transition>
  );
};

export default Index;
