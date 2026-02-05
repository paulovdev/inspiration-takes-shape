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
          src="/about/img-01.jpg"
        />
        <Manifesto manifestoPhrases={manifestoPhrases} />
        <TextBlock
          blockTitle="[Since 2020]"
          blockPhrases={blockPhrases}
          bgColor="bg-s"
          textColor="text-p"
        />
        <Approach />
        <Clients
          bgColor="bg-p"
          lineColor="border-s/15"
          textColor="text-s"
          logoColor="text-s/75"
          logoHoverColor="hover:text-s"
        />
        <div className="mt-10 mb-2 w-full h-px bg-p/25" />
        <Awards />
        <div className="mb-2 w-full h-px bg-p/25" />
        <Team />
        <JoinUs />
        <div className=""></div>
      </main>

      <Footer />
    </Transition>
  );
};

export default Index;
