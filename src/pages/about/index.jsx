import { useEffect } from "react";
import Lenis from "lenis";

import Nav from "@/components/navigation/nav";
import About from "@/components/about/about";
import Services from "@/components/section/about-components/services";
import Hero from "@/components/hero/hero";
import JoinUs from "@/components/join-us";

import HighlightList from "@/components/highlight/highlight-list";
import { phrases, phrases2 } from "@/data/about.data";
import { awards } from "@/data/about.data";
import { clients } from "@/data/clients.data";
import Footer from "@/components/footer/footer";

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
        <Hero
          title="Inspiration takes shape®"
          subTitle="about us"
          src="/about/video-22.mp4"
        />
        <About
          phrases={phrases}
         
          bgColor="bg-s"
          textColor="text-p"
        />
        <div className="mb-2 w-full h-px bg-p/25" />
        <Services />
        <HighlightList
          data={clients}
          title="Clients we’ve partnered with to build meaningful digital experiences."
        />

        <div className="mt-20 mb-2 w-full h-px bg-p/25" />

        <HighlightList
          data={awards}
          title="Awards and recognitions received for excellence in design and digital experiences."
          grid="grid-cols-1"
          gridIn="grid-cols-1"
        />

        <JoinUs />
        <div className=""></div>
      </main>

      <Footer />
    </>
  );
};

export default Index;
