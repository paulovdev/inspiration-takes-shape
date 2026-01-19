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

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
  }, []);

  return (
    <>
      <Nav />
      <main className="w-auto min-h-screen ">
        <div className="bg-p">
          <Hero />
          <About
            phrases={phrases}
            subPhrases={phrases2}
            bgColor="bg-p"
            textColor="text-s"
            showButton={true}
            buttonHref="/about"
            buttonLabel="About"
          />
          <Works />
        </div>
        <div className="bg-s">
          <HighlightList
            data={clients}
            title="Clients we’ve partnered with to build meaningful digital experiences."
          />
          <Reel />
        </div>
      </main>
    </>
  );
};

export default Index;
