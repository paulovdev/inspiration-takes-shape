import Nav from "@/components/navigation/nav";
import About from "@/components/section/about-components/about";
import Awards from "@/components/section/about-components/awards";
import Clients from "@/components/section/about-components/clients";
import Gallery from "@/components/section/about-components/gallery";
import Hero from "@/components/section/about-components/hero";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

const Index = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.5,
      smooth: true,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />
      <main className="w-auto min-h-screen ">
        <Hero />
        <About />
        <div className="mt-20 mb-2 w-full h-px bg-p/25" />
        <Gallery />
        <Clients />
        <div className="mt-20 mb-2 w-full h-px bg-p/25" />
        <Gallery />
        <Awards />
      </main>
    </>
  );
};

export default Index;
