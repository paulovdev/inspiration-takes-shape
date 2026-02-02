import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/navigation/nav";
import Transition from "@/components/layout/transition";
import Clients from "@/components/sections/clients";
import PageHero from "@/components/sections/hero";
import JoinUs from "@/components/sections/join-us";
import Manifesto from "@/components/sections/manifesto";
import ShowcaseGrid from "@/components/sections/showcase-grid";
import TextBlock from "@/components/sections/text-block";
import { awards, blockPhrases, manifestoPhrases } from "@/data/about.data";
import { clients } from "@/data/clients.data";
import Approach from "@/features/about/approach";
import Lenis from "lenis";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });
  }, []);
  return (
    <Transition>
      <Nav />

      <main className="w-auto min-h-screen bg-s">
        <PageHero
          title={[`Inspiration takes shape®`]}
          subTitle="about us"
          src="/about/video-22.mp4"
        />
        <Manifesto manifestoPhrases={manifestoPhrases} />
        <TextBlock
          blockTitle="[SINCE 2020 — 2026]"
          blockPhrases={blockPhrases}
          bgColor="bg-s"
          textColor="text-p"
        />
        <div className="mb-2 w-full h-px bg-p/25" />
        <Approach />
        <Clients
          title="Clients we’ve partnered with to build meaningful digital experiences."
          bgColor="bg-p"
          lineColor="border-s/15"
          textColor="text-s"
          logoColor="text-s/75"
          logoHoverColor="hover:text-s"
        />
        <div className="mt-20 mb-2 w-full h-px bg-p/25" />

        <ShowcaseGrid
          data={awards}
          title="Awards and recognitions received for excellence in design and digital experiences."
          grid="grid-cols-1"
          gridIn="grid-cols-3"
        />

        <JoinUs />
        <div className=""></div>
      </main>

      <Footer />
    </Transition>
  );
};

export default Index;
