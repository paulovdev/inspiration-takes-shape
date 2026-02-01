import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/navigation/nav";
import Transition from "@/components/layout/transition";
import Clients from "@/components/sections/clients";
import JoinUs from "@/components/sections/join-us";
import Manifesto from "@/components/sections/manifesto";
import ShowcaseGrid from "@/components/sections/showcase-grid";
import TextBlock from "@/components/sections/text-block";
import { clients } from "@/data/clients.data";
import { blockPhrases, manifestoPhrases } from "@/data/home.data";
import Hero from "@/features/home/hero";
import Reel from "@/features/home/reel";
import WorksPreview from "@/features/home/works-preview";
import Lenis from "lenis";
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
    <Transition>
      <Nav />
      <main className="min-h-screen bg-s">
        <Hero lenis={lenisRef} />
        <Manifesto manifestoPhrases={manifestoPhrases} />
        <TextBlock
          blockTitle="INSPIRATION TAKES SHAPE®"
          blockPhrases={blockPhrases}
          bgColor="bg-s"
          textColor="text-p"
          showButton={true}
          buttonHref="/about"
          buttonLabel="more about us"
          buttonBgColor="#000000"
          buttonTextColor="#ffffff"
        />
        <WorksPreview />
        <Clients
          title="Clients we’ve partnered with to build meaningful digital experiences."
          bgColor="bg-s"
          lineColor="border-p/15"
          textColor="text-p"
          logoColor="text-p/75"
          logoHoverColor="hover:text-p"
        />

        <Reel />
        <JoinUs />
      </main>

      <Footer />
    </Transition>
  );
};

export default Index;
