import About from "@/components/about/about";
import Hero from "@/components/section/home-components/hero";
import Reel from "@/components/section/home-components/reel";
import Nav from "@/components/navigation/nav";
import Lenis from "lenis";
import Works from "@/components/section/home-components/works";
import { useEffect } from "react";
import {
  phrases,
  phrases2,
} from "@/components/section/home-components/home.data";
import { clients } from "@/data/clients.data";
import HighlightList from "@/components/highlight/highlight-list";
import Footer from "@/components/footer/footer";
import JoinUs from "@/components/join-us";
import BigText from "@/components/section/home-components/big-text";

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });
  }, []);

  return (
    <>
      <Nav />
      <main className="w-auto min-h-screen ">
        <Hero />
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
        <Reel />
        <BigText />
      </main>
      <JoinUs />
      <Footer />
    </>
  );
};

export default Index;
