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

import { useEffect, useRef } from "react";
import Mnaso from "@/features/about/manso";

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

      <main className=" bg-s">
        <PageHero
          title={[`Offset® `]}
          subTitle="About us"
          src="/images/about/bg.jpg"
        />
        <Manifesto manifestoPhrases={manifestoPhrases} />{" "}
        <div className="px-10 mb-5 flex max-lg:my-2 max-ds:p-8 max-lg:p-5 max-md:p-2">
          <span className="bg-p/25 w-full h-px"></span>
        </div>
        <TextBlock
          blockTitle="— About Offset®"
          blockPhrases={blockPhrases}
          bgColor="bg-s"
          textColor="text-s"
          showButton
          buttonHref="/about"
          buttonLabel="Book a Discovery Call"
          buttonBgColor="#000000"
          buttonTextColor="#ffffff"
        />
        <Approach />
        <Clients
          bgColor="bg-s"
          lineColor="border-s/15"
          textColor="text-s"
          logoColor="text-s/75"
          logoHoverColor="hover:text-p"
        />
        <Reel />
        {/*   <Mnaso /> */}
        <Awards />
        <Team />
        <div className="my-5 w-full h-px max-lg:my-2" />
        <JoinUs />
      </main>

      <Footer />
    </Transition>
  );
};

export default Index;
