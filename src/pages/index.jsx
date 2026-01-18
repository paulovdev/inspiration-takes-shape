import About from "@/components/section/home-components/about";
import Hero from "@/components/section/home-components/hero";
import Reel from "@/components/section/home-components/reel";
import Nav from "@/components/navigation/nav";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import Works from "@/components/section/home-components/works";
import Clients from "@/components/section/home-components/clients";

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
        <div className="bg-p">
          <Hero />
          <About />
          <Works />
        </div>
        <div className="bg-brd">
          <Clients />
          <Reel />
        </div>
      </main>
    </>
  );
};

export default Index;
