import About from "@/components/about/about";
import Hero from "@/components/section/home-components/hero";
import Reel from "@/components/section/home-components/reel";
import Nav from "@/components/navigation/nav";
import Lenis from "lenis";
import Works from "@/components/section/home-components/works";
import { useEffect, useRef } from "react";
import {
  heroPhrases,
  phrases,
  phrases2,
} from "@/components/section/home-components/home.data";
import { clients } from "@/data/clients.data";
import HighlightList from "@/components/highlight/highlight-list";
import Footer from "@/components/footer/footer";

import BigText from "@/components/section/home-components/big-text";
import Tran from "@/components/tran/tran";
import Transition from "@/components/transition";

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
      <main className="w-auto min-h-screen bg-s select-none">
        <Hero lenis={lenisRef} />
        <Tran heroPhrases={heroPhrases} />
        <About
          phrases={phrases}
          subPhrases={phrases2}
          bgColor="bg-s"
          textColor="text-p"
          showButton={true}
          buttonHref="/about"
          buttonLabel="more about us"
          buttonBgColor="#000000"
          buttonTextColor="#ffffff"
        />
        <Works />

        <HighlightList
          data={clients}
          title="Clients we’ve partnered with to build meaningful digital experiences."
        />
        <Reel lenis={lenisRef} />
        <BigText />
      </main>

      <Footer />
    </Transition>
  );
};

export default Index;
